export type JobStatus = 'pending' | 'in-progress' | 'completed';
export type JobPriority = 'high' | 'medium' | 'low';
export type CallType = 'regular' | 'emergency' | 'weekend' | 'after-hours' | 'holiday';

export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  client: string;
  location: string;
  priority: JobPriority;
  status: JobStatus;
  estimatedTime: string;
  scheduledTime: string;
  description: string;
  xpReward: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  callType: CallType;
  startTime?: number;
  endTime?: number;
  actualDuration?: number;
  photos?: string[];
  voiceNotes?: string[];
  gpsLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface JobState {
  jobs: Job[];
  activeTimer: ActiveTimer | null;
  jobCounter: number;
  isLoading: boolean;
  error: string | null;
}

export interface ActiveTimer {
  jobId: string;
  startTime: number;
  isRunning: boolean;
  pausedDuration: number;
}

export interface JobActions {
  addJob: (job: Omit<Job, 'id' | 'jobNumber'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  startJobTimer: (jobId: string) => void;
  pauseJobTimer: () => void;
  stopJobTimer: () => void;
  completeJob: (jobId: string, actualDuration?: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}