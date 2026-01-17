// TypeScript interfaces designed to be compatible with Notion's database structure

// Status categories (immutable, matches Notion)
export type StatusCategory = 'todo' | 'in_progress' | 'complete';

// Status configuration
export interface StatusConfig {
  id: string;           // e.g., 'not-started', 'in-progress', 'done'
  name: string;         // Display name: "Not Started", "In Progress", "Done"
  category: StatusCategory;
  color: string;        // Hex color
  icon?: string;        // Optional emoji
}

// Notion API: Status group structure
// Represents the three main categories: "To-do", "In Progress", "Complete"
export interface StatusGroup {
  id: string;
  name: string;           // "To-do", "In Progress", or "Complete"
  color: string;
  option_ids: string[];   // References to status options in this group
}

// Notion API: Status option structure
// Represents individual statuses within a group (e.g., "Blocked", "Todo", "Done")
export interface StatusOption {
  id: string;
  name: string;           // e.g., "In-Progress", "Blocked", "Todo"
  color: string;
}

// View model: Status category with todos for rendering
export interface StatusCategoryView {
  group: StatusGroup;
  statusSections: StatusSectionView[];
  totalCount: number;
}

// View model: Individual status section with todos for rendering
export interface StatusSectionView {
  option: StatusOption;
  todos: Todo[];
  count: number;
}

// Legacy: Status group for simple rendering (backward compatibility)
// Used when groups have only one option (flat structure)
export interface LegacyStatusGroup {
  status: StatusConfig;
  todos: Todo[];
  count: number;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;      // Derived from statusCategory === 'complete'
  notes?: string;
  listId?: string;         // Optional - reserved for future use
  status: string;          // StatusConfig.id
  statusCategory: StatusCategory;  // Denormalized for performance
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoList {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  createdAt?: Date;
}

// State management types
export interface TodoState {
  todos: Todo[];
  lists: TodoList[];
}

export interface TodoActions {
  toggleTodo: (id: string) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
  deleteTodo: (id: string) => void;
}

// Collapsed sections state for UI persistence
export type CollapsedSectionsState = Record<string, boolean>;