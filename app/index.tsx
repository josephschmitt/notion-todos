import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { StatusSection } from '../components/status/StatusSection';
import { Todo, StatusConfig, StatusGroup } from '../types/todo';
import { mockTodos } from '../mock/todoData';
import { mockStatusConfigs } from '../mock/statusData';

export default function TodosScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [statusConfigs] = useState<StatusConfig[]>(mockStatusConfigs);

  // Group todos by status
  const groupTodosByStatus = (): StatusGroup[] => {
    const groups: StatusGroup[] = [];

    statusConfigs.forEach(status => {
      const statusTodos = todos.filter(todo => todo.status === status.id);

      if (statusTodos.length > 0) {
        groups.push({
          status,
          todos: statusTodos,
          count: statusTodos.length,
        });
      }
    });

    // Sort: in_progress first, then todo, then complete
    const categoryOrder = { in_progress: 0, todo: 1, complete: 2 };
    groups.sort((a, b) =>
      categoryOrder[a.status.category] - categoryOrder[b.status.category]
    );

    return groups;
  };

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

  const handlePressCompleteGroup = (statusId: string) => {
    // Navigate to completed screen
    router.push(`/completed/${statusId}`);
  };

  const handleLongPressTodo = (todo: Todo) => {
    // Placeholder for future status picker menu
    console.log('Long pressed todo:', todo.title);
  };

  const statusGroups = groupTodosByStatus();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {statusGroups.map(group => (
          <StatusSection
            key={group.status.id}
            statusGroup={group}
            isComplete={group.status.category === 'complete'}
            onToggleTodo={handleToggleTodo}
            onPressTodo={handlePressTodo}
            onPressCompleteGroup={() => handlePressCompleteGroup(group.status.id)}
            onLongPressTodo={handleLongPressTodo}
          />
        ))}
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