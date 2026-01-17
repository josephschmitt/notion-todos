import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusSectionView, Todo } from '../../types/todo';
import { TodoList } from '../todo/TodoList';

interface SubStatusSectionProps {
  section: StatusSectionView;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
  onLongPressTodo?: (todo: Todo) => void;
}

export function SubStatusSection({
  section,
  isCollapsed,
  onToggleCollapse,
  onToggleTodo,
  onPressTodo,
  onLongPressTodo,
}: SubStatusSectionProps) {
  const { option, todos, count } = section;

  // Don't render empty sections
  if (count === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header - collapse only, no navigation */}
      <TouchableOpacity
        style={styles.header}
        onPress={onToggleCollapse}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons
            name={isCollapsed ? 'chevron-forward' : 'chevron-down'}
            size={24}
            color="#6B7280"
            style={styles.disclosureIcon}
          />
          <Text style={styles.headerTitle}>{option.name}</Text>
        </View>
        <Text style={styles.taskCount}>{count}</Text>
      </TouchableOpacity>

      {/* Conditionally render todo list */}
      {!isCollapsed && (
        <View style={[styles.listContainer, { borderLeftColor: option.color }]}>
          <TodoList
            todos={todos}
            onToggleTodo={onToggleTodo}
            onPressTodo={onPressTodo}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Match task padding
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Match task checkbox marginRight
    flex: 1,
  },
  disclosureIcon: {
    width: 24, // Same size as checkbox
    marginTop: 2, // Match checkbox marginTop
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  taskCount: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 20,
    textAlign: 'right',
  },
  listContainer: {
    borderLeftWidth: 4,
  },
});
