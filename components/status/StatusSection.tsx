import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusGroup, Todo } from '../../types/todo';
import { TodoList } from '../todo/TodoList';

interface StatusSectionProps {
  statusGroup: StatusGroup;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateToStatus: () => void;
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
  onLongPressTodo?: (todo: Todo) => void;  // For status picker (future)
}

export function StatusSection({
  statusGroup,
  isCollapsed,
  onToggleCollapse,
  onNavigateToStatus,
  onToggleTodo,
  onPressTodo,
  onLongPressTodo,
}: StatusSectionProps) {
  const { status, todos, count } = statusGroup;

  // Don't render empty sections
  if (count === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header with two tappable areas */}
      <View style={styles.header}>
        {/* Left area: Disclosure triangle + Title → Tap to collapse/expand */}
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={onToggleCollapse}
          activeOpacity={0.7}
        >
          <Text style={styles.disclosureTriangle}>{isCollapsed ? '▸' : '▾'}</Text>
          <Text style={styles.headerTitle}>{status.name}</Text>
        </TouchableOpacity>

        {/* Right area: Count + Chevron → Tap to navigate */}
        <TouchableOpacity
          style={styles.headerRight}
          onPress={onNavigateToStatus}
          activeOpacity={0.7}
        >
          <Text style={styles.taskCount}>{count} tasks</Text>
          <Text style={styles.navigationChevron}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render todo list */}
      {!isCollapsed && (
        <View style={[styles.listContainer, { borderLeftColor: status.color }]}>
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
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    minHeight: 56,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  disclosureTriangle: {
    fontSize: 16,
    color: '#6B7280',
    width: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  navigationChevron: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 8,
  },
});
