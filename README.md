# Notion Todos

A cross-platform todo app with a native-feeling UI optimized for iOS, iPadOS, Mac, and Web. Built to connect to Notion as a backend data store while providing a UX optimized for task management.

## Motivation

While Notion is a great data store, its UX isn't optimized for a todo list, especially on iOS and iPad where it feels fiddly. This app aims to provide a smooth, native experience similar to [Hypersonic for Raycast](https://www.raycast.com/reboot/hypersonic), but for Apple platforms and web.

## Features (Phase 1)

- ✅ Todo items with iOS-style circular checkboxes
- ✅ Organized lists/sections (Work, Personal, Ideas)
- ✅ Toggle completion with visual feedback
- ✅ Strikethrough for completed items
- ✅ Section headers showing remaining task count
- ✅ Mock data for rapid UI iteration
- ✅ Cross-platform: iOS, iPad, Mac, and Web

## Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet (web-compatible)
- **State Management**: React hooks (will upgrade to Zustand when needed)
- **Type Safety**: TypeScript
- **Platforms**: iOS 15.1+, iPadOS 15.1+, macOS (via Catalyst), Web

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Running on Different Platforms

#### Web (recommended for iPad development)
```bash
npm run web
```

Access the app:
- **Localhost**: http://localhost:8081
- **Local Network**: http://mac-mini:8081
- **IP Address**: http://192.168.x.x:8081
- **Tailscale**: Use your Tailscale IP

#### iOS Simulator
```bash
npm run ios
# Or press 'i' after running npm start
```

#### Android Emulator
```bash
npm run android
# Or press 'a' after running npm start
```

#### Physical Device (Expo Go)
1. Install [Expo Go](https://expo.dev/client) from the App Store
2. Run `npm start`
3. Scan the QR code with your device

## Project Structure

```
notion-todos/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with navigation
│   └── index.tsx                # Main todos screen
├── components/                   # UI components
│   ├── todo/
│   │   ├── TodoItem.tsx         # Individual todo with checkbox
│   │   └── TodoList.tsx         # List of todos
│   └── lists/
│       └── ListSection.tsx      # Section grouping
├── types/
│   └── todo.ts                  # TypeScript interfaces (Notion-compatible)
├── mock/
│   └── todoData.ts              # Mock data for development
├── app.json                     # Expo configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json                # TypeScript config
```

## Development Workflow

### Rapid Iteration from iPad

The web version makes it easy to develop from your iPad:

1. Start the server on your Mac: `npm run web`
2. Open `http://mac-mini:8081` on your iPad's browser
3. Edit code on your Mac
4. Changes hot-reload instantly on your iPad

### TypeScript

```bash
# Type check
npx tsc --noEmit
```

### Available Scripts

- `npm start` - Start with Expo tunnel (accessible anywhere)
- `npm run start:local` - Start with localhost only
- `npm run web` - Start web server on LAN
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator

## Architecture

### Data Structure

TypeScript interfaces are designed to match Notion's database schema for seamless future integration:

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  listId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoList {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  createdAt?: Date;
}
```

### State Management

Currently using React's built-in `useState` for simplicity. Will migrate to Zustand when complexity warrants it.

### Styling Approach

Using React Native's `StyleSheet` API for maximum compatibility across web and native platforms. This approach:
- Works identically on iOS, Android, and Web
- Provides type safety
- Optimizes performance through style sheet caching
- Avoids build tool complexity

## Roadmap

### Phase 2: UI Refinement
- Add new todos
- Edit existing todos
- Delete todos
- Swipe actions (iOS-style)
- Drag & drop reordering
- Details/notes view
- Animations and transitions

### Phase 3: Data Persistence
- AsyncStorage for offline support
- Local data persistence
- Sync status indicators

### Phase 4: Notion Integration
- Backend proxy for secure API access
- Real-time sync with Notion database
- Conflict resolution
- Offline-first architecture

### Phase 5: Advanced Features
- Push notifications for reminders
- Due dates and priorities
- Search and filtering
- Multiple database support
- Sharing and collaboration

## Contributing

This is a personal project, but feedback and suggestions are welcome!

## License

MIT

---

**Generated with [Claude Code](https://claude.ai/code) via [Happy](https://happy.engineering)**