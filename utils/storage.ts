import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CollapsedSectionsState } from '../types/todo';

const STORAGE_KEYS = {
  COLLAPSED_SECTIONS: '@notion-todos/collapsed-sections',
};

const DEFAULT_COLLAPSED_STATE: CollapsedSectionsState = {
  'in-progress': false,
  'not-started': false,
  'done': true,
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
