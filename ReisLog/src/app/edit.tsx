import { useState } from "react";
import { router } from "expo-router";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function EditScreen() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Plekgegevens</Text>

        <Text style={styles.label}>Naam *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Bijvoorbeeld Colosseum"
          placeholderTextColor="#687A82"
          accessibilityLabel="Naam van de plek"
          maxLength={100}
        />

        <Text style={styles.label}>Land *</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Bijvoorbeeld Italië"
          placeholderTextColor="#687A82"
          accessibilityLabel="Land"
          maxLength={80}
        />

        <Text style={styles.label}>Stad *</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Bijvoorbeeld Rome"
          placeholderTextColor="#687A82"
          accessibilityLabel="Stad"
          maxLength={80}
        />

        <Button
          title="Terug naar overzicht"
          color="#126B65"
          onPress={() => router.back()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F4EF",
  },
  content: {
    padding: 24,
    gap: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#183B4E",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#183B4E",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDD9D6",
    borderRadius: 14,
    padding: 15,
    minHeight: 52,
    fontSize: 16,
    color: "#183B4E",
  },
});