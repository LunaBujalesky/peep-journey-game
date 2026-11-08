import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { locales, localePath, type Copy, type Locale } from "@/lib/i18n";
import { playLeavesSound, playWoodSound } from "@/lib/wood-sound";
const leaf = { url: "/assets/language-leaf.webp" };
const soundOn = { url: "/assets/sound-on.webp" };
const soundOff = { url: "/assets/sound-off.webp" };

const label: Record<Locale, string> = { es: "Esp", en: "En", "zh-Hans": "中文", ko: "한국어" };
// Set while the leaf is mid-turn so the next language page finishes the page-turn.
let turning = false;

/** Top-right controls: music on/off and the leaf that cycles languages. */
export function TopControls({ locale, t, music }: { locale: Locale; t: Copy; music: { enabled: boolean; toggle: () => void } }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"idle" | "out" | "in">(() => (turning ? "in" : "idle"));
  useEffect(() => { turning = false; }, []);
  const next: Locale = locales[(locales.indexOf(locale) + 1) % locales.length] ?? "es";

  const switchLanguage = () => {
    if (phase === "out") return;
    playLeavesSound();
    setPhase("out");
    turning = true;
    window.setTimeout(() => void navigate({ to: localePath[next] as "/" }), 280);
  };

  return (
    <div className="top-controls">
      <Button variant="ghost" className="asset-button sound-button" aria-label={music.enabled ? t.musicOff : t.musicOn} title={music.enabled ? t.musicOff : t.musicOn} aria-pressed={music.enabled} onPointerEnter={playWoodSound} onClick={music.toggle}>
        <img src={music.enabled ? soundOn.url : soundOff.url} alt="" />
      </Button>
      <Button variant="ghost" className={`asset-button language-leaf leaf-${phase}`} aria-label={`${label[locale]} → ${label[next]}`} title={label[next]} onPointerEnter={playLeavesSound} onClick={switchLanguage} onAnimationEnd={() => phase === "in" && setPhase("idle")}>
        <img src={leaf.url} alt="" />
        <span lang={locale}>{label[locale]}</span>
      </Button>
    </div>
  );
}
