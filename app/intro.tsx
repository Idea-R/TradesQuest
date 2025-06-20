import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Mail, Smartphone } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppStore();

  const handleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const mockUser = {
        id: 'user_' + Date.now(),
        name: 'Alex Johnson',
        email: 'alex@tradesquest.com',
        phone: '+1 (555) 123-4567',
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
      };
      
      setUser(mockUser);
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 1500);
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      const mockUser = {
        id: 'user_' + Date.now(),
        name: 'New User',
        email: 'newuser@tradesquest.com',
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
      };
      
      setUser(mockUser);
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 1500);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      const mockUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'googleuser@gmail.com',
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
      };
      
      setUser(mockUser);
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Main Title Screen Image */}
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/images/Title Screen (2).png')}
          style={styles.titleImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        />
        
        {/* Overlay Content */}
        <View style={styles.overlayContent}>
          <Text style={styles.tagline}>Level Up Your Trade</Text>
          <Text style={styles.subtitle}>
            Transform every job into an adventure
          </Text>
        </View>
      </View>

      {/* Authentication Section */}
      <View style={styles.authSection}>
        {/* Google Sign In */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
          disabled={isLoading}
        >
          <View style={styles.googleIcon}>
            <Text style={styles.googleIconText}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
          <ChevronRight color="#374151" size={18} />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email/Phone Options */}
        <View style={styles.authButtons}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Mail color="#ffffff" size={18} />
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, styles.signInButton]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Smartphone color="#2563eb" size={18} />
            <Text style={[styles.authButtonText, styles.signInButtonText]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingSpinner}>
              <Text style={styles.loadingText}>Preparing your adventure...</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  heroSection: {
    flex: 1,
    position: 'relative',
  },
  titleImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  authSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  googleIconText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  googleButtonText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 12,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  authButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  signInButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2563eb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  authButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
  },
  signInButtonText: {
    color: '#2563eb',
  },
  termsText: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#2563eb',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loadingSpinner: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
    marginTop: 8,
  },
});