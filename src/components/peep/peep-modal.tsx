import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
const leaf = { url: "/assets/boton-cerrar.svg" };
const coin = { url: "/assets/moneda.svg" };
const teaser = { url: "/assets/teaser-preview.png" };
import { playCoinSound, playLeavesSound } from "@/lib/wood-sound";
import type { PeepModal as Modal } from "@/lib/peep-media";
import { TeamBook } from "./team-book";
import { Smartphone } from "lucide-react";
import type { Copy } from "@/lib/i18n";

export function PeepModal({ modal, onClose, t }: { modal: Modal; onClose: () => void; t: Copy }) {
  const illustrated = modal === "teaser" || modal === "team";
  const team = modal === "team";
  const sound = team ? playCoinSound : playLeavesSound;
  return <Dialog open={modal !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className={illustrated ? `peep-dialog-raw ${team ? "team-dialog" : "teaser-dialog"}` : "peep-dialog"}
      closeButton={illustrated ? <DialogClose asChild><Button variant="ghost" className={`asset-button ${team ? "close-coin" : "close-leaf"}`} style={team ? { ["--coin-mask" as string]: `url(${coin.url})` } : undefined} aria-label={t.close} onPointerEnter={sound} onFocus={sound} onPointerDown={sound}><img src={team ? coin.url : leaf.url} alt="" /></Button></DialogClose> : undefined}>
      <DialogTitle className={illustrated ? "sr-only" : "peep-dialog-title"}>{team ? "Team" : modal === "teaser" ? "Teaser" : t.oops}</DialogTitle>
      <DialogDescription className={illustrated ? "sr-only" : "peep-dialog-copy"}>{team ? t.teamCopy : modal === "teaser" ? t.teaserCopy : t.unavailable}</DialogDescription>
      {modal === "teaser" && <div className="teaser-artwork"><img src={teaser.url} alt={t.teaserAlt} width={950} className="teaser-preview" /><iframe className="teaser-video" title={t.teaserVideo} src="https://drive.google.com/file/d/17UVS0plncBS3IY7W-SNIbAYIQIEkSqf4/preview" allow="autoplay; fullscreen" allowFullScreen /></div>}
      {team && <TeamBook profileLabel={t.profile} />}
      {illustrated && <p className="rotate-hint"><Smartphone aria-hidden size={20} />{t.rotate}</p>}
    </DialogContent>
  </Dialog>;
}