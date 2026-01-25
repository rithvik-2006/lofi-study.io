'use client';

import { useState } from 'react';

export function SetupScreen({ onStart }: { onStart: (minutes: number) => void }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);

  const presets = [
    { label: '25 min', minutes: 25 },
    { label: '50 min', minutes: 50 },
    { label: '1.5 hrs', minutes: 90 },
    { label: '2 hrs', minutes: 120 },
  ];

  const handlePreset = (mins: number) => {
    setMinutes(mins);
    setHours(0);
  };

  const totalMinutes = hours * 60 + minutes;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      {/* Animated background blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border/50 rounded-3xl p-10 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-light mb-3 text-foreground tracking-tight">
              How long do you <br />
              <span className="text-accent font-medium">want to study?</span>
            </h1>
            <p className="text-muted-foreground text-sm">Set your focus session duration</p>
          </div>

          {/* Time Input Section */}
          <div className="bg-background/50 rounded-2xl p-6 mb-8 border border-border/30">
            <div className="flex justify-center gap-4 mb-8">
              {/* Hours */}
              <div className="flex flex-col items-center gap-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Hours
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHours(Math.max(0, hours - 1))}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    −
                  </button>
                  <div className="w-16 h-16 bg-card rounded-xl border border-border flex items-center justify-center text-3xl font-light text-foreground">
                    {hours}
                  </div>
                  <button
                    onClick={() => setHours(hours + 1)}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center gap-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Minutes
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMinutes(Math.max(0, minutes - 5))}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    −
                  </button>
                  <div className="w-16 h-16 bg-card rounded-xl border border-border flex items-center justify-center text-3xl font-light text-foreground">
                    {minutes}
                  </div>
                  <button
                    onClick={() => setMinutes(Math.min(59, minutes + 5))}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Display total */}
            <div className="text-center text-lg font-light text-accent">
              {totalMinutes} minutes
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {presets.map((preset) => (
              <button
                key={preset.minutes}
                onClick={() => handlePreset(preset.minutes)}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  totalMinutes === preset.minutes
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background/50 border border-border/30 text-foreground hover:bg-background/80'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Start Button */}
          <button
            onClick={() => onStart(totalMinutes)}
            className="w-full py-4 px-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
          >
            Start Studying
          </button>
        </div>
      </div>
    </div>
  );
}
