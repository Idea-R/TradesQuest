import { create } from 'zustand';
import { JobState, JobActions, Job } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);
const generateJobNumber = (counter: number) => `JOB-${String(counter).padStart(4, '0')}`;

export const useJobStore = create<JobState & JobActions>((set, get) => ({
  // State
  jobs: [],
  activeTimer: null,
  jobCounter: 1,
  isLoading: false,
  error: null,

  // Actions
  addJob: (jobData) => {
    const counter = get().jobCounter;
    const newJob: Job = {
      ...jobData,
      id: generateId(),
      jobNumber: generateJobNumber(counter),
      totalCost: jobData.laborCost + jobData.partsCost,
    };
    
    set((state) => ({
      jobs: [...state.jobs, newJob],
      jobCounter: counter + 1,
    }));
  },

  updateJob: (id, updates) => {
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { 
          ...job, 
          ...updates,
          totalCost: (updates.laborCost || job.laborCost) + (updates.partsCost || job.partsCost)
        } : job
      ),
    }));
  },

  deleteJob: (id) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
  },

  startJobTimer: (jobId) => {
    const job = get().jobs.find(j => j.id === jobId);
    if (!job) return;

    // Update job status to in-progress
    get().updateJob(jobId, { 
      status: 'in-progress',
      startTime: Date.now()
    });

    // Start timer
    set({
      activeTimer: {
        jobId,
        startTime: Date.now(),
        isRunning: true,
        pausedDuration: 0,
      },
    });
  },

  pauseJobTimer: () => {
    const timer = get().activeTimer;
    if (timer && timer.isRunning) {
      set({
        activeTimer: {
          ...timer,
          isRunning: false,
        },
      });
    }
  },

  stopJobTimer: () => {
    const timer = get().activeTimer;
    if (timer) {
      const duration = Date.now() - timer.startTime - timer.pausedDuration;
      get().updateJob(timer.jobId, {
        endTime: Date.now(),
        actualDuration: duration,
      });
      set({ activeTimer: null });
    }
  },

  completeJob: (jobId, actualDuration) => {
    const job = get().jobs.find(j => j.id === jobId);
    if (!job) return;

    // Stop timer if running for this job
    const timer = get().activeTimer;
    if (timer && timer.jobId === jobId) {
      get().stopJobTimer();
    }

    // Update job status
    get().updateJob(jobId, {
      status: 'completed',
      endTime: Date.now(),
      actualDuration: actualDuration || (timer ? Date.now() - timer.startTime : undefined),
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },
}));