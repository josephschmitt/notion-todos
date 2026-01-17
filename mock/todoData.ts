import { Todo, TodoList } from '../types/todo';

// Mock lists
export const mockLists: TodoList[] = [
  {
    id: 'work-list',
    name: 'Work',
    color: '#007AFF',
    icon: '💼',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'personal-list',
    name: 'Personal',
    color: '#34C759',
    icon: '🏠',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'ideas-list',
    name: 'Ideas',
    color: '#FF9500',
    icon: '💡',
    createdAt: new Date('2024-01-02'),
  },
];

// Mock todos with status-based organization
export const mockTodos: Todo[] = [
  // In Progress todos
  {
    id: 'todo-1',
    title: 'Finish project proposal',
    completed: false,
    notes: 'Include budget estimates and timeline',
    listId: 'work-list',
    status: 'in-progress',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'todo-3',
    title: 'Schedule client meeting',
    completed: false,
    notes: 'Coordinate with Sarah for availability',
    listId: 'work-list',
    status: 'in-progress',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'todo-7',
    title: 'Plan weekend trip',
    completed: false,
    notes: 'Check hotel availability and book flights',
    listId: 'personal-list',
    status: 'in-progress',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },

  // Not Started todos
  {
    id: 'todo-4',
    title: 'Update documentation',
    completed: false,
    listId: 'work-list',
    status: 'not-started',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'todo-6',
    title: 'Call mom',
    completed: false,
    listId: 'personal-list',
    status: 'not-started',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'todo-8',
    title: 'Learn React Native',
    completed: false,
    notes: 'Start with the official tutorial',
    listId: 'ideas-list',
    status: 'not-started',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'todo-9',
    title: 'Write blog post about productivity',
    completed: false,
    listId: 'ideas-list',
    status: 'not-started',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },

  // Done todos
  {
    id: 'todo-2',
    title: 'Review team performance',
    completed: true,
    listId: 'work-list',
    status: 'done',
    statusCategory: 'complete',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'todo-5',
    title: 'Buy groceries',
    completed: true,
    notes: 'Milk, eggs, bread, and vegetables',
    listId: 'personal-list',
    status: 'done',
    statusCategory: 'complete',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-17'),
  },
];

// Helper function to generate unique IDs (for adding new todos)
export const generateId = (): string => {
  return `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to get todos for a specific list
export const getTodosForList = (listId: string): Todo[] => {
  return mockTodos.filter(todo => todo.listId === listId);
};