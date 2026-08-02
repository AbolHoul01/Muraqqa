"use client";

import React, { useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useStore } from "zustand";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Languages,
  Printer,
  FileJson,
  FileUp,
} from "lucide-react";

export const Header: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const direction = resume.themeSettings.direction;
  const updateThemeSettings = useResumeStore(
    (state) => state.updateThemeSettings
  );
  const setResume = useResumeStore((state) => state.setResume);
  const resetResume = useResumeStore((state) => state.resetResume);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Access zundo temporal store via useStore
  const temporal = useResumeStore.temporal;
  const { pastStates, futureStates, undo, redo } = useStore(temporal);

  const toggleDirection = () => {
    updateThemeSettings({ direction: direction === "rtl" ? "ltr" : "rtl" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `muraqqa-resume-${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed === "object") {
          setResume(parsed);
          alert("Resume imported successfully!");
        } else {
          alert("Invalid JSON format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = "";
  };

  return (
    <header className="no-print bg-muraqqa-navy text-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-wide">مرقع | Muraqqa</h1>
        <span className="text-xs bg-muraqqa-teal text-navy-900 font-semibold px-2 py-0.5 rounded-full">
          Privacy-First
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
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

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Export JSON */}
        <button
          onClick={handleExportJSON}
          title="Export Resume JSON"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors text-white"
        >
          <FileJson className="w-4 h-4 text-muraqqa-teal" />
          <span className="hidden md:inline">Export JSON</span>
        </button>

        {/* Import JSON */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportJSON}
          accept=".json"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Import Resume JSON"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors text-white"
        >
          <FileUp className="w-4 h-4 text-muraqqa-teal" />
          <span className="hidden md:inline">Import JSON</span>
        </button>

        {/* Print / Download PDF */}
        <button
          onClick={handlePrint}
          title="Print or Save as PDF"
          className="flex items-center gap-2 px-4 py-1.5 rounded bg-muraqqa-teal hover:bg-teal-500 font-bold text-navy-900 text-sm transition-colors shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Download PDF</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

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
