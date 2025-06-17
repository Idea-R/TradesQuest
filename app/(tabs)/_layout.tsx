import { Tabs } from 'expo-router';
import { Chrome as Home, Briefcase, TrendingUp, User, Settings } from 'lucide-react-native';
import { useAppStore } from '@/stores/useAppStore';

export default function TabLayout() {
  const { isSetupComplete } = useAppStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
          href: isSetupComplete ? '/(tabs)' : null,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Briefcase color={color} size={size} />
          ),
          href: isSetupComplete ? '/(tabs)/jobs' : null,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <TrendingUp color={color} size={size} />
          ),
          href: isSetupComplete ? '/(tabs)/progress' : null,
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
          href: isSetupComplete ? '/(tabs)/team' : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
          href: isSetupComplete ? '/(tabs)/profile' : null,
        }}
      />
      <Tabs.Screen
        name="setup"
        options={{
          title: 'Setup',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
          href: !isSetupComplete ? '/(tabs)/setup' : null,
        }}
      />
    </Tabs>
  );
}