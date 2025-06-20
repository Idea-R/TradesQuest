import { useState } from 'react';
import { useUserStore } from '@/entities/user';
import { User } from '@/entities/user/model/types';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setError } = useUserStore();

  const createMockUser = (provider: 'email' | 'google', email?: string, name?: string): User => ({
    id: `${provider}_${Date.now()}`,
    name: name || 'New User',
    email: email || 'user@example.com',
    phone: '',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    trade: {
      id: '',
      name: '',
      color: '#2563eb',
    },
    level: 1,
    currentXP: 0,
    totalXP: 0,
    joinDate: new Date().toISOString(),
    isSetupComplete: false,
  });

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = createMockUser('email', email, email.split('@')[0]);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      setError('Failed to sign in with email');
      return { success: false, error: 'Failed to sign in' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = createMockUser('email', email, name);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      setError('Failed to create account');
      return { success: false, error: 'Failed to create account' };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));

      const user = createMockUser('google', 'googleuser@gmail.com', 'Google User');
      setUser(user);
      
      return { success: true };
    } catch (error) {
      setError('Failed to sign in with Google');
      return { success: false, error: 'Failed to sign in with Google' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Simulate sign out
      await new Promise(resolve => setTimeout(resolve, 500));
      // Clear user data handled by store
    } catch (error) {
      setError('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };
}