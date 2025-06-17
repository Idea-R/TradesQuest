import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit3, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Clock, CircleCheck as CheckCircle2, ChevronRight } from 'lucide-react-native';

interface ProfileStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
  showChevron?: boolean;
}

function StatCard({ stat }: { stat: ProfileStat }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
        {stat.icon}
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );
}

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      <View style={styles.menuItems}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === items.length - 1 && styles.menuItemLast,
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: item.color + '15' }]}>
                {item.icon}
              </View>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            {item.showChevron !== false && (
              <ChevronRight color="#94a3b8" size={20} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function Profile() {
  const [user] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@tradesquest.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  });

  const stats: ProfileStat[] = [
    {
      label: 'Jobs Completed',
      value: '127',
      icon: <CheckCircle2 color="#16a34a" size={20} />,
      color: '#16a34a',
    },
    {
      label: 'Total Hours',
      value: '384',
      icon: <Clock color="#2563eb" size={20} />,
      color: '#2563eb',
    },
    {
      label: 'Rating',
      value: '4.8',
      icon: <Award color="#fbbf24" size={20} />,
      color: '#fbbf24',
    },
    {
      label: 'Level',
      value: '12',
      icon: <TrendingUp color="#7c3aed" size={20} />,
      color: '#7c3aed',
    },
  ];

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
  };

  const accountMenuItems: MenuItem[] = [
    {
      title: 'Edit Profile',
      icon: <Edit3 color="#2563eb" size={20} />,
      color: '#2563eb',
      onPress: () => handleMenuAction('edit-profile'),
    },
    {
      title: 'Notifications',
      icon: <Bell color="#f59e0b" size={20} />,
      color: '#f59e0b',
      onPress: () => handleMenuAction('notifications'),
    },
    {
      title: 'Privacy & Security',
      icon: <Shield color="#16a34a" size={20} />,
      color: '#16a34a',
      onPress: () => handleMenuAction('privacy'),
    },
  ];

  const supportMenuItems: MenuItem[] = [
    {
      title: 'Help Center',
      icon: <HelpCircle color="#6366f1" size={20} />,
      color: '#6366f1',
      onPress: () => handleMenuAction('help'),
    },
    {
      title: 'App Settings',
      icon: <Settings color="#64748b" size={20} />,
      color: '#64748b',
      onPress: () => handleMenuAction('settings'),
    },
  ];

  const logoutMenuItems: MenuItem[] = [
    {
      title: 'Sign Out',
      icon: <LogOut color="#ef4444" size={20} />,
      color: '#ef4444',
      onPress: () => handleMenuAction('logout'),
      showChevron: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userTitle}>Senior Technician</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit3 color="#2563eb" size={20} />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <Mail color="#64748b" size={16} />
            <Text style={styles.contactText}>{user.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone color="#64748b" size={16} />
            <Text style={styles.contactText}>{user.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <MapPin color="#64748b" size={16} />
            <Text style={styles.contactText}>{user.location}</Text>
          </View>
          <View style={styles.contactItem}>
            <Calendar color="#64748b" size={16} />
            <Text style={styles.contactText}>Joined {user.joinDate}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Performance Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </View>
        </View>

        {/* Menu Sections */}
        <MenuSection title="Account" items={accountMenuItems} />
        <MenuSection title="Support" items={supportMenuItems} />
        <MenuSection title="" items={logoutMenuItems} />

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>TradesQuest v1.2.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e2e8f0',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  userTitle: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#475569',
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    margin: '1%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuItems: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  versionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#94a3b8',
    fontFamily: 'Inter-Regular',
  },
});