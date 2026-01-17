import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { StatusGroupContent } from '../../components/status/StatusGroupContent';
import { Todo, CollapsedSectionsState } from '../../types/todo';
import { getDataSourceById } from '../../config/mockDataSources';
import { useTodos } from '../../contexts/TodoContext';
import { loadCollapsedSections, saveCollapsedSections, getStatusOptionCollapseKey } from '../../utils/storage';
import { buildStatusSections } from '../../utils/statusHelpers';

export default function CompletedStatusScreen() {
  const { statusId } = useLocalSearchParams<{ statusId: string }>();
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

  // Find the status group and build sections
  const group = mockStatusGroups.find(g => g.id === statusId);
  const { statusSections, totalCount } = group
    ? buildStatusSections(group, mockStatusOptions, todos)
    : { statusSections: [], totalCount: 0 };

  const handleToggleTodo = (todoId: string) => {
    toggleTodo(todoId);
  };

  const handlePressTodo = (todo: Todo) => {
    // Placeholder for future navigation to todo details
    console.log('Pressed todo:', todo.title);
  };

  const handleToggleStatusOption = async (optionId: string) => {
    if (!group) return;
    const key = getStatusOptionCollapseKey(group.id, optionId);
    const newState = {
      ...collapsedSections,
      [key]: !collapsedSections[key],
    };
    setCollapsedSections(newState);
    await saveCollapsedSections(newState);
  };

  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Status group not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{group.name}</Text>
          <Text style={styles.count}>{totalCount} tasks</Text>
        </View>

        {/* Content - nested sections or flat list */}
        {totalCount > 0 && group ? (
          <StatusGroupContent
            group={group}
            statusSections={statusSections}
            collapsedSections={collapsedSections}
            onToggleOption={handleToggleStatusOption}
            onToggleTodo={handleToggleTodo}
            onPressTodo={handlePressTodo}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks in this group</Text>
          </View>
        )}
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
  },
});
