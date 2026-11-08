import { copy, type Locale } from "@/lib/i18n";
const bosque = { url: "/assets/bosque.png" };
const rosa = { url: "/assets/luz-rosa.png" };
const polvo = { url: "/assets/polvo-capa.png" };
const arboles = { url: "/assets/arboles.png" };
const plataformasIzquierda = { url: "/assets/plataformas-izquierda.png" };
const plataformasDerecha = { url: "/assets/plataformas-derecha.png" };
const mochis = { url: "/assets/mochis.png" };
const pepe = { url: "/assets/pepe.png" };
const bandera = { url: "/assets/bandera.png" };
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { playWoodSound } from "@/lib/wood-sound";
import { TopControls } from "@/components/peep/top-controls";
import { useMenuMusic } from "@/hooks/use-menu-music";
import { PeepModal } from "@/components/peep/peep-modal";
import type { PeepModal as Modal } from "@/lib/peep-media";
const logo = { url: "/assets/peep-logo.svg" };
const tryNow = { url: "/assets/try-now.png" };
const instagram = { url: "/assets/instagram.png" };
const steam = { url: "/assets/steam.png" };
const discord = { url: "/assets/discord.png" };
const teaserButton = { url: "/assets/teaser-button.png" };
const presskitButton = { url: "/assets/presskit-button.png" };
const teamButton = { url: "/assets/team-button.png" };


// The intro plays once per page load; switching language skips it.
let introPlayed = false;

export function PeepHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [modal, setModal] = useState<Modal>(null);
  const music = useMenuMusic(modal);
  const introDone = useState(() => introPlayed)[0];
  useEffect(() => { introPlayed = true; }, []);
  const soundEvents = { onPointerEnter: playWoodSound, onFocus: playWoodSound, onPointerDown: playWoodSound };
  return (
    <main className={introDone ? "scene intro-done" : "scene"} lang={locale}>
      <img src={bosque.url} alt="" className="layer layer-forest" />
      <img src={rosa.url} alt="" className="layer layer-pink" />
      <div className="layer layer-particles">
        <img src={polvo.url} alt="" className="layer dust" />
      </div>
      <img src={arboles.url} alt="" className="layer layer-trees" />
      <div className="layer layer-platforms">
        <img src={plataformasIzquierda.url} alt="" className="layer" />
        <img src={plataformasDerecha.url} alt="" className="layer" />
      </div>
      <img src={mochis.url} alt="" className="layer layer-mochis" />
      <TopControls locale={locale} t={t} music={music} />

      <div className="hero">
        <div className="logo-wrap">
          <h1 className="logo"><img src={logo.url} alt={t.logoAlt} /></h1>
          <img src={pepe.url} alt="" className="pepe-bird" />
          <img src={bandera.url} alt="" className="bandera-flag" />
        </div>
        <nav className="menu" aria-label={t.nav}>
          <div className="menu-row menu-row-primary">
            <Button variant="ghost" className="asset-button try-button" aria-label={t.tryNow} {...soundEvents} onClick={() => setModal("unavailable")}><img src={tryNow.url} alt="" /></Button>
            <div className="social-buttons">
              <Button asChild variant="ghost" className="asset-button round-button" {...soundEvents}><a href="https://www.instagram.com/peep_journey_game/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={instagram.url} alt="" /></a></Button>
              <Button variant="ghost" className="asset-button round-button" aria-label="Steam" {...soundEvents} onClick={() => setModal("unavailable")}><img src={steam.url} alt="" /></Button>
              <Button asChild variant="ghost" className="asset-button round-button" {...soundEvents}><a href="https://discord.com/invite/FqSNnBt67" target="_blank" rel="noopener noreferrer" aria-label="Discord"><img src={discord.url} alt="" /></a></Button>
            </div>
          </div>
          <div className="menu-row menu-row-secondary">
            <Button variant="ghost" className="asset-button text-button" aria-label="Teaser" {...soundEvents} onClick={() => setModal("teaser")}><img src={teaserButton.url} alt="Teaser" /></Button>
            <Button asChild variant="ghost" className="asset-button text-button" {...soundEvents}><a href="https://drive.google.com/drive/u/0/folders/1p1C7Q_IQ8ujD8zps2iDBSpMcECEqXUTW" target="_blank" rel="noopener noreferrer" aria-label="Presskit"><img src={presskitButton.url} alt="Presskit" /></a></Button>
            <Button variant="ghost" className="asset-button text-button" aria-label="Team" {...soundEvents} onClick={() => setModal("team")}><img src={teamButton.url} alt="Team" /></Button>
          </div>
        </nav>
      </div>
      <PeepModal t={t} modal={modal} onClose={() => setModal(null)} />
    </main>
  );
}
