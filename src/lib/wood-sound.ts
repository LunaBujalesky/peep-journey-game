let audio: AudioContext | undefined;

/** A short, resonant wooden tap; browsers unlock audio after a user gesture. */
export function playWoodSound() {
  try {
    audio ??= new AudioContext();
    const context = audio;
    if (context.state === "suspended") {
      void context.resume().then(() => {
        if (context.state === "running") tap(context);
      });
      return;
    }
    tap(context);
  } catch {
    // Audio may be disabled by the visitor's browser.
  }
}

function tap(context: AudioContext) {
  const time = context.currentTime;
  const tones: Array<[number, number]> = [[480, 0.16], [830, 0.08], [1370, 0.035]];
  for (const [frequency, volume] of tones) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.85, time + 0.09);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.14);
  }
}