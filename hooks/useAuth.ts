import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useAppStore } from '@/stores/useAppStore';

// Complete the auth session on web
WebBrowser.maybeCompleteAuthSession();

interface AuthConfig {
  googleClientId?: string;
  appleClientId?: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
}

export function useAuth(config?: AuthConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, user } = useAppStore();

  // Google Auth Configuration
  const googleAuthRequest = AuthSession.useAuthRequest(
    {
      clientId: config?.googleClientId || 'your-google-client-id.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'your-app-scheme',
        path: 'auth',
      }),
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (Platform.OS === 'web') {
        // Web implementation
        const result = await googleAuthRequest[1]();
        
        if (result?.type === 'success') {
          // Exchange code for tokens and get user info
          const userInfo = await fetchGoogleUserInfo(result.params.code);
          
          const authUser: AuthUser = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.picture,
            provider: 'google',
          };

          await handleAuthSuccess(authUser);
        }
      } else {
        // Mobile implementation would use @react-native-google-signin/google-signin
        // For now, simulate success
        const mockUser: AuthUser = {
          id: 'google_' + Date.now(),
          email: 'user@example.com',
          name: 'John Doe',
          avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          provider: 'google',
        };
        
        await handleAuthSuccess(mockUser);
      }
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error('Google sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate email authentication
      // In a real app, this would call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const authUser: AuthUser = {
        id: 'email_' + Date.now(),
        email,
        name: email.split('@')[0],
        provider: 'email',
      };

      await handleAuthSuccess(authUser);
    } catch (err) {
      setError('Failed to sign in with email');
      console.error('Email sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate email registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      const authUser: AuthUser = {
        id: 'email_' + Date.now(),
        email,
        name,
        provider: 'email',
      };

      await handleAuthSuccess(authUser);
    } catch (err) {
      setError('Failed to create account');
      console.error('Email sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clear user data
      setUser(null);
      
      // Additional cleanup for different providers
      if (user?.provider === 'google') {
        // Google sign out logic
      }
      
    } catch (err) {
      setError('Failed to sign out');
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = async (authUser: AuthUser) => {
    // Create user object for the app
    const appUser = {
      id: authUser.id,
      name: authUser.name,
      email: authUser.email,
      phone: '',
      avatar: authUser.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
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
    };

    setUser(appUser);
  };

  const fetchGoogleUserInfo = async (code: string) => {
    // Exchange authorization code for user info
    // This is a simplified version - in production, you'd handle this server-side
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${code}`);
    return await response.json();
  };

  return {
    isLoading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    user,
  };
}