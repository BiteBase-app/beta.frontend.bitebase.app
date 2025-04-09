# BiteBase Intelligence - AI-Powered Restaurant Analytics

BiteBase Intelligence is a cutting-edge SaaS platform that leverages artificial intelligence to provide actionable insights for restaurant owners and managers. The application combines powerful analytics with intuitive visualization tools to help restaurant businesses thrive in a competitive market.

![BiteBase Intelligence Dashboard](https://via.placeholder.com/800x450?text=BiteBase+Intelligence+Dashboard)

## Key Features

- **AI-Powered Analytics**: Utilize advanced AI models to derive actionable insights from your restaurant data
- **Competitive Analysis**: Track and analyze competitors in your area
- **Demographic Insights**: Understand your customer base with detailed demographic information
- **Menu Optimization**: Use AI to optimize your menu for maximum profitability
- **Location Intelligence**: Make data-driven decisions for new locations
- **Interactive Dashboard**: Visualize key metrics in real-time
- **Natural Language Interface**: Ask questions in plain English through our AI assistant
- **Custom Reports**: Generate detailed reports with a few clicks

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Firebase Authentication with social login options
- **State Management**: React Context API
- **Data Visualization**: ApexCharts, Recharts
- **AI Integration**: OpenAI GPT-4, Claude, Gemini Pro
- **API Communication**: Custom Fetch API with streaming support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Firebase account
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bitebase-intelligence.git
   cd bitebase-intelligence/frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the frontend directory:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API keys and configuration values

5. Start the development server:
   ```bash
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/`
  - `api/` - API client and communication utilities
  - `app/` - Core application files, including authentication
  - `brain/` - AI integration and intelligence
  - `components/` - Reusable UI components
  - `pages/` - Main application pages
  - `utils/` - Utility functions and helpers
  - `constants/` - Application constants
  - `server/` - Server-side API handlers
  - `firebase.ts` - Firebase configuration and utilities

## Deployment

### Production Build

```bash
yarn build
```

This will generate optimized production files in the `dist` directory.

### Deployment Options

- **Vercel**: Connect your GitHub repository to Vercel for automatic deployment
- **Netlify**: Connect to Netlify for seamless deployment
- **Firebase Hosting**: Deploy using the Firebase CLI
- **Custom Server**: Serve the static files from your server

## Environment Configuration

The application uses environment variables for configuration. See `.env.example` for all available options. Key variables include:

| Variable | Description |
|----------|-------------|
| VITE_FIREBASE_API_KEY | Firebase API key |
| VITE_FIREBASE_AUTH_DOMAIN | Firebase auth domain |
| OPENAI_API_KEY | OpenAI API key for AI features |
| VITE_API_URL | Backend API URL |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- shadcn/ui for the beautiful UI components
- OpenAI for their powerful language models
- Firebase for authentication and hosting
