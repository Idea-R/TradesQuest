import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wrench, Zap, TrendingUp, Star, ChevronRight, Mail, Smartphone } from 'lucide-react-native';
import { router } from 'expo-router';

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

  const handleSignIn = async () => {
    setIsLoading(true);
    // TODO: Implement sign-in logic
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 1500);
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    // TODO: Implement sign-up logic
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 1500);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // TODO: Implement Google authentication
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/setup');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Hero Section */}
      <LinearGradient
        colors={['#1e293b', '#334155', '#475569']}
        style={styles.heroSection}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }}
            style={styles.heroImage}
          />
          <View style={styles.logoOverlay}>
            <View style={styles.logoIcon}>
              <Wrench color="#ffffff" size={32} />
            </View>
            <Text style={styles.logoText}>TRADESQUEST</Text>
            <Text style={styles.logoSubtext}>Level Up Your Trade</Text>
          </View>
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Transform Your Work Into An{'\n'}
            <Text style={styles.heroTitleAccent}>Epic Adventure</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Turn every job into XP, compete with teammates, and unlock achievements 
            while building your professional legacy.
          </Text>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Why TradesQuest?</Text>
        
        <View style={styles.featuresGrid}>
          <FeatureCard
            icon={<Zap color="#fbbf24" size={24} />}
            title="Gamified Progress"
            description="Earn XP, unlock achievements, and level up your skills"
            color="#fbbf24"
          />
          <FeatureCard
            icon={<TrendingUp color="#16a34a" size={24} />}
            title="Track Earnings"
            description="Monitor commissions, goals, and financial progress"
            color="#16a34a"
          />
          <FeatureCard
            icon={<Star color="#7c3aed" size={24} />}
            title="Team Competition"
            description="Compete with colleagues and climb leaderboards"
            color="#7c3aed"
          />
        </View>
      </View>

      {/* Authentication Section */}
      <View style={styles.authSection}>
        <Text style={styles.authTitle}>Ready to Start Your Quest?</Text>
        
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

      {/* Bottom Decoration */}
      <View style={styles.bottomDecoration}>
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
        <View style={styles.decorationDot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroSection: {
    height: height * 0.45,
    position: 'relative',
  },
  logoContainer: {
    position: 'relative',
    height: '60%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 14,
    color: '#e2e8f0',
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    lineHeight: 40,
    marginBottom: 16,
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: '#fbbf24',
  },
  heroDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  authSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 24,
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
    borderRadius: 16,
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
  bottomDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    gap: 8,
  },
  decorationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
  },
});