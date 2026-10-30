import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import leaf from "@/assets/boton-cerrar.svg.asset.json";
import coin from "@/assets/moneda.svg.asset.json";
import teaser from "@/assets/teaser-preview.png.asset.json";
import { playCoinSound, playLeavesSound } from "@/lib/wood-sound";
import type { PeepModal as Modal } from "@/lib/peep-media";
import { TeamBook } from "./team-book";

export function PeepModal({ modal, onClose }: { modal: Modal; onClose: () => void }) {
  const illustrated = modal === "teaser" || modal === "team";
  const team = modal === "team";
  const sound = team ? playCoinSound : playLeavesSound;
  return <Dialog open={modal !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className={illustrated ? `peep-dialog-raw ${team ? "team-dialog" : "teaser-dialog"}` : "peep-dialog"}
      closeButton={illustrated ? <DialogClose asChild><Button variant="ghost" className={`asset-button ${team ? "close-coin" : "close-leaf"}`} aria-label="Cerrar" onPointerEnter={sound} onFocus={sound} onPointerDown={sound}><img src={team ? coin.url : leaf.url} alt="" /></Button></DialogClose> : undefined}>
      <DialogTitle className={illustrated ? "sr-only" : "peep-dialog-title"}>{team ? "Team" : modal === "teaser" ? "Teaser" : "Ups"}</DialogTitle>
      <DialogDescription className={illustrated ? "sr-only" : "peep-dialog-copy"}>{team ? "El equipo de Dead Time Games." : modal === "teaser" ? "Una mirada al mundo de Peep." : "Aún no se encuentra disponible."}</DialogDescription>
      {modal === "teaser" && <div className="teaser-artwork"><img src={teaser.url} alt="Teaser de Peep" width={950} className="teaser-preview" /><iframe className="teaser-video" title="Video Teaser de Peep" src="https://drive.google.com/file/d/17UVS0plncBS3IY7W-SNIbAYIQIEkSqf4/preview" allow="autoplay; fullscreen" allowFullScreen /></div>}
      {team && <TeamBook />}
    </DialogContent>
  </Dialog>;
}