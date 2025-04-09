# Firebase Authentication Setup Guide

This guide will walk you through setting up Firebase Authentication for BiteBase Intelligence, including social login providers.

## Prerequisites

1. A Firebase account (create one at [firebase.google.com](https://firebase.google.com) if you don't have one)
2. A project in the Firebase console

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "BiteBase Intelligence")
4. Enable Google Analytics if desired
5. Follow the prompts to complete project creation

## Step 2: Register Your App with Firebase

1. From your Firebase project dashboard, click the web icon (`</>`)
2. Enter your app's nickname (e.g., "BiteBase Web")
3. Optional: Set up Firebase Hosting if you plan to use it
4. Register the app
5. Copy the Firebase configuration object for use in your `.env` file

## Step 3: Configure Authentication Methods

1. In the Firebase console, navigate to "Authentication" from the sidebar
2. Click on the "Sign-in method" tab
3. Enable Email/Password authentication
   - Click on "Email/Password"
   - Toggle the "Enable" switch to the on position
   - Click "Save"

## Step 4: Set Up Social Login Providers

### Google Authentication

1. Click on "Google" in the Sign-in providers list
2. Toggle the "Enable" switch
3. Enter your support email
4. The Web SDK configuration will use the automatically created OAuth client ID
5. Click "Save"

### Facebook Authentication

1. Click on "Facebook" in the Sign-in providers list
2. Toggle the "Enable" switch
3. You'll need to create a Facebook app in the [Facebook Developers Console](https://developers.facebook.com/):
   - Create a new app (choose "Business" type)
   - Go to the app dashboard, select "Facebook Login" and set up "Web"
   - Enter your website URL in the Site URL field
   - In Settings > Basic, find your App ID and App Secret
4. Copy the App ID and App Secret to the Firebase console
5. Copy the OAuth redirect URI from Firebase to your Facebook app's Valid OAuth Redirect URIs
6. Click "Save" in Firebase console

### GitHub Authentication

1. Click on "GitHub" in the Sign-in providers list
2. Toggle the "Enable" switch
3. You'll need to register an OAuth application in GitHub:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the application name and homepage URL
   - Set the Authorization callback URL to the one provided by Firebase
4. Copy the Client ID and Client Secret from GitHub to the Firebase console
5. Click "Save" in Firebase console

## Step 5: Update Environment Variables

Add the Firebase configuration to your `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Feature flags for social login
VITE_ENABLE_GOOGLE_AUTH=true
VITE_ENABLE_FACEBOOK_AUTH=true
VITE_ENABLE_GITHUB_AUTH=true
```

## Step 6: Configure Security Rules

1. In the Firebase console, navigate to "Authentication" > "Users"
2. Review the authentication templates and customize as needed
3. Consider implementing Firebase Security Rules for other Firebase services you use

## Troubleshooting

### Common Issues with Social Login

1. **Redirect URI Mismatch**: Ensure the redirect URI in your social provider matches exactly what Firebase provides.
2. **CORS Issues**: Make sure your domain is properly configured in the Firebase project settings.
3. **Popup Blocked**: If users report login popups being blocked, suggest they allow popups for your domain.
4. **Rate Limiting**: Be aware that social providers may have API rate limits that affect authentication.

### Testing Authentication

For comprehensive testing, verify login functionality:
1. In development environment
2. In production environment
3. Across different browsers
4. On mobile devices

## Security Best Practices

1. Enable MFA for your Firebase account
2. Regularly review authenticated users
3. Set up proper Firebase Security Rules
4. Configure proper session duration
5. Monitor authentication activity for suspicious patterns

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Identity Services](https://developers.google.com/identity)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps) 