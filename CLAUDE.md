# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cross-platform todo app built with React Native + Expo, designed to provide a native-feeling UI for iOS, iPadOS, Mac, and Web. The project is currently in **Phase 1**: UI foundation with mock data. Future phases will integrate Notion as a backend data store.

**Important**: This project prioritizes UI/UX iteration over backend integration. Avoid adding Notion API integration, state management libraries, or persistence until explicitly requested.

## Development Commands

```bash
# Install dependencies (use --legacy-peer-deps if needed)
npm install

# Start development server (tunnel mode for remote access)
npm start

# Start local development server
npm run start:local

# Start web server on LAN (recommended for iPad development)
npm run web

# Launch iOS Simulator
npm run ios

# Launch Android Emulator
npm run android

# Type checking
npx tsc --noEmit
```

## Git Workflow

**Commit frequently as you work**. When using the TodoWrite tool to track tasks, commit to git after completing each todo item. This creates a clear history of incremental progress.

**Commit guidelines**:
- After completing each todo item, stage and commit the changes
- Use descriptive commit messages that explain what was accomplished
- Follow the format: `<type>: <description>` (e.g., `feat: add todo item component`, `fix: resolve checkbox styling issue`)
- Include `Co-Authored-By: Claude <noreply@anthropic.com>` in commit messages
- Don't wait to batch multiple completed todos into one commit - commit after each one

**When NOT to commit**:
- Don't commit broken or incomplete code
- Don't commit if tests are failing (unless explicitly working on fixing tests)
- Don't commit sensitive information or credentials

## Web Development from iPad

The web version runs on LAN with `--host lan` for development from iPad or other devices:

- **Localhost**: http://localhost:8081
- **Hostname**: http://mac-mini:8081
- **Local IP**: http://192.168.x.x:8081
- **Tailscale**: Use your Tailscale IP

## Architecture

### Data Model (Notion-Compatible)

**Critical Philosophy**: This app is a beautiful, UX-focused frontend for Notion databases. Notion will be the **cloud source of truth** for all data. We are merely providing an optimized todo-centric interface on top of Notion's backend.

TypeScript interfaces in `types/todo.ts` are designed to match Notion's database structure for future integration. All data types must maintain this compatibility:

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

**Critical Requirements**:
- When adding new todo or list properties, they **must** map to Notion database property types
- Notion is the backing store - all schema changes must be compatible with Notion's data model
- Never add fields that cannot be represented in Notion databases
- Reference Notion's property types: Text, Checkbox, Date, Select, Multi-select, Relation, etc.

### State Management

Currently using React's `useState` in the main screen component (`app/index.tsx`). This is intentional for Phase 1 simplicity.

**Do not** introduce Zustand, Redux, or other state management libraries unless complexity clearly warrants it.

### Component Architecture

**Component Hierarchy**:
```
TodosScreen (app/index.tsx)
  └─ ListSection (components/lists/ListSection.tsx)
      └─ TodoList (components/todo/TodoList.tsx)
          └─ TodoItem (components/todo/TodoItem.tsx)
```

**Key Patterns**:
- `TodosScreen`: Owns state (`todos`, `lists`) and state manipulation functions
- `ListSection`: Groups todos by list, displays section headers with "X remaining" count
- `TodoList`: Renders a FlatList of todos with separators
- `TodoItem`: Individual todo with iOS-style circular checkbox, title, and notes

### Styling

**Use React Native StyleSheet API exclusively** (not NativeWind/Tailwind). This ensures:
- Web compatibility
- Type safety
- Performance optimization through style caching
- No build tool complexity

### Expo Router

File-based routing with entry point at `expo-router/entry` (configured in `package.json`):
- `app/_layout.tsx`: Root layout with navigation and SafeAreaProvider
- `app/index.tsx`: Main todos screen

## Design System

### Visual Design (Apple Reminders-inspired)

- **Background**: `#F3F4F6` (light gray)
- **Cards**: `#ffffff` (white)
- **Primary Accent**: `#3B82F6` (blue for checkboxes)
- **Text**: `#111827` (dark gray)
- **Secondary Text**: `#6B7280` (medium gray)
- **Completed Text**: `#9CA3AF` (light gray)
- **Separators**: `#E5E7EB`

### Component Patterns

**Checkboxes**:
- Circular, 24px diameter
- Unchecked: White background, 2px gray border
- Checked: Blue background with white checkmark
- Blue color: `#3B82F6`

**Todo Items**:
- Completed todos have strikethrough text
- Generous padding (16px horizontal, 12px vertical)
- Notes displayed below title in smaller, lighter text

**Section Headers**:
- Show list icon + name
- Display "X remaining" count (incomplete todos only)
- Light background: `#F9FAFB`

## Project Constraints

### Phase 1 Scope (Current)

**In scope**:
- UI components and visual design
- Toggle todo completion (in-memory state)
- Display todos organized by lists
- Mock data for development

**Out of scope** (defer to later phases):
- Adding/editing/deleting todos
- Notion API integration
- AsyncStorage or persistence
- State management libraries (Zustand, Redux)
- Advanced UI (swipe actions, drag & drop)
- Animations

### Key Decisions

1. **StyleSheet over NativeWind**: Prioritizes web compatibility
2. **useState over Zustand**: Keep state management simple until complexity increases
3. **Mock data first**: Enables rapid UI iteration without backend dependencies
4. **Notion-compatible schema**: Allows seamless future integration

## Common Gotchas

1. **Directory**: Always work from `/Users/josephschmitt/development/notion-todos` (not nested subdirectories)
2. **Peer Dependencies**: Use `npm install --legacy-peer-deps` if version conflicts occur
3. **Web Server**: Must use `--host lan` flag for network access (already in `package.json`)
4. **Notion Integration**: Never store Notion API keys in the app - future implementation will use backend proxy

## Future Phases

Reference the plan file at `~/.claude/plans/eager-dancing-manatee.md` for phase details.

**Phase 2**: UI Refinement (add/edit/delete, swipe actions, animations)
**Phase 3**: Data Persistence (AsyncStorage, offline support)
**Phase 4**: Notion Integration (backend proxy, real-time sync)
**Phase 5**: Advanced Features (notifications, due dates, search)
