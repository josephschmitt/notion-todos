import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '../types/todo';
import { mockTodos } from '../mock';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleTodo: (todoId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);

  const toggleTodo = (todoId: string) => {
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

  return (
    <TodoContext.Provider value={{ todos, setTodos, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
