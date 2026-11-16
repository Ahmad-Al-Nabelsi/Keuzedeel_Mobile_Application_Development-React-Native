export const placeTypes = [
  "Restaurant",
  "Café",
  "Bezienswaardigheid",
  "Natuur",
  "Verblijf",
  "Winkel",
  "Overig",
] as const;

export const visitOptions = [
  { value: "planned", label: "Op de planning" },
  { value: "visited", label: "Bezocht" },
] as const;

export type PlaceType = (typeof placeTypes)[number];

export type VisitStatus = (typeof visitOptions)[number]["value"];

export type Place = {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  kind: PlaceType;
  status: VisitStatus;
  note: string;
  createdAt: number;
};

export function normalizeName(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

export function uniqueNames(values: string[]) {
  const names = new Map<string, string>();

  for (const value of values) {
    const label = value.trim().replace(/\s+/g, " ");
    const key = normalizeName(label);

    if (key && !names.has(key)) {
      names.set(key, label);
    }
  }

  return [...names.values()].sort((a, b) => a.localeCompare(b, "nl"));
}