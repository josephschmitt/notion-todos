import { StatusConfig } from '../types/todo';

// Three minimal status configurations matching Notion's status system
export const mockStatusConfigs: StatusConfig[] = [
  {
    id: 'not-started',
    name: 'Not Started',
    category: 'todo',
    color: '#6B7280',  // Gray
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    category: 'in_progress',
    color: '#3B82F6',  // Blue
  },
  {
    id: 'done',
    name: 'Done',
    category: 'complete',
    color: '#10B981',  // Green
  },
];

// Helper function to get status config by id
export const getStatusById = (statusId: string): StatusConfig | undefined => {
  return mockStatusConfigs.find(status => status.id === statusId);
};

// Helper function to get status config by category
export const getStatusByCategory = (category: string): StatusConfig | undefined => {
  return mockStatusConfigs.find(status => status.category === category);
};
