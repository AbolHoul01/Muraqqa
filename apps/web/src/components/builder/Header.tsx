"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useStore } from "zustand";
import { Undo2, Redo2, RotateCcw, Languages } from "lucide-react";

export const Header: React.FC = () => {
  const direction = useResumeStore((state) => state.resume.themeSettings.direction);
  const updateThemeSettings = useResumeStore((state) => state.updateThemeSettings);
  const resetResume = useResumeStore((state) => state.resetResume);

  // Access zundo temporal store via useStore
  const temporal = useResumeStore.temporal;
  const { pastStates, futureStates, undo, redo } = useStore(temporal);

  const toggleDirection = () => {
    updateThemeSettings({ direction: direction === "rtl" ? "ltr" : "rtl" });
  };

  return (
    <header className="bg-muraqqa-navy text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-wide">مرقع | Muraqqa</h1>
        <span className="text-xs bg-muraqqa-teal text-navy-900 font-semibold px-2 py-0.5 rounded-full">
          Privacy-First
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Undo Button */}
        <button
          onClick={() => undo()}
          disabled={pastStates.length === 0}
          title="Undo"
          className="p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
          aria-label="Undo action"
        >
          <Undo2 className="w-5 h-5" />
        </button>

        {/* Redo Button */}
        <button
          onClick={() => redo()}
          disabled={futureStates.length === 0}
          title="Redo"
          className="p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
          aria-label="Redo action"
        >
          <Redo2 className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Direction Toggle */}
        <button
          onClick={toggleDirection}
          title="Toggle Direction (RTL / LTR)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/10 text-sm font-medium transition-colors text-white"
        >
          <Languages className="w-4 h-4" />
          <span>{direction.toUpperCase()}</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to reset all resume data?")) {
              resetResume();
            }
          }}
          title="Reset Resume"
          className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-red-500/20 text-red-300 text-sm font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
