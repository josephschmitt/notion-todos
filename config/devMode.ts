// Development mode configuration
// Controlled by EXPO_PUBLIC_DEV_MODE environment variable
// Use npm scripts to start in dev mode:
// - npm run dev (tunnel mode with dev tools)
// - npm run dev:local (local mode with dev tools)
// - npm run dev:web (web mode with dev tools)
export const DEV_MODE = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
