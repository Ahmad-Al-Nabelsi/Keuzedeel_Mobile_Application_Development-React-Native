import { router } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PlaceScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Reisplek</Text>

      <View style={styles.emptyState}>
        <Text style={styles.heading}>Geen plek geselecteerd</Text>

        <Text style={styles.description}>
          Open een plek vanuit het overzicht om de gegevens te bekijken.
        </Text>
      </View>

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
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    gap: 10,
  },
});