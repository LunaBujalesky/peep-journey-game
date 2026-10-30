import { useEffect, useRef, useState } from "react";
import music from "@/assets/main-menu.mp3.asset.json";
import { shouldPlayMenuMusic, type PeepModal } from "@/lib/peep-media";

/** Load on the first gesture; keep one player alive across modal changes. */
export function useMenuMusic(modal: PeepModal) {
  const player = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const current = useRef({ modal, enabled });
  useEffect(() => { current.current = { modal, enabled }; }, [modal, enabled]);

  useEffect(() => {
    const sync = () => {
      const audio = player.current;
      if (!audio) return;
      if (shouldPlayMenuMusic(current.current.modal, current.current.enabled, !document.hidden)) {
        void audio.play().catch(() => {});
      } else audio.pause();
    };
    const unlock = () => {
      if (!player.current) {
        const audio = new Audio(music.url);
        audio.loop = true;
        audio.volume = 0.3;
        player.current = audio;
      }
      sync();
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", sync);
      player.current?.pause();
      player.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;
    if (shouldPlayMenuMusic(modal, enabled, !document.hidden)) void audio.play().catch(() => {});
    else audio.pause();
  }, [modal, enabled]);
  return { enabled, toggle: () => setEnabled(value => !value) };
}