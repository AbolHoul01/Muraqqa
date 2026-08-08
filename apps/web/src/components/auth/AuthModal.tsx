"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { X, Lock, Mail, Key, LogIn, UserPlus, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "register" | "settings">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, user, secretKey, setAuth, setSecretKey, logout } =
    useAuthStore();
  const [customKey, setCustomKey] = useState(secretKey);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("لطفاً ایمیل و رمز عبور را وارد کنید");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "register") {
        const res = await api.auth.register(email, password);
        toast.success("ثبت‌نام با موفقیت انجام شد! اکنون وارد شوید.");
        setMode("login");
      } else {
        const res = await api.auth.login(email, password);
        setAuth(res.token, res.user);
        toast.success(`خوش آمدید ${res.user.email}`);
        onClose();
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "خطا در برقراری ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    if (!customKey || customKey.length < 16) {
      toast.error("کلید رمزنگاری باید حداقل ۱۶ کاراکتر داشته باشد");
      return;
    }
    setSecretKey(customKey);
    toast.success("کلید رمزنگاری Zero-Knowledge ذخیره شد");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden text-gray-800 dir-rtl font-sans border border-gray-100">
        {/* Header */}
        <div className="bg-muraqqa-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-muraqqa-teal" />
            <h3 className="font-bold text-lg">
              {user ? "حساب کاربری و امنیت" : "ورود / ثبت‌نام در مرقع"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {user ? (
            <div className="space-y-6">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-teal-900">
                <p className="font-bold mb-1">وارد شده به عنوان:</p>
                <p className="font-mono text-xs">{user.email}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">
                  کلید رمزنگاری Zero-Knowledge (AES-256):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-muraqqa-teal"
                  />
                  <button
                    onClick={handleSaveKey}
                    className="px-3 py-2 bg-muraqqa-navy text-white text-xs font-bold rounded-md hover:bg-navy-800"
                  >
                    ذخیره
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  رزومه‌های شما قبل از ارسال به سرور با این کلید رمزنگاری
                  می‌شوند.
                </p>
              </div>

              <button
                onClick={() => {
                  logout();
                  toast.info("از حساب کاربری خارج شدید");
                  onClose();
                }}
                className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-md text-sm transition-colors"
              >
                خروج از حساب کاربری
              </button>
            </div>
          ) : (
            <div>
              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 ${
                    mode === "login"
                      ? "border-muraqqa-teal text-muraqqa-navy"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>ورود</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`flex-1 py-2 text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 ${
                    mode === "register"
                      ? "border-muraqqa-teal text-muraqqa-navy"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>ثبت‌نام</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    پست الکترونیکی (ایمیل)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pr-9 pl-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-hidden focus:ring-2 focus:ring-muraqqa-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pr-9 pl-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-hidden focus:ring-2 focus:ring-muraqqa-teal"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-muraqqa-teal hover:bg-teal-600 text-navy-900 font-bold rounded-md text-sm shadow-xs transition-colors disabled:opacity-50 mt-2"
                >
                  {isLoading
                    ? "در حال پردازش..."
                    : mode === "login"
                    ? "ورود به حساب"
                    : "ایجاد حساب جدید"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
