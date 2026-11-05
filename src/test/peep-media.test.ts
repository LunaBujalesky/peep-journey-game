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
import { localeFromPath, localeHead } from "@/lib/i18n";
describe("international SEO", () => {
  it("maps each URL to its language", () => {
    expect(["/", "/en", "/zh-cn", "/ko"].map(localeFromPath)).toEqual(["es", "en", "zh-Hans", "ko"]);
  });
  it("gives each language a self canonical and reciprocal hreflang", () => {
    const head = localeHead("ko", "x");
    expect(head.links.find(l => l.rel === "canonical")?.href).toBe("/ko");
    expect(head.links.filter(l => l.rel === "alternate").map(l => l.hrefLang)).toEqual(["es", "en", "zh-Hans", "ko", "x-default"]);
  });
});
