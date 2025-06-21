import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Medal, Award, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react-native';

interface LeaderboardProps {
  period: 'daily' | 'weekly' | 'monthly';
  category: 'xp' | 'jobs' | 'earnings' | 'speed';
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly') => void;
  onCategoryChange: (category: 'xp' | 'jobs' | 'earnings' | 'speed') => void;
}

export function Leaderboard({ period, category, onPeriodChange, onCategoryChange }: LeaderboardProps) {
  const periods = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  const categories = [
    { key: 'xp', label: 'XP', icon: <TrendingUp size={16} /> },
    { key: 'jobs', label: 'Jobs', icon: <Award size={16} /> },
    { key: 'earnings', label: 'Earnings', icon: <DollarSign size={16} /> },
    { key: 'speed', label: 'Speed', icon: <Zap size={16} /> },
  ];

  // Mock leaderboard data
  const leaderboardData = [
    {
      id: '1',
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      trade: 'Electrician',
      value: category === 'xp' ? 3450 : category === 'jobs' ? 15 : category === 'earnings' ? 2850 : 4.2,
      change: '+12%',
      isUp: true,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      trade: 'Plumber',
      value: category === 'xp' ? 3200 : category === 'jobs' ? 14 : category === 'earnings' ? 2650 : 3.8,
      change: '+8%',
      isUp: true,
    },
    {
      id: '3',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      trade: 'Carpenter',
      value: category === 'xp' ? 2800 : category === 'jobs' ? 12 : category === 'earnings' ? 2200 : 3.5,
      change: '+15%',
      isUp: true,
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      trade: 'HVAC Tech',
      value: category === 'xp' ? 2650 : category === 'jobs' ? 11 : category === 'earnings' ? 2100 : 3.2,
      change: '-3%',
      isUp: false,
    },
    {
      id: '5',
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      trade: 'Painter',
      value: category === 'xp' ? 2400 : category === 'jobs' ? 10 : category === 'earnings' ? 1950 : 2.9,
      change: '+5%',
      isUp: true,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy color="#f59e0b" size={20} fill="#f59e0b" />;
      case 2:
        return <Medal color="#94a3b8" size={20} fill="#94a3b8" />;
      case 3:
        return <Award color="#cd7c2f" size={20} fill="#cd7c2f" />;
      default:
        return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const formatValue = (value: number) => {
    if (category === 'earnings') {
      return `$${value.toLocaleString()}`;
    } else if (category === 'speed') {
      return `${value}h avg`;
    } else {
      return value.toLocaleString();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Period Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.selectorRow}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[
                styles.selectorButton,
                period === p.key && styles.selectorButtonActive,
              ]}
              onPress={() => onPeriodChange(p.key as any)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  period === p.key && styles.selectorButtonTextActive,
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
        <View style={styles.selectorRow}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.categoryButton,
                category === c.key && styles.categoryButtonActive,
              ]}
              onPress={() => onCategoryChange(c.key as any)}
            >
              {React.cloneElement(c.icon, {
                color: category === c.key ? '#2563eb' : '#64748b',
              })}
              <Text
                style={[
                  styles.categoryButtonText,
                  category === c.key && styles.categoryButtonTextActive,
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
        <Text style={styles.leaderboardTitle}>Team Rankings</Text>
        
        {leaderboardData.map((player, index) => (
          <View key={player.id} style={styles.playerCard}>
            <View style={styles.rankContainer}>
              {getRankIcon(index + 1)}
            </View>
            
            <Image source={{ uri: player.avatar }} style={styles.playerAvatar} />
            
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerTrade}>{player.trade}</Text>
            </View>
            
            <View style={styles.playerStats}>
              <Text style={styles.playerValue}>{formatValue(player.value)}</Text>
              <Text style={[
                styles.playerChange,
                { color: player.isUp ? '#16a34a' : '#dc2626' }
              ]}>
                {player.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Your Rank */}
      <View style={styles.yourRank}>
        <Text style={styles.yourRankTitle}>Your Position</Text>
        <View style={styles.yourRankCard}>
          <View style={styles.yourRankInfo}>
            <Text style={styles.yourRankPosition}>#3</Text>
            <View>
              <Text style={styles.yourRankName}>You</Text>
              <Text style={styles.yourRankTrade}>Carpenter</Text>
            </View>
          </View>
          <Text style={styles.yourRankValue}>{formatValue(2800)}</Text>
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
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#2563eb',
  },
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectorButtonTextActive: {
    color: '#ffffff',
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f8fafc',
    gap: 4,
  },
  categoryButtonActive: {
    backgroundColor: '#eff6ff',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryButtonTextActive: {
    color: '#2563eb',
  },
  leaderboard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  playerTrade: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  playerStats: {
    alignItems: 'flex-end',
  },
  playerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  playerChange: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  yourRank: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  yourRankTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
  },
  yourRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  yourRankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yourRankPosition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 16,
  },
  yourRankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  yourRankTrade: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  yourRankValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});