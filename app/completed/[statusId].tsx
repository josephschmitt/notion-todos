import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { TodoList } from '../../components/todo/TodoList';
import { Todo, StatusConfig } from '../../types/todo';
import { mockTodos } from '../../mock/todoData';
import { mockStatusConfigs, getStatusById } from '../../mock/statusData';

export default function CompletedStatusScreen() {
  const router = useRouter();
  const { statusId } = useLocalSearchParams<{ statusId: string }>();
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [statusConfigs] = useState<StatusConfig[]>(mockStatusConfigs);

  // Find the status config
  const status = getStatusById(statusId || '');

  // Filter todos by this status
  const statusTodos = todos.filter(todo => todo.status === statusId);

  const handleToggleTodo = (todoId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id !== todoId) return todo;

        // Toggle between not-started and done
        const newStatus = todo.status === 'done' ? 'not-started' : 'done';
        const newCategory = newStatus === 'done' ? 'complete' : 'todo';

        return {
          ...todo,
          status: newStatus,
          statusCategory: newCategory,
          completed: newCategory === 'complete',
          updatedAt: new Date(),
        };
      })
    );
  };

  const handlePressTodo = (todo: Todo) => {
    // Placeholder for future navigation to todo details
    console.log('Pressed todo:', todo.title);
  };

  if (!status) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Status not found</Text>
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
          <Text style={styles.title}>{status.name}</Text>
          <Text style={styles.count}>{statusTodos.length} tasks</Text>
        </View>

        {/* Todo List */}
        {statusTodos.length > 0 ? (
          <View style={[styles.listContainer, { borderLeftColor: status.color }]}>
            <TodoList
              todos={statusTodos}
              onToggleTodo={handleToggleTodo}
              onPressTodo={handlePressTodo}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks in this status</Text>
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
