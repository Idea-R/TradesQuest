import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Crown, Medal, Star, TrendingUp, Zap, Target, Clock } from 'lucide-react-native';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  change: number; // Position change from last period
  level: number;
  trade: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  period: 'daily' | 'weekly' | 'monthly';
  category: 'xp' | 'jobs' | 'earnings' | 'speed';
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly') => void;
  onCategoryChange: (category: 'xp' | 'jobs' | 'earnings' | 'speed') => void;
}

export function Leaderboard({ period, category, onPeriodChange, onCategoryChange }: LeaderboardProps) {
  const [showFullList, setShowFullList] = useState(false);

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 1,
      score: category === 'xp' ? 2850 : category === 'jobs' ? 15 : category === 'earnings' ? 3200 : 4.2,
      change: 2,
      level: 18,
      trade: 'HVAC Technician'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 2,
      score: category === 'xp' ? 2650 : category === 'jobs' ? 14 : category === 'earnings' ? 2950 : 3.8,
      change: -1,
      level: 16,
      trade: 'Electrician'
    },
    {
      id: '3',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 3,
      score: category === 'xp' ? 2400 : category === 'jobs' ? 12 : category === 'earnings' ? 2750 : 3.5,
      change: 1,
      level: 14,
      trade: 'Plumber',
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 4,
      score: category === 'xp' ? 2200 : category === 'jobs' ? 11 : category === 'earnings' ? 2500 : 3.2,
      change: 0,
      level: 13,
      trade: 'Appliance Repair'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 5,
      score: category === 'xp' ? 2100 : category === 'jobs' ? 10 : category === 'earnings' ? 2400 : 3.0,
      change: 3,
      level: 12,
      trade: 'HVAC Technician'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown color="#fbbf24" size={24} fill="#fbbf24" />;
      case 2:
        return <Medal color="#94a3b8" size={24} />;
      case 3:
        return <Medal color="#cd7c2f" size={24} />;
      default:
        return (
          <View style={styles.rankNumber}>
            <Text style={styles.rankNumberText}>{rank}</Text>
          </View>
        );
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'xp':
        return <Zap color="#7c3aed" size={20} />;
      case 'jobs':
        return <Target color="#16a34a" size={20} />;
      case 'earnings':
        return <TrendingUp color="#f59e0b" size={20} />;
      case 'speed':
        return <Clock color="#2563eb" size={20} />;
      default:
        return <Trophy color="#64748b" size={20} />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'xp':
        return 'XP Points';
      case 'jobs':
        return 'Jobs Completed';
      case 'earnings':
        return 'Earnings ($)';
      case 'speed':
        return 'Avg Hours/Job';
      default:
        return 'Score';
    }
  };

  const formatScore = (score: number, cat: string) => {
    switch (cat) {
      case 'xp':
        return score.toLocaleString();
      case 'jobs':
        return score.toString();
      case 'earnings':
        return `$${score.toLocaleString()}`;
      case 'speed':
        return `${score.toFixed(1)}h`;
      default:
        return score.toString();
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <View style={[styles.changeIndicator, styles.changeUp]}>
          <Text style={styles.changeText}>+{change}</Text>
        </View>
      );
    } else if (change < 0) {
      return (
        <View style={[styles.changeIndicator, styles.changeDown]}>
          <Text style={styles.changeText}>{change}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.changeIndicator, styles.changeNeutral]}>
          <Text style={styles.changeText}>-</Text>
        </View>
      );
    }
  };

  const displayedData = showFullList ? leaderboardData : leaderboardData.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Trophy color="#f59e0b" size={24} />
          <Text style={styles.headerTitle}>Leaderboard</Text>
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Period:</Text>
        <View style={styles.selectorButtons}>
          {['daily', 'weekly', 'monthly'].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.selectorButton,
                period === p && styles.selectorButtonActive
              ]}
              onPress={() => onPeriodChange(p as any)}
            >
              <Text style={[
                styles.selectorButtonText,
                period === p && styles.selectorButtonTextActive
              ]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Category Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.selectorButtons}>
            {['xp', 'jobs', 'earnings', 'speed'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive
                ]}
                onPress={() => onCategoryChange(cat as any)}
              >
                {getCategoryIcon(cat)}
                <Text style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextActive
                ]}>
                  {getCategoryLabel(cat)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Podium for Top 3 */}
      <View style={styles.podiumContainer}>
        <View style={styles.podium}>
          {/* 2nd Place */}
          <View style={[styles.podiumPosition, styles.secondPlace]}>
            <Image source={{ uri: leaderboardData[1].avatar }} style={styles.podiumAvatar} />
            <View style={styles.podiumRank}>
              <Medal color="#94a3b8" size={20} />
            </View>
            <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
            <Text style={styles.podiumScore}>
              {formatScore(leaderboardData[1].score, category)}
            </Text>
          </View>

          {/* 1st Place */}
          <View style={[styles.podiumPosition, styles.firstPlace]}>
            <Image source={{ uri: leaderboardData[0].avatar }} style={styles.podiumAvatar} />
            <View style={styles.podiumRank}>
              <Crown color="#fbbf24" size={24} fill="#fbbf24" />
            </View>
            <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
            <Text style={styles.podiumScore}>
              {formatScore(leaderboardData[0].score, category)}
            </Text>
          </View>

          {/* 3rd Place */}
          <View style={[styles.podiumPosition, styles.thirdPlace]}>
            <Image source={{ uri: leaderboardData[2].avatar }} style={styles.podiumAvatar} />
            <View style={styles.podiumRank}>
              <Medal color="#cd7c2f" size={20} />
            </View>
            <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
            <Text style={styles.podiumScore}>
              {formatScore(leaderboardData[2].score, category)}
            </Text>
          </View>
        </View>
      </View>

      {/* Full Leaderboard List */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Full Rankings</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowFullList(!showFullList)}
          >
            <Text style={styles.toggleButtonText}>
              {showFullList ? 'Show Less' : 'Show All'}
            </Text>
          </TouchableOpacity>
        </View>

        {displayedData.map((entry, index) => (
          <View
            key={entry.id}
            style={[
              styles.listItem,
              entry.isCurrentUser && styles.currentUserItem
            ]}
          >
            <View style={styles.listItemLeft}>
              <View style={styles.rankContainer}>
                {getRankIcon(entry.rank)}
              </View>
              <Image source={{ uri: entry.avatar }} style={styles.listAvatar} />
              <View style={styles.listInfo}>
                <Text style={[
                  styles.listName,
                  entry.isCurrentUser && styles.currentUserText
                ]}>
                  {entry.name} {entry.isCurrentUser && '(You)'}
                </Text>
                <Text style={styles.listTrade}>{entry.trade}</Text>
              </View>
            </View>

            <View style={styles.listItemRight}>
              <Text style={styles.listScore}>
                {formatScore(entry.score, category)}
              </Text>
              <View style={styles.listMeta}>
                <Text style={styles.listLevel}>Lv. {entry.level}</Text>
                {getChangeIndicator(entry.change)}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  selectorButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  selectorButtonActive: {
    backgroundColor: '#2563eb',
  },
  selectorButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  selectorButtonTextActive: {
    color: '#ffffff',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#7c3aed',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  podiumContainer: {
    marginVertical: 24,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
  },
  podiumPosition: {
    alignItems: 'center',
    marginHorizontal: 8,
    position: 'relative',
  },
  firstPlace: {
    marginBottom: 0,
  },
  secondPlace: {
    marginBottom: 20,
  },
  thirdPlace: {
    marginBottom: 40,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  podiumRank: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7c3aed',
    fontFamily: 'Inter-Bold',
  },
  listContainer: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  toggleButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  currentUserItem: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
    marginVertical: 2,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    fontFamily: 'Inter-SemiBold',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  currentUserText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  listTrade: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  listItemRight: {
    alignItems: 'flex-end',
  },
  listScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  listLevel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginRight: 8,
  },
  changeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  changeUp: {
    backgroundColor: '#dcfce7',
  },
  changeDown: {
    backgroundColor: '#fef2f2',
  },
  changeNeutral: {
    backgroundColor: '#f1f5f9',
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});