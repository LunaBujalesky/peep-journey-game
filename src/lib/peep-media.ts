export type PeepModal = "unavailable" | "teaser" | "team" | null;

export function shouldPlayMenuMusic(modal: PeepModal, enabled: boolean, visible: boolean) {
  return modal === null && enabled && visible;
}

export const teamProfiles = [
  { id: "diego", name: "Diego", href: "https://diegojimenez.com.ar/pages/portafolio.html" },
  { id: "clara", name: "Clara", href: "https://www.instagram.com/no.tan.clara/" },
  { id: "luna", name: "Luna", href: "https://www.behance.net/lunabujalesky" },
  { id: "silvi", name: "Silvi", href: "https://www.instagram.com/mustard.mouse/" },
  { id: "aye", name: "Aye", href: "https://www.instagram.com/ayesarco/" },
] as const;