import { create } from 'zustand';
import { UserState, UserActions, User } from './types';

export const useUserStore = create<UserState & UserActions>((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user: User) => {
    set({ 
      user, 
      isAuthenticated: true, 
      error: null 
    });
  },

  updateUser: (updates: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ 
        user: { ...currentUser, ...updates } 
      });
    }
  },

  clearUser: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    });
  },

  updateXP: (xp: number) => {
    const currentUser = get().user;
    if (currentUser) {
      const newCurrentXP = currentUser.currentXP + xp;
      const newTotalXP = currentUser.totalXP + xp;
      
      // Calculate level progression (every 1000 XP = 1 level)
      const newLevel = Math.floor(newTotalXP / 1000) + 1;
      
      set({
        user: {
          ...currentUser,
          currentXP: newCurrentXP % 1000, // Reset current XP on level up
          totalXP: newTotalXP,
          level: newLevel,
        }
      });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));