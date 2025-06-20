import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { GoogleAuthButton, AuthButtons } from '@/features/authentication/ui';
import { useAuth } from '@/features/authentication/model/useAuth';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const { isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    const result = await signInWithEmail('demo@tradesquest.com', 'password');
    if (result.success) {
      router.replace('/(tabs)/setup');
    }
  };

  const handleSignUp = async () => {
    const result = await signUpWithEmail('newuser@tradesquest.com', 'password', 'New User');
    if (result.success) {
      router.replace('/(tabs)/setup');
    }
  };

  const handleGoogleAuth = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      router.replace('/(tabs)/setup');
    }
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
        <GoogleAuthButton onPress={handleGoogleAuth} isLoading={isLoading} />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email/Phone Options */}
        <AuthButtons 
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
          isLoading={isLoading}
        />

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
    // Optimized for mobile screens
    maxWidth: width > 414 ? 414 : width,
    maxHeight: height > 896 ? 896 : height,
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