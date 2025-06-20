export interface Trade {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  trade: Trade;
  level: number;
  currentXP: number;
  totalXP: number;
  joinDate: string;
  isSetupComplete: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  updateXP: (xp: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}