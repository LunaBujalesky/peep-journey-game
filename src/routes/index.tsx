import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/bosque.png.asset.json";
import rosa from "@/assets/luz-rosa.png.asset.json";
import polvo from "@/assets/polvo-capa.png.asset.json";
import arboles from "@/assets/arboles.png.asset.json";
import plataformasIzquierda from "@/assets/plataformas-izquierda.png.asset.json";
import plataformasDerecha from "@/assets/plataformas-derecha.png.asset.json";
import mochis from "@/assets/mochis.png.asset.json";
import pepe from "@/assets/pepe.png.asset.json";
import bandera from "@/assets/bandera.png.asset.json";
import coleccionables from "@/assets/coleccionables.png.asset.json";
import botonCerrar from "@/assets/boton-cerrar.svg.asset.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { playWoodSound, playLeavesSound } from "@/lib/wood-sound";
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

function Index() {
  const [modal, setModal] = useState<"unavailable" | "teaser" | "team" | null>(null);
  const soundEvents = { onPointerEnter: playWoodSound, onFocus: playWoodSound, onPointerDown: playWoodSound };
  const isImageModal = modal === "teaser" || modal === "team";
  const leafClose = (
    <DialogClose asChild>
      <button
        type="button"
        className="close-leaf"
        aria-label="Cerrar"
        onPointerEnter={playLeavesSound}
        onFocus={playLeavesSound}
      >
        <img src={botonCerrar.url} alt="" />
      </button>
    </DialogClose>
  );
  return (
    <main className="scene">
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

      <div className="hero">
        <div className="logo-wrap">
          <h1 className="logo"><img src={logo.url} alt="Peep" /></h1>
          <img src={pepe.url} alt="" className="pepe-bird" />
          <img src={bandera.url} alt="" className="bandera-flag" />
        </div>
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
        <DialogContent
          className={isImageModal ? "peep-dialog-raw" : "peep-dialog"}
          closeButton={isImageModal ? leafClose : undefined}
        >
          <DialogTitle className={isImageModal ? "sr-only" : "peep-dialog-title"}>
            {modal === "teaser" ? "Teaser" : modal === "team" ? "Team" : "Ups"}
          </DialogTitle>
          <DialogDescription className={isImageModal ? "sr-only" : "peep-dialog-copy"}>
            {modal === "teaser" ? "Una mirada al mundo de Peep." : modal === "team" ? "El equipo de Dead Time Games." : "Aún no se encuentra disponible."}
          </DialogDescription>
          {modal === "teaser" && <img className="teaser-preview" src={teaserPreview.url} alt="Teaser de Peep: aventura entre árboles y plataformas del bosque" />}
          {modal === "team" && <img className="teaser-preview" src={coleccionables.url} alt="Libro de coleccionables con las credenciales del equipo de Dead Time Games" />}
        </DialogContent>
      </Dialog>
    </main>
  );
}
