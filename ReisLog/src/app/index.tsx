import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePlaces } from "../lib/store";

export default function HomeScreen() {
  const { places } = usePlaces();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mijn reizen</Text>

      <Text style={styles.description}>
        Bewaar de plekken die je wilt bezoeken.
      </Text>

      <Text style={styles.description}>
  Opgeslagen plekken · {places.length}
</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/edit")}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>+ Nieuwe plek bewaren</Text>
      </Pressable>

      <Text style={styles.heading}>Mijn landen</Text>

      {places.length === 0 && (
  <View style={styles.emptyState}>
    <Text style={styles.heading}>Nog geen plekken</Text>

    <Text style={styles.description}>
      Je opgeslagen landen verschijnen hier.
    </Text>
  </View>
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
  button: {
    backgroundColor: "#126B65",
    borderRadius: 14,
    padding: 16,
    minHeight: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    gap: 10,
  },
});