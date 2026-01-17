import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TodoList as TodoListType, Todo } from '../../types/todo';
import { TodoList } from '../todo/TodoList';

interface ListSectionProps {
  list: TodoListType;
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
}

export function ListSection({
  list,
  todos,
  onToggleTodo,
  onPressTodo
}: ListSectionProps) {
  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  // Don't render the section if there are no todos
  if (todos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {list.icon && (
            <Text style={styles.headerIcon}>{list.icon} </Text>
          )}
          {list.name}
        </Text>
        <Text style={styles.headerSubtitle}>
          {incompleteTodos.length} remaining
        </Text>
      </View>

      {/* Todo Lists */}
      <View style={styles.listContainer}>
        {/* Incomplete todos first */}
        {incompleteTodos.length > 0 && (
          <TodoList
            todos={incompleteTodos}
            onToggleTodo={onToggleTodo}
            onPressTodo={onPressTodo}
          />
        )}

        {/* Separator between completed and incomplete if both exist */}
        {incompleteTodos.length > 0 && completedTodos.length > 0 && (
          <View style={styles.separator} />
        )}

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <TodoList
            todos={completedTodos}
            onToggleTodo={onToggleTodo}
            onPressTodo={onPressTodo}
          />
        )}
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
  headerIcon: {
    marginRight: 8,
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
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});