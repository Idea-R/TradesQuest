import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Users, Plus, Hash, Crown, UserPlus } from 'lucide-react-native';

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

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  trade: string;
  level: number;
  weeklyXP: number;
  weeklyJobs: number;
  role: 'admin' | 'member';
  isOnline: boolean;
}

interface TeamSystemProps {
  onTeamJoined: (team: Team) => void;
  onTeamCreated: (team: Team) => void;
}

export function TeamSystem({ onTeamJoined, onTeamCreated }: TeamSystemProps) {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [joinCode, setJoinCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('15000');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinTeam = async () => {
    if (!joinCode.trim()) {
      Alert.alert('Error', 'Please enter a team code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock team data
      const mockTeam: Team = {
        id: 'team-' + Date.now(),
        name: 'Elite HVAC Crew',
        inviteCode: joinCode.toUpperCase(),
        adminId: 'admin-123',
        createdAt: new Date().toISOString(),
        weeklyGoal: 15000,
        description: 'Professional HVAC technicians working together',
        members: [
          {
            id: 'member-1',
            name: 'Mike Rodriguez',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
            trade: 'HVAC Technician',
            level: 15,
            weeklyXP: 2450,
            weeklyJobs: 12,
            role: 'admin',
            isOnline: true,
          },
          {
            id: 'member-2',
            name: 'Sarah Chen',
            avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
            trade: 'Electrical Technician',
            level: 12,
            weeklyXP: 1890,
            weeklyJobs: 8,
            role: 'member',
            isOnline: false,
          },
          {
            id: 'member-3',
            name: 'You',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
            trade: 'HVAC Technician',
            level: 12,
            weeklyXP: 1450,
            weeklyJobs: 6,
            role: 'member',
            isOnline: true,
          },
        ],
      };

      setIsLoading(false);
      onTeamJoined(mockTeam);
    }, 1500);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockTeam: Team = {
        id: 'team-' + Date.now(),
        name: teamName,
        inviteCode: generateInviteCode(),
        adminId: 'current-user',
        createdAt: new Date().toISOString(),
        weeklyGoal: parseInt(weeklyGoal) || 15000,
        description: teamDescription,
        members: [
          {
            id: 'current-user',
            name: 'You',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
            trade: 'HVAC Technician',
            level: 12,
            weeklyXP: 1450,
            weeklyJobs: 6,
            role: 'admin',
            isOnline: true,
          },
        ],
      };

      setIsLoading(false);
      onTeamCreated(mockTeam);
    }, 1500);
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Users color="#2563eb" size={32} />
        </View>
        <Text style={styles.title}>Join a Team</Text>
        <Text style={styles.subtitle}>
          Connect with other technicians, compete on leaderboards, and achieve goals together
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'join' && styles.tabActive]}
          onPress={() => setActiveTab('join')}
        >
          <UserPlus color={activeTab === 'join' ? '#2563eb' : '#64748b'} size={20} />
          <Text style={[styles.tabText, activeTab === 'join' && styles.tabTextActive]}>
            Join Team
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'create' && styles.tabActive]}
          onPress={() => setActiveTab('create')}
        >
          <Plus color={activeTab === 'create' ? '#2563eb' : '#64748b'} size={20} />
          <Text style={[styles.tabText, activeTab === 'create' && styles.tabTextActive]}>
            Create Team
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'join' ? (
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Team Invite Code</Text>
            <View style={styles.inputContainer}>
              <Hash color="#64748b" size={20} />
              <TextInput
                style={styles.input}
                value={joinCode}
                onChangeText={setJoinCode}
                placeholder="Enter 6-character code"
                placeholderTextColor="#94a3b8"
                autoCapitalize="characters"
                maxLength={6}
              />
            </View>
            <Text style={styles.inputHint}>
              Ask your team admin for the invite code
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleJoinTeam}
            disabled={isLoading}
          >
            <Text style={styles.primaryButtonText}>
              {isLoading ? 'Joining...' : 'Join Team'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Team Name</Text>
            <TextInput
              style={styles.textInput}
              value={teamName}
              onChangeText={setTeamName}
              placeholder="Enter team name"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={teamDescription}
              onChangeText={setTeamDescription}
              placeholder="Describe your team..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weekly XP Goal</Text>
            <TextInput
              style={styles.textInput}
              value={weeklyGoal}
              onChangeText={setWeeklyGoal}
              placeholder="15000"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>
              Set a challenging but achievable goal for your team
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleCreateTeam}
            disabled={isLoading}
          >
            <Crown color="#ffffff" size={20} />
            <Text style={styles.primaryButtonText}>
              {isLoading ? 'Creating...' : 'Create Team'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.benefits}>
        <Text style={styles.benefitsTitle}>Team Benefits</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Users color="#16a34a" size={16} />
            </View>
            <Text style={styles.benefitText}>Compete with colleagues</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Trophy color="#f59e0b" size={16} />
            </View>
            <Text style={styles.benefitText}>Weekly leaderboards</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Target color="#2563eb" size={16} />
            </View>
            <Text style={styles.benefitText}>Shared goals & achievements</Text>
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
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#2563eb',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  benefits: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 16,
    color: '#64748b',
  },
});