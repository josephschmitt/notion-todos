import { USE_NESTED_MOCK_DATA } from '../config/mockDataSource';
import { mockTodos as flatTodos } from './todoData';
import { mockNestedTodos } from './todoDataNested';
import {
  mockStatusOptions as flatOptions,
  mockStatusGroups as flatGroups,
  getStatusOptionById as getStatusOptionByIdFlat,
  getOptionsForGroup as getOptionsForGroupFlat,
} from './statusData';
import {
  mockNestedStatusOptions,
  mockNestedStatusGroups,
  getStatusOptionById as getStatusOptionByIdNested,
  getOptionsForGroup as getOptionsForGroupNested,
} from './statusDataNested';

// Export appropriate mock data for development
export const mockTodos =
  USE_NESTED_MOCK_DATA ? mockNestedTodos : flatTodos;

export const mockStatusOptions =
  USE_NESTED_MOCK_DATA ? mockNestedStatusOptions : flatOptions;

export const mockStatusGroups =
  USE_NESTED_MOCK_DATA ? mockNestedStatusGroups : flatGroups;

export const getStatusOptionById =
  USE_NESTED_MOCK_DATA ? getStatusOptionByIdNested : getStatusOptionByIdFlat;

export const getOptionsForGroup =
  USE_NESTED_MOCK_DATA ? getOptionsForGroupNested : getOptionsForGroupFlat;

// Re-export shared utilities
export { mockLists } from './todoData';
