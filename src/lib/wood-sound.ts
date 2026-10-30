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

/** A soft rustle of leaves; browsers unlock audio after a user gesture. */
export function playLeavesSound() {
  try {
    audio ??= new AudioContext();
    const context = audio;
    if (context.state === "suspended") {
      void context.resume().then(() => {
        if (context.state === "running") rustle(context);
      });
      return;
    }
    rustle(context);
  } catch {
    // Audio may be disabled by the visitor's browser.
  }
}

function playTones(tones: ReadonlyArray<readonly [number, number, number]>, duration: number) {
  try {
    audio ??= new AudioContext();
    const context = audio;
    const play = () => {
      if (context.state !== "running") return;
      for (const [frequency, volume, delay] of tones) {
        const time = context.currentTime + delay;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(time);
        oscillator.stop(time + duration);
      }
    };
    if (context.state === "suspended") void context.resume().then(play);
    else play();
  } catch { /* Respect browsers with audio disabled. */ }
}

export const playCoinSound = () => playTones([[2400, 0.07, 0], [3650, 0.035, 0.02], [5100, 0.018, 0]], 0.35);
export const playPlasticSound = () => playTones([[1450, 0.04, 0], [2100, 0.025, 0.05], [1700, 0.03, 0.11]], 0.045);

function rustle(context: AudioContext) {
  const time = context.currentTime;
  const length = Math.floor(context.sampleRate * 0.28);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const envelope = Math.sin((i / length) * Math.PI);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  for (const [frequency, peak, offset] of [[3200, 0.22, 0], [2100, 0.14, 0.07]] as const) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = frequency;
    filter.Q.value = 1.1;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, time + offset);
    gain.gain.exponentialRampToValueAtTime(peak, time + offset + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + offset + 0.26);
    source.connect(filter).connect(gain).connect(context.destination);
    source.start(time + offset);
    source.stop(time + offset + 0.3);
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