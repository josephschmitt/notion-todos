import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/todo';
import {
  getDefaultDataSource,
  getDataSourceById,
  DEFAULT_DATA_SOURCE_ID,
} from '../config/mockDataSources';
import { loadSelectedDataSource, saveSelectedDataSource } from '../utils/storage';

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  toggleTodo: (todoId: string) => void;
  currentDataSourceId: string;
  setDataSource: (dataSourceId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const defaultSource = getDefaultDataSource();
  const [currentDataSourceId, setCurrentDataSourceId] = useState<string>(DEFAULT_DATA_SOURCE_ID);
  const [todos, setTodos] = useState<Todo[]>(defaultSource.todos);

  // Load persisted data source on mount
  useEffect(() => {
    const loadDataSource = async () => {
      const savedDataSourceId = await loadSelectedDataSource();
      if (savedDataSourceId) {
        const dataSource = getDataSourceById(savedDataSourceId);
        if (dataSource) {
          setCurrentDataSourceId(savedDataSourceId);
          setTodos(dataSource.todos);
        }
      }
    };
    loadDataSource();
  }, []);

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

  const setDataSource = async (dataSourceId: string) => {
    const dataSource = getDataSourceById(dataSourceId);
    if (dataSource) {
      setCurrentDataSourceId(dataSourceId);
      setTodos(dataSource.todos);
      await saveSelectedDataSource(dataSourceId);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        toggleTodo,
        currentDataSourceId,
        setDataSource,
      }}
    >
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
