# GitHub Actions CI/CD Setup

This repository is configured with automated testing via GitHub Actions.

## Workflow Overview

The CI workflow (`.github/workflows/ci.yml`) runs automatically on:

- **Push to main branch**: Ensures all commits to main pass tests
- **Pull requests to main**: Validates changes before merging

## Test Jobs

### 1. Rails Tests

- **Services**: PostgreSQL 16, Redis 7
- **Steps**:
    - Sets up Ruby 3.4.2 with bundler caching
    - Creates and loads test database schema
    - Runs Rails minitest suite (`bundle exec rails test`)
    - Runs RSpec test suite (`bundle exec rspec`)
- **Environment**: Full Rails test environment with PostgreSQL and Redis

### 2. Frontend Tests

- **Runtime**: Node.js (using version from `.node-version`)
- **Steps**:
    - Installs dependencies with yarn
    - Runs TypeScript type checking (`yarn run build:check`)
    - Executes Vitest test suite (`yarn test --run`)
    - Generates test coverage report (`yarn test:coverage --run`)

### 3. Linting

- **Tools**: RuboCop (Ruby linter), Brakeman (security scanner)
- **Steps**:
    - Runs RuboCop to check Ruby code style
    - Executes Brakeman security scan

## Branch Protection

To enforce these tests before merging:

1. Go to **Settings → Branches** in your GitHub repository
2. Add a branch protection rule for `main`
3. Enable **"Require status checks to pass before merging"**
4. Select the following required checks:
    - `Rails Tests`
    - `Frontend Tests`
    - `Linting`
5. (Optional) Enable **"Require branches to be up to date before merging"**

## Local Testing

Before pushing code, ensure tests pass locally:

```bash
# Rails tests
bundle exec rails test
bundle exec rspec

# Frontend tests
yarn test
yarn run build:check

# Linting
bundle exec rubocop
bundle exec brakeman
```

## Troubleshooting

### Database Connection Issues

If Rails tests fail due to database connection:

- Verify PostgreSQL service is running in the workflow
- Check `DATABASE_URL` environment variable is set correctly

### Frontend Test Failures

If frontend tests time out or fail:

- Ensure `--run` flag is used (prevents hanging in CI)
- Check that all test dependencies are in `package.json` devDependencies

### Dependency Installation Issues

- Ruby gems: Cached via `bundler-cache: true`
- Node packages: Cached via `cache: 'yarn'`
- If caching issues occur, the cache will auto-invalidate on lockfile changes

