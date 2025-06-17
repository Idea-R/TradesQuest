import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, User, Phone, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Play, Pause, MoveVertical as MoreVertical, Plus, Mic, Camera, Zap, Calendar, Chrome as Home } from 'lucide-react-native';
import { useAppStore, Job } from '@/stores/useAppStore';
import { JobTimer } from '@/components/JobTimer';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { PhotoCapture } from '@/components/PhotoCapture';
import { AddJobModal } from '@/components/AddJobModal';

interface JobCardProps {
  job: Job;
  onUpdate: (id: string, updates: Partial<Job>) => void;
  onComplete: (id: string) => void;
  showTimer?: boolean;
}

function JobCard({ job, onUpdate, onComplete, showTimer = false }: JobCardProps) {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'in-progress': return '#2563eb';
      case 'pending': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 color="#16a34a" size={16} />;
      case 'in-progress':
        return <Play color="#2563eb" size={16} />;
      case 'pending':
        return <Clock color="#64748b" size={16} />;
      default:
        return <Clock color="#64748b" size={16} />;
    }
  };

  const getCallTypeIcon = (callType: string) => {
    switch (callType) {
      case 'emergency':
        return <Zap color="#ef4444" size={16} />;
      case 'weekend':
        return <Calendar color="#f59e0b" size={16} />;
      case 'after-hours':
        return <Clock color="#7c3aed" size={16} />;
      case 'holiday':
        return <Calendar color="#16a34a" size={16} />;
      default:
        return <Home color="#64748b" size={16} />;
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
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <View style={styles.jobTitleRow}>
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
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color="#64748b" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <User color="#64748b" size={16} />
          <Text style={styles.detailText}>{job.client}</Text>
        </View>
        {job.location && (
          <View style={styles.detailRow}>
            <MapPin color="#64748b" size={16} />
            <Text style={styles.detailText}>{job.location}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Clock color="#64748b" size={16} />
          <Text style={styles.detailText}>{job.scheduledTime} • {job.estimatedTime}</Text>
        </View>
      </View>

      {/* Pricing Information */}
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
        <Text style={styles.jobDescription}>{job.description}</Text>
      )}

      {/* Timer Component */}
      {showTimer && job.status !== 'completed' && (
        <View style={styles.timerSection}>
          <JobTimer 
            jobId={job.id} 
            jobTitle={job.title}
            color={getPriorityColor(job.priority)}
          />
        </View>
      )}

      {/* Voice Notes and Photos */}
      {job.status === 'in-progress' && (
        <View style={styles.mediaSection}>
          <View style={styles.mediaButtons}>
            <TouchableOpacity
              style={[styles.mediaButton, { backgroundColor: '#7c3aed15' }]}
              onPress={() => setShowVoiceRecorder(!showVoiceRecorder)}
            >
              <Mic color="#7c3aed" size={16} />
              <Text style={[styles.mediaButtonText, { color: '#7c3aed' }]}>
                Voice Note
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.mediaButton, { backgroundColor: '#16a34a15' }]}
              onPress={() => setShowPhotoCapture(!showPhotoCapture)}
            >
              <Camera color="#16a34a" size={16} />
              <Text style={[styles.mediaButtonText, { color: '#16a34a' }]}>
                Photos ({job.photos?.length || 0})
              </Text>
            </TouchableOpacity>
          </View>

          {showVoiceRecorder && (
            <View style={styles.mediaContent}>
              <VoiceRecorder
                onSave={(uri) => {
                  const voiceNotes = job.voiceNotes || [];
                  onUpdate(job.id, { voiceNotes: [...voiceNotes, uri] });
                  setShowVoiceRecorder(false);
                }}
                onCancel={() => setShowVoiceRecorder(false)}
                color={getPriorityColor(job.priority)}
              />
            </View>
          )}

          {showPhotoCapture && (
            <View style={styles.mediaContent}>
              <PhotoCapture
                photos={job.photos || []}
                onPhotosChange={(photos) => onUpdate(job.id, { photos })}
                color={getPriorityColor(job.priority)}
              />
            </View>
          )}
        </View>
      )}

      <View style={styles.jobFooter}>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{job.xpReward} XP</Text>
        </View>
        <View style={styles.jobActions}>
          {job.status === 'in-progress' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => onComplete(job.id)}
            >
              <CheckCircle2 color="#ffffff" size={16} />
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default function Jobs() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [showAddJob, setShowAddJob] = useState(false);
  
  const { jobs, updateJob, completeJob, user } = useAppStore();

  const handleCompleteJob = (jobId: string) => {
    completeJob(jobId);
  };

  const filteredJobs = jobs.filter(job => 
    filter === 'all' || job.status === filter
  );

  const getFilterCount = (status: string) => {
    if (status === 'all') return jobs.length;
    return jobs.filter(job => job.status === status).length;
  };

  const filterOptions = [
    { key: 'all', label: 'All', count: getFilterCount('all') },
    { key: 'pending', label: 'Pending', count: getFilterCount('pending') },
    { key: 'in-progress', label: 'Active', count: getFilterCount('in-progress') },
    { key: 'completed', label: 'Completed', count: getFilterCount('completed') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {jobs.filter(j => j.status === 'completed').length} completed today
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addJobButton}
          onPress={() => setShowAddJob(true)}
        >
          <Plus color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterButton,
                  filter === option.key && styles.filterButtonActive,
                ]}
                onPress={() => setFilter(option.key as any)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filter === option.key && styles.filterButtonTextActive,
                  ]}
                >
                  {option.label} ({option.count})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onUpdate={updateJob}
            onComplete={handleCompleteJob}
            showTimer={job.status !== 'completed'}
          />
        ))}
        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <AlertCircle color="#64748b" size={48} />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'all' 
                ? 'Add your first job to get started!'
                : `No jobs match the current filter criteria.`
              }
            </Text>
            {filter === 'all' && (
              <TouchableOpacity
                style={[styles.addFirstJobButton, { backgroundColor: user?.trade.color || '#2563eb' }]}
                onPress={() => setShowAddJob(true)}
              >
                <Plus color="#ffffff" size={20} />
                <Text style={styles.addFirstJobText}>Add Your First Job</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <AddJobModal
        visible={showAddJob}
        onClose={() => setShowAddJob(false)}
        tradeColor={user?.trade.color || '#2563eb'}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  statsContainer: {
    marginRight: 12,
  },
  statsText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  addJobButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  jobsList: {
    flex: 1,
    padding: 20,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7c3aed',
    fontFamily: 'Inter-SemiBold',
    backgroundColor: '#7c3aed15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    marginRight: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94a3b8',
    marginHorizontal: 8,
  },
  callTypeText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  jobDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  pricingSection: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Inter-Medium',
  },
  pricingTotal: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  jobDescription: {
    fontSize: 14,
    color: '#475569',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  timerSection: {
    marginBottom: 16,
  },
  mediaSection: {
    marginBottom: 16,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  mediaButtonText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  mediaContent: {
    marginTop: 8,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpBadge: {
    backgroundColor: '#7c3aed15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 12,
    color: '#7c3aed',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  jobActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  completeButton: {
    backgroundColor: '#16a34a',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  addFirstJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addFirstJobText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});