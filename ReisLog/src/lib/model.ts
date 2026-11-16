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