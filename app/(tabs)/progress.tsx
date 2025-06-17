import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Star, Target, TrendingUp, Award, Clock, CircleCheck as CheckCircle2, Zap, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  xpReward: number;
}

interface Skill {
  name: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  color: string;
}

interface WeeklyGoal {
  title: string;
  current: number;
  target: number;
  icon: React.ReactNode;
  color: string;
}

function ProgressBar({ progress, maxProgress, color, height = 8 }: {
  progress: number;
  maxProgress: number;
  color: string;
  height?: number;
}) {
  const percentage = Math.min((progress / maxProgress) * 100, 100);
  
  return (
    <View style={[styles.progressBarContainer, { height }]}>
      <View 
        style={[
          styles.progressBarFill, 
          { width: `${percentage}%`, backgroundColor: color, height }
        ]} 
      />
    </View>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <View style={[
      styles.achievementCard,
      achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked
    ]}>
      <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
        {achievement.icon}
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          !achievement.unlocked && styles.achievementTitleLocked
        ]}>
          {achievement.title}
        </Text>
        <Text style={styles.achievementDescription}>
          {achievement.description}
        </Text>
        <View style={styles.achievementProgress}>
          <ProgressBar
            progress={achievement.progress}
            maxProgress={achievement.maxProgress}
            color={achievement.unlocked ? achievement.color : '#e2e8f0'}
          />
          <Text style={styles.achievementProgressText}>
            {achievement.progress}/{achievement.maxProgress}
          </Text>
        </View>
      </View>
      <View style={styles.achievementReward}>
        <Text style={styles.xpRewardText}>+{achievement.xpReward}</Text>
        <Text style={styles.xpLabel}>XP</Text>
      </View>
    </View>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const progress = (skill.currentXP / skill.nextLevelXP) * 100;
  
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <View style={styles.skillLevel}>
          <Text style={styles.skillLevelText}>Lv. {skill.level}</Text>
        </View>
      </View>
      <View style={styles.skillProgress}>
        <ProgressBar
          progress={skill.currentXP}
          maxProgress={skill.nextLevelXP}
          color={skill.color}
          height={6}
        />
        <Text style={styles.skillProgressText}>
          {skill.currentXP}/{skill.nextLevelXP} XP
        </Text>
      </View>
    </View>
  );
}

function WeeklyGoalCard({ goal }: { goal: WeeklyGoal }) {
  const progress = (goal.current / goal.target) * 100;
  const isCompleted = goal.current >= goal.target;
  
  return (
    <View style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <View style={[styles.goalIcon, { backgroundColor: goal.color + '15' }]}>
          {goal.icon}
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.goalProgress}>
            {goal.current}/{goal.target}
          </Text>
        </View>
        {isCompleted && (
          <CheckCircle2 color="#16a34a" size={20} />
        )}
      </View>
      <ProgressBar
        progress={goal.current}
        maxProgress={goal.target}
        color={isCompleted ? '#16a34a' : goal.color}
      />
    </View>
  );
}

export default function Progress() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'skills'>('overview');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Speed Demon',
      description: 'Complete 5 jobs in a single day',
      icon: <Zap color="#fbbf24" size={24} />,
      color: '#fbbf24',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      xpReward: 200,
    },
    {
      id: '2',
      title: 'Perfect Week',
      description: 'Complete all scheduled jobs for a week',
      icon: <Trophy color="#16a34a" size={24} />,
      color: '#16a34a',
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      xpReward: 500,
    },
    {
      id: '3',
      title: 'Early Bird',
      description: 'Start 10 jobs ahead of schedule',
      icon: <Clock color="#2563eb" size={24} />,
      color: '#2563eb',
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      xpReward: 300,
    },
    {
      id: '4',
      title: 'Customer Favorite',
      description: 'Receive 25 five-star ratings',
      icon: <Star color="#f59e0b" size={24} />,
      color: '#f59e0b',
      progress: 25,
      maxProgress: 25,
      unlocked: true,
      xpReward: 400,
    },
  ];

  const skills: Skill[] = [
    {
      name: 'HVAC Systems',
      level: 8,
      currentXP: 420,
      nextLevelXP: 500,
      color: '#2563eb',
    },
    {
      name: 'Electrical Work',
      level: 6,
      currentXP: 180,
      nextLevelXP: 300,
      color: '#f59e0b',
    },
    {
      name: 'Network Installation',
      level: 4,
      currentXP: 90,
      nextLevelXP: 200,
      color: '#16a34a',
    },
    {
      name: 'Equipment Repair',
      level: 7,
      currentXP: 320,
      nextLevelXP: 400,
      color: '#7c3aed',
    },
  ];

  const weeklyGoals: WeeklyGoal[] = [
    {
      title: 'Jobs Completed',
      current: 12,
      target: 15,
      icon: <CheckCircle2 color="#16a34a" size={20} />,
      color: '#16a34a',
    },
    {
      title: 'Hours Worked',
      current: 38,
      target: 40,
      icon: <Clock color="#2563eb" size={20} />,
      color: '#2563eb',
    },
    {
      title: 'XP Earned',
      current: 1850,
      target: 2000,
      icon: <Zap color="#7c3aed" size={20} />,
      color: '#7c3aed',
    },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'skills', label: 'Skills' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <Text style={styles.headerSubtitle}>Track your growth and achievements</Text>
      </View>

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && (
          <>
            {/* Level Progress */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Level</Text>
              <View style={styles.levelCard}>
                <View style={styles.levelHeader}>
                  <div style={styles.levelBadge}>
                    <Text style={styles.levelNumber}>12</Text>
                  </div>
                  <View style={styles.levelInfo}>
                    <Text style={styles.levelTitle}>Senior Technician</Text>
                    <Text style={styles.levelSubtitle}>18,650 total XP</Text>
                  </View>
                  <Trophy color="#fbbf24" size={24} />
                </View>
                <View style={styles.levelProgress}>
                  <ProgressBar progress={1450} maxProgress={2000} color="#2563eb" height={12} />
                  <Text style={styles.levelProgressText}>1,450 / 2,000 XP to next level</Text>
                </View>
              </View>
            </View>

            {/* Weekly Goals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Weekly Goals</Text>
              {weeklyGoals.map((goal, index) => (
                <WeeklyGoalCard key={index} goal={goal} />
              ))}
            </View>

            {/* Recent Achievements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              {achievements.filter(a => a.unlocked).slice(0, 2).map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          </>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Achievements</Text>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        )}

        {activeTab === 'skills' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skill Progression</Text>
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 12,
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  levelCard: {
    backgroundColor: '#ffffff',
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
  levelProgress: {
    marginTop: 12,
  },
  levelProgressText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    textAlign: 'center',
  },
  progressBarContainer: {
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    borderRadius: 4,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  goalProgress: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementUnlocked: {
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  achievementTitleLocked: {
    color: '#94a3b8',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
    marginBottom: 8,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementProgressText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
    minWidth: 40,
  },
  achievementReward: {
    alignItems: 'center',
    marginLeft: 12,
  },
  xpRewardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c3aed',
    fontFamily: 'Inter-SemiBold',
  },
  xpLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  skillCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  skillLevel: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  skillLevelText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  skillProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillProgressText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
});