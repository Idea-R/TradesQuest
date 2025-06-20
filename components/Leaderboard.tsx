import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Medal, Award, Crown, TrendingUp, Target, Clock, Zap } from 'lucide-react-native';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  trade: string;
  level: number;
  value: number;
  rank: number;
  change: number; // Position change from last period
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  period: 'daily' | 'weekly' | 'monthly';
  category: 'xp' | 'jobs' | 'earnings' | 'speed';
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly') => void;
  onCategoryChange: (category: 'xp' | 'jobs' | 'earnings' | 'speed') => void;
}

export function Leaderboard({ period, category, onPeriodChange, onCategoryChange }: LeaderboardProps) {
  // Mock data
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      trade: 'HVAC Technician',
      level: 15,
      value: category === 'xp' ? 2450 : category === 'jobs' ? 12 : category === 'earnings' ? 3200 : 4.2,
      rank: 1,
      change: 0,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      trade: 'Electrical Technician',
      level: 12,
      value: category === 'xp' ? 1890 : category === 'jobs' ? 8 : category === 'earnings' ? 2800 : 3.8,
      rank: 2,
      change: 1,
    },
    {
      id: '3',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      trade: 'HVAC Technician',
      level: 12,
      value: category === 'xp' ? 1450 : category === 'jobs' ? 6 : category === 'earnings' ? 2100 : 3.5,
      rank: 3,
      change: -1,
      isCurrentUser: true,
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/3785081/pexels-photo-3785081.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      trade: 'Plumber',
      level: 10,
      value: category === 'xp' ? 1200 : category === 'jobs' ? 5 : category === 'earnings' ? 1800 : 3.2,
      rank: 4,
      change: 2,
    },
    {
      id: '5',
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/3785083/pexels-photo-3785083.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      trade: 'Electrical Technician',
      level: 11,
      value: category === 'xp' ? 980 : category === 'jobs' ? 4 : category === 'earnings' ? 1500 : 2.9,
      rank: 5,
      change: -2,
    },
  ];

  const periods = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  const categories = [
    { key: 'xp', label: 'XP', icon: <Zap color="#7c3aed" size={16} /> },
    { key: 'jobs', label: 'Jobs', icon: <Target color="#16a34a" size={16} /> },
    { key: 'earnings', label: 'Earnings', icon: <TrendingUp color="#ea580c" size={16} /> },
    { key: 'speed', label: 'Speed', icon: <Clock color="#2563eb" size={16} /> },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown color="#fbbf24" size={24} fill="#fbbf24" />;
      case 2:
        return <Medal color="#94a3b8" size={24} />;
      case 3:
        return <Award color="#cd7c2f" size={24} />;
      default:
        return (
          <View style={styles.rankNumber}>
            <Text style={styles.rankNumberText}>{rank}</Text>
          </View>
        );
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change === 0) return null;
    
    return (
      <View style={[
        styles.changeIndicator,
        { backgroundColor: change > 0 ? '#dcfce7' : '#fee2e2' }
      ]}>
        <Text style={[
          styles.changeText,
          { color: change > 0 ? '#16a34a' : '#dc2626' }
        ]}>
          {change > 0 ? '+' : ''}{change}
        </Text>
      </View>
    );
  };

  const formatValue = (value: number, category: string) => {
    switch (category) {
      case 'xp':
        return `${value} XP`;
      case 'jobs':
        return `${value} jobs`;
      case 'earnings':
        return `$${value}`;
      case 'speed':
        return `${value}h avg`;
      default:
        return value.toString();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Period Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Period</Text>
        <View style={styles.selector}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[
                styles.selectorOption,
                period === p.key && styles.selectorOptionActive,
              ]}
              onPress={() => onPeriodChange(p.key as any)}
            >
              <Text
                style={[
                  styles.selectorOptionText,
                  period === p.key && styles.selectorOptionTextActive,
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Category Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Category</Text>
        <View style={styles.categorySelector}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.categoryOption,
                category === c.key && styles.categoryOptionActive,
              ]}
              onPress={() => onCategoryChange(c.key as any)}
            >
              {c.icon}
              <Text
                style={[
                  styles.categoryOptionText,
                  category === c.key && styles.categoryOptionTextActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Leaderboard */}
      <View style={styles.leaderboard}>
        <View style={styles.leaderboardHeader}>
          <Trophy color="#f59e0b" size={24} />
          <Text style={styles.leaderboardTitle}>
            {period.charAt(0).toUpperCase() + period.slice(1)} {categories.find(c => c.key === category)?.label} Leaders
          </Text>
        </View>

        {leaderboardData.map((entry, index) => (
          <View
            key={entry.id}
            style={[
              styles.leaderboardEntry,
              entry.isCurrentUser && styles.currentUserEntry,
              index === 0 && styles.firstPlace,
            ]}
          >
            <View style={styles.entryLeft}>
              <View style={styles.rankContainer}>
                {getRankIcon(entry.rank)}
                {getChangeIndicator(entry.change)}
              </View>
              
              <Image source={{ uri: entry.avatar }} style={styles.avatar} />
              
              <View style={styles.userInfo}>
                <Text style={[
                  styles.userName,
                  entry.isCurrentUser && styles.currentUserName
                ]}>
                  {entry.name}
                </Text>
                <Text style={styles.userTrade}>{entry.trade}</Text>
                <Text style={styles.userLevel}>Level {entry.level}</Text>
              </View>
            </View>

            <View style={styles.entryRight}>
              <Text style={[
                styles.entryValue,
                entry.isCurrentUser && styles.currentUserValue
              ]}>
                {formatValue(entry.value, category)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Your Stats */}
      <View style={styles.yourStats}>
        <Text style={styles.yourStatsTitle}>Your Performance</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3rd</Text>
            <Text style={styles.statLabel}>Current Rank</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>-1</Text>
            <Text style={styles.statLabel}>Change</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,450</Text>
            <Text style={styles.statLabel}>Your {categories.find(c => c.key === category)?.label}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  selectorContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  selector: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  selectorOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectorOptionActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  selectorOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectorOptionTextActive: {
    color: '#1e293b',
  },
  categorySelector: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    gap: 6,
  },
  categoryOptionActive: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  categoryOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryOptionTextActive: {
    color: '#2563eb',
  },
  leaderboard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  leaderboardEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  currentUserEntry: {
    backgroundColor: '#eff6ff',
  },
  firstPlace: {
    backgroundColor: '#fefce8',
  },
  entryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  changeIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  currentUserName: {
    color: '#2563eb',
  },
  userTrade: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  userLevel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  entryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  currentUserValue: {
    color: '#2563eb',
  },
  yourStats: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  yourStatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});