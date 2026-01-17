import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SubStatusSection } from './SubStatusSection';
import { TodoList } from '../todo/TodoList';
import { StatusGroup, StatusSectionView, CollapsedSectionsState, Todo } from '../../types/todo';
import { getStatusOptionCollapseKey } from '../../utils/storage';

interface StatusGroupContentProps {
  group: StatusGroup;
  statusSections: StatusSectionView[];
  collapsedSections: CollapsedSectionsState;
  onToggleOption: (optionId: string) => void;
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
  onLongPressTodo?: (todo: Todo) => void;
}

/**
 * Renders the content of a status group (either nested sections or flat list)
 * Used by both the main screen and detail screens
 */
export function StatusGroupContent({
  group,
  statusSections,
  collapsedSections,
  onToggleOption,
  onToggleTodo,
  onPressTodo,
  onLongPressTodo,
}: StatusGroupContentProps) {
  const hasMultipleOptions = group.option_ids.length > 1;

  if (hasMultipleOptions) {
    // Multiple status options → render nested sections
    return (
      <>
        {statusSections.map((section) => {
          const collapseKey = getStatusOptionCollapseKey(group.id, section.option.id);
          return (
            <SubStatusSection
              key={section.option.id}
              section={section}
              isCollapsed={collapsedSections[collapseKey] || false}
              onToggleCollapse={() => onToggleOption(section.option.id)}
              onToggleTodo={onToggleTodo}
              onPressTodo={onPressTodo}
              onLongPressTodo={onLongPressTodo}
            />
          );
        })}
      </>
    );
  } else {
    // Single option → render flat list
    const singleSection = statusSections[0];
    if (!singleSection) return null;

    return (
      <View style={[styles.listContainer, { borderLeftColor: group.color }]}>
        <TodoList
          todos={singleSection.todos}
          onToggleTodo={onToggleTodo}
          onPressTodo={onPressTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
