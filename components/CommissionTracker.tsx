import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, DollarSign, Target, Zap, Plus, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { CommissionData, CompanySettings, DailyGoals } from '@/stores/useAppStore';

interface CommissionTrackerProps {
  data: CommissionData;
  tradeColor: string;
  onAddJob: (isEmergency: boolean) => void;
  companySettings?: CompanySettings | null;
  dailyGoals?: DailyGoals | null;
}

export function CommissionTracker({ 
  data, 
  tradeColor, 
  onAddJob, 
  companySettings,
  dailyGoals 
}: CommissionTrackerProps) {
  const [showDetails, setShowDetails] = useState(false);

  const calculateEarnings = () => {
    if (!companySettings) return 0;

    let totalEarnings = 0;

    if (companySettings.type === 'hourly') {
      // For hourly workers, just show total revenue generated
      totalEarnings = data.totalRevenue;
    } else if (companySettings.type === 'commission' || companySettings.type === 'salary') {
      // Calculate commission earnings
      const serviceCommission = data.totalLabor * (companySettings.commissionRates.serviceCalls / 100);
      const partsCommission = data.totalParts * (companySettings.commissionRates.parts / 100);
      
      // Add bonuses for special call types
      const emergencyBonus = data.emergencyJobs * 50;
      const weekendBonus = data.weekendJobs * 25;
      const afterHoursBonus = data.afterHoursJobs * 30;
      const holidayBonus = data.holidayJobs * 75;
      
      totalEarnings = serviceCommission + partsCommission + emergencyBonus + weekendBonus + afterHoursBonus + holidayBonus;
    }

    return totalEarnings;
  };

  const totalEarnings = calculateEarnings();
  const dailyGoal = dailyGoals?.revenuePerDay || data.dailyGoal;
  const progressToGoal = Math.min((totalEarnings / dailyGoal) * 100, 100);
  const remainingToGoal = Math.max(dailyGoal - totalEarnings, 0);

  const getEarningsLabel = () => {
    if (!companySettings) return 'Total Revenue';
    
    switch (companySettings.type) {
      case 'hourly':
        return 'Revenue Generated';
      case 'commission':
        return 'Commission Earned';
      case 'salary':
        return 'Commission Bonus';
      default:
        return 'Total Earnings';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: tradeColor + '15' }]}>
          <TrendingUp color={tradeColor} size={24} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Commission Tracker</Text>
          <Text style={styles.headerSubtitle}>Daily Progress</Text>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Text style={[styles.detailsButtonText, { color: tradeColor }]}>
            {showDetails ? 'Hide' : 'Details'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Stats */}
      <View style={styles.mainStats}>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>{getEarningsLabel()}</Text>
          <Text style={[styles.earningsValue, { color: tradeColor }]}>
            ${totalEarnings.toLocaleString()}
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressToGoal}%`, backgroundColor: tradeColor }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              ${remainingToGoal.toLocaleString()} to daily goal
            </Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: '#16a34a15' }]}>
              <Target color="#16a34a" size={16} />
            </View>
            <Text style={styles.quickStatValue}>{data.jobsCompleted}</Text>
            <Text style={styles.quickStatLabel}>Jobs</Text>
          </View>
          
          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: '#ef444415' }]}>
              <AlertTriangle color="#ef4444" size={16} />
            </View>
            <Text style={styles.quickStatValue}>{data.emergencyJobs}</Text>
            <Text style={styles.quickStatLabel}>Emergency</Text>
          </View>
          
          <View style={styles.quickStat}>
            <View style={[styles.quickStatIcon, { backgroundColor: tradeColor + '15' }]}>
              <DollarSign color={tradeColor} size={16} />
            </View>
            <Text style={styles.quickStatValue}>
              {companySettings?.commissionRates.serviceCalls || data.commissionRate}%
            </Text>
            <Text style={styles.quickStatLabel}>Rate</Text>
          </View>
        </View>
      </View>

      {/* Detailed Breakdown */}
      {showDetails && companySettings && (
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Earnings Breakdown</Text>
          
          {companySettings.type === 'hourly' ? (
            <>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Total Revenue Generated</Text>
                <Text style={styles.breakdownValue}>
                  ${data.totalRevenue.toLocaleString()}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Labor Revenue</Text>
                <Text style={styles.breakdownValue}>
                  ${data.totalLabor.toLocaleString()}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Parts Revenue</Text>
                <Text style={styles.breakdownValue}>
                  ${data.totalParts.toLocaleString()}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>
                  Service Commission ({companySettings.commissionRates.serviceCalls}% of ${data.totalLabor.toLocaleString()})
                </Text>
                <Text style={styles.breakdownValue}>
                  ${((data.totalLabor * companySettings.commissionRates.serviceCalls) / 100).toLocaleString()}
                </Text>
              </View>
              
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>
                  Parts Commission ({companySettings.commissionRates.parts}% of ${data.totalParts.toLocaleString()})
                </Text>
                <Text style={styles.breakdownValue}>
                  ${((data.totalParts * companySettings.commissionRates.parts) / 100).toLocaleString()}
                </Text>
              </View>
              
              {data.emergencyJobs > 0 && (
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Emergency Bonus ({data.emergencyJobs} × $50)</Text>
                  <Text style={styles.breakdownValue}>
                    ${(data.emergencyJobs * 50).toLocaleString()}
                  </Text>
                </View>
              )}

              {data.weekendJobs > 0 && (
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Weekend Bonus ({data.weekendJobs} × $25)</Text>
                  <Text style={styles.breakdownValue}>
                    ${(data.weekendJobs * 25).toLocaleString()}
                  </Text>
                </View>
              )}

              {data.afterHoursJobs > 0 && (
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>After Hours Bonus ({data.afterHoursJobs} × $30)</Text>
                  <Text style={styles.breakdownValue}>
                    ${(data.afterHoursJobs * 30).toLocaleString()}
                  </Text>
                </View>
              )}

              {data.holidayJobs > 0 && (
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Holiday Bonus ({data.holidayJobs} × $75)</Text>
                  <Text style={styles.breakdownValue}>
                    ${(data.holidayJobs * 75).toLocaleString()}
                  </Text>
                </View>
              )}
            </>
          )}
          
          <View style={[styles.breakdownItem, styles.breakdownTotal]}>
            <Text style={styles.breakdownTotalLabel}>{getEarningsLabel()}</Text>
            <Text style={[styles.breakdownTotalValue, { color: tradeColor }]}>
              ${totalEarnings.toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#16a34a' }]}
          onPress={() => onAddJob(false)}
        >
          <Plus color="#ffffff" size={20} />
          <Text style={styles.actionButtonText}>Add Job</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
          onPress={() => onAddJob(true)}
        >
          <Zap color="#ffffff" size={20} />
          <Text style={styles.actionButtonText}>Emergency</Text>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  mainStats: {
    marginBottom: 20,
  },
  earningsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
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
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  detailsSection: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  breakdownValue: {
    fontSize: 14,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  breakdownTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 8,
    paddingTop: 12,
  },
  breakdownTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  breakdownTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});