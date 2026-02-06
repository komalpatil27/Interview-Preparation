# Software Engineering - Brief Theory

## Git Basics

**Core Commands Explained:**

**`git clone`** - Creates a complete copy of a remote repository on your local machine
- Downloads entire history and all branches
- Sets up remote tracking automatically
- Creates working directory with latest code

**`git checkout`** - Switches between branches or restores files
- Changes your working directory to match the selected branch
- Can create new branches with `-b` flag
- Can restore specific files from other branches or commits

**`git commit`** - Saves your staged changes to local repository
- Creates a snapshot of your current changes
- Requires a commit message describing what changed
- Only commits staged files (added with `git add`)
- Commits are local until pushed to remote

**`git push`** - Uploads your local commits to remote repository
- Shares your changes with team
- Updates remote branch with your commits
- May require force push if histories diverged (dangerous)

**`git pull`** - Downloads changes from remote and merges into current branch
- Combination of `git fetch` + `git merge`
- Updates your local branch with remote changes
- May cause merge conflicts if same files changed

**Conflict Resolution Process:**

Conflicts occur when two people modify the same lines of code. Git can't automatically decide which version to keep.

1. **Pull latest changes** - Attempt to merge remote changes
2. **Identify conflicts** - Git marks conflicts with special markers:
   - `<<<<<<< HEAD` - Your changes
   - `=======` - Separator
   - `>>>>>>> branch-name` - Their changes
3. **Resolve manually** - Edit file to keep desired code, remove markers
4. **Stage resolved files** - `git add` the fixed files
5. **Commit** - Complete the merge with a commit message

## Advanced Git

**Revert vs Reset - Understanding the Difference:**

**`git revert`** (Safe approach):
- Creates a NEW commit that undoes previous changes
- Preserves history - everyone can see what was undone
- Safe for shared branches
- Example: If commit A broke production, revert creates commit B that undoes A
- History shows: A → B (where B reverses A)

**`git reset`** (Dangerous approach):
- Moves HEAD pointer to different commit
- Rewrites history - commits disappear
- Dangerous on shared branches (breaks others' work)
- Three modes: `--soft` (keep changes staged), `--mixed` (keep changes unstaged), `--hard` (discard changes)
- Use only on local, unpushed commits

**Tags - Marking Important Points:**
- Permanent markers for specific commits (usually releases)
- Two types: Lightweight (just a pointer) and Annotated (full object with metadata)
- Common pattern: `v1.0.0`, `v2.1.3` (semantic versioning)
- Tags don't move when new commits are added
- Must be explicitly pushed to remote

**fetch vs pull - Data Retrieval:**

**`git fetch`**:
- Downloads commits, files, refs from remote
- Updates remote-tracking branches (origin/main)
- Does NOT modify your working directory
- Safe - lets you review changes before merging
- Good for seeing what others did without affecting your work

**`git pull`**:
- Executes `git fetch` + `git merge` automatically
- Downloads AND merges changes into current branch
- Can cause unexpected merge conflicts
- Less control over merge process

**cherry-pick - Selective Commit Application:**
- Applies a specific commit from one branch to another
- Useful when you need just one fix from another branch
- Creates a new commit with same changes but different hash
- Common use: Applying hotfix from develop to main

**rebase - Rewriting History:**
- Takes commits from your branch and replays them on top of another branch
- Creates linear, cleaner history (no merge commits)
- Rewrites commit hashes (dangerous on shared branches)
- Interactive rebase allows squashing, reordering, editing commits
- Golden rule: Never rebase public/shared branches

**Branching Strategies Explained:**

**Git Flow** (Complex, for large teams):
- `main` - Production-ready code only
- `develop` - Integration branch for features
- `feature/*` - New features (branch from develop)
- `release/*` - Prepare for release (branch from develop)
- `hotfix/*` - Emergency fixes (branch from main)
- Pros: Clear structure, supports multiple versions
- Cons: Complex, slower releases

**GitHub Flow** (Simple, for continuous deployment):
- `main` - Always deployable
- `feature/*` - Short-lived feature branches
- Deploy from main frequently
- Pros: Simple, fast, continuous delivery
- Cons: Less structure for complex releases

**Trunk-Based Development** (Fastest):
- Everyone commits to `main` (trunk)
- Very short-lived branches (hours, not days)
- Feature flags for incomplete features
- Requires strong CI/CD and testing
- Pros: Fastest integration, fewer merge conflicts
- Cons: Requires discipline and good tests

## Git Configuration

**SSH vs HTTPS:**
- SSH: Uses SSH keys, no password needed
- HTTPS: Uses username/password or token

**Hooks:** Scripts that run at specific Git events
- pre-commit: Before commit
- pre-push: Before push
- commit-msg: Validate commit message

## CI/CD - Continuous Integration & Deployment

**Continuous Integration (CI) - Automated Quality Checks:**

CI is the practice of automatically building and testing code whenever changes are pushed to the repository.

**Key Benefits:**
- **Catch bugs early** - Problems found within minutes, not days
- **Ensure code quality** - Automated linting, testing, security scans
- **Faster feedback** - Developers know immediately if they broke something
- **Reduce integration problems** - Small, frequent integrations instead of big merges
- **Confidence in changes** - Every commit is verified

**How it works:**
1. Developer pushes code to repository
2. CI server detects change (webhook)
3. Automatically runs: linting, tests, security scans
4. Reports results (pass/fail)
5. Blocks merge if tests fail

**Continuous Delivery (CD) - Always Ready to Deploy:**

Code is always in a deployable state, but deployment requires manual approval.

**Characteristics:**
- Every commit could go to production (but doesn't automatically)
- Deployment is a business decision, not a technical one
- Manual button click to deploy
- Good for: Regulated industries, scheduled releases

**Continuous Deployment - Fully Automated:**

Every commit that passes tests automatically deploys to production.

**Characteristics:**
- No manual intervention
- Fastest time to market
- Requires excellent test coverage
- Requires monitoring and rollback capability
- Good for: SaaS products, web applications

**Difference Summary:**
- **CI** - Build + Test (every commit)
- **CD (Delivery)** - Build + Test + Ready to Deploy (manual trigger)
- **CD (Deployment)** - Build + Test + Auto Deploy (no manual step)

**Typical Pipeline Stages Explained:**

1. **Checkout code** - Clone repository to build server
2. **Install dependencies** - `npm install`, download packages
3. **Run linter** - Check code style (ESLint, Prettier)
4. **Run tests** - Unit tests, integration tests
5. **Build application** - Compile, bundle, minify
6. **Deploy to staging** - Test in production-like environment
7. **Run smoke tests** - Verify basic functionality in staging
8. **Deploy to production** - Release to users (manual or automatic)

## Code Quality

**Static Analysis:** Analyze code without executing
- ESLint, Prettier, TypeScript, SonarQube

**Dynamic Analysis:** Analyze during execution
- Testing, profiling, monitoring

**Code Review Checklist:**
- Code quality and style
- Functionality and logic
- Tests included
- Security vulnerabilities
- Documentation updated

## Pull Request Process

**How to Review:**
1. Understand the change
2. Check for bugs
3. Verify tests
4. Look for security issues
5. Suggest improvements
6. Approve or request changes

**Merge Strategies:**
- **Squash and Merge:** Combine all commits into one
- **Merge Commit:** Preserve all commits
- **Rebase and Merge:** Linear history

## Deployment

**Staging Server:**
- Mirror of production
- Test before production
- User acceptance testing
- Performance testing

**Deployment Frequency:**
- Continuous: Multiple times per day
- Daily: Once per day
- Sprint-based: Every 1-2 weeks
- Release-based: Monthly/quarterly

**CI/CD Tools:** Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI
