import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePlaces } from "../lib/store";

export default function PlaceScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { places, removePlace } = usePlaces();

  const place = places.find((item) => item.id === id);

  function confirmDelete(placeId: string, placeName: string) {
  Alert.alert(
    "Plek verwijderen?",
    `Wil je “${placeName}” verwijderen?`,
    [
      {
        text: "Annuleren",
        style: "cancel",
      },
      {
        text: "Verwijderen",
        style: "destructive",
        onPress: () => {
          try {
            removePlace(placeId);
          } catch {
            Alert.alert(
              "Verwijderen mislukt",
              "De plek kon niet worden verwijderd. Probeer opnieuw."
            );
            return;
          }

          router.dismissTo("/");
        },
      },
    ]
  );
}

  if (!place) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Plek niet gevonden</Text>

        <Text style={styles.description}>
          Deze plek is niet beschikbaar.
        </Text>

        <Button
          title="Naar overzicht"
          color="#126B65"
          onPress={() => router.dismissTo("/")}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{place.name}</Text>

      <Text style={styles.description}>
        {place.city} · {place.country}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Soort plek</Text>
        <Text style={styles.description}>{place.kind}</Text>

        <Text style={styles.label}>Bezoekstatus</Text>
        <Text style={styles.description}>
          {place.status === "visited" ? "Bezocht" : "Op de planning"}
        </Text>

        <Text style={styles.label}>Adres</Text>
        <Text style={styles.description}>
          {place.address || "Geen adres toegevoegd."}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Notities</Text>
        <Text style={styles.description}>
          {place.note || "Geen notities toegevoegd."}
        </Text>
      </View>

      <Button
  title="Plek bewerken"
  color="#126B65"
  onPress={() =>
    router.push({
      pathname: "/edit",
      params: { id: place.id },
    })
  }
/>

<Button
  title="Plek verwijderen"
  color="#9F3E37"
  onPress={() => confirmDelete(place.id, place.name)}
/>

      <Button
        title="Terug naar overzicht"
        color="#126B65"
        onPress={() => router.back()}
      />
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
  label: {
    fontSize: 16,
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
});