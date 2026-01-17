import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusGroup, Todo } from '../../types/todo';
import { TodoList } from '../todo/TodoList';

interface StatusSectionProps {
  statusGroup: StatusGroup;
  isComplete: boolean;  // Complete category renders as link
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
  onPressCompleteGroup?: () => void;
  onLongPressTodo?: (todo: Todo) => void;  // For status picker (future)
}

export function StatusSection({
  statusGroup,
  isComplete,
  onToggleTodo,
  onPressTodo,
  onPressCompleteGroup,
  onLongPressTodo,
}: StatusSectionProps) {
  const { status, todos, count } = statusGroup;

  // Don't render empty sections
  if (count === 0) {
    return null;
  }

  // Complete category: render as collapsible link
  if (isComplete) {
    return (
      <TouchableOpacity
        style={styles.completeLinkContainer}
        onPress={onPressCompleteGroup}
        activeOpacity={0.7}
      >
        <View style={styles.completeLinkContent}>
          <Text style={styles.completeLinkTitle}>{status.name}</Text>
          <View style={styles.completeLinkRight}>
            <Text style={styles.completeLinkCount}>{count} tasks</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Expanded sections (To Do, In Progress): show header + todos
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{status.name}</Text>
        <Text style={styles.headerSubtitle}>{count} tasks</Text>
      </View>

      {/* Todo List with colored left border */}
      <View style={[styles.listContainer, { borderLeftColor: status.color }]}>
        <TodoList
          todos={todos}
          onToggleTodo={onToggleTodo}
          onPressTodo={onPressTodo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
  },
  completeLinkContainer: {
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 56,
    justifyContent: 'center',
  },
  completeLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  completeLinkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  completeLinkRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completeLinkCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});
