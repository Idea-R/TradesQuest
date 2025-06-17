import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Clock, Target, Trophy, Calendar, CircleCheck as CheckCircle2, TrendingUp, Star, Wrench } from 'lucide-react-native';
import { CommissionTracker } from '@/components/CommissionTracker';
import { useAppStore } from '@/stores/useAppStore';
import { router } from 'expo-router';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
          {icon}
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );
}

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
}

function LevelProgress({ currentLevel, currentXP, nextLevelXP, totalXP }: LevelProgressProps) {
  const progress = (currentXP / nextLevelXP) * 100;
  
  return (
    <View style={styles.levelCard}>
      <View style={styles.levelHeader}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelNumber}>{currentLevel}</Text>
        </View>
        <View style={styles.levelInfo}>
          <Text style={styles.levelTitle}>Senior Technician</Text>
          <Text style={styles.levelSubtitle}>{totalXP.toLocaleString()} total XP</Text>
        </View>
        <Star color="#fbbf24" size={24} fill="#fbbf24" />
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentXP}/{nextLevelXP} XP to next level
        </Text>
      </View>
    </View>
  );
}

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

function QuickAction({ title, icon, color, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        {icon}
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const { 
    user, 
    jobs, 
    commissionData, 
    activeTimer,
    addJobRevenue,
    isSetupComplete,
    dailyGoals,
    companySettings
  } = useAppStore();

  // Redirect to setup if not complete
  useEffect(() => {
    if (!isSetupComplete) {
      router.replace('/(tabs)/setup');
    }
  }, [isSetupComplete]);

  // Default user data if not set
  const currentUser = user || {
    name: 'Alex Johnson',
    level: 12,
    currentXP: 1450,
    totalXP: 18650,
    trade: {
      name: 'HVAC Technician',
      color: '#16a34a',
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-job':
        router.push('/(tabs)/jobs');
        break;
      case 'schedule':
        // Navigate to schedule view
        break;
      case 'achievements':
        router.push('/(tabs)/progress');
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  const handleAddJob = (isEmergency: boolean) => {
    // This would typically open a job creation modal
    // For now, we'll just simulate adding revenue
    const baseAmount = isEmergency ? 250 : 180;
    // addJobRevenue would need a job object, so this is simplified
    console.log(`Adding ${isEmergency ? 'emergency' : 'regular'} job: $${baseAmount}`);
  };

  // Calculate today's stats
  const today = new Date().toDateString();
  const todayJobs = jobs.filter(job => {
    const jobDate = job.endTime ? new Date(job.endTime).toDateString() : null;
    return job.status === 'completed' && jobDate === today;
  });

  const todayXP = todayJobs.reduce((total, job) => total + job.xpReward, 0);
  const todayHours = todayJobs.reduce((total, job) => {
    if (job.actualDuration) {
      return total + (job.actualDuration / (1000 * 60 * 60)); // Convert ms to hours
    }
    return total;
  }, 0);

  const todayRevenue = todayJobs.reduce((total, job) => total + job.totalCost, 0);

  // Calculate progress towards daily goals
  const jobProgress = dailyGoals ? (todayJobs.length / dailyGoals.jobsPerDay) * 100 : 0;
  const revenueProgress = dailyGoals ? (todayRevenue / dailyGoals.revenuePerDay) * 100 : 0;
  const xpProgress = dailyGoals ? (todayXP / dailyGoals.xpPerDay) * 100 : 0;

  if (!isSetupComplete) {
    return null; // Will redirect to setup
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser.name}</Text>
              <View style={styles.tradeInfo}>
                <Wrench color={currentUser.trade.color} size={20} />
                <Text style={[styles.tradeName, { color: currentUser.trade.color }]}>
                  {currentUser.trade.name}
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop' }}
            style={styles.avatar}
          />
        </View>

        {/* Level Progress */}
        <LevelProgress
          currentLevel={currentUser.level}
          currentXP={currentUser.currentXP}
          nextLevelXP={2000}
          totalXP={currentUser.totalXP}
        />

        {/* Daily Goals Progress */}
        {dailyGoals && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Goals</Text>
            <View style={styles.goalsGrid}>
              <View style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <CheckCircle2 color="#16a34a" size={20} />
                  <Text style={styles.goalTitle}>Jobs</Text>
                </View>
                <Text style={styles.goalValue}>
                  {todayJobs.length} / {dailyGoals.jobsPerDay}
                </Text>
                <View style={styles.goalProgress}>
                  <View style={[styles.goalProgressFill, { 
                    width: `${Math.min(jobProgress, 100)}%`,
                    backgroundColor: jobProgress >= 100 ? '#16a34a' : '#2563eb'
                  }]} />
                </View>
              </View>

              <View style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <Target color="#f59e0b" size={20} />
                  <Text style={styles.goalTitle}>Revenue</Text>
                </View>
                <Text style={styles.goalValue}>
                  ${todayRevenue} / ${dailyGoals.revenuePerDay}
                </Text>
                <View style={styles.goalProgress}>
                  <View style={[styles.goalProgressFill, { 
                    width: `${Math.min(revenueProgress, 100)}%`,
                    backgroundColor: revenueProgress >= 100 ? '#16a34a' : '#f59e0b'
                  }]} />
                </View>
              </View>

              <View style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <Zap color="#7c3aed" size={20} />
                  <Text style={styles.goalTitle}>XP</Text>
                </View>
                <Text style={styles.goalValue}>
                  {todayXP} / {dailyGoals.xpPerDay}
                </Text>
                <View style={styles.goalProgress}>
                  <View style={[styles.goalProgressFill, { 
                    width: `${Math.min(xpProgress, 100)}%`,
                    backgroundColor: xpProgress >= 100 ? '#16a34a' : '#7c3aed'
                  }]} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Commission Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commission Tracker</Text>
          <CommissionTracker
            data={commissionData}
            tradeColor={currentUser.trade.color}
            onAddJob={handleAddJob}
            companySettings={companySettings}
            dailyGoals={dailyGoals}
          />
        </View>

        {/* Daily Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Jobs Completed"
              value={todayJobs.length.toString()}
              icon={<CheckCircle2 color="#16a34a" size={20} />}
              color="#16a34a"
              subtitle={`${jobs.filter(j => j.status === 'in-progress').length} in progress`}
            />
            <StatCard
              title="Hours Worked"
              value={todayHours.toFixed(1)}
              icon={<Clock color="#2563eb" size={20} />}
              color="#2563eb"
              subtitle={activeTimer ? 'Timer running' : 'No active timer'}
            />
            <StatCard
              title="XP Earned"
              value={todayXP.toString()}
              icon={<Zap color="#7c3aed" size={20} />}
              color="#7c3aed"
              subtitle={`Goal: ${dailyGoals?.xpPerDay || 400}`}
            />
            <StatCard
              title="Revenue"
              value={`$${todayRevenue}`}
              icon={<TrendingUp color="#ea580c" size={20} />}
              color="#ea580c"
              subtitle={`Goal: $${dailyGoals?.revenuePerDay || 360}`}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              title="New Job"
              icon={<Target color="#16a34a" size={24} />}
              color="#16a34a"
              onPress={() => handleQuickAction('new-job')}
            />
            <QuickAction
              title="Schedule"
              icon={<Calendar color="#ea580c" size={24} />}
              color="#ea580c"
              onPress={() => handleQuickAction('schedule')}
            />
            <QuickAction
              title="Achievements"
              icon={<Trophy color="#fbbf24" size={24} />}
              color="#fbbf24"
              onPress={() => handleQuickAction('achievements')}
            />
            <QuickAction
              title="Timer"
              icon={<Clock color="#2563eb" size={24} />}
              color="#2563eb"
              onPress={() => handleQuickAction('timer')}
            />
          </View>
        </View>

        {/* Weekly Streak */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Streak</Text>
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <Text style={styles.streakTitle}>5 Day Streak! 🔥</Text>
              <Text style={styles.streakSubtitle}>Keep up the great work</Text>
            </View>
            <View style={styles.streakDays}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <View key={day} style={[
                  styles.streakDay,
                  index < 5 ? styles.streakDayActive : styles.streakDayInactive
                ]}>
                  <Text style={[
                    styles.streakDayText,
                    index < 5 ? styles.streakDayTextActive : styles.streakDayTextInactive
                  ]}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  userInfo: {
    marginTop: 2,
  },
  tradeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tradeName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
  },
  levelCard: {
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
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  levelSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
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
  goalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  goalProgress: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 2,
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
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  streakCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  streakHeader: {
    marginBottom: 16,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  streakSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDayActive: {
    backgroundColor: '#16a34a',
  },
  streakDayInactive: {
    backgroundColor: '#e2e8f0',
  },
  streakDayText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  streakDayTextActive: {
    color: '#ffffff',
  },
  streakDayTextInactive: {
    color: '#64748b',
  },
});