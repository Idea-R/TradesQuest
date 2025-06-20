import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Clock, User, CircleCheck as CheckCircle2, Play, Zap, Calendar, Chrome as Home } from 'lucide-react-native';
import { Card } from '@/shared/ui';
import { Job } from '@/entities/job/model/types';
import { theme } from '@/shared/config/theme';

interface JobCardProps {
  job: Job;
  onUpdate?: (id: string, updates: Partial<Job>) => void;
  onComplete?: (id: string) => void;
  showActions?: boolean;
}

export function JobCard({ job, onUpdate, onComplete, showActions = true }: JobCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.gray500;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return theme.colors.success;
      case 'in-progress': return theme.colors.primary;
      case 'pending': return theme.colors.gray500;
      default: return theme.colors.gray500;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 color={theme.colors.success} size={16} />;
      case 'in-progress':
        return <Play color={theme.colors.primary} size={16} />;
      case 'pending':
        return <Clock color={theme.colors.gray500} size={16} />;
      default:
        return <Clock color={theme.colors.gray500} size={16} />;
    }
  };

  const getCallTypeIcon = (callType: string) => {
    switch (callType) {
      case 'emergency':
        return <Zap color={theme.colors.error} size={16} />;
      case 'weekend':
        return <Calendar color={theme.colors.warning} size={16} />;
      case 'after-hours':
        return <Clock color={theme.colors.purple} size={16} />;
      case 'holiday':
        return <Calendar color={theme.colors.success} size={16} />;
      default:
        return <Home color={theme.colors.gray500} size={16} />;
    }
  };

  const getCallTypeLabel = (callType: string) => {
    switch (callType) {
      case 'emergency': return 'Emergency';
      case 'weekend': return 'Weekend';
      case 'after-hours': return 'After Hours';
      case 'holiday': return 'Holiday';
      default: return 'Regular';
    }
  };

  return (
    <Card style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.jobInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.jobNumber}>{job.jobNumber}</Text>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(job.priority) + '15' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(job.priority) }]}>
                {job.priority.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.statusRow}>
            {getStatusIcon(job.status)}
            <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
              {job.status.replace('-', ' ').toUpperCase()}
            </Text>
            {job.callType !== 'regular' && (
              <>
                <View style={styles.separator} />
                {getCallTypeIcon(job.callType)}
                <Text style={styles.callTypeText}>
                  {getCallTypeLabel(job.callType)}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <User color={theme.colors.gray500} size={16} />
          <Text style={styles.detailText}>{job.client}</Text>
        </View>
        {job.location && (
          <View style={styles.detailRow}>
            <MapPin color={theme.colors.gray500} size={16} />
            <Text style={styles.detailText}>{job.location}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Clock color={theme.colors.gray500} size={16} />
          <Text style={styles.detailText}>{job.scheduledTime} • {job.estimatedTime}</Text>
        </View>
      </View>

      {/* Pricing */}
      <View style={styles.pricingSection}>
        <View style={styles.pricingRow}>
          <Text style={styles.pricingLabel}>Labor: ${job.laborCost}</Text>
          <Text style={styles.pricingLabel}>Parts: ${job.partsCost}</Text>
          <Text style={[styles.pricingTotal, { color: getPriorityColor(job.priority) }]}>
            Total: ${job.totalCost}
          </Text>
        </View>
      </View>

      {job.description && (
        <Text style={styles.description}>{job.description}</Text>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{job.xpReward} XP</Text>
        </View>
        
        {showActions && job.status === 'in-progress' && onComplete && (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
            onPress={() => onComplete(job.id)}
          >
            <CheckCircle2 color="#ffffff" size={16} />
            <Text style={styles.actionButtonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  jobInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  jobNumber: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.purple,
    fontFamily: theme.typography.fontFamily.semiBold,
    backgroundColor: theme.colors.purple + '15',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  jobTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.semiBold,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  priorityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: 6,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.gray400,
    marginHorizontal: theme.spacing.sm,
  },
  callTypeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  details: {
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: theme.spacing.sm,
  },
  pricingSection: {
    backgroundColor: theme.colors.gray50,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  pricingTotal: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpBadge: {
    backgroundColor: theme.colors.purple + '15',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
  },
  xpText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.purple,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: 6,
  },
});