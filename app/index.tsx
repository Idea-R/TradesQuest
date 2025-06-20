import { useEffect } from 'react';
import { router } from 'expo-router';
import { useUserStore } from '@/entities/user/model/store';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const { isAuthenticated, user } = useUserStore();

  useEffect(() => {
    // Small delay to ensure store is loaded
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/intro');
      } else if (!user?.isSetupComplete) {
        router.replace('/(tabs)/setup');
      } else {
        router.replace('/(tabs)');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user?.isSetupComplete]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});