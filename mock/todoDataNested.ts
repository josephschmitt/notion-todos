import { Todo } from '../types/todo';
import { mockLists } from './todoData';

// Re-export lists (shared between flat and nested data)
export { mockLists };

// Mock todos with nested status organization
export const mockNestedTodos: Todo[] = [
  // In Progress - Active
  {
    id: 'todo-1',
    title: 'Finish project proposal',
    completed: false,
    notes: 'Include budget estimates and timeline',
    listId: 'work-list',
    status: 'in-progress-active',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'todo-2',
    title: 'Review mockups',
    completed: false,
    notes: 'Check new dashboard designs',
    listId: 'work-list',
    status: 'in-progress-active',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'todo-3',
    title: 'Plan weekend trip',
    completed: false,
    notes: 'Check hotel availability and book flights',
    listId: 'personal-list',
    status: 'in-progress-active',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },

  // In Progress - Blocked
  {
    id: 'todo-4',
    title: 'Deploy to production',
    completed: false,
    notes: 'Waiting for security review approval',
    listId: 'work-list',
    status: 'blocked',
    statusCategory: 'in_progress',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-17'),
  },

  // Not Started - Todo
  {
    id: 'todo-5',
    title: 'Update documentation',
    completed: false,
    listId: 'work-list',
    status: 'todo',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'todo-6',
    title: 'Schedule client meeting',
    completed: false,
    notes: 'Coordinate with Sarah for availability',
    listId: 'work-list',
    status: 'todo',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'todo-7',
    title: 'Call mom',
    completed: false,
    listId: 'personal-list',
    status: 'todo',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },

  // Not Started - Backlog
  {
    id: 'todo-8',
    title: 'Learn React Native',
    completed: false,
    notes: 'Start with the official tutorial',
    listId: 'ideas-list',
    status: 'backlog',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'todo-9',
    title: 'Write blog post about productivity',
    completed: false,
    listId: 'ideas-list',
    status: 'backlog',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'todo-10',
    title: 'Research design systems',
    completed: false,
    notes: 'Look into Material Design and Apple HIG',
    listId: 'ideas-list',
    status: 'backlog',
    statusCategory: 'todo',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },

  // Done - Completed
  {
    id: 'todo-11',
    title: 'Review team performance',
    completed: true,
    listId: 'work-list',
    status: 'completed',
    statusCategory: 'complete',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'todo-12',
    title: 'Buy groceries',
    completed: true,
    notes: 'Milk, eggs, bread, and vegetables',
    listId: 'personal-list',
    status: 'completed',
    statusCategory: 'complete',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-17'),
  },

  // Done - Abandoned
  {
    id: 'todo-13',
    title: 'Build custom CMS',
    completed: true,
    notes: 'Decided to use existing solution instead',
    listId: 'ideas-list',
    status: 'abandoned',
    statusCategory: 'complete',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
  },
];
