import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { normalizeName } from "../lib/model";
import { usePlaces } from "../lib/store";

export default function PlacesScreen() {
  const { country = "", city = "" } = useLocalSearchParams<{
    country?: string;
    city?: string;
  }>();

  const { places } = usePlaces();

  const cityPlaces = places
    .filter(
      (place) =>
        normalizeName(place.country) === normalizeName(country) &&
        normalizeName(place.city) === normalizeName(city)
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{city || "Mijn plekken"}</Text>

      <Text style={styles.description}>{country}</Text>

      <Text style={styles.description}>
        Opgeslagen plekken · {cityPlaces.length}
      </Text>

      {cityPlaces.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Nog geen plekken</Text>

          <Text style={styles.description}>
            {country && city
              ? "Voeg een plek toe in deze stad."
              : "Open eerst een stad vanuit het landenoverzicht."}
          </Text>
        </View>
      ) : (
        cityPlaces.map((place) => (
          <Pressable
            key={place.id}
            accessibilityRole="button"
            accessibilityLabel={`Bekijk ${place.name}`}
            onPress={() =>
              router.push({
                pathname: "/place",
                params: { id: place.id },
              })
            }
            style={({ pressed }) => [
              styles.card,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.heading}>{place.name}</Text>

            <Text style={styles.description}>
              {place.kind} ·{" "}
              {place.status === "visited" ? "Bezocht" : "Op de planning"}
            </Text>

            {Boolean(place.note) && (
              <Text style={styles.description} numberOfLines={2}>
                {place.note}
              </Text>
            )}

            <Text style={styles.detailsLink}>Details bekijken →</Text>
          </Pressable>
        ))
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
  detailsLink: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#126B65",
  },
});