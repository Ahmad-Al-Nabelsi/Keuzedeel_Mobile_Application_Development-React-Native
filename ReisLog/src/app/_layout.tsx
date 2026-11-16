import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#F6F4EF" },
          headerTintColor: "#183B4E",
          headerBackTitle: "Terug",
          contentStyle: { backgroundColor: "#F6F4EF" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "ReisLog" }} />
        <Stack.Screen name="edit" options={{ title: "Nieuwe plek" }} />
        <Stack.Screen name="country" options={{ title: "Steden" }} />
        <Stack.Screen name="places" options={{ title: "Plekken" }} />
      </Stack>
    </>
  );
}