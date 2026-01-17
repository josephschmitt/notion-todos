import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CollapsedSectionsState } from '../types/todo';

const STORAGE_KEYS = {
  COLLAPSED_SECTIONS: '@notion-todos/collapsed-sections',
  DATA_SOURCE: '@notion-todos/data-source',
};

// Default collapsed state (works for both flat and nested)
const DEFAULT_COLLAPSED_STATE: CollapsedSectionsState = {
  // Groups (for single-option groups using StatusSection)
  'in-progress-group': false,
  'not-started-group': false,
  'done-group': true,

  // Individual status options (for multi-option groups using SubStatusSection)
  'in-progress-active': false,
  'blocked': false,
  'todo': false,
  'backlog': false,
  'completed': false,
  'abandoned': false,
};

export async function loadCollapsedSections(): Promise<CollapsedSectionsState> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.COLLAPSED_SECTIONS);
    if (value !== null) {
      return JSON.parse(value);
    }
    return DEFAULT_COLLAPSED_STATE;
  } catch (error) {
    console.error('Error loading collapsed sections state:', error);
    return DEFAULT_COLLAPSED_STATE;
  }
}

export async function saveCollapsedSections(state: CollapsedSectionsState): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.COLLAPSED_SECTIONS,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error('Error saving collapsed sections state:', error);
  }
}

// Helper: Generate collapse key for a status option
// Simplified to just use option ID (no longer composite key)
export function getStatusOptionCollapseKey(groupId: string, optionId: string): string {
  return optionId;
}

// Data source persistence (for dev mode)
export async function loadSelectedDataSource(): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.DATA_SOURCE);
    return value;
  } catch (error) {
    console.error('Error loading selected data source:', error);
    return null;
  }
}

export async function saveSelectedDataSource(dataSourceId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DATA_SOURCE, dataSourceId);
  } catch (error) {
    console.error('Error saving selected data source:', error);
  }
}
