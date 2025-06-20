import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wrench, Zap, TrendingUp, Star, ChevronRight, Mail, Smartphone } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/stores/useAppStore';

const { width, height } = Dimensions.get('window');

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIcon, { backgroundColor: color + '15' }]}>
        {icon}
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

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
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>Level Up Your Trade</Text>
          <Text style={styles.subtitle}>
            Transform every job into XP, compete with teammates, and unlock achievements 
            while building your professional legacy.
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon={<Zap color="#fbbf24" size={20} />}
              title="Gamified Progress"
              description="Earn XP and level up"
              color="#fbbf24"
            />
            <FeatureCard
              icon={<TrendingUp color="#16a34a" size={20} />}
              title="Track Earnings"
              description="Monitor your income"
              color="#16a34a"
            />
            <FeatureCard
              icon={<Star color="#7c3aed" size={20} />}
              title="Team Competition"
              description="Compete & collaborate"
              color="#7c3aed"
            />
          </View>
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
          <ChevronRight color="#374151" size={20} />
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
            <Mail color="#ffffff" size={20} />
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, styles.signInButton]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Smartphone color="#2563eb" size={20} />
            <Text style={[styles.authButtonText, styles.signInButtonText]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
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
    height: '50%',
  },
  contentSection: {
    position: 'absolute',
    bottom: 320,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuresContainer: {
    alignItems: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 10,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 14,
  },
  authSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  googleButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginHorizontal: 16,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  authButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2563eb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  signInButtonText: {
    color: '#2563eb',
  },
  termsText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 18,
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
    borderRadius: 24,
  },
  loadingSpinner: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
    marginTop: 12,
  },
});