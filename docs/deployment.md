# Deployment Guide

This document provides detailed instructions for deploying the BiteBase Intelligence application to different environments.

## Prerequisites

Before deploying the application, ensure you have:

1. Node.js (v16.x or higher)
2. npm or yarn
3. Access to your target deployment platform
4. All environment variables configured (see [Environment Variables Setup Guide](./environment-setup.md))
5. Firebase project configured (if using Firebase services)

## Deployment Environments

BiteBase Intelligence supports the following deployment environments:

- **Development**: For local testing and development
- **Staging**: For pre-production testing
- **Production**: For live application

## Local Development Server

To run the application locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

The built application will be in the `dist` directory.

## Deployment Options

### Vercel Deployment

Vercel is the recommended platform for deploying BiteBase Intelligence.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Configure environment variables on Vercel dashboard or using `.env` files

3. Deploy:
   ```bash
   # For a preview deployment
   vercel

   # For production deployment
   vercel --prod
   ```

### Netlify Deployment

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Configure environment variables on Netlify dashboard or using `.env` files

3. Deploy:
   ```bash
   # Build the application
   npm run build

   # Deploy to Netlify
   netlify deploy --dir=dist
   
   # For production deployment
   netlify deploy --dir=dist --prod
   ```

### AWS Amplify Deployment

1. Install AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure Amplify:
   ```bash
   amplify configure
   ```

3. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

4. Deploy:
   ```bash
   amplify publish
   ```

### Docker Deployment

1. Build Docker image:
   ```bash
   docker build -t bitebase-intelligence:latest .
   ```

2. Run container:
   ```bash
   docker run -p 3000:3000 --env-file .env.production bitebase-intelligence:latest
   ```

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions

1. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          # Other environment variables as needed
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI/CD

1. Create a `.gitlab-ci.yml` file:

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:16
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: registry.gitlab.com/gitlab-org/cloud-deploy/aws-base:latest
  script:
    - aws s3 sync ./dist s3://your-bucket-name/
    - aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
  only:
    - main
```

## Database Migrations

If your application requires database migrations:

```bash
# Run migrations
npm run migrate

# Rollback migrations (if needed)
npm run migrate:rollback
```

## Monitoring and Logging

### Setting Up Monitoring

1. Configure environment variables for your monitoring service
2. Integrate monitoring library in your application:

```javascript
// Example for Sentry
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV || 'development',
});
```

### Accessing Logs

- **Vercel**: Logs are available in the Vercel dashboard
- **Netlify**: Logs are available in the Netlify dashboard
- **AWS**: Use CloudWatch for logs
- **Docker**: Access logs using `docker logs [container_id]`

## Scaling

### Horizontal Scaling

Most cloud platforms will handle scaling automatically. For manual scaling:

- **Vercel/Netlify**: Automatic scaling based on your plan
- **AWS**: Configure Auto Scaling Groups
- **Docker**: Use Docker Swarm or Kubernetes

### Database Scaling

- Consider implementing read replicas for high-traffic applications
- Implement caching strategies (Redis, Memcached)
- Consider database sharding for very large datasets

## SSL Configuration

Most platforms handle SSL automatically. If you need manual configuration:

1. Generate SSL certificate:
   ```bash
   certbot --nginx -d yourdomain.com
   ```

2. Configure web server to use the certificate

## Rollback Procedures

In case a deployment causes issues:

1. Using Vercel:
   ```bash
   vercel rollback
   ```

2. Using Netlify:
   ```bash
   netlify rollback
   ```

3. Using Git:
   ```bash
   git revert [commit-hash]
   ```

## Post-Deployment Verification

After deployment, verify:

1. Application loads correctly
2. Authentication works
3. Key features function as expected
4. API endpoints are accessible
5. Analytics tools are tracking correctly

## Common Issues and Troubleshooting

### Environment Variables Missing

Symptom: Application fails with "Cannot read property of undefined" errors

Solution: Verify all required environment variables are configured on your hosting platform

### Build Failures

Symptom: Deployment fails during build process

Solution: 
- Check build logs for specific errors
- Ensure all dependencies are installed
- Verify your Node.js version is compatible

### API Connection Issues

Symptom: Frontend cannot connect to API

Solution:
- Check CORS configuration
- Verify API URL is correctly specified
- Check network security groups/firewall settings

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Build completes successfully locally
- [ ] Database migrations are ready
- [ ] API endpoints are tested
- [ ] Authentication system tested
- [ ] Performance is acceptable
- [ ] SEO metadata is configured
- [ ] Analytics is set up
- [ ] Error monitoring is configured

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Docker Documentation](https://docs.docker.com/)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting) 