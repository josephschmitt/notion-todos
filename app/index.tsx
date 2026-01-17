import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { StatusSection } from '../components/status/StatusSection';
import { NestedStatusSection } from '../components/status/NestedStatusSection';
import {
  Todo,
  StatusGroup,
  StatusOption,
  StatusCategoryView,
  StatusSectionView,
  LegacyStatusGroup,
  CollapsedSectionsState,
} from '../types/todo';
import { getDataSourceById } from '../config/mockDataSources';
import { loadCollapsedSections, saveCollapsedSections, getStatusOptionCollapseKey } from '../utils/storage';
import { useTodos } from '../contexts/TodoContext';

// Helper to get options for a group
function getOptionsForGroup(
  group: StatusGroup,
  statusOptions: StatusOption[]
): StatusOption[] {
  return group.option_ids
    .map(id => statusOptions.find(opt => opt.id === id))
    .filter((opt): opt is StatusOption => opt !== undefined);
}

export default function TodosScreen() {
  const router = useRouter();
  const { todos, toggleTodo, currentDataSourceId } = useTodos();
  const [collapsedSections, setCollapsedSections] = useState<CollapsedSectionsState>({});

  // Get current data source
  const currentDataSource = getDataSourceById(currentDataSourceId);
  const mockStatusGroups = currentDataSource?.statusGroups || [];
  const mockStatusOptions = currentDataSource?.statusOptions || [];

  // Load collapsed sections state on mount
  useEffect(() => {
    const loadState = async () => {
      const savedState = await loadCollapsedSections();
      setCollapsedSections(savedState);
    };
    loadState();
  }, []);

  // Build view models from Notion data structure
  const buildStatusCategoryViews = (): StatusCategoryView[] => {
    const categoryViews: StatusCategoryView[] = [];

    mockStatusGroups.forEach(group => {
      const options = getOptionsForGroup(group, mockStatusOptions);
      const statusSections: StatusSectionView[] = [];
      let totalCount = 0;

      options.forEach(option => {
        const optionTodos = todos.filter(todo => todo.status === option.id);

        if (optionTodos.length > 0) {
          statusSections.push({
            option,
            todos: optionTodos,
            count: optionTodos.length,
          });
          totalCount += optionTodos.length;
        }
      });

      if (totalCount > 0) {
        categoryViews.push({
          group,
          statusSections,
          totalCount,
        });
      }
    });

    return categoryViews;
  };

  const handleToggleTodo = (todoId: string) => {
    toggleTodo(todoId);
  };

  const handlePressTodo = (todo: Todo) => {
    // Placeholder for future navigation to todo details
    console.log('Pressed todo:', todo.title);
  };

  const handleLongPressTodo = (todo: Todo) => {
    // Placeholder for future status picker menu
    console.log('Long pressed todo:', todo.title);
  };

  const handleToggleSection = async (groupId: string) => {
    const newState = {
      ...collapsedSections,
      [groupId]: !collapsedSections[groupId],
    };
    setCollapsedSections(newState);
    await saveCollapsedSections(newState);
  };

  const handleToggleStatusOption = async (groupId: string, optionId: string) => {
    const key = getStatusOptionCollapseKey(groupId, optionId);
    const newState = {
      ...collapsedSections,
      [key]: !collapsedSections[key],
    };
    setCollapsedSections(newState);
    await saveCollapsedSections(newState);
  };

  const handleNavigateToStatus = (groupId: string) => {
    router.push(`/completed/${groupId}`);
  };

  const categoryViews = buildStatusCategoryViews();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {categoryViews.map(categoryView => {
          const { group, statusSections, totalCount } = categoryView;
          const hasMultipleOptions = group.option_ids.length > 1;

          // Auto-detect: render based on data structure
          if (hasMultipleOptions) {
            // Multiple status options → use nested component
            return (
              <NestedStatusSection
                key={group.id}
                group={group}
                statusSections={statusSections}
                totalCount={totalCount}
                isCollapsed={collapsedSections[group.id] || false}
                collapsedOptions={collapsedSections}
                onToggleGroup={() => handleToggleSection(group.id)}
                onToggleOption={(optionId) => handleToggleStatusOption(group.id, optionId)}
                onNavigateToGroup={() => handleNavigateToStatus(group.id)}
                onToggleTodo={handleToggleTodo}
                onPressTodo={handlePressTodo}
                onLongPressTodo={handleLongPressTodo}
              />
            );
          } else {
            // Single option → use existing StatusSection component
            const singleSection = statusSections[0];
            const legacyGroup: LegacyStatusGroup = {
              status: {
                id: singleSection.option.id,
                name: group.name,
                category: 'todo', // Will be properly mapped in future
                color: singleSection.option.color,
              },
              todos: singleSection.todos,
              count: singleSection.count,
            };
            return (
              <StatusSection
                key={group.id}
                statusGroup={legacyGroup}
                isCollapsed={collapsedSections[group.id] || false}
                onToggleCollapse={() => handleToggleSection(group.id)}
                onNavigateToStatus={() => handleNavigateToStatus(group.id)}
                onToggleTodo={handleToggleTodo}
                onPressTodo={handlePressTodo}
                onLongPressTodo={handleLongPressTodo}
              />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});