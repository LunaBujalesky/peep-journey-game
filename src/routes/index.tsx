import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/bosque.png.asset.json";
import rosa from "@/assets/luz-rosa.png.asset.json";
import polvo from "@/assets/polvo.png.asset.json";
import arboles from "@/assets/arboles.png.asset.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { playWoodSound } from "@/lib/wood-sound";
import logo from "@/assets/peep-logo.svg.asset.json";
import tryNow from "@/assets/try-now.png.asset.json";
import instagram from "@/assets/instagram.png.asset.json";
import steam from "@/assets/steam.png.asset.json";
import discord from "@/assets/discord.png.asset.json";
import teaserButton from "@/assets/teaser-button.png.asset.json";
import presskitButton from "@/assets/presskit-button.png.asset.json";
import teamButton from "@/assets/team-button.png.asset.json";
import teaserPreview from "@/assets/teaser-preview.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peep — El videojuego" },
      { name: "description", content: "Adentrate en el bosque de Peep, una aventura mágica entre árboles gigantes y luz rosa." },
      { property: "og:title", content: "Peep — El videojuego" },
      { property: "og:description", content: "Adentrate en el bosque de Peep, una aventura mágica entre árboles gigantes y luz rosa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const motes = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  top: 20 + ((i * 53) % 75),
  size: 3 + (i % 5) * 2,
  delay: (i % 7) * 0.6,
  dur: 6 + (i % 5) * 1.5,
}));

function Index() {
  const [modal, setModal] = useState<"unavailable" | "teaser" | "team" | null>(null);
  const soundEvents = { onPointerEnter: playWoodSound, onFocus: playWoodSound, onPointerDown: playWoodSound };
  return (
    <main className="scene">
      <img src={bosque.url} alt="" className="layer layer-forest" />
      <img src={rosa.url} alt="" className="layer layer-pink" />
      <div className="layer layer-particles">
        <img src={polvo.url} alt="" className="layer dust" />
        {motes.map((m, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.dur}s`,
            }}
          />
        ))}
      </div>
      <img src={arboles.url} alt="" className="layer layer-trees" />

      <div className="hero">
        <h1 className="logo"><img src={logo.url} alt="Peep" /></h1>
        <nav className="menu" aria-label="Peep">
          <div className="menu-row menu-row-primary">
            <Button variant="ghost" className="asset-button try-button" aria-label="Try Now" {...soundEvents} onClick={() => setModal("unavailable")}><img src={tryNow.url} alt="Try Now!" /></Button>
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
      <Dialog open={modal !== null} onOpenChange={(open) => { if (!open) setModal(null); }}>
        <DialogContent className={`peep-dialog ${modal === "teaser" ? "peep-dialog-image" : ""}`}>
          <DialogTitle className={modal === "teaser" ? "sr-only" : "peep-dialog-title"}>{modal === "teaser" ? "Teaser" : "Ups"}</DialogTitle>
          <DialogDescription className={modal === "teaser" ? "sr-only" : "peep-dialog-copy"}>{modal === "teaser" ? "Una mirada al mundo de Peep." : "Aún no se encuentra disponible."}</DialogDescription>
          {modal === "teaser" && <img className="teaser-preview" src={teaserPreview.url} alt="Teaser de Peep: aventura entre árboles y plataformas del bosque" />}
        </DialogContent>
      </Dialog>
    </main>
  );
}
