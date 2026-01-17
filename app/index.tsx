import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListSection } from '../components/lists/ListSection';
import { Todo, TodoList } from '../types/todo';
import { mockTodos, mockLists } from '../mock/todoData';

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [lists] = useState<TodoList[]>(mockLists);

  const handleToggleTodo = (todoId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date()
            }
          : todo
      )
    );
  };

  const handlePressTodo = (todo: Todo) => {
    // Placeholder for future navigation to todo details
    console.log('Pressed todo:', todo.title);
  };

  const getTodosForList = (listId: string): Todo[] => {
    return todos.filter(todo => todo.listId === listId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {lists.map(list => (
          <ListSection
            key={list.id}
            list={list}
            todos={getTodosForList(list.id)}
            onToggleTodo={handleToggleTodo}
            onPressTodo={handlePressTodo}
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