// Localized copy and SEO metadata for each language version of the Peep page.
// Spanish is the main audience and lives at "/"; other languages get their own URL.
export type Locale = "es" | "en" | "zh-Hans" | "ko";

export const locales: Locale[] = ["es", "en", "zh-Hans", "ko"];
export const localePath: Record<Locale, string> = { es: "/", en: "/en", "zh-Hans": "/zh-cn", ko: "/ko" };
const ogLocale: Record<Locale, string> = { es: "es_LA", en: "en_US", "zh-Hans": "zh_CN", ko: "ko_KR" };

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return first === "en" ? "en" : first === "zh-cn" ? "zh-Hans" : first === "ko" ? "ko" : "es";
}

export const copy = {
  es: {
    title: "Peep the Journey | Videojuego indie de plataformas",
    description: "Ayudá a Peep a encontrar el camino a casa en Peep the Journey, un juego indie de plataformas donde controlás el mundo que rodea a un pequeño pájaro.",
    logoAlt: "Peep the Journey", nav: "Menú de Peep the Journey", musicOn: "Activar música", musicOff: "Silenciar música",
    tryNow: "Probar ahora", oops: "Ups", unavailable: "Aún no se encuentra disponible.",
    teaserCopy: "Una mirada al mundo de Peep the Journey.", teaserAlt: "Teaser de Peep the Journey", teaserVideo: "Video teaser de Peep the Journey",
    teamCopy: "El equipo de Dead Time Games.", close: "Cerrar", rotate: "Girá el celular para verlo mejor", profile: "Perfil de",
  },
  en: {
    title: "Peep the Journey | Cozy-Rage Indie Platformer",
    description: "Help Peep find his way home in Peep the Journey, a cozy-rage indie platformer where you control the world around a little bird.",
    logoAlt: "Peep the Journey", nav: "Peep the Journey menu", musicOn: "Turn music on", musicOff: "Mute music",
    tryNow: "Try now", oops: "Oops", unavailable: "Not available yet.",
    teaserCopy: "A first look at the world of Peep the Journey.", teaserAlt: "Peep the Journey teaser", teaserVideo: "Peep the Journey teaser video",
    teamCopy: "The Dead Time Games team.", close: "Close", rotate: "Rotate your phone for a better view", profile: "Profile of",
  },
  "zh-Hans": {
    title: "Peep the Journey | 独立平台跳跃游戏",
    description: "在独立平台跳跃游戏《Peep the Journey》中，你不直接操控小鸟，而是改变它周围的世界，帮助小鸟 Peep 找到回家的路。",
    logoAlt: "Peep the Journey", nav: "Peep the Journey 菜单", musicOn: "开启音乐", musicOff: "关闭音乐",
    tryNow: "立即试玩", oops: "哎呀", unavailable: "暂未开放。",
    teaserCopy: "抢先一窥 Peep the Journey 的世界。", teaserAlt: "Peep the Journey 预告", teaserVideo: "Peep the Journey 预告片",
    teamCopy: "Dead Time Games 团队。", close: "关闭", rotate: "横置手机以获得更佳观看效果", profile: "个人主页：",
  },
  ko: {
    title: "Peep the Journey | 인디 플랫포머 게임",
    description: "작은 새를 직접 조작하는 대신 주변 세상을 움직여 Peep이 집으로 돌아가도록 도와주세요. 독특한 인디 플랫포머, Peep the Journey.",
    logoAlt: "Peep the Journey", nav: "Peep the Journey 메뉴", musicOn: "음악 켜기", musicOff: "음악 끄기",
    tryNow: "지금 플레이", oops: "앗", unavailable: "아직 이용할 수 없어요.",
    teaserCopy: "Peep the Journey의 세계를 먼저 만나보세요.", teaserAlt: "Peep the Journey 티저", teaserVideo: "Peep the Journey 티저 영상",
    teamCopy: "Dead Time Games 팀.", close: "닫기", rotate: "더 크게 보려면 휴대폰을 가로로 돌려주세요", profile: "프로필:",
  },
} satisfies Record<Locale, Record<string, string>>;

export type Copy = (typeof copy)["es"];

/** Per-language head(): localized meta, self canonical, reciprocal hreflang and VideoGame JSON-LD. */
export function localeHead(locale: Locale, preloadImage: string) {
  const t = copy[locale];
  const path = localePath[locale];
  return {
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Peep the Journey" },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:url", content: path },
      { property: "og:locale", content: ogLocale[locale] },
      ...locales.filter(l => l !== locale).map(l => ({ property: "og:locale:alternate", content: ogLocale[l] })),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t.title },
      { name: "twitter:description", content: t.description },
    ],
    links: [
      { rel: "preload", as: "image", href: preloadImage },
      { rel: "canonical", href: path },
      ...locales.map(l => ({ rel: "alternate", hrefLang: l, href: localePath[l] })),
      { rel: "alternate", hrefLang: "x-default", href: localePath.en },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: "Peep the Journey",
        description: t.description,
        genre: ["Platformer", "Indie"],
        inLanguage: locale,
        author: { "@type": "Organization", name: "Dead Time Games" },
        sameAs: ["https://www.instagram.com/peep_journey_game/", "https://discord.com/invite/FqSNnBt67"],
      }),
    }],
  };
}
