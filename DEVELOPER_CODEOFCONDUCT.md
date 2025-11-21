# Developer Code of Conduct - Mune Workflow

*These are my own rules for keeping the project organized and scalable.*

## 📝 Commit Convention

**Structure:** `type(scope): brief description`

### Main Types:

- `feat:` New functionality
- `fix:` Bug fixes
- `refactor:` Code restructuring without changing functionality
- `docs:` Documentation only
- `style:` Formatting changes (spaces, semicolons, etc.)
- `test:` Addition or modification of tests
- `chore:` Maintenance tasks, configurations

### Examples:

``` bash
git commit -m "feat(canvas): add drag and drop functionality"
git commit -m "fix(auth): resolve login redirect issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(components): optimize rendering performance"
```

## 🌿 Branching Strategy

**Branch Structure:**
```plaintext
main (always stable)
└── develop (integration branch)
└── feature/feature-name
└── fix/bug-name
└── hotfix/critical-urgency
```

**Naming Convention:** 
- feature/ for new features:
`feature/canvas-zoom`
- fix/ for bug fixes: `fix/login-validation` 
- hotfix/ for critical issues: `hotfix/auth-crash` 
- experiment/ for testing: `experiment/new-ui`

**Workflow:**
- New feature:
`git checkout -b feature/feature-name` 
- Development and frequent commits 
- Merge to develop:
`git checkout develop && git merge --no-ff feature/feature-name` 
- Delete branch: `git branch -d feature/feature-name`

## 🎯 Coding Standards

### TypeScript:

- ✅ Use interfaces for props and state
- ✅ Avoid `any` - use specific types
- ✅ Type functions and hooks
- ❌ Don't leave `console.log` in production

### File Structure:

```plaintext
src/
├── components/ # Reusable components
├── hooks/ # Custom hooks
├── contexts/ # Context providers
├── services/ # APIs and external calls
├── types/ # TypeScript definitions
├── utils/ # Helper functions
└── styles/ # Global styles
```

## 🔄 Code Review (Auto-Review)

### Pre-Commit Checklist:

- Code compiles without errors
- No forgotten console.log files
- Correct TypeScript types
- Works in different viewports (responsive)
- Does not break existing functionality

### Pre-Merge Checklist:

- Tests pass (if any)
- ESLint No errors displayed
- Commits follow convention
- Updated documentation if necessary

## 🚨 Emergency Rules

**When I find a critical bug:** - Create a hotfix branch from main:
`git checkout -b hotfix/critical-name` - Focus entirely on the solution - Test intensively - Merge into main and develop - Deploy immediately if necessary

**When I get stuck:** - Review documentation for a maximum of 15 minutes - Create an issue with the specific problem - Pause the feature and work on something else - Return with a fresh mind

## 📅 Work Rhythm

### Ideal Day:

- Morning: New or complex features
- Afternoon: Bugs, refactors, improvements
- Evening: Planning and documentation



## 🎵 Mune Specific Rules

### For the Canvas:

- Performance first - use memo and useCallback
- Virtualization for many elements
- Debounce on mouse events

### For Music:

- Always handle loading/error states
- Timeouts for failed requests
- Smart search caching

### For Real-Time:

- Optimistic updates whenever possible
- Disconnect/reconnect handling
- Clear loading states for users

## 🔧 Tools and Scripts

### Daily Commands:

``` bash
npm run dev
npm run build
npm run lint
npm run type-check
```

### Before Each Commit:

``` bash
npm run lint
npm run type-check
git add .

git commit -m "type(scope): description"
git push origin "branch"
```
<br>

Last updated: 20/11/2025
<br>
<i>This document lives and evolves with the project.