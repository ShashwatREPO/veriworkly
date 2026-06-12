import { create } from "zustand";

import type { SessionUser } from "@/features/auth/services/current-user";

interface UserState {
  user: SessionUser | null;
  loading: boolean;
  isLoggedIn: boolean;

  // Actions
  setUser: (user: SessionUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  loading: true,
  isLoggedIn: false,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user?.email,
      loading: false,
    }),

  setLoading: (loading) => set({ loading }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
      loading: false,
    }),
}));
