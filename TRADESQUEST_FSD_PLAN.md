# TradesQuest Feature-Sliced Design Implementation

## Proposed Structure

```
src/
├── app/                    # App initialization & routing (keep current)
│   ├── _layout.tsx
│   ├── (tabs)/
│   ├── intro.tsx
│   └── index.tsx
├── widgets/               # Complex UI blocks combining multiple features
│   ├── dashboard-overview/
│   │   ├── ui/
│   │   └── model/
│   ├── commission-tracker/
│   │   ├── ui/
│   │   └── model/
│   ├── job-timer/
│   │   ├── ui/
│   │   └── model/
│   └── team-leaderboard/
├── features/              # Business features with their own logic
│   ├── authentication/
│   │   ├── ui/           # LoginForm, SignUpForm, GoogleAuth
│   │   ├── model/        # auth store, validation
│   │   └── api/          # auth API calls
│   ├── job-management/
│   │   ├── ui/           # JobCard, AddJobModal, JobTimer
│   │   ├── model/        # job store, job validation
│   │   └── api/          # job CRUD operations
│   ├── progress-tracking/
│   │   ├── ui/           # AchievementCard, SkillProgress, XPDisplay
│   │   ├── model/        # progress calculations, level system
│   │   └── api/          # progress sync
│   ├── team-collaboration/
│   │   ├── ui/           # TeamChat, Leaderboard, TeamSystem
│   │   ├── model/        # team store, chat logic
│   │   └── api/          # team operations
│   ├── trade-setup/
│   │   ├── ui/           # TradeSelector, CompanyConfig, GoalSetting
│   │   ├── model/        # setup validation, trade defaults
│   │   └── api/          # setup persistence
│   └── commission-tracking/
│       ├── ui/           # CommissionBreakdown, EarningsChart
│       ├── model/        # commission calculations
│       └── api/          # earnings sync
├── entities/              # Business entities (data models)
│   ├── user/
│   │   ├── model/        # User type, user store slice
│   │   └── api/          # user CRUD
│   ├── job/
│   │   ├── model/        # Job type, job store slice
│   │   └── api/          # job operations
│   ├── team/
│   │   ├── model/        # Team type, team store slice
│   │   └── api/          # team operations
│   ├── trade/
│   │   ├── model/        # Trade types, defaults
│   │   └── lib/          # trade calculations
│   └── commission/
│       ├── model/        # Commission types
│       └── lib/          # commission calculations
├── shared/                # Reusable code across features
│   ├── ui/               # Design system components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── ProgressBar/
│   │   └── index.ts
│   ├── lib/              # Utilities
│   │   ├── storage/      # AsyncStorage wrapper
│   │   ├── validation/   # Form validation
│   │   ├── formatting/   # Date, currency formatting
│   │   └── platform/     # Platform-specific utilities
│   ├── api/              # API layer
│   │   ├── client.ts     # HTTP client setup
│   │   └── types.ts      # API response types
│   ├── config/           # Configuration
│   │   ├── constants.ts  # App constants
│   │   └── theme.ts      # Design tokens
│   └── hooks/            # Shared hooks
│       ├── useFrameworkReady.ts
│       └── useAuth.ts
```

## Migration Strategy

### Phase 1: Foundation (Week 1)
1. **Create shared UI components**
   - Extract Button, Card, Input, Modal from existing code
   - Standardize styling with design tokens
   - Create consistent spacing/typography system

2. **Extract entities**
   - Move User, Job, Team, Commission types to entities
   - Create entity-specific store slices
   - Separate data logic from UI

### Phase 2: Core Features (Week 2-3)
1. **Authentication feature**
   - Move auth logic from intro.tsx
   - Create reusable auth components
   - Implement proper auth state management

2. **Job Management feature**
   - Extract job-related components
   - Implement job CRUD operations
   - Add job timer functionality

### Phase 3: Advanced Features (Week 4-5)
1. **Progress Tracking**
   - XP system, achievements, skills
   - Level calculations and rewards

2. **Team Collaboration**
   - Team creation, joining, chat
   - Leaderboards and competitions

### Phase 4: Widgets & Polish (Week 6)
1. **Dashboard widgets**
   - Combine features into dashboard overview
   - Commission tracker widget
   - Performance widgets

## Benefits for TradesQuest

### 1. **Scalability**
- Easy to add new trades (just add to entities/trade)
- New team features don't affect job management
- Gamification features are isolated and testable

### 2. **Performance**
- Lazy load team features for solo users
- Code splitting by feature
- Smaller bundle sizes

### 3. **Team Development**
- Frontend dev can work on UI while backend dev works on API
- Features can be developed in parallel
- Clear ownership boundaries

### 4. **Maintenance**
- Bug in job timer? Look in features/job-management
- Need to change commission calculation? Check entities/commission
- Easy to find and modify related code

## Implementation Examples

### Entity Example
```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  trade: Trade;
  level: number;
  currentXP: number;
  totalXP: number;
}

// src/entities/user/model/store.ts
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateXP: (xp) => set((state) => ({
    user: state.user ? {
      ...state.user,
      currentXP: state.user.currentXP + xp,
      totalXP: state.user.totalXP + xp
    } : null
  }))
}));
```

### Feature Example
```typescript
// src/features/job-management/ui/JobCard.tsx
import { Job } from '@/entities/job';
import { Button, Card } from '@/shared/ui';

export const JobCard = ({ job }: { job: Job }) => {
  // Job-specific UI logic
};

// src/features/job-management/model/useJobActions.ts
export const useJobActions = () => {
  const { addJob, updateJob } = useJobStore();
  const { updateXP } = useUserStore();
  
  const completeJob = (jobId: string) => {
    // Business logic for completing jobs
    updateJob(jobId, { status: 'completed' });
    updateXP(job.xpReward);
  };
  
  return { completeJob };
};
```

### Widget Example
```typescript
// src/widgets/dashboard-overview/ui/DashboardOverview.tsx
import { CommissionTracker } from '@/features/commission-tracking';
import { JobsList } from '@/features/job-management';
import { ProgressSummary } from '@/features/progress-tracking';

export const DashboardOverview = () => {
  return (
    <View>
      <ProgressSummary />
      <CommissionTracker />
      <JobsList limit={3} />
    </View>
  );
};
```

## File Organization Rules

1. **Each layer can only import from layers below it**
   - app → widgets → features → entities → shared
   - No circular dependencies

2. **Features are independent**
   - job-management can't directly import from team-collaboration
   - Use shared entities for communication

3. **Shared code is truly shared**
   - No feature-specific logic in shared/
   - Only generic, reusable utilities

## Next Steps

1. **Start with shared UI extraction** - Create Button, Card, Input components
2. **Extract User entity** - Move user types and basic operations
3. **Create auth feature** - Move authentication logic from intro screen
4. **Gradually migrate other features** - One feature at a time

This structure will make TradesQuest much more maintainable and scalable as you add advanced features like team competitions, advanced analytics, and multi-trade support.