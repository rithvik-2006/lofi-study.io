"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playlist } from "@/lib/playlist";

export type Mode = "focus" | "break";

async function fadeIn(audio: HTMLAudioElement, target = 0.7): Promise<void> {
  audio.volume = 0;
  await audio.play();

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (audio.volume < target) {
        audio.volume = Math.min(audio.volume + 0.02, target);
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

export function useLofiPlayer(mode: Mode) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const setVolumeForMode = useCallback(
    (m: Mode) => {
      if (!audioRef.current) return;
      audioRef.current.volume = m === "focus" ? 0.7 : 0.5;
    },
    []
  );

  useEffect(() => {
    audioRef.current?.pause();

    const audio = new Audio(playlist[index].url);
    audioRef.current = audio;
    audio.volume = mode === "focus" ? 0.7 : 0.5;

    audio.onended = () => {
      setIndex((i) => (i + 1) % playlist.length);
      setLoadError(null);
    };

    audio.onerror = () => {
      setLoadError(`Could not load "${playlist[index].title}"`);
      setIsPlaying(false);
      if (playlist.length > 1) {
        setIndex((i) => (i + 1) % playlist.length);
      }
    };

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- recreate audio only on track change
  }, [index]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = mode === "focus" ? 0.7 : 0.5;
  }, [mode]);

  const play = async () => {
    if (!audioRef.current) return;
    setVolumeForMode(mode);
    setLoadError(null);
    try {
      await fadeIn(audioRef.current, mode === "focus" ? 0.7 : 0.5);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio play failed:", err);
      setIsPlaying(false);
      setLoadError(
        err instanceof Error ? err.message : "Playback failed. Check the track URL."
      );
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const next = () => {
    setLoadError(null);
    setIndex((i) => (i + 1) % playlist.length);
  };

  return {
    play,
    pause,
    next,
    isPlaying,
    currentTrack: playlist[index],
    setVolumeForMode,
    loadError,
  };
}
