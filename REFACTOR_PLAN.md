# Feature-Sliced Design Refactor Plan

## Current Structure Problems
- Flat component structure makes scaling difficult
- Business logic mixed with presentation
- No clear feature boundaries
- Hard to find related code

## Proposed FSD Structure

```
src/
├── app/                    # App initialization & routing
│   ├── _layout.tsx
│   ├── (tabs)/
│   └── intro.tsx
├── pages/                  # Route components (keep minimal)
├── widgets/               # Complex UI blocks
│   ├── commission-tracker/
│   ├── job-timer/
│   └── team-leaderboard/
├── features/              # Business features
│   ├── auth/
│   │   ├── ui/
│   │   ├── model/
│   │   └── api/
│   ├── job-management/
│   │   ├── ui/
│   │   ├── model/
│   │   └── api/
│   ├── progress-tracking/
│   └── team-collaboration/
├── entities/              # Business entities
│   ├── user/
│   ├── job/
│   ├── team/
│   └── commission/
├── shared/                # Reusable code
│   ├── ui/               # UI kit components
│   ├── lib/              # Utilities
│   ├── api/              # API layer
│   └── config/           # Configuration
```

## Migration Steps

### Phase 1: Extract Shared UI Components
- Move reusable UI to `shared/ui/`
- Create design system components
- Standardize styling patterns

### Phase 2: Define Entities
- Extract business models (User, Job, Team, etc.)
- Create entity stores and types
- Separate data logic from UI

### Phase 3: Create Features
- Group related functionality
- Separate auth, job management, progress tracking
- Each feature owns its UI, logic, and API calls

### Phase 4: Build Widgets
- Combine features into complex UI blocks
- Commission tracker, dashboard widgets
- Reusable across different pages

## Benefits for Mobile Development

1. **Better Performance**: Lazy loading of features
2. **Team Scalability**: Clear ownership boundaries
3. **Code Reusability**: Shared components and logic
4. **Testing**: Isolated feature testing
5. **Maintenance**: Easy to find and modify code

## Implementation Priority

1. **High Priority**: Auth, Job Management, User entities
2. **Medium Priority**: Progress tracking, Team features
3. **Low Priority**: Advanced widgets, analytics

## File Examples

### Entity Example
```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  trade: Trade;
  level: number;
}

// src/entities/user/model/store.ts
export const useUserStore = create<UserState>((set) => ({
  // user state logic
}));
```

### Feature Example
```typescript
// src/features/auth/ui/LoginForm.tsx
export const LoginForm = () => {
  // auth-specific UI logic
};

// src/features/auth/model/auth.ts
export const useAuth = () => {
  // auth business logic
};
```

### Widget Example
```typescript
// src/widgets/commission-tracker/ui/CommissionTracker.tsx
export const CommissionTracker = () => {
  // combines multiple features and entities
};
```