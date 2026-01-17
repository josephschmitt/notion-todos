import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CollapsedSectionsState } from '../types/todo';

const STORAGE_KEYS = {
  COLLAPSED_SECTIONS: '@notion-todos/collapsed-sections',
};

// Default collapsed state (works for both flat and nested)
const DEFAULT_COLLAPSED_STATE: CollapsedSectionsState = {
  // Groups
  'in-progress-group': false,
  'not-started-group': false,
  'done-group': true,

  // Status options (only used when group has multiple options)
  'in-progress-group:in-progress-active': false,
  'in-progress-group:blocked': false,
  'not-started-group:todo': false,
  'not-started-group:backlog': false,
  'done-group:completed': false,
  'done-group:abandoned': false,
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

// Helper: Generate collapse key for a status option within a group
export function getStatusOptionCollapseKey(groupId: string, optionId: string): string {
  return `${groupId}:${optionId}`;
}

// Helper: Check if a key is for a status option (contains colon separator)
export function isStatusOptionKey(key: string): boolean {
  return key.includes(':');
}
