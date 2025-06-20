import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, Target, DollarSign, Plus } from 'lucide-react-native';

interface CommissionData {
  daily: number;
  weekly: number;
  monthly: number;
  target: number;
}

interface CompanySettings {
  name: string;
  commissionRate: number;
}

interface DailyGoals {
  jobsPerDay: number;
  revenuePerDay: number;
  xpPerDay: number;
}

interface CommissionTrackerProps {
  data: CommissionData;
  tradeColor: string;
  onAddJob: (isEmergency: boolean) => void;
  companySettings?: CompanySettings;
  dailyGoals?: DailyGoals;
}

export function CommissionTracker({ 
  data, 
  tradeColor, 
  onAddJob, 
  companySettings,
  dailyGoals 
}: CommissionTrackerProps) {
  const weeklyProgress = data.target > 0 ? (data.weekly / data.target) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Commission Tracker</Text>
          <Text style={styles.subtitle}>
            {companySettings?.name || 'Your Company'} • {companySettings?.commissionRate || 15}% rate
          </Text>
        </View>
        <View style={[styles.iconContainer, { backgroundColor: tradeColor + '15' }]}>
          <DollarSign color={tradeColor} size={24} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Today</Text>
          <Text style={styles.statValue}>${data.daily}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>This Week</Text>
          <Text style={styles.statValue}>${data.weekly}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={styles.statValue}>${data.monthly}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Weekly Target</Text>
          <Text style={styles.progressValue}>
            ${data.weekly} / ${data.target}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(weeklyProgress, 100)}%`,
                backgroundColor: tradeColor 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {weeklyProgress >= 100 ? 'Target achieved! 🎉' : `${(100 - weeklyProgress).toFixed(0)}% to go`}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.regularButton]}
          onPress={() => onAddJob(false)}
        >
          <Plus color="#2563eb" size={20} />
          <Text style={styles.regularButtonText}>Add Job</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.emergencyButton]}
          onPress={() => onAddJob(true)}
        >
          <Target color="#ffffff" size={20} />
          <Text style={styles.emergencyButtonText}>Emergency Job</Text>
        </TouchableOpacity>
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
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    fontFamily: 'Inter-SemiBold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  regularButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  emergencyButton: {
    backgroundColor: '#dc2626',
  },
  regularButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    fontFamily: 'Inter-SemiBold',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
  },
});