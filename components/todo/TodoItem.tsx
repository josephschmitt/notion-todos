import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onPress?: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onPress }: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handlePress = () => {
    onPress?.(todo);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
    >
      {/* Checkbox */}
      <Pressable
        onPress={handleToggle}
        style={[
          styles.checkbox,
          todo.completed ? styles.checkboxCompleted : styles.checkboxIncomplete
        ]}
      >
        {todo.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            todo.completed && styles.titleCompleted
          ]}
        >
          {todo.title}
        </Text>

        {todo.notes && (
          <Text
            style={[
              styles.notes,
              todo.completed && styles.notesCompleted
            ]}
          >
            {todo.notes}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxIncomplete: {
    backgroundColor: '#ffffff',
    borderColor: '#D1D5DB',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#111827',
  },
  titleCompleted: {
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  notes: {
    fontSize: 14,
    marginTop: 4,
    color: '#6B7280',
  },
  notesCompleted: {
    color: '#9CA3AF',
  },
});