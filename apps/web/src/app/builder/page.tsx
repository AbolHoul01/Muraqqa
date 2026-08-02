"use client";

import React from "react";
import { Header } from "@/components/builder/Header";
import { FormPanel } from "@/components/builder/FormPanel";
import { PreviewCanvas } from "@/components/builder/PreviewCanvas";
import { useResumeStore } from "@/store/useResumeStore";

export default function BuilderPage() {
  const direction = useResumeStore(
    (state) => state.resume.themeSettings.direction
  );

  return (
    <div
      className="min-h-screen bg-gray-100/70 flex flex-col font-sans"
      dir={direction}
    >
      {/* Top Header */}
      <Header />

      {/* Main Split-Screen Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Accordions */}
        <section className="lg:col-span-6 xl:col-span-5 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs mb-2">
            <h2 className="text-lg font-bold text-muraqqa-navy">
              {direction === "rtl" ? "ویرایش اطلاعات رزومه" : "Resume Content & Design"}
            </h2>
            <p className="text-xs text-muraqqa-slate mt-0.5">
              {direction === "rtl"
                ? "اطلاعات خود را وارد کرده و پیش‌نمایش زنده را بررسی کنید."
                : "Fill out your details below. Changes reflect instantly on the A4 canvas."}
            </p>
          </div>
          <FormPanel />
        </section>

        {/* Right Column: Sticky A4 Preview Canvas */}
        <section className="lg:col-span-6 xl:col-span-7 sticky top-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <PreviewCanvas />
        </section>
      </main>
    </div>
  );
}
