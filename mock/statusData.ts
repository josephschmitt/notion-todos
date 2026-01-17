import { StatusGroup, StatusOption } from '../types/todo';

// Simple/flat structure: one option per group
// This represents the basic three-status system
export const mockStatusOptions: StatusOption[] = [
  { id: 'not-started', name: 'Not Started', color: '#6B7280' },
  { id: 'in-progress', name: 'In Progress', color: '#3B82F6' },
  { id: 'done', name: 'Done', color: '#10B981' },
];

export const mockStatusGroups: StatusGroup[] = [
  {
    id: 'not-started-group',
    name: 'Not Started',
    color: '#6B7280',
    option_ids: ['not-started'],  // Only one option
  },
  {
    id: 'in-progress-group',
    name: 'In Progress',
    color: '#3B82F6',
    option_ids: ['in-progress'],  // Only one option
  },
  {
    id: 'done-group',
    name: 'Done',
    color: '#10B981',
    option_ids: ['done'],  // Only one option
  },
];

// Helper: Get option by id
export const getStatusOptionById = (optionId: string): StatusOption | undefined => {
  return mockStatusOptions.find(o => o.id === optionId);
};

// Helper: Get options for a group
export const getOptionsForGroup = (group: StatusGroup): StatusOption[] => {
  return group.option_ids
    .map(id => getStatusOptionById(id))
    .filter((opt): opt is StatusOption => opt !== undefined);
};
