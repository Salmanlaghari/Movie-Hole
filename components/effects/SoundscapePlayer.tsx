"use client";

import { useEffect, useRef } from "react";
import { useSoundscapes } from "@/hooks/useSoundscapes";

export function SoundscapePlayer() {
  const { soundEnabled, ambientEnabled, activeTrackIdx, activeTrack, volume } = useSoundscapes();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // References to active synth nodes
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const synthGainRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Handle standard audio tracks (Track index 2 & 3)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize audio element
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    // Stop standard audio when disabled, or if active track is a synthesizer
    if (!soundEnabled || !ambientEnabled || activeTrack.type !== "audio") {
      audio.pause();
      return;
    }

    // If active track changed or audio is not playing
    const expectedUrl = activeTrack.url;
    if (expectedUrl && audio.src !== expectedUrl) {
      audio.src = expectedUrl;
      audio.load();
    }

    // Set volume smoothly
    audio.volume = volume * 0.4; // Slightly quieter so it is ambient

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay of soundscape audio was blocked. Waiting for interaction.", err);
      });
    }

    return () => {
      audio.pause();
    };
  }, [soundEnabled, ambientEnabled, activeTrack, activeTrackIdx]);

  // Handle volume changes on the standard audio element
  useEffect(() => {
    if (audioRef.current && activeTrack.type === "audio") {
      audioRef.current.volume = volume * 0.4;
    }
  }, [volume, activeTrack]);

  // Clean up Web Audio Synth nodes
  const stopWebAudioSynth = () => {
    try {
      // Fade out synth gain first for a soft, premium release
      if (synthGainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        synthGainRef.current.gain.setValueAtTime(synthGainRef.current.gain.value, ctx.currentTime);
        synthGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      }

      // Stop & clear oscillators
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        oscillatorsRef.current = [];

        gainNodesRef.current.forEach((gn) => {
          try {
            gn.disconnect();
          } catch (e) {}
        });
        gainNodesRef.current = [];

        if (lfoRef.current) {
          try {
            lfoRef.current.stop();
            lfoRef.current.disconnect();
          } catch (e) {}
          lfoRef.current = null;
        }

        if (noiseSourceRef.current) {
          try {
            noiseSourceRef.current.stop();
            noiseSourceRef.current.disconnect();
          } catch (e) {}
          noiseSourceRef.current = null;
        }

        if (filterNodeRef.current) {
          filterNodeRef.current.disconnect();
          filterNodeRef.current = null;
        }

        if (synthGainRef.current) {
          synthGainRef.current.disconnect();
          synthGainRef.current = null;
        }
      }, 500);
    } catch (err) {
      console.error("Error stopping Web Audio Synth:", err);
    }
  };

  // Handle Synthesizer Soundscapes (Track 0 & 1)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if we should play a synthesizer track
    const isSynthActive = soundEnabled && ambientEnabled && activeTrack.type === "synth";

    if (!isSynthActive) {
      stopWebAudioSynth();
      return;
    }

    // Initialize AudioContext
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Resume context if suspended (browser security)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Stop previous synth nodes before constructing new ones
    stopWebAudioSynth();

    try {
      // Create a master volume controller for the synth
      const synthGain = ctx.createGain();
      synthGain.gain.setValueAtTime(0, ctx.currentTime);
      synthGain.connect(ctx.destination);
      synthGainRef.current = synthGain;

      // Track 0: Midnight Popcorn (Warm, sweeping analog-like chord pads)
      if (activeTrack.id === "midnight-popcorn") {
        // Am9 / Fmaj9 chord formulation: Am9 = A2, C3, E3, G3, B3; Fmaj9 = F2, A2, C3, E3, G3
        const frequencies = [87.31, 110.0, 130.81, 164.81, 196.0, 246.94]; // F2, A2, C3, E3, G3, B3

        // Lowpass filter to make it dark and warm
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);
        filter.connect(synthGain);
        filterNodeRef.current = filter;

        // Create slow LFO to sweep filter cutoff back and forth for premium cinematic motion
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08; // 0.08Hz slow sweep
        lfoGain.gain.value = 120; // Sweep filter range +/- 120Hz
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
        lfoRef.current = lfo;

        // Build individual oscillators for chord notes
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          // Mix standard sine waves with a slight touch of triangle for analog warmth
          osc.type = idx % 2 === 0 ? "sine" : "triangle";

          // Slightly detune notes for rich, lush chorus width
          const detuneAmount = (idx - 2.5) * 4; // -10 to +10 cents detuned
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime(detuneAmount, ctx.currentTime);

          // Connect
          osc.connect(oscGain);
          oscGain.connect(filter);

          // Setup individual volume with slight variance for organic flow
          const volumeScale = 0.06 / frequencies.length;
          oscGain.gain.setValueAtTime(volumeScale, ctx.currentTime);

          osc.start();
          oscillatorsRef.current.push(osc);
          gainNodesRef.current.push(oscGain);
        });
      }

      // Track 1: Retro Projector Hiss (Cosy warm bulb hum + tape reel crackle)
      if (activeTrack.id === "retro-projector") {
        // 1. Warm Bulb Hum: low 60Hz and 120Hz harmonics
        const hum60 = ctx.createOscillator();
        const humGain = ctx.createGain();
        hum60.type = "sine";
        hum60.frequency.setValueAtTime(60, ctx.currentTime);
        humGain.gain.setValueAtTime(0.04, ctx.currentTime);
        hum60.connect(humGain);
        humGain.connect(synthGain);
        hum60.start();
        oscillatorsRef.current.push(hum60);
        gainNodesRef.current.push(humGain);

        const hum120 = ctx.createOscillator();
        const hum120Gain = ctx.createGain();
        hum120.type = "sine";
        hum120.frequency.setValueAtTime(120, ctx.currentTime);
        hum120Gain.gain.setValueAtTime(0.015, ctx.currentTime);
        hum120.connect(hum120Gain);
        hum120Gain.connect(synthGain);
        hum120.start();
        oscillatorsRef.current.push(hum120);
        gainNodesRef.current.push(hum120Gain);

        // 2. Vintage Vinyl/Film crackle & hiss (using custom noise buffer source)
        const bufferSize = 2 * ctx.sampleRate; // 2 seconds of noise
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Generate filtered white/pink noise mixed with periodic impulses (crackles)
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink noise lowpass approximation filter to make it soft
          lastOut = 0.997 * lastOut + white * 0.085;

          // Introduce sporadic clicks/crackles (1 in 4000 chance)
          let crackle = 0;
          if (Math.random() < 0.00035) {
            crackle = (Math.random() * 2 - 1) * 0.65;
          }

          output[i] = lastOut * 0.12 + crackle;
        }

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(1100, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(0.7, ctx.currentTime);

        const noiseVolume = ctx.createGain();
        noiseVolume.gain.setValueAtTime(0.18, ctx.currentTime);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseVolume);
        noiseVolume.connect(synthGain);

        noiseNode.start();
        noiseSourceRef.current = noiseNode;
      }

      // Smoothly ramp up master synth volume to current setting to avoid popping
      synthGain.gain.setValueAtTime(0.001, ctx.currentTime);
      synthGain.gain.exponentialRampToValueAtTime(volume * 0.45, ctx.currentTime + 1.2);

    } catch (e) {
      console.error("Web Audio Synthesizer init failed", e);
    }

    return () => {
      stopWebAudioSynth();
    };
  }, [soundEnabled, ambientEnabled, activeTrack, activeTrackIdx]);

  // Adjust volume dynamically on synth master node when state changes
  useEffect(() => {
    if (synthGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      synthGainRef.current.gain.setValueAtTime(synthGainRef.current.gain.value, ctx.currentTime);
      synthGainRef.current.gain.linearRampToValueAtTime(volume * 0.45, ctx.currentTime + 0.1);
    }
  }, [volume]);

  return null; // Side-effect player only, doesn't render DOM nodes
}
