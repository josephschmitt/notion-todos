// TypeScript interfaces designed to be compatible with Notion's database structure

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  listId: string;
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