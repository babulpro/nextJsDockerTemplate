# CI/CD Pipeline Setup Guide

This Next.js project includes a comprehensive CI/CD pipeline using GitHub Actions, with support for multiple deployment platforms and environments.

## 🏗️ Pipeline Overview

### Workflows

1. **Main CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on push to `main` and `develop` branches
   - Includes: dependency installation, linting, building, testing, security audit
   - Auto-deploys to staging (develop) and production (main)

2. **Vercel Deployment** (`.github/workflows/deploy-vercel.yml`)
   - Specialized workflow for Vercel deployments
   - Supports preview deployments for PRs

## 🔧 Setup Instructions

### 1. Repository Secrets

Configure the following secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Database (MongoDB Atlas)
- `DATABASE_URL`: MongoDB Atlas connection string for production
- `TEST_DATABASE_URL`: MongoDB Atlas connection string for testing
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

#### Authentication
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `NEXTAUTH_URL`: Production URL for your application

#### Deployment (Vercel)
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

#### Other URLs
- `STAGING_URL`: URL of your staging environment
- `PRODUCTION_URL`: URL of your production environment

### 2. Environment Setup

The project supports multiple environments:

- **Development** (`.env.development`): Local development
- **Testing** (`.env.test`): Test environment
- **Production** (`.env.production`): Production environment

### 3. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (Free tier available)

2. **Configure Database Access:**
   - Add a database user with read/write permissions
   - Whitelist your IP addresses (or use 0.0.0.0/0 for development)

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` and `<dbname>` with your actual values

4. **Create Multiple Databases:**
   - Development: `my-nextjs-db-dev`
   - Testing: `my-nextjs-db-test`  
   - Production: `my-nextjs-db-prod`

### 4. Branch Strategy

- `main`: Production branch - triggers production deployment
- `develop`: Development branch - triggers staging deployment
- Feature branches: Create PRs to `develop` or `main`

## 🐳 Docker Support

### Local Development with Docker

```bash
# For development with hot reloading (uses MongoDB Atlas)
docker-compose -f docker-compose.dev.yml up --build

# For production-like environment (uses MongoDB Atlas)
docker-compose up --build

# Services available:
# - Next.js app: http://localhost:3000
# - Redis: localhost:6379
# - Redis Commander: http://localhost:8082 (admin/admin123)
```

### Production Docker Build

```bash
# Build production image
docker build -t my-nextjs-app .

# Run production container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-mongodb-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  my-nextjs-app
```

## 📊 Pipeline Jobs

### 1. Install Dependencies
- Installs npm dependencies
- Caches node_modules for faster builds

### 2. Lint & Format Check
- Runs ESLint
- Checks Prettier formatting (if configured)

### 3. Build Application
- Generates Prisma client
- Builds Next.js application
- Uploads build artifacts

### 4. Run Tests
- Executes test suite (if configured)
- Supports Jest, Vitest, or custom test runners

### 5. Security Audit
- Runs npm audit for security vulnerabilities
- Checks for dependency issues

### 6. Deploy to Staging
- Deploys to staging environment on `develop` branch
- Uses staging environment secrets

### 7. Deploy to Production
- Deploys to production on `main` branch
- Uses production environment secrets

### 8. Notifications
- Sends deployment status notifications
- Can be extended with Slack, Discord, etc.

## 🔒 Security Features

- Secret management through GitHub Secrets
- Security auditing in pipeline
- Non-root Docker user
- Environment-specific configurations
- Dependency vulnerability scanning

## 📝 Customization

### Adding New Deployment Targets

1. Create new workflow file in `.github/workflows/`
2. Add required secrets to repository
3. Configure environment-specific variables

### Adding Tests

1. Install testing framework (Jest, Vitest, etc.)
2. Add test scripts to `package.json`
3. Tests will be automatically detected and run

### Adding Code Quality Tools

1. Install Prettier, Husky, lint-staged, etc.
2. Configure in respective config files
3. Pipeline will automatically use them

## 🚀 Deployment Platforms

The pipeline supports multiple deployment platforms:

- **Vercel**: Specialized workflow included
- **Netlify**: Can be configured in main pipeline
- **AWS S3/CloudFront**: Can be configured in main pipeline
- **Digital Ocean**: Can be configured in main pipeline
- **Custom servers**: SSH deployment can be added

## 🛠️ Troubleshooting

### Common Issues

1. **Build failures**: Check environment variables and secrets
2. **Test failures**: Ensure test database is properly configured
3. **Deployment failures**: Verify deployment platform configuration
4. **Docker issues**: Check Dockerfile and docker-compose configuration

### Debugging

- Enable debug logging by setting `LOG_LEVEL=debug`
- Check GitHub Actions logs for detailed error messages
- Use `npm run build` locally to test builds
- Test Docker builds locally before pushing

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Docker Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/)

---

For questions or issues, please check the repository issues or create a new one.
