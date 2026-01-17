import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { StatusSection } from '../components/status/StatusSection';
import { SubStatusSection } from '../components/status/SubStatusSection';
import { CategoryFooter } from '../components/status/CategoryFooter';
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
import { buildStatusCategoryViews } from '../utils/statusHelpers';
import { useTodos } from '../contexts/TodoContext';

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
  const categoryViews = buildStatusCategoryViews(mockStatusGroups, mockStatusOptions, todos);

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
            // Multiple status options → render flat sections with category footer
            return (
              <React.Fragment key={group.id}>
                {/* Render all status options for this category */}
                {statusSections.map(section => (
                  <SubStatusSection
                    key={section.option.id}
                    section={section}
                    isCollapsed={collapsedSections[section.option.id] || false}
                    onToggleCollapse={() => handleToggleStatusOption(group.id, section.option.id)}
                    onToggleTodo={handleToggleTodo}
                    onPressTodo={handlePressTodo}
                    onLongPressTodo={handleLongPressTodo}
                  />
                ))}

                {/* Category footer link */}
                <CategoryFooter
                  group={group}
                  totalCount={totalCount}
                  onNavigate={() => handleNavigateToStatus(group.id)}
                />
              </React.Fragment>
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
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
});