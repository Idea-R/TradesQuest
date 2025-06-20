import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleAlert as AlertCircle, Plus } from 'lucide-react-native';
import { useJobStore } from '@/entities/job/model/store';
import { useUserStore } from '@/entities/user/model/store';
import { JobCard } from '@/features/job-management/ui/JobCard';
import { Job } from '@/entities/job/model/types';

export default function Jobs() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  
  const { jobs, updateJob, completeJob } = useJobStore();
  const { user, updateXP } = useUserStore();

  const handleCompleteJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // Award XP to user
      updateXP(job.xpReward);
    }
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
          onPress={() => {
            // TODO: Implement add job modal
            console.log('Add job pressed');
          }}
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
                onPress={() => {
                  // TODO: Implement add job modal
                  console.log('Add first job pressed');
                }}
              >
                <Plus color="#ffffff" size={20} />
                <Text style={styles.addFirstJobText}>Add Your First Job</Text>
              </TouchableOpacity>
            )}
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