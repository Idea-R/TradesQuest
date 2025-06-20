import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  client: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  scheduledTime: string;
  description: string;
  xpReward: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  callType: 'regular' | 'emergency' | 'weekend' | 'after-hours' | 'holiday';
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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  trade: {
    id: string;
    name: string;
    color: string;
  };
  level: number;
  currentXP: number;
  totalXP: number;
  joinDate: string;
  isSetupComplete: boolean;
}

export interface CompanySettings {
  name: string;
  type: 'hourly' | 'commission' | 'salary';
  baseHourlyRate: number;
  commissionRates: {
    serviceCalls: number;
    parts: number;
    equipment?: number;
    emergency: number;
    weekend: number;
    afterHours: number;
    holiday: number;
  };
  partsMarkup: number;
  emergencyMultiplier: number;
  weekendMultiplier: number;
  afterHoursMultiplier: number;
  holidayMultiplier: number;
}

export interface DailyGoals {
  jobsPerDay: number;
  hoursPerDay: number;
  revenuePerDay: number;
  xpPerDay: number;
}

export interface CommissionData {
  baseRate: number;
  commissionRate: number;
  jobsCompleted: number;
  emergencyJobs: number;
  weekendJobs: number;
  afterHoursJobs: number;
  holidayJobs: number;
  totalRevenue: number;
  totalLabor: number;
  totalParts: number;
  weeklyGoal: number;
  dailyGoal: number;
}

export interface AppSettings {
  notifications: {
    enabled: boolean;
    jobReminders: boolean;
    achievementAlerts: boolean;
    teamUpdates: boolean;
  };
  privacy: {
    shareLocation: boolean;
    shareStats: boolean;
    publicProfile: boolean;
  };
  workPreferences: {
    autoStartTimer: boolean;
    requireGPSVerification: boolean;
    voiceNotesEnabled: boolean;
  };
  callTypeRewards: {
    emergency: { xpMultiplier: number; enabled: boolean };
    weekend: { xpMultiplier: number; enabled: boolean };
    afterHours: { xpMultiplier: number; enabled: boolean };
    holiday: { xpMultiplier: number; enabled: boolean };
  };
}

export interface ActiveTimer {
  jobId: string;
  startTime: number;
  isRunning: boolean;
  pausedDuration: number;
}

export interface TradeDefaults {
  id: string;
  name: string;
  color: string;
  avgHourlyRate: number;
  commissionDefaults: {
    serviceCalls: { default: number; min: number; max: number };
    parts: { default: number; min: number; max: number };
    equipment?: { default: number; min: number; max: number };
    emergency: { default: number; min: number; max: number };
  };
  partsMarkupDefault: number;
  avgJobsPerDay: number;
  avgRevenuePerJob: number;
  specialties: string[];
}

interface AppState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  
  // Setup state
  isSetupComplete: boolean;
  
  // Company settings
  companySettings: CompanySettings | null;
  dailyGoals: DailyGoals | null;
  
  // Jobs
  jobs: Job[];
  activeTimer: ActiveTimer | null;
  jobCounter: number;
  
  // Commission tracking
  commissionData: CommissionData;
  
  // Settings
  settings: AppSettings;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  completeSetup: (companySettings: CompanySettings, dailyGoals: DailyGoals) => void;
  
  // Company settings
  updateCompanySettings: (settings: CompanySettings) => void;
  updateDailyGoals: (goals: DailyGoals) => void;
  
  // Job actions
  addJob: (job: Omit<Job, 'id' | 'jobNumber'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  startJobTimer: (jobId: string) => void;
  pauseJobTimer: () => void;
  stopJobTimer: () => void;
  completeJob: (jobId: string, actualDuration?: number) => void;
  
  // Commission actions
  updateCommissionData: (updates: Partial<CommissionData>) => void;
  addJobRevenue: (job: Job) => void;
  
  // Settings actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  
  // Data persistence
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
  clearData: () => Promise<void>;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Trade defaults
  getTradeDefaults: (tradeId: string) => TradeDefaults | null;
}

export const TRADE_DEFAULTS: TradeDefaults[] = [
  {
    id: 'hvac',
    name: 'HVAC Technician',
    color: '#16a34a',
    avgHourlyRate: 48,
    commissionDefaults: {
      serviceCalls: { default: 15, min: 5, max: 30 },
      parts: { default: 12, min: 5, max: 25 },
      equipment: { default: 8, min: 3, max: 15 },
      emergency: { default: 22, min: 10, max: 40 },
    },
    partsMarkupDefault: 35,
    avgJobsPerDay: 3,
    avgRevenuePerJob: 285,
    specialties: ['Installation', 'Maintenance', 'Repair', 'Diagnostics']
  },
  {
    id: 'electrician',
    name: 'Electrician',
    color: '#f59e0b',
    avgHourlyRate: 52,
    commissionDefaults: {
      serviceCalls: { default: 18, min: 8, max: 35 },
      parts: { default: 15, min: 8, max: 30 },
      emergency: { default: 25, min: 15, max: 45 },
    },
    partsMarkupDefault: 40,
    avgJobsPerDay: 4,
    avgRevenuePerJob: 320,
    specialties: ['Wiring', 'Panels', 'Outlets', 'Lighting']
  },
  {
    id: 'plumber',
    name: 'Plumber',
    color: '#06b6d4',
    avgHourlyRate: 46,
    commissionDefaults: {
      serviceCalls: { default: 16, min: 8, max: 30 },
      parts: { default: 14, min: 8, max: 28 },
      emergency: { default: 25, min: 15, max: 45 },
    },
    partsMarkupDefault: 45,
    avgJobsPerDay: 4,
    avgRevenuePerJob: 275,
    specialties: ['Pipes', 'Fixtures', 'Drains', 'Water Heaters']
  },
  {
    id: 'appliance',
    name: 'Appliance Repair',
    color: '#2563eb',
    avgHourlyRate: 42,
    commissionDefaults: {
      serviceCalls: { default: 25, min: 15, max: 40 },
      parts: { default: 50, min: 25, max: 100 },
      emergency: { default: 30, min: 20, max: 50 },
    },
    partsMarkupDefault: 65,
    avgJobsPerDay: 5,
    avgRevenuePerJob: 185,
    specialties: ['Refrigeration', 'Washers', 'Dryers', 'Ovens']
  }
];

const defaultSettings: AppSettings = {
  notifications: {
    enabled: true,
    jobReminders: true,
    achievementAlerts: true,
    teamUpdates: true,
  },
  privacy: {
    shareLocation: true,
    shareStats: true,
    publicProfile: false,
  },
  workPreferences: {
    autoStartTimer: true,
    requireGPSVerification: false,
    voiceNotesEnabled: true,
  },
  callTypeRewards: {
    emergency: { xpMultiplier: 1.5, enabled: true },
    weekend: { xpMultiplier: 1.25, enabled: true },
    afterHours: { xpMultiplier: 1.3, enabled: true },
    holiday: { xpMultiplier: 2.0, enabled: true },
  },
};

const defaultCommissionData: CommissionData = {
  baseRate: 45,
  commissionRate: 15,
  jobsCompleted: 0,
  emergencyJobs: 0,
  weekendJobs: 0,
  afterHoursJobs: 0,
  holidayJobs: 0,
  totalRevenue: 0,
  totalLabor: 0,
  totalParts: 0,
  weeklyGoal: 1800,
  dailyGoal: 360,
};

const generateId = () => Math.random().toString(36).substr(2, 9);
const generateJobNumber = (counter: number) => `JOB-${String(counter).padStart(4, '0')}`;

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isSetupComplete: false,
  companySettings: null,
  dailyGoals: null,
  jobs: [],
  activeTimer: null,
  jobCounter: 1,
  commissionData: defaultCommissionData,
  settings: defaultSettings,
  isLoading: false,
  error: null,

  // User actions
  setUser: (user) => {
    set({ user, isAuthenticated: !!user, isSetupComplete: user?.isSetupComplete || false });
    get().saveData();
  },

  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      set({ user: updatedUser });
      get().saveData();
    }
  },

  completeSetup: (companySettings, dailyGoals) => {
    const user = get().user;
    if (user) {
      const updatedUser = { ...user, isSetupComplete: true };
      set({ 
        user: updatedUser,
        companySettings,
        dailyGoals,
        isSetupComplete: true,
        commissionData: {
          ...get().commissionData,
          baseRate: companySettings.baseHourlyRate,
          commissionRate: companySettings.commissionRates.serviceCalls,
          dailyGoal: dailyGoals.revenuePerDay,
          weeklyGoal: dailyGoals.revenuePerDay * 5,
        }
      });
      get().saveData();
    }
  },

  // Company settings
  updateCompanySettings: (settings) => {
    set({ companySettings: settings });
    get().saveData();
  },

  updateDailyGoals: (goals) => {
    set({ dailyGoals: goals });
    get().saveData();
  },

  // Job actions
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
    get().saveData();
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
    get().saveData();
  },

  deleteJob: (id) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    }));
    get().saveData();
  },

  startJobTimer: (jobId) => {
    const job = get().jobs.find(j => j.id === jobId);
    if (!job) return;

    get().updateJob(jobId, { 
      status: 'in-progress',
      startTime: Date.now()
    });

    set({
      activeTimer: {
        jobId,
        startTime: Date.now(),
        isRunning: true,
        pausedDuration: 0,
      },
    });
    get().saveData();
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
      get().saveData();
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
      get().saveData();
    }
  },

  completeJob: (jobId, actualDuration) => {
    const job = get().jobs.find(j => j.id === jobId);
    if (!job) return;

    const timer = get().activeTimer;
    if (timer && timer.jobId === jobId) {
      get().stopJobTimer();
    }

    get().updateJob(jobId, {
      status: 'completed',
      endTime: Date.now(),
      actualDuration: actualDuration || (timer ? Date.now() - timer.startTime : undefined),
    });

    get().addJobRevenue(job);

    const user = get().user;
    const settings = get().settings;
    if (user) {
      let xpGained = job.xpReward;
      
      if (job.callType !== 'regular' && settings.callTypeRewards[job.callType]?.enabled) {
        xpGained *= settings.callTypeRewards[job.callType].xpMultiplier;
      }
      
      get().updateUser({
        currentXP: user.currentXP + xpGained,
        totalXP: user.totalXP + xpGained,
      });
    }
  },

  // Commission actions
  updateCommissionData: (updates) => {
    set((state) => ({
      commissionData: { ...state.commissionData, ...updates },
    }));
    get().saveData();
  },

  addJobRevenue: (job) => {
    const companySettings = get().companySettings;
    if (!companySettings) return;

    let commissionAmount = 0;
    
    if (companySettings.type === 'commission') {
      const serviceCommission = job.laborCost * (companySettings.commissionRates.serviceCalls / 100);
      const partsCommission = job.partsCost * (companySettings.commissionRates.parts / 100);
      
      commissionAmount = serviceCommission + partsCommission;
      
      if (job.callType === 'emergency') {
        commissionAmount *= companySettings.emergencyMultiplier;
      } else if (job.callType === 'weekend') {
        commissionAmount *= companySettings.weekendMultiplier;
      } else if (job.callType === 'after-hours') {
        commissionAmount *= companySettings.afterHoursMultiplier;
      } else if (job.callType === 'holiday') {
        commissionAmount *= companySettings.holidayMultiplier;
      }
    }

    set((state) => ({
      commissionData: {
        ...state.commissionData,
        jobsCompleted: state.commissionData.jobsCompleted + 1,
        emergencyJobs: job.callType === 'emergency' 
          ? state.commissionData.emergencyJobs + 1 
          : state.commissionData.emergencyJobs,
        weekendJobs: job.callType === 'weekend'
          ? state.commissionData.weekendJobs + 1
          : state.commissionData.weekendJobs,
        afterHoursJobs: job.callType === 'after-hours'
          ? state.commissionData.afterHoursJobs + 1
          : state.commissionData.afterHoursJobs,
        holidayJobs: job.callType === 'holiday'
          ? state.commissionData.holidayJobs + 1
          : state.commissionData.holidayJobs,
        totalRevenue: state.commissionData.totalRevenue + job.totalCost,
        totalLabor: state.commissionData.totalLabor + job.laborCost,
        totalParts: state.commissionData.totalParts + job.partsCost,
      },
    }));
    get().saveData();
  },

  // Settings actions
  updateSettings: (updates) => {
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }));
    get().saveData();
  },

  // Trade defaults
  getTradeDefaults: (tradeId) => {
    return TRADE_DEFAULTS.find(trade => trade.id === tradeId) || null;
  },

  // Data persistence
  loadData: async () => {
    if (Platform.OS === 'web') {
      try {
        const userData = localStorage.getItem('tradesquest_user');
        const jobsData = localStorage.getItem('tradesquest_jobs');
        const commissionData = localStorage.getItem('tradesquest_commission');
        const settingsData = localStorage.getItem('tradesquest_settings');
        const timerData = localStorage.getItem('tradesquest_timer');
        const companyData = localStorage.getItem('tradesquest_company');
        const goalsData = localStorage.getItem('tradesquest_goals');
        const counterData = localStorage.getItem('tradesquest_counter');

        if (userData) {
          const user = JSON.parse(userData);
          set({ user, isAuthenticated: true, isSetupComplete: user.isSetupComplete });
        }

        if (jobsData) {
          set({ jobs: JSON.parse(jobsData) });
        }

        if (commissionData) {
          set({ commissionData: JSON.parse(commissionData) });
        }

        if (settingsData) {
          set({ settings: JSON.parse(settingsData) });
        }

        if (timerData) {
          set({ activeTimer: JSON.parse(timerData) });
        }

        if (companyData) {
          set({ companySettings: JSON.parse(companyData) });
        }

        if (goalsData) {
          set({ dailyGoals: JSON.parse(goalsData) });
        }

        if (counterData) {
          set({ jobCounter: JSON.parse(counterData) });
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    } else {
      try {
        const userData = await AsyncStorage.getItem('tradesquest_user');
        const jobsData = await AsyncStorage.getItem('tradesquest_jobs');
        const commissionData = await AsyncStorage.getItem('tradesquest_commission');
        const settingsData = await AsyncStorage.getItem('tradesquest_settings');
        const timerData = await AsyncStorage.getItem('tradesquest_timer');
        const companyData = await AsyncStorage.getItem('tradesquest_company');
        const goalsData = await AsyncStorage.getItem('tradesquest_goals');
        const counterData = await AsyncStorage.getItem('tradesquest_counter');

        if (userData) {
          const user = JSON.parse(userData);
          set({ user, isAuthenticated: true, isSetupComplete: user.isSetupComplete });
        }

        if (jobsData) {
          set({ jobs: JSON.parse(jobsData) });
        }

        if (commissionData) {
          set({ commissionData: JSON.parse(commissionData) });
        }

        if (settingsData) {
          set({ settings: JSON.parse(settingsData) });
        }

        if (timerData) {
          set({ activeTimer: JSON.parse(timerData) });
        }

        if (companyData) {
          set({ companySettings: JSON.parse(companyData) });
        }

        if (goalsData) {
          set({ dailyGoals: JSON.parse(goalsData) });
        }

        if (counterData) {
          set({ jobCounter: JSON.parse(counterData) });
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    }
  },

  saveData: async () => {
    const { 
      user, 
      jobs, 
      commissionData, 
      settings, 
      activeTimer, 
      companySettings, 
      dailyGoals, 
      jobCounter 
    } = get();
    
    if (Platform.OS === 'web') {
      try {
        if (user) localStorage.setItem('tradesquest_user', JSON.stringify(user));
        localStorage.setItem('tradesquest_jobs', JSON.stringify(jobs));
        localStorage.setItem('tradesquest_commission', JSON.stringify(commissionData));
        localStorage.setItem('tradesquest_settings', JSON.stringify(settings));
        if (activeTimer) localStorage.setItem('tradesquest_timer', JSON.stringify(activeTimer));
        if (companySettings) localStorage.setItem('tradesquest_company', JSON.stringify(companySettings));
        if (dailyGoals) localStorage.setItem('tradesquest_goals', JSON.stringify(dailyGoals));
        localStorage.setItem('tradesquest_counter', JSON.stringify(jobCounter));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    } else {
      try {
        if (user) await AsyncStorage.setItem('tradesquest_user', JSON.stringify(user));
        await AsyncStorage.setItem('tradesquest_jobs', JSON.stringify(jobs));
        await AsyncStorage.setItem('tradesquest_commission', JSON.stringify(commissionData));
        await AsyncStorage.setItem('tradesquest_settings', JSON.stringify(settings));
        if (activeTimer) await AsyncStorage.setItem('tradesquest_timer', JSON.stringify(activeTimer));
        if (companySettings) await AsyncStorage.setItem('tradesquest_company', JSON.stringify(companySettings));
        if (dailyGoals) await AsyncStorage.setItem('tradesquest_goals', JSON.stringify(dailyGoals));
        await AsyncStorage.setItem('tradesquest_counter', JSON.stringify(jobCounter));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    }
  },

  clearData: async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('tradesquest_user');
      localStorage.removeItem('tradesquest_jobs');
      localStorage.removeItem('tradesquest_commission');
      localStorage.removeItem('tradesquest_settings');
      localStorage.removeItem('tradesquest_timer');
      localStorage.removeItem('tradesquest_company');
      localStorage.removeItem('tradesquest_goals');
      localStorage.removeItem('tradesquest_counter');
    } else {
      await AsyncStorage.multiRemove([
        'tradesquest_user',
        'tradesquest_jobs',
        'tradesquest_commission',
        'tradesquest_settings',
        'tradesquest_timer',
        'tradesquest_company',
        'tradesquest_goals',
        'tradesquest_counter',
      ]);
    }
    
    set({
      user: null,
      isAuthenticated: false,
      isSetupComplete: false,
      companySettings: null,
      dailyGoals: null,
      jobs: [],
      activeTimer: null,
      jobCounter: 1,
      commissionData: defaultCommissionData,
      settings: defaultSettings,
    });
  },

  // Utility actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));