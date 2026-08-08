"use client";

import React, { useRef, useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { sampleResumeData } from "@/data/sampleResume";
import { AuthModal } from "@/components/auth/AuthModal";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useStore } from "zustand";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Languages,
  Printer,
  FileJson,
  FileUp,
  Sparkles,
  CloudUpload,
  UserCheck,
  User,
  CheckCircle2,
  Loader2,
  Clock,
} from "lucide-react";

export const Header: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const direction = resume.themeSettings.direction;
  const updateThemeSettings = useResumeStore(
    (state) => state.updateThemeSettings
  );
  const setResume = useResumeStore((state) => state.setResume);
  const resetResume = useResumeStore((state) => state.resetResume);

  const { token, user, secretKey } = useAuthStore();
  const autoSaveStatus = useAutoSave(1000);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Access zundo temporal store via useStore
  const temporal = useResumeStore.temporal;
  const { pastStates, futureStates, undo, redo } = useStore(temporal);

  const toggleDirection = () => {
    updateThemeSettings({ direction: direction === "rtl" ? "ltr" : "rtl" });
    toast.info(`جهت قالب به ${direction === "rtl" ? "LTR" : "RTL"} تغییر یافت`);
  };

  const handleLoadSample = () => {
    setResume(sampleResumeData);
    toast.success("اطلاعات نمونه با موفقیت بارگذاری شد!");
  };

  const handlePrint = () => {
    toast.info("در حال ارسال رزومه به ویرایشگر چاپ / PDF...");
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
    toast.success("فایل JSON رزومه با موفقیت دانلود شد");
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
          toast.success("فایل JSON با موفقیت فراخوانی شد!");
        } else {
          toast.error("فرمت فایل JSON معتبر نیست");
        }
      } catch (err) {
        toast.error("خطا در خواندن فایل JSON");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleCloudSave = async () => {
    if (!token) {
      toast.info("برای ذخیره ابری ابتدا وارد حساب کاربری شوید");
      setIsAuthModalOpen(true);
      return;
    }

    setIsSavingCloud(true);
    try {
      const title = resume.personalInfo.fullName
        ? `رزومه ${resume.personalInfo.fullName}`
        : "رزومه من";
      const res = await api.resumes.save(title, resume, token, secretKey);
      toast.success(res.message || "رزومه به صورت رمزنگاری‌شده در ابر ذخیره شد");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "خطا در ذخیره ابری رزومه");
    } finally {
      setIsSavingCloud(false);
    }
  };

  return (
    <>
      <header className="no-print bg-muraqqa-navy text-white shadow-md px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Auto-Save Badge */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-extrabold tracking-wide">مرقع | Muraqqa</h1>

          {/* Privacy Badge */}
          <span className="text-[11px] bg-muraqqa-teal text-navy-900 font-bold px-2 py-0.5 rounded-full">
            Privacy-First
          </span>

          {/* Auto-Save Visual Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10">
            {autoSaveStatus === "saved" && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">ذخیره شد</span>
              </>
            )}
            {autoSaveStatus === "saving" && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-sky-300 animate-spin" />
                <span className="text-sky-200">در حال ذخیره...</span>
              </>
            )}
            {autoSaveStatus === "pending" && (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-amber-200">تغییرات ذخیره نشده</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Undo Button */}
          <button
            onClick={() => undo()}
            disabled={pastStates.length === 0}
            title="Undo (واکشی تغییر قبلی)"
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors text-white"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Redo Button */}
          <button
            onClick={() => redo()}
            disabled={futureStates.length === 0}
            title="Redo (تکرار تغییر)"
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors text-white"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Sample Data Generator */}
          <button
            onClick={handleLoadSample}
            title="بارگذاری اطلاعات نمونه"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition-colors border border-amber-500/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">داده‌های نمونه</span>
          </button>

          {/* Direction Toggle */}
          <button
            onClick={toggleDirection}
            title="تغییر جهت سند (RTL / LTR)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-white/10 text-xs font-medium transition-colors text-white"
          >
            <Languages className="w-4 h-4" />
            <span>{direction.toUpperCase()}</span>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            title="خروجی فشرده JSON"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors text-white"
          >
            <FileJson className="w-4 h-4 text-muraqqa-teal" />
            <span className="hidden md:inline">خروجی JSON</span>
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
            title="ورود اطلاعات از فایل JSON"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors text-white"
          >
            <FileUp className="w-4 h-4 text-muraqqa-teal" />
            <span className="hidden md:inline">ورود JSON</span>
          </button>

          {/* Cloud Save (Go API Backend) */}
          <button
            onClick={handleCloudSave}
            disabled={isSavingCloud}
            title="ذخیره ابری رمزنگاری‌شده (Zero-Knowledge AES-256)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 text-xs font-bold border border-sky-400/30 transition-colors"
          >
            <CloudUpload className="w-4 h-4 text-sky-300" />
            <span className="hidden lg:inline">
              {isSavingCloud ? "در حال ارسال..." : "ذخیره ابری"}
            </span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handlePrint}
            title="چاپ یا دریافت فایل PDF"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-muraqqa-teal hover:bg-teal-500 font-bold text-navy-900 text-xs transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>دانلود PDF</span>
          </button>

          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* User Account / Auth Modal Trigger */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            title={user ? `حساب کاربری (${user.email})` : "ورود / ثبت‌نام"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-white/10 text-xs font-medium transition-colors"
          >
            {user ? (
              <UserCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <User className="w-4 h-4 text-gray-300" />
            )}
            <span className="hidden sm:inline">
              {user ? user.email.split("@")[0] : "ورود"}
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              if (confirm("آیا از پاک کردن کامل اطلاعات رزومه اطمینان دارید؟")) {
                resetResume();
                toast.info("اطلاعات رزومه بازنشانی شد");
              }
            }}
            title="پاکسازی کامل"
            className="p-1.5 rounded hover:bg-red-500/20 text-red-300 transition-colors ms-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
