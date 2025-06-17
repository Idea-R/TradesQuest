import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Trophy, MessageCircle, Settings, Crown, Star, TrendingUp, Target, Plus } from 'lucide-react-native';
import { TeamSystem } from '@/components/TeamSystem';
import { Leaderboard } from '@/components/Leaderboard';
import { TeamChat } from '@/components/TeamChat';

interface Team {
  id: string;
  name: string;
  inviteCode: string;
  adminId: string;
  members: any[];
  createdAt: string;
  weeklyGoal: number;
  description: string;
}

export default function TeamScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'chat' | 'manage'>('overview');
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [leaderboardCategory, setLeaderboardCategory] = useState<'xp' | 'jobs' | 'earnings' | 'speed'>('xp');

  const handleTeamJoined = (team: Team) => {
    setCurrentTeam(team);
    setActiveTab('overview');
  };

  const handleTeamCreated = (team: Team) => {
    setCurrentTeam(team);
    setActiveTab('overview');
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <Users color="#2563eb" size={20} /> },
    { key: 'leaderboard', label: 'Rankings', icon: <Trophy color="#f59e0b" size={20} /> },
    { key: 'chat', label: 'Chat', icon: <MessageCircle color="#16a34a" size={20} /> },
    { key: 'manage', label: 'Manage', icon: <Settings color="#64748b" size={20} /> },
  ];

  // If no team, show team system
  if (!currentTeam) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Teams</Text>
          <Text style={styles.headerSubtitle}>Join or create a team to get started</Text>
        </View>
        <TeamSystem onTeamJoined={handleTeamJoined} onTeamCreated={handleTeamCreated} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{currentTeam.name}</Text>
          <Text style={styles.headerSubtitle}>
            {currentTeam.members.length} members • {currentTeam.inviteCode}
          </Text>
        </View>
        <TouchableOpacity style={styles.leaveTeamButton}>
          <Text style={styles.leaveTeamText}>Leave</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabRow}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.tabActive,
                ]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                {tab.icon}
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.key && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'overview' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Team Stats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Team Performance</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#16a34a15' }]}>
                    <Target color="#16a34a" size={20} />
                  </View>
                  <Text style={styles.statValue}>47</Text>
                  <Text style={styles.statLabel}>Jobs This Week</Text>
                </View>
                
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#7c3aed15' }]}>
                    <TrendingUp color="#7c3aed" size={20} />
                  </View>
                  <Text style={styles.statValue}>8,450</Text>
                  <Text style={styles.statLabel}>Team XP</Text>
                </View>
                
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#f59e0b15' }]}>
                    <Trophy color="#f59e0b" size={20} />
                  </View>
                  <Text style={styles.statValue}>#3</Text>
                  <Text style={styles.statLabel}>Team Rank</Text>
                </View>
              </View>
            </View>

            {/* Weekly Goal Progress */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Weekly Goal</Text>
              <View style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalTitle}>Team XP Target</Text>
                  <Text style={styles.goalProgress}>8,450 / 15,000 XP</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '56%' }]} />
                </View>
                <Text style={styles.goalSubtitle}>6,550 XP remaining • 3 days left</Text>
              </View>
            </View>

            {/* Team Members */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Team Members</Text>
                <TouchableOpacity style={styles.inviteButton}>
                  <Plus color="#2563eb" size={16} />
                  <Text style={styles.inviteButtonText}>Invite</Text>
                </TouchableOpacity>
              </View>
              
              {currentTeam.members.map((member, index) => (
                <View key={member.id} style={styles.memberCard}>
                  <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                  <View style={styles.memberInfo}>
                    <View style={styles.memberHeader}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      {member.role === 'admin' && (
                        <Crown color="#f59e0b" size={16} fill="#f59e0b" />
                      )}
                      <View style={[
                        styles.onlineIndicator,
                        { backgroundColor: member.isOnline ? '#16a34a' : '#94a3b8' }
                      ]} />
                    </View>
                    <Text style={styles.memberTrade}>{member.trade}</Text>
                    <View style={styles.memberStats}>
                      <Text style={styles.memberStat}>Lv. {member.level}</Text>
                      <Text style={styles.memberStat}>•</Text>
                      <Text style={styles.memberStat}>{member.weeklyXP} XP this week</Text>
                      <Text style={styles.memberStat}>•</Text>
                      <Text style={styles.memberStat}>{member.weeklyJobs} jobs</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Recent Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              {[
                { user: 'Mike Rodriguez', action: 'completed a job', time: '2h ago', xp: '+150 XP' },
                { user: 'Sarah Chen', action: 'achieved Speed Demon badge', time: '4h ago', xp: '+200 XP' },
                { user: 'You', action: 'joined the team', time: '6h ago', xp: '+50 XP' },
              ].map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityText}>
                      <Text style={styles.activityUser}>{activity.user}</Text> {activity.action}
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                  <Text style={styles.activityXP}>{activity.xp}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard 
            period={leaderboardPeriod}
            category={leaderboardCategory}
            onPeriodChange={setLeaderboardPeriod}
            onCategoryChange={setLeaderboardCategory}
          />
        )}

        {activeTab === 'chat' && (
          <TeamChat teamId={currentTeam.id} />
        )}

        {activeTab === 'manage' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Team Settings</Text>
              <Text style={styles.sectionSubtitle}>Manage your team preferences and settings</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  leaveTeamButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  leaveTeamText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 14,
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#f1f5f9',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#1e293b',
  },
  content: {
    flex: 1,
  },
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  goalCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eff6ff',
    borderRadius: 6,
  },
  inviteButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  memberTrade: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  memberStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberStat: {
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 8,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityXP: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
});