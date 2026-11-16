import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { normalizeName, uniqueNames } from "../lib/model";
import { usePlaces } from "../lib/store";

export default function CountryScreen() {
  const { country = "" } = useLocalSearchParams<{ country?: string }>();
  const { places } = usePlaces();

  const countryPlaces = places.filter(
    (place) => normalizeName(place.country) === normalizeName(country)
  );

  const cities = uniqueNames(countryPlaces.map((place) => place.city));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{country || "Mijn steden"}</Text>

      <Text style={styles.description}>Steden · {cities.length}</Text>

      {cities.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Nog geen steden</Text>

          <Text style={styles.description}>
            {country
              ? "Voeg een plek toe in dit land."
              : "Open eerst een land vanuit het overzicht."}
          </Text>
        </View>
      ) : (
        cities.map((city) => {
          const count = countryPlaces.filter(
            (place) => normalizeName(place.city) === normalizeName(city)
          ).length;

          return (
            <Pressable
              key={normalizeName(city)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${city}`}
              onPress={() =>
                router.push({
                  pathname: "/places",
                  params: { country, city },
                })
              }
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.heading}>{city}</Text>

              <Text style={styles.description}>
                Opgeslagen plekken · {count}
              </Text>

              <Text style={styles.cityLink}>Plekken bekijken →</Text>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F4EF",
  },
  content: {
    padding: 24,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#183B4E",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#183B4E",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#485F69",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    gap: 10,
  },
  cityLink: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#126B65",
  },
});