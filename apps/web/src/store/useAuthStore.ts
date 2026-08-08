import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiUser } from "@/lib/api";

export interface AuthState {
  token: string | null;
  user: ApiUser | null;
  secretKey: string;
  setAuth: (token: string, user: ApiUser) => void;
  setSecretKey: (secretKey: string) => void;
  logout: () => void;
}

// Generate fallback 32-character key for local zero-knowledge encryption
const generateDefaultSecretKey = (): string => {
  return "muraqqa-default-secret-key-32b!";
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      secretKey: generateDefaultSecretKey(),

      setAuth: (token, user) => set({ token, user }),

      setSecretKey: (secretKey) => set({ secretKey }),

      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "muraqqa-auth-storage",
    }
  )
);
