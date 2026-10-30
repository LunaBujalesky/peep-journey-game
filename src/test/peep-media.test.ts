import { describe, expect, it } from "vitest";
import { shouldPlayMenuMusic, teamProfiles } from "@/lib/peep-media";

describe("Peep music", () => {
  it.each(["teaser", "team", "unavailable"] as const)("pauses for %s", modal => {
    expect(shouldPlayMenuMusic(modal, true, true)).toBe(false);
  });
  it("resumes after closing a modal", () => {
    expect(shouldPlayMenuMusic(null, true, true)).toBe(true);
  });
  it("respects the mute control", () => {
    expect(shouldPlayMenuMusic(null, false, true)).toBe(false);
  });
});

describe("Team card destinations", () => {
  it.each([
    [0, "https://diegojimenez.com.ar/pages/portafolio.html"],
    [1, "https://www.instagram.com/no.tan.clara/"],
    [2, "https://www.behance.net/lunabujalesky"],
    [3, "https://www.instagram.com/mustard.mouse/"],
    [4, "https://www.instagram.com/ayesarco/"],
  ] as const)("opens card %i's supplied profile", (index, href) => {
    expect(teamProfiles[index]?.href).toBe(href);
  });
});