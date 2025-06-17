import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { Users, Crown, Trophy, Star, Plus, Copy, Share, MessageCircle, Target, TrendingUp, Award } from 'lucide-react-native';
import { useAppStore } from '@/stores/useAppStore';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  level: number;
  weeklyXP: number;
  weeklyJobs: number;
  weeklyEarnings: number;
  isOnline: boolean;
  trade: string;
}

interface Team {
  id: string;
  name: string;
  inviteCode: string;
  adminId: string;
  members: TeamMember[];
  createdAt: string;
  weeklyGoal: number;
  description: string;
}

interface TeamSystemProps {
  onTeamJoined?: (team: Team) => void;
  onTeamCreated?: (team: Team) => void;
}

export function TeamSystem({ onTeamJoined, onTeamCreated }: TeamSystemProps) {
  const [activeTab, setActiveTab] = useState<'join' | 'create' | 'browse'>('join');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAppStore();

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTeam: Team = {
        id: Math.random().toString(36).substr(2, 9),
        name: teamName,
        inviteCode: generateInviteCode(),
        adminId: user?.id || 'current-user',
        members: [{
          id: user?.id || 'current-user',
          name: user?.name || 'You',
          avatar: user?.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          role: 'admin',
          level: user?.level || 1,
          weeklyXP: 1250,
          weeklyJobs: 8,
          weeklyEarnings: 1840,
          isOnline: true,
          trade: user?.trade?.name || 'HVAC Technician'
        }],
        createdAt: new Date().toISOString(),
        weeklyGoal: 10000,
        description: teamDescription
      };

      setIsLoading(false);
      onTeamCreated?.(newTeam);
      Alert.alert('Success', `Team "${teamName}" created! Invite code: ${newTeam.inviteCode}`);
    }, 1500);
  };

  const handleJoinTeam = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock team data
      const mockTeam: Team = {
        id: 'team-123',
        name: 'Elite HVAC Squad',
        inviteCode: inviteCode.toUpperCase(),
        adminId: 'admin-user',
        members: [
          {
            id: 'admin-user',
            name: 'Mike Rodriguez',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'admin',
            level: 15,
            weeklyXP: 2100,
            weeklyJobs: 12,
            weeklyEarnings: 2650,
            isOnline: true,
            trade: 'HVAC Technician'
          },
          {
            id: 'member-1',
            name: 'Sarah Chen',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'member',
            level: 12,
            weeklyXP: 1850,
            weeklyJobs: 10,
            weeklyEarnings: 2200,
            isOnline: false,
            trade: 'Electrician'
          },
          {
            id: user?.id || 'current-user',
            name: user?.name || 'You',
            avatar: user?.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'member',
            level: user?.level || 1,
            weeklyXP: 1250,
            weeklyJobs: 8,
            weeklyEarnings: 1840,
            isOnline: true,
            trade: user?.trade?.name || 'HVAC Technician'
          }
        ],
        createdAt: '2024-01-15T10:00:00Z',
        weeklyGoal: 15000,
        description: 'Professional HVAC technicians working together to achieve excellence'
      };

      setIsLoading(false);
      onTeamJoined?.(mockTeam);
      Alert.alert('Success', `Joined team "${mockTeam.name}"!`);
    }, 1500);
  };

  const copyInviteCode = (code: string) => {
    // In a real app, this would copy to clipboard
    Alert.alert('Copied!', `Invite code ${code} copied to clipboard`);
  };

  const shareTeam = (team: Team) => {
    Alert.alert('Share Team', `Share invite code: ${team.inviteCode}`);
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { key: 'join', label: 'Join Team', icon: <Users color="#2563eb" size={20} /> },
          { key: 'create', label: 'Create Team', icon: <Plus color="#16a34a" size={20} /> },
          { key: 'browse', label: 'Browse Teams', icon: <Trophy color="#f59e0b" size={20} /> }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.tabActive
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            {tab.icon}
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.tabTextActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Join Team */}
        {activeTab === 'join' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users color="#2563eb" size={24} />
              <Text style={styles.sectionTitle}>Join a Team</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Enter an invite code to join an existing team and start collaborating with other technicians.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Invite Code</Text>
              <TextInput
                style={styles.textInput}
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholder="Enter 6-character code"
                placeholderTextColor="#94a3b8"
                autoCapitalize="characters"
                maxLength={6}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: '#2563eb' },
                (!inviteCode.trim() || isLoading) && styles.buttonDisabled
              ]}
              onPress={handleJoinTeam}
              disabled={!inviteCode.trim() || isLoading}
            >
              <Users color="#ffffff" size={20} />
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Joining...' : 'Join Team'}
              </Text>
            </TouchableOpacity>

            <View style={styles.benefitsCard}>
              <Text style={styles.benefitsTitle}>Team Benefits</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Trophy color="#f59e0b" size={16} />
                  <Text style={styles.benefitText}>Compete on leaderboards</Text>
                </View>
                <View style={styles.benefitItem}>
                  <MessageCircle color="#7c3aed" size={16} />
                  <Text style={styles.benefitText}>Team chat and collaboration</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Target color="#16a34a" size={16} />
                  <Text style={styles.benefitText}>Shared goals and challenges</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Create Team */}
        {activeTab === 'create' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Plus color="#16a34a" size={24} />
              <Text style={styles.sectionTitle}>Create Your Team</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Start your own team and invite other technicians to join your quest for excellence.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Team Name</Text>
              <TextInput
                style={styles.textInput}
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
                placeholderTextColor="#94a3b8"
                maxLength={30}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={teamDescription}
                onChangeText={setTeamDescription}
                placeholder="Describe your team's goals and culture"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                maxLength={150}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: '#16a34a' },
                (!teamName.trim() || isLoading) && styles.buttonDisabled
              ]}
              onPress={handleCreateTeam}
              disabled={!teamName.trim() || isLoading}
            >
              <Crown color="#ffffff" size={20} />
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Creating...' : 'Create Team'}
              </Text>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>As Team Admin, you can:</Text>
              <View style={styles.infoList}>
                <Text style={styles.infoItem}>• Manage team members and settings</Text>
                <Text style={styles.infoItem}>• Set team goals and challenges</Text>
                <Text style={styles.infoItem}>• View detailed team analytics</Text>
                <Text style={styles.infoItem}>• Generate and share invite codes</Text>
              </View>
            </View>
          </View>
        )}

        {/* Browse Teams */}
        {activeTab === 'browse' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Trophy color="#f59e0b" size={24} />
              <Text style={styles.sectionTitle}>Featured Teams</Text>
            </View>
            <Text style={styles.sectionDescription}>
              Discover top-performing teams in your area and request to join.
            </Text>

            {/* Featured Teams List */}
            {[
              {
                name: 'Elite HVAC Squad',
                members: 8,
                avgLevel: 14,
                weeklyXP: 18500,
                location: 'San Francisco, CA',
                description: 'Professional HVAC technicians focused on excellence',
                isPublic: true
              },
              {
                name: 'Lightning Electricians',
                members: 12,
                avgLevel: 11,
                weeklyXP: 22100,
                location: 'Austin, TX',
                description: 'Fast and efficient electrical service team',
                isPublic: true
              },
              {
                name: 'Pipe Masters',
                members: 6,
                avgLevel: 16,
                weeklyXP: 15800,
                location: 'Denver, CO',
                description: 'Expert plumbers tackling the toughest jobs',
                isPublic: false
              }
            ].map((team, index) => (
              <View key={index} style={styles.teamCard}>
                <View style={styles.teamHeader}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <View style={styles.teamBadge}>
                    <Star color="#f59e0b" size={16} fill="#f59e0b" />
                    <Text style={styles.teamLevel}>Lv. {team.avgLevel}</Text>
                  </View>
                </View>
                
                <Text style={styles.teamDescription}>{team.description}</Text>
                <Text style={styles.teamLocation}>{team.location}</Text>
                
                <View style={styles.teamStats}>
                  <View style={styles.teamStat}>
                    <Users color="#64748b" size={16} />
                    <Text style={styles.teamStatText}>{team.members} members</Text>
                  </View>
                  <View style={styles.teamStat}>
                    <TrendingUp color="#64748b" size={16} />
                    <Text style={styles.teamStatText}>{team.weeklyXP.toLocaleString()} XP/week</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    !team.isPublic && styles.buttonDisabled
                  ]}
                  disabled={!team.isPublic}
                >
                  <Text style={styles.secondaryButtonText}>
                    {team.isPublic ? 'Request to Join' : 'Private Team'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#f1f5f9',
  },
  tabText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  tabTextActive: {
    color: '#0f172a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  benefitsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  infoList: {
    gap: 6,
  },
  infoItem: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'Inter-Regular',
  },
  teamCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  teamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  teamLevel: {
    fontSize: 12,
    color: '#f59e0b',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  teamDescription: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  teamLocation: {
    fontSize: 12,
    color: '#94a3b8',
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teamStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamStatText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
});