import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Todo } from '../../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
}

export function TodoList({ todos, onToggleTodo, onPressTodo }: TodoListProps) {
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={onToggleTodo}
      onPress={onPressTodo}
    />
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginLeft: 48,
  },
});