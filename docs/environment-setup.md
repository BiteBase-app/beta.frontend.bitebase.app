# Environment Variables Setup Guide

This guide explains how to configure the environment variables required for BiteBase Intelligence.

## Overview

BiteBase Intelligence requires several environment variables to function properly. These variables control various aspects of the application, including:

- Firebase configuration
- API endpoints
- Feature flags
- Analytics settings

## Environment Files

The application uses different environment files for different deployment contexts:

- `.env.development` - Used during local development
- `.env.production` - Used for production builds
- `.env.test` - Used for testing environments

## Required Environment Variables

### Core Application Settings

```
VITE_APP_NAME=BiteBase Intelligence
VITE_APP_DESCRIPTION=AI-powered restaurant analytics platform
VITE_API_BASE_URL=https://api.bitebase.io/v1
VITE_PUBLIC_URL=https://app.bitebase.io
```

### Firebase Configuration

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Authentication Settings

```
VITE_AUTH_COOKIE_SECURE=true
VITE_AUTH_COOKIE_DOMAIN=bitebase.io
VITE_AUTH_TOKEN_EXPIRY=604800
VITE_ENABLE_GOOGLE_AUTH=true
VITE_ENABLE_FACEBOOK_AUTH=true
VITE_ENABLE_GITHUB_AUTH=false
```

### Analytics and Monitoring

```
VITE_ENABLE_ANALYTICS=true
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn
VITE_LOG_LEVEL=error
```

### Feature Flags

```
VITE_FEATURE_AI_RECOMMENDATIONS=true
VITE_FEATURE_COMPETITOR_ANALYSIS=true
VITE_FEATURE_MENU_OPTIMIZATION=true
VITE_FEATURE_CUSTOMER_INSIGHTS=true
VITE_FEATURE_EXPERIMENTAL_DASHBOARD=false
```

## Setting Up Environment Variables

### For Local Development

1. Copy the `.env.example` file to `.env.development`
   ```bash
   cp .env.example .env.development
   ```

2. Open `.env.development` in your text editor
3. Replace placeholder values with your actual configuration
4. Save the file
5. Restart your development server

### For Production Deployment

#### Vercel

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add each required variable with its production value
4. Deploy your application

#### Netlify

1. Go to your site settings in the Netlify dashboard
2. Navigate to "Build & deploy" > "Environment"
3. Add each required variable with its production value
4. Trigger a new deployment

## Securing Sensitive Environment Variables

For sensitive information like API keys:

1. Never commit `.env` files to your repository
2. Use encrypted secrets in your CI/CD pipeline
3. Rotate API keys periodically
4. Use different keys for development and production

## Troubleshooting

### Common Issues

1. **Variables Not Loading**: Ensure your environment files are named correctly and in the root directory
2. **Variables Not Available in Code**: Make sure you're prefixing with `VITE_` for variables that need to be accessible in the frontend
3. **Changes Not Reflected**: Restart your development server after changing environment variables

### Verification

To verify your environment variables are loaded correctly, you can check:

```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

**Note**: Only do this during development and remove before production deployment.

## Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/) 