import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function EditScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nieuwe plek</Text>

      <Button
        title="Terug naar overzicht"
        color="#126B65"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
    backgroundColor: "#F6F4EF",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#183B4E",
  },
});