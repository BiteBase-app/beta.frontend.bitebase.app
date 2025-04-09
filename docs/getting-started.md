# Getting Started with BiteBase Intelligence

This guide will help you set up your development environment and get started with the BiteBase Intelligence application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher) or **yarn** (v1.22.x or higher)
- **Git** for version control
- A code editor such as **Visual Studio Code**, **WebStorm**, or your preferred IDE
- **Firebase CLI** if working with Firebase services
- **Docker** (optional, for containerized development)

## Setting Up Your Development Environment

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/bitebase-intelligence.git
cd bitebase-intelligence
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add the necessary environment variables:

```plaintext
# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_API_VERSION=v1

# Firebase Configuration (if applicable)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebaseapp.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Analytics (if applicable)
VITE_GA_MEASUREMENT_ID=your_ga_id

# Feature Flags
VITE_ENABLE_AI_INSIGHTS=true
VITE_ENABLE_ADVANCED_ANALYTICS=true
```

Refer to `.env.example` for a complete list of environment variables.

### 4. Start the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
bitebase-intelligence/
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts for state management
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layout components
│   ├── lib/            # Utility functions and libraries
│   ├── pages/          # Application pages/routes
│   ├── services/       # API services and third-party integrations
│   ├── store/          # State management (Redux/Zustand)
│   ├── styles/         # Global styles and theme configuration
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # Vite environment types
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore configuration
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Key Features and Workflows

### Authentication

The application uses Firebase Authentication for user management. To test authentication:

1. Create a test user in the Firebase console or use the registration form
2. Use the login form to access protected routes
3. Review `src/contexts/AuthContext.tsx` for authentication logic

### Restaurant Management

Restaurant data is managed through the `/restaurants` endpoints:

1. Browse restaurants in the dashboard
2. Create, update, or delete restaurants using the UI forms
3. Review `src/services/restaurantService.ts` for implementation details

### Analytics Dashboard

The analytics dashboard displays key performance metrics:

1. Access the analytics dashboard from the main navigation
2. Filter data by date range, restaurant, or other parameters
3. Review `src/pages/analytics` for dashboard implementation

### AI Insights

The AI insights feature provides intelligent recommendations:

1. Access insights from the restaurant details page
2. Review suggested optimizations based on customer data
3. Implement recommendations with one-click actions
4. Review `src/services/aiService.ts` for AI integration details

## Development Workflows

### Adding a New Feature

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your feature

3. Write tests for your feature (if applicable)

4. Submit a pull request to the `develop` branch

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Working with the API

The BiteBase Intelligence API is documented in detail in the [API Integration Guide](./api-integration.md). Key points:

1. API requests are handled through service modules in `src/services/`
2. Authentication tokens are managed automatically by the auth context
3. Use the `useQuery` and `useMutation` hooks for data fetching (if using React Query)

Example API call:

```typescript
import { fetchRestaurants } from '../services/restaurantService';

// In your component
const { data, isLoading, error } = useQuery('restaurants', fetchRestaurants);
```

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check that your `.env.local` file contains the correct API URL
   - Verify that the API server is running

2. **Authentication Issues**
   - Ensure Firebase configuration is correct in your `.env.local` file
   - Check browser console for Firebase authentication errors

3. **Build Errors**
   - Clear the `node_modules` folder and reinstall dependencies
   - Check for TypeScript errors in your code
   - Verify that your Node.js version meets the requirements

### Getting Help

- Check the project documentation in the `docs` folder
- Review existing GitHub issues for solutions
- Create a new issue with detailed information about your problem
- Contact the development team through Slack or email

## Contributing

Please refer to [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines on contributing to this project.

## Learning Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [BiteBase API Documentation](./api-integration.md)

## Next Steps

- Review the [Architecture Overview](./architecture.md) to understand the system design
- Explore the [Deployment Guide](./deployment.md) for production deployment instructions
- Check out the [UI Component Library](./ui-components.md) for available UI components 