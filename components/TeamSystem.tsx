import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Users, Plus, Hash } from 'lucide-react-native';

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

interface TeamSystemProps {
  onTeamJoined: (team: Team) => void;
  onTeamCreated: (team: Team) => void;
}

export function TeamSystem({ onTeamJoined, onTeamCreated }: TeamSystemProps) {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [inviteCode, setInviteCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('15000');

  const handleJoinTeam = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    // Mock team data for demo
    const mockTeam: Team = {
      id: 'team-1',
      name: 'Elite Builders',
      inviteCode: inviteCode.toUpperCase(),
      adminId: 'user-1',
      members: [
        {
          id: 'user-1',
          name: 'Mike Rodriguez',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          trade: 'Electrician',
          level: 12,
          weeklyXP: 2450,
          weeklyJobs: 8,
          role: 'admin',
          isOnline: true,
        },
        {
          id: 'user-2',
          name: 'Sarah Chen',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          trade: 'Plumber',
          level: 15,
          weeklyXP: 3200,
          weeklyJobs: 12,
          role: 'member',
          isOnline: false,
        },
        {
          id: 'user-3',
          name: 'You',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          trade: 'Carpenter',
          level: 8,
          weeklyXP: 1800,
          weeklyJobs: 6,
          role: 'member',
          isOnline: true,
        },
      ],
      createdAt: new Date().toISOString(),
      weeklyGoal: 15000,
      description: 'A team of skilled tradespeople working together to achieve excellence',
    };

    onTeamJoined(mockTeam);
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name');
      return;
    }

    // Mock team creation
    const newTeam: Team = {
      id: 'team-new',
      name: teamName,
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      adminId: 'current-user',
      members: [
        {
          id: 'current-user',
          name: 'You',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          trade: 'Carpenter',
          level: 8,
          weeklyXP: 0,
          weeklyJobs: 0,
          role: 'admin',
          isOnline: true,
        },
      ],
      createdAt: new Date().toISOString(),
      weeklyGoal: parseInt(weeklyGoal) || 15000,
      description: teamDescription || 'A new team ready to take on challenges',
    };

    onTeamCreated(newTeam);
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'join' && styles.tabActive]}
          onPress={() => setActiveTab('join')}
        >
          <Users color={activeTab === 'join' ? '#2563eb' : '#64748b'} size={20} />
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

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'join' ? (
          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Hash color="#2563eb" size={32} />
            </View>
            <Text style={styles.title}>Join a Team</Text>
            <Text style={styles.subtitle}>
              Enter the invite code shared by your team leader
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter invite code"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
              maxLength={8}
            />
            
            <TouchableOpacity style={styles.primaryButton} onPress={handleJoinTeam}>
              <Text style={styles.primaryButtonText}>Join Team</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Plus color="#16a34a" size={32} />
            </View>
            <Text style={styles.title}>Create a Team</Text>
            <Text style={styles.subtitle}>
              Start your own team and invite others to join
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Team name"
              value={teamName}
              onChangeText={setTeamName}
              maxLength={30}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Team description (optional)"
              value={teamDescription}
              onChangeText={setTeamDescription}
              multiline
              numberOfLines={3}
              maxLength={150}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Weekly XP goal"
              value={weeklyGoal}
              onChangeText={setWeeklyGoal}
              keyboardType="numeric"
            />
            
            <TouchableOpacity style={styles.primaryButton} onPress={handleCreateTeam}>
              <Text style={styles.primaryButtonText}>Create Team</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
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
    color: '#2563eb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});