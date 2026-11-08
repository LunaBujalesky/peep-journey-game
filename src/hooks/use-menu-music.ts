import { useEffect, useState } from "react";
const music = { url: "/assets/main-menu.mp3" };
import { shouldPlayMenuMusic, type PeepModal } from "@/lib/peep-media";

// One player for the whole visit, so switching language keeps the song going.
let player: HTMLAudioElement | null = null;
let musicEnabled = true;

/** Load on the first gesture; pause for modals, hidden tabs or mute. */
export function useMenuMusic(modal: PeepModal) {
  const [enabled, setEnabled] = useState(musicEnabled);

  useEffect(() => {
    musicEnabled = enabled;
    const sync = () => {
      if (!player) return;
      if (shouldPlayMenuMusic(modal, enabled, !document.hidden)) void player.play().catch(() => {});
      else player.pause();
    };
    const unlock = () => {
      if (!player) {
        player = new Audio(music.url);
        player.loop = true;
        player.volume = 0.3;
      }
      sync();
    };
    sync();
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [modal, enabled]);

  return { enabled, toggle: () => setEnabled(value => !value) };
}
