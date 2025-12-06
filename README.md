# Little Lemon Website

Little Lemon is a family-owned Mediterranean restaurant located in Chicago, focused on traditional recipes served with a modern twist.

## About

Little Lemon, Chicago. We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js)

## Setup Instructions

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd little-lemon-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement (HMR)
- **`npm run build`** - Build the project for production (TypeScript compilation + Vite build)
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check for code issues
- **`npm test`** - Run tests using Jest
- **`npm run format`** - Format code using Prettier
- **`npm run format:check`** - Check if code is properly formatted

## Project Structure

```
little-lemon-website/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components
│   ├── assets/      # Images and other assets
│   └── main.tsx     # Application entry point
├── index.html       # HTML template
└── package.json     # Project dependencies and scripts
```

## Development

The project uses Vite for fast development with hot module replacement. Any changes you make to the source files will be automatically reflected in the browser.

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory.

## Testing

Run the test suite:

```bash
npm test
```

## Code Quality

- **Linting**: Run `npm run lint` to check for code issues
- **Formatting**: Run `npm run format` to automatically format your code

## License

Copyright 2025 Little Lemon
