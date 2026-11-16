import { useState } from "react";
import { router } from "expo-router";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const placeTypes = [
  "Restaurant",
  "Café",
  "Bezienswaardigheid",
  "Natuur",
  "Verblijf",
  "Winkel",
  "Overig",
];

const visitOptions = [
  { value: "planned", label: "Op de planning" },
  { value: "visited", label: "Bezocht" },
];

export default function EditScreen() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
const [kind, setKind] = useState("Bezienswaardigheid");
const [status, setStatus] = useState("planned");
const [note, setNote] = useState("");

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

        <Text style={styles.label}>Adres</Text>
<TextInput
  style={styles.input}
  value={address}
  onChangeText={setAddress}
  placeholder="Straat en huisnummer"
  placeholderTextColor="#687A82"
  accessibilityLabel="Adres"
  maxLength={250}
/>

<Text style={styles.label}>Soort plek</Text>
<View style={styles.choices}>
  {placeTypes.map((placeType) => (
    <Pressable
      key={placeType}
      accessibilityRole="button"
      accessibilityState={{ selected: kind === placeType }}
      onPress={() => setKind(placeType)}
      style={[
        styles.option,
        kind === placeType && styles.selectedOption,
      ]}
    >
      <Text
        style={[
          styles.optionText,
          kind === placeType && styles.selectedOptionText,
        ]}
      >
        {placeType}
      </Text>
    </Pressable>
  ))}
</View>

<Text style={styles.label}>Bezoekstatus</Text>
<View style={styles.choices}>
  {visitOptions.map((option) => (
    <Pressable
      key={option.value}
      accessibilityRole="button"
      accessibilityState={{ selected: status === option.value }}
      onPress={() => setStatus(option.value)}
      style={[
        styles.option,
        status === option.value && styles.selectedOption,
      ]}
    >
      <Text
        style={[
          styles.optionText,
          status === option.value && styles.selectedOptionText,
        ]}
      >
        {option.label}
      </Text>
    </Pressable>
  ))}
</View>

<Text style={styles.label}>Notities</Text>
<TextInput
  style={[styles.input, styles.notes]}
  value={note}
  onChangeText={setNote}
  placeholder="Tips of informatie over deze plek"
  placeholderTextColor="#687A82"
  accessibilityLabel="Notities"
  multiline
  maxLength={2000}
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

  choices: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
},
option: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#CDD9D6",
  borderRadius: 14,
  padding: 12,
  minHeight: 44,
  justifyContent: "center",
},
selectedOption: {
  backgroundColor: "#126B65",
  borderColor: "#126B65",
},
optionText: {
  fontSize: 14,
  color: "#183B4E",
},
selectedOptionText: {
  color: "#FFFFFF",
},
notes: {
  minHeight: 110,
  textAlignVertical: "top",
},

});