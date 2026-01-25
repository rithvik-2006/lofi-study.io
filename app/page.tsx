'use client';

import { useState } from 'react';
import { SetupScreen } from '@/components/setup-screen';
import { StudySession } from '@/components/study-session';

export default function Home() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(0);

  const handleStartSession = (minutes: number) => {
    setSessionMinutes(minutes);
    setSessionStarted(true);
  };

  return (
    <main className="bg-background min-h-screen overflow-hidden">
      {!sessionStarted ? (
        <SetupScreen onStart={handleStartSession} />
      ) : (
        <StudySession initialMinutes={sessionMinutes} />
      )}
    </main>
  );
}
