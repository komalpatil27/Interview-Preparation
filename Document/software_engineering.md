# Software Engineering Practices

## Version Control System (Git)

### L1 - Git Basics

**git clone:**
```bash
# Clone repository
git clone https://github.com/user/repo.git

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Clone with depth (shallow clone)
git clone --depth 1 https://github.com/user/repo.git
```

**git checkout:**
```bash
# Switch to existing branch
git checkout develop

# Create and switch to new branch
git checkout -b feature/new-feature

# Checkout specific commit
git checkout abc1234

# Checkout file from another branch
git checkout develop -- file.js
```

**git commit:**
```bash
# Stage and commit
git add .
git commit -m "Add new feature"

# Commit with detailed message
git commit -m "Add user authentication" -m "- Implement JWT tokens
- Add login/logout endpoints
- Add password hashing"

# Amend last commit
git commit --amend -m "Updated message"

# Commit specific files
git add file1.js file2.js
git commit -m "Update specific files"
```

**git push:**
```bash
# Push to remote
git push origin main

# Push new branch
git push -u origin feature/new-feature

# Force push (dangerous!)
git push --force origin main

# Push all branches
git push --all origin
```

**git pull:**
```bash
# Pull from remote
git pull origin main

# Pull with rebase
git pull --rebase origin main

# Pull specific branch
git pull origin develop
```

**.gitignore:**
```bash
# .gitignore file
node_modules/
.env
*.log
dist/
.DS_Store
coverage/

# Ignore all .txt files except important.txt
*.txt
!important.txt
```

**Resolving Conflicts:**
```bash
# When pulling/merging causes conflicts
git pull origin main
# CONFLICT in file.js

# 1. Open file.js and resolve conflicts
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 2. Remove conflict markers and keep desired code

# 3. Stage resolved file
git add file.js

# 4. Complete merge
git commit -m "Resolve merge conflict"

# Or abort merge
git merge --abort
```

### L2 - Advanced Git

**Revert a Commit:**
```bash
# Revert specific commit (creates new commit)
git revert abc1234

# Revert without committing
git revert --no-commit abc1234

# Revert multiple commits
git revert abc1234..def5678
```

**Revert a Push:**
```bash
# Option 1: Revert (safe - creates new commit)
git revert HEAD
git push origin main

# Option 2: Reset (dangerous - rewrites history)
git reset --hard HEAD~1
git push --force origin main
```

**Update Commit Message:**
```bash
# Last commit
git commit --amend -m "New message"

# Already pushed
git commit --amend -m "New message"
git push --force origin branch-name

# Older commit (interactive rebase)
git rebase -i HEAD~3
# Change 'pick' to 'reword' for commits to edit
```

**Tags:**
```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0
git push --tags

# List tags
git tag

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

**git fetch:**
```bash
# Fetch all branches
git fetch origin

# Fetch specific branch
git fetch origin develop

# Fetch and prune deleted branches
git fetch --prune

# Difference: fetch vs pull
# fetch - downloads changes but doesn't merge
# pull - fetch + merge
```

**git cherry-pick:**
```bash
# Apply specific commit from another branch
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick without committing
git cherry-pick --no-commit abc1234

# Example use case:
# Bug fix in develop, need in main
git checkout main
git cherry-pick <commit-hash-from-develop>
```

**git rebase:**
```bash
# Rebase current branch onto main
git checkout feature
git rebase main

# Interactive rebase (squash commits)
git rebase -i HEAD~3
# pick abc1234 First commit
# squash def5678 Second commit
# squash ghi9012 Third commit

# Continue after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort

# Rebase vs Merge:
# Merge - preserves history, creates merge commit
# Rebase - linear history, rewrites commits
```

**Branching Strategies:**

**1. Git Flow:**
```
main (production)
  ↓
develop (integration)
  ↓
feature/* (new features)
release/* (release preparation)
hotfix/* (production fixes)
```

**2. GitHub Flow:**
```
main (always deployable)
  ↓
feature/* (short-lived branches)
```

**3. Trunk-Based Development:**
```
main (trunk)
  ↓
short-lived feature branches (< 1 day)
```

### L3 - Git Configuration & Hooks

**SSH vs HTTPS:**
```bash
# HTTPS (requires password/token)
git clone https://github.com/user/repo.git

# SSH (uses SSH keys)
git clone git@github.com:user/repo.git

# Setup SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add to GitHub: Settings → SSH Keys

# Test connection
ssh -T git@github.com
```

**Configuration:**
```bash
# Global config
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Local config (per repository)
git config user.name "Work Name"
git config user.email "work@email.com"

# View config
git config --list

# Aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph"
```

**Git Hooks:**
```bash
# Located in .git/hooks/

# pre-commit (runs before commit)
# .git/hooks/pre-commit
#!/bin/sh
npm run lint
npm test

# pre-push (runs before push)
# .git/hooks/pre-push
#!/bin/sh
npm run test

# commit-msg (validate commit message)
# .git/hooks/commit-msg
#!/bin/sh
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore):"; then
  echo "Invalid commit message format"
  exit 1
fi

# Make executable
chmod +x .git/hooks/pre-commit

# Using Husky (better approach)
npm install husky --save-dev
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm test"
```


## CI/CD

### L3 - Continuous Integration & Deployment

**What is CI?**
Continuous Integration - automatically building and testing code when changes are pushed.

**What is CD?**
- **Continuous Delivery** - code is always ready to deploy
- **Continuous Deployment** - code automatically deploys to production

**Difference:**
- CI - Build + Test
- CD (Delivery) - Build + Test + Ready to Deploy
- CD (Deployment) - Build + Test + Auto Deploy

**GitHub Actions Example:**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        npm run build
        npm run deploy
      env:
        API_KEY: ${{ secrets.API_KEY }}
```

**Code Quality Practices:**

**1. Code Review:**
- Review for logic errors
- Check code style consistency
- Verify tests are included
- Look for security issues
- Ensure documentation is updated

**2. Static Code Analysis:**
```bash
# ESLint
npm install eslint --save-dev
npx eslint src/

# Prettier
npm install prettier --save-dev
npx prettier --write src/

# TypeScript
npx tsc --noEmit

# SonarQube
sonar-scanner
```

**3. Dynamic Code Analysis:**
- Runtime testing
- Performance profiling
- Memory leak detection

**How to Review Pull Requests:**
```markdown
## PR Review Checklist

### Code Quality
- [ ] Code follows project style guide
- [ ] No unnecessary code duplication
- [ ] Functions are small and focused
- [ ] Variable names are descriptive

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate

### Testing
- [ ] Unit tests are included
- [ ] Tests cover edge cases
- [ ] All tests pass

### Security
- [ ] No sensitive data in code
- [ ] Input validation is present
- [ ] No SQL injection vulnerabilities

### Documentation
- [ ] Code is well-commented
- [ ] README is updated if needed
- [ ] API documentation is updated
```

**How to Merge Pull Requests:**
```bash
# 1. Squash and Merge (clean history)
git merge --squash feature-branch
git commit -m "Add feature X"

# 2. Merge Commit (preserve history)
git merge feature-branch

# 3. Rebase and Merge (linear history)
git rebase main
git checkout main
git merge feature-branch
```

**Code Delivery Frequency:**
- **Continuous Deployment** - Multiple times per day
- **Daily Deployments** - Once per day
- **Sprint-based** - Every 1-2 weeks
- **Release-based** - Monthly or quarterly

**Staging Server:**
- Test environment that mirrors production
- Test new features before production
- Verify integrations work
- Performance testing
- User acceptance testing (UAT)

**Jenkins Configuration:**
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/user/repo.git'
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run deploy'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

### L4 - Advanced CI/CD

**Design CI/CD Process:**
```
1. Developer commits code
   ↓
2. Trigger CI pipeline
   ↓
3. Run automated tests
   ↓
4. Build application
   ↓
5. Deploy to staging
   ↓
6. Run integration tests
   ↓
7. Manual approval (optional)
   ↓
8. Deploy to production
   ↓
9. Monitor & alert
```

**Analyze Bottlenecks:**
- Slow test suites → Parallelize tests
- Long build times → Cache dependencies
- Manual approvals → Automate more
- Deployment delays → Use blue-green deployment

**Implement CI/CD Pipeline:**
```yaml
# Advanced GitHub Actions
name: Production Pipeline

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    - run: npm test
    - run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
  
  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - uses: actions/checkout@v3
    - run: npm ci
    - run: npm run build
    - run: npm run deploy:staging
  
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - uses: actions/checkout@v3
    - run: npm ci
    - run: npm run build
    - run: npm run deploy:production
```


## Code Review Best Practices

### What is Code Review?

Code review is the systematic examination of code by peers to find bugs, improve quality, and share knowledge.

**Why it's needed:**
- Catch bugs early
- Improve code quality
- Share knowledge
- Maintain consistency
- Reduce technical debt

### Best Practices

**For Authors:**
1. Keep PRs small (< 400 lines)
2. Write clear descriptions
3. Self-review before submitting
4. Add tests
5. Respond to feedback constructively

**For Reviewers:**
1. Be respectful and constructive
2. Focus on the code, not the person
3. Explain the "why" behind suggestions
4. Approve when good enough (not perfect)
5. Review promptly (within 24 hours)

**Good Review Comments:**
```javascript
// ❌ Bad comment
"This is wrong"

// ✅ Good comment
"This could cause a race condition if multiple users 
access simultaneously. Consider using a mutex or 
transaction lock. Example: ..."

// ❌ Bad comment
"Use map instead"

// ✅ Good comment
"Using map() here would be more idiomatic and slightly 
more performant since we're transforming each element:
const ids = users.map(u => u.id)"
```

### Establish Code Quality Practices

**1. Define Coding Standards:**
```javascript
// .eslintrc.js
module.exports = {
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

**2. Automated Checks:**
```json
{
  "scripts": {
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "test": "jest",
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  }
}
```

**3. Knowledge Sharing:**
- Weekly tech talks
- Code review sessions
- Pair programming
- Documentation
- Internal wikis

This comprehensive guide covers Git, CI/CD, and Code Review practices!
