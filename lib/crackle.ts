"use client";

/**
 * Looping vinyl crackle, synthesised with the Web Audio API (no audio file).
 * Soft surface hiss plus sparse, randomly sized pops, band-limited like an old pressing.
 */
let ctx: AudioContext | null = null;
let source: AudioBufferSourceNode | null = null;
let output: GainNode | null = null;

function buildBuffer(context: AudioContext) {
  const seconds = 6;
  const length = context.sampleRate * seconds;
  const buffer = context.createBuffer(2, length, context.sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let pop = 0;
    let hiss = 0;
    for (let i = 0; i < length; i++) {
      // brown-ish hiss
      hiss = hiss * 0.96 + (Math.random() * 2 - 1) * 0.04;
      // occasional pops, some loud, most small
      if (Math.random() < 0.00028) {
        const size = Math.random() < 0.15 ? 0.55 : 0.18;
        pop = (Math.random() * 0.5 + 0.5) * size * (Math.random() < 0.5 ? -1 : 1);
      }
      data[i] = hiss * 0.35 + pop;
      pop *= 0.78;
    }
  }
  return buffer;
}

export function startCrackle() {
  ctx ??= new AudioContext();
  if (source) return;

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 250;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 4200;

  output = ctx.createGain();
  output.gain.value = 0;
  output.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 0.6);

  source = ctx.createBufferSource();
  source.buffer = buildBuffer(ctx);
  source.loop = true;
  source.connect(hp).connect(lp).connect(output).connect(ctx.destination);
  source.start();
  void ctx.resume();
}

export function stopCrackle() {
  if (!ctx || !source || !output) return;
  const s = source;
  output.gain.cancelScheduledValues(ctx.currentTime);
  output.gain.setValueAtTime(output.gain.value, ctx.currentTime);
  output.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
  s.stop(ctx.currentTime + 0.32);
  source = null;
}
