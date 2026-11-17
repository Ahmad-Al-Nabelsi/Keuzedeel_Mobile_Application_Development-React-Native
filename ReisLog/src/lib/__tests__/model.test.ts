import { describe, expect, test } from "@jest/globals";
import { normalizeName, uniqueNames } from "../model";

describe("normalizeName", () => {
  test("negeert hoofdletters en extra spaties", () => {
    expect(normalizeName("  New   York  ")).toBe("new york");
  });

  test("behandelt namen met en zonder accent hetzelfde", () => {
    expect(normalizeName("Málaga")).toBe(normalizeName("Malaga"));
  });

  test("geeft een lege naam terug bij alleen spaties", () => {
    expect(normalizeName("   ")).toBe("");
  });
});

describe("uniqueNames", () => {
  test("voorkomt dubbele mappen bij verschillende schrijfwijzen", () => {
    const result = uniqueNames([
      " Málaga ",
      "malaga",
      "MÁLAGA",
      "Madrid",
    ]);

    expect(result).toEqual(["Madrid", "Málaga"]);
  });

  test("slaat lege namen over en sorteert namen alfabetisch", () => {
    const result = uniqueNames([
      "Zwolle",
      "",
      "   ",
      "Amsterdam",
      "  Den   Haag  ",
    ]);

    expect(result).toEqual(["Amsterdam", "Den Haag", "Zwolle"]);
  });

  test("geeft een lege lijst terug wanneer er geen namen zijn", () => {
    expect(uniqueNames([])).toEqual([]);
  });
});