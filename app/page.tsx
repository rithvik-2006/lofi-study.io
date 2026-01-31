'use client';

import { useCallback, useState } from "react";
import Background from '@/components/Background';
import { useLofiPlayer } from '@/hooks/useLofiPlayer';
import { SetupScreen } from '@/components/setup-screen';
import { StudySession } from '@/components/study-session';

const VIDEO_SOURCES = [
  '/0_Bedroom_Night_3840x2160.mp4',
  '/0_Cityscape_City_3840x2160.mp4',
  '/0_Girl_City_3840x2160.mp4',
  '/bgvid-4.mp4',
  '/bgvid-5.mp4',
  '/bgvid-6.mp4',
];

export default function Home() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
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

    setIsTransitioning(true);

    const n = VIDEO_SOURCES.length;
    const nextIndex = (currentIndex + 1) % n;
    const nextSlot: 0 | 1 = visibleSlot === 0 ? 1 : 0;

    // Load next video into hidden slot
    if (nextSlot === 0) {
      setSlot0Index(nextIndex);
    } else {
      setSlot1Index(nextIndex);
    }

    // Trigger crossfade
    setVisibleSlot(nextSlot);

    // Commit the global index AFTER transition
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 1000); // must match CSS fade duration
  }, [currentIndex, visibleSlot, isTransitioning]);
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
