'use client';

import { useCallback, useState } from "react";
import Background from '@/components/Background';
import { useLofiPlayer } from '@/hooks/useLofiPlayer';
import { SetupScreen } from '@/components/setup-screen';
import { StudySession } from '@/components/study-session';

const VIDEO_SOURCES = [
  // '/0_Bedroom_Night_3840x2160.mp4',
  '/0_Cityscape_City_3840x2160.mp4',
  '/0_Girl_City_3840x2160.mp4',
  '/6913345_Motion_Graphics_Motion_Graphic_3840x2160.mp4',
  '/6913962_Motion_Graphics_Motion_Graphic_3840x2160.mp4',
  '/6916623_Motion_Graphics_Motion_Graphic_3840x2160.mp4',
];

export default function Home() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [slot0Index, setSlot0Index] = useState(0);
  const [slot1Index, setSlot1Index] = useState(1);
  const [visibleSlot, setVisibleSlot] = useState<0 | 1>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const mode = sessionStarted ? (isBreak ? "break" : "focus") : "focus";
  const player = useLofiPlayer(mode);

  const handleStartSession = async (minutes: number) => {
    setSessionMinutes(minutes);
    setSessionStarted(true);
    await player.play();
  };

  const cycleVideo = useCallback(() => {
    if (isTransitioning) return;
    const n = VIDEO_SOURCES.length;
    const currentVisible = visibleSlot;
    const hiddenSlot = currentVisible; // slot we're fading out
    const nextVisible = 1 - currentVisible;
    const visibleIndex =
      nextVisible === 0 ? slot0Index : slot1Index; // slot we're fading in
    const nextIndex = (visibleIndex + 1) % n;

    setIsTransitioning(true);
    setVisibleSlot(nextVisible as 0 | 1);

    const t = setTimeout(() => {
      if (hiddenSlot === 0) setSlot0Index(nextIndex);
      else setSlot1Index(nextIndex);
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(t);
  }, [isTransitioning, visibleSlot, slot0Index, slot1Index]);

  return (
    <main className="min-h-screen overflow-hidden bg-transparent">
      <Background
        layer0Src={VIDEO_SOURCES[slot0Index]}
        layer1Src={VIDEO_SOURCES[slot1Index]}
        visibleLayer={visibleSlot}
        isBreak={isBreak}
      />
      {!sessionStarted ? (
        <SetupScreen onStart={handleStartSession} />
      ) : (
        <StudySession
          initialMinutes={sessionMinutes}
          onCycleBackground={cycleVideo}
          onModeChange={setIsBreak}
          player={player}
        />
      )}
    </main>
  );
}
