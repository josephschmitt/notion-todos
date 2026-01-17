import { StatusGroup, StatusOption } from '../types/todo';

// Status options (individual statuses)
export const mockNestedStatusOptions: StatusOption[] = [
  // In Progress options
  { id: 'in-progress-active', name: 'In-Progress', color: '#3B82F6' },
  { id: 'blocked', name: 'Blocked', color: '#EF4444' },

  // Not Started options
  { id: 'todo', name: 'Todo', color: '#6B7280' },
  { id: 'backlog', name: 'Backlog', color: '#9CA3AF' },

  // Done options
  { id: 'completed', name: 'Done', color: '#10B981' },
  { id: 'abandoned', name: 'Abandoned', color: '#6B7280' },
];

// Status groups (the three Notion categories)
export const mockNestedStatusGroups: StatusGroup[] = [
  {
    id: 'in-progress-group',
    name: 'In Progress',
    color: '#3B82F6',
    option_ids: ['in-progress-active', 'blocked'],
  },
  {
    id: 'not-started-group',
    name: 'Not Started',
    color: '#6B7280',
    option_ids: ['todo', 'backlog'],
  },
  {
    id: 'done-group',
    name: 'Done',
    color: '#10B981',
    option_ids: ['completed', 'abandoned'],
  },
];

// Helper: Get option by id
export const getStatusOptionById = (optionId: string): StatusOption | undefined => {
  return mockNestedStatusOptions.find(o => o.id === optionId);
};

// Helper: Get options for a group
export const getOptionsForGroup = (group: StatusGroup): StatusOption[] => {
  return group.option_ids
    .map(id => getStatusOptionById(id))
    .filter((opt): opt is StatusOption => opt !== undefined);
};
