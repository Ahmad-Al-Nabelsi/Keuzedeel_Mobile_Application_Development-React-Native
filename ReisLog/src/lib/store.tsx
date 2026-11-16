import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { openDatabaseSync, type SQLiteDatabase } from "expo-sqlite";
import type { Place } from "./model";

type PlaceContextValue = {
  places: Place[];
  savePlace: (place: Place) => void;
  removePlace: (id: string) => void;
};

const PlacesContext = createContext<PlaceContextValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const database = useRef<SQLiteDatabase | null>(null);
  const currentPlaces = useRef<Place[]>([]);

  const [places, setPlaces] = useState<Place[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  async function loadPlaces() {
    try {
      const db = database.current ?? openDatabaseSync("reislog.db");
      database.current = db;

      db.execSync(
        "CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL)"
      );

      const rows = await db.getAllAsync<{ data: string }>(
        "SELECT data FROM places ORDER BY rowid DESC"
      );

      const savedPlaces = rows.map((row) => JSON.parse(row.data) as Place);

      currentPlaces.current = savedPlaces;
      setPlaces(savedPlaces);
      setReady(true);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    void loadPlaces();
  }, []);

  function savePlace(place: Place) {
    const db = database.current;

    if (!db) throw new Error("Opslag is niet beschikbaar.");

    db.runSync(
      "INSERT INTO places (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data",
      place.id,
      JSON.stringify(place)
    );

    const exists = currentPlaces.current.some((item) => item.id === place.id);

    const nextPlaces = exists
      ? currentPlaces.current.map((item) =>
          item.id === place.id ? place : item
        )
      : [place, ...currentPlaces.current];

    currentPlaces.current = nextPlaces;
    setPlaces(nextPlaces);
  }

  function removePlace(id: string) {
    const db = database.current;

    if (!db) throw new Error("Opslag is niet beschikbaar.");

    db.runSync("DELETE FROM places WHERE id = ?", id);

    const nextPlaces = currentPlaces.current.filter((item) => item.id !== id);

    currentPlaces.current = nextPlaces;
    setPlaces(nextPlaces);
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Opslag niet beschikbaar</Text>

        <Text style={styles.message}>
          De gegevens konden niet worden geladen.
        </Text>

        <Button
          title="Opnieuw proberen"
          color="#126B65"
          onPress={() => {
            setError(false);
            void loadPlaces();
          }}
        />
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#126B65" />
      </View>
    );
  }

  return (
    <PlacesContext.Provider value={{ places, savePlace, removePlace }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const context = useContext(PlacesContext);

  if (!context) throw new Error("PlacesProvider ontbreekt.");

  return context;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F4EF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#183B4E",
  },
  message: {
    fontSize: 16,
    color: "#485F69",
    textAlign: "center",
  },
});