"use client";

import { useState, useEffect, useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export type AutoSaveStatus = "saved" | "saving" | "pending";

export function useAutoSave(debounceMs: number = 1000) {
  const [status, setStatus] = useState<AutoSaveStatus>("saved");
  const resume = useResumeStore((state) => state.resume);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStatus("pending");

    const timer = setTimeout(() => {
      setStatus("saving");

      // Simulating rapid local storage persistence sync
      const saveTimer = setTimeout(() => {
        setStatus("saved");
      }, 300);

      return () => clearTimeout(saveTimer);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [resume, debounceMs]);

  return status;
}
