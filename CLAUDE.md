# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmic Insight is an AI-powered natal chart (astrology) analysis web application. It uses Google Gemini AI to generate personalized astrological readings based on user birth data. The app is built with React + Vite and deployed to GitHub Pages.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Environment Setup

This project requires a Google Gemini API key to function:

1. Create a `.env` file in the project root
2. Add your API key: `VITE_GEMINI_API_KEY=your_api_key_here`
3. Get your API key from Google AI Studio (ai.google.dev)

**Note:** The GitHub Actions workflow expects the API key to be stored as a repository secret named `VITE_GEMINI_API_KEY`.

## Architecture

### Application Flow

The app follows a three-step wizard flow managed by state in [App.jsx](src/App.jsx):

1. **Category Selection** (`step: 'category'`) - User selects a main category (love, career, life, money, relationships, study) and a subcategory question
2. **Input Form** (`step: 'input'`) - User enters birth information (name, date, time, location)
3. **Result Display** (`step: 'result'`) - AI analysis is fetched and displayed with sharing functionality

### State Management

All application state is managed via `useState` in the root [App.jsx](src/App.jsx) component. The `data` object contains:
- Category information: `main`, `sub`, `question`
- User information: `name`, `birthDate`, `birthTime`, `birthPlace`

### Key Components

- **[CategorySelection.jsx](src/components/CategorySelection.jsx)** - Contains the `CATEGORIES` constant (6 categories × 4 subcategories) and handles two-level selection
- **[InputForm.jsx](src/components/InputForm.jsx)** - Birth data collection form with validation
- **[ResultDisplay.jsx](src/components/ResultDisplay.jsx)** - Displays AI analysis with loading/error states, includes share functionality with privacy masking

### AI Integration

[src/api/gemini.js](src/api/gemini.js) contains the Gemini API integration:
- Uses `gemini-2.0-flash` model
- The prompt engineering is designed to create convincing fortune-telling responses using Barnum effect (broad, relatable statements for past/present + specific predictions for positive future events)
- Returns text-only responses (no markdown)

### Styling

All styles are in [src/index.css](src/index.css) using vanilla CSS with:
- CSS custom properties for theming (cosmic/space theme)
- Glassmorphism effects
- Responsive design with mobile-first approach
- Animated background gradient

## Deployment

The app is configured for GitHub Pages deployment:
- [vite.config.js](vite.config.js) sets `base: './'` for relative paths
- GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) automatically builds and deploys on push to main/master
- Build output goes to `dist/` directory
- Deployed URL: https://myrodin.github.io/natal-chart/

## Code Conventions

- ESLint configured with React Hooks and React Refresh plugins
- Unused variables starting with capital letters or underscores are allowed
- The project uses React 19 with Strict Mode enabled
- File structure follows standard Vite + React conventions
