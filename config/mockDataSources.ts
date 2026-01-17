import { Todo, StatusGroup, StatusOption } from '../types/todo';

// Mock data source definition
export interface MockDataSource {
  id: string;
  name: string;
  description: string;
  todos: Todo[];
  statusGroups: StatusGroup[];
  statusOptions: StatusOption[];
}

// Import all available mock data sets
import { mockTodos as flatTodos } from '../mock/todoData';
import { mockNestedTodos } from '../mock/todoDataNested';
import {
  mockStatusOptions as flatOptions,
  mockStatusGroups as flatGroups,
} from '../mock/statusData';
import {
  mockNestedStatusOptions,
  mockNestedStatusGroups,
} from '../mock/statusDataNested';

// Registry of all available mock data sources
export const MOCK_DATA_SOURCES: MockDataSource[] = [
  {
    id: 'flat',
    name: 'Flat Structure',
    description: 'Basic three-status system (Not Started, In Progress, Done)',
    todos: flatTodos,
    statusGroups: flatGroups,
    statusOptions: flatOptions,
  },
  {
    id: 'nested',
    name: 'Nested Structure',
    description: 'Hierarchical statuses with sub-groups (In-Progress/Blocked, Todo/Backlog, etc.)',
    todos: mockNestedTodos,
    statusGroups: mockNestedStatusGroups,
    statusOptions: mockNestedStatusOptions,
  },
];

// Default data source (for initial load)
export const DEFAULT_DATA_SOURCE_ID = 'flat';

// Helper to get data source by ID
export function getDataSourceById(id: string): MockDataSource | undefined {
  return MOCK_DATA_SOURCES.find(source => source.id === id);
}

// Helper to get default data source
export function getDefaultDataSource(): MockDataSource {
  return getDataSourceById(DEFAULT_DATA_SOURCE_ID) || MOCK_DATA_SOURCES[0];
}
