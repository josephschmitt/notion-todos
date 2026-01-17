import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusGroup, StatusSectionView, CollapsedSectionsState, Todo } from '../../types/todo';
import { StatusGroupContent } from './StatusGroupContent';

interface NestedStatusSectionProps {
  group: StatusGroup;
  statusSections: StatusSectionView[];
  totalCount: number;
  isCollapsed: boolean;
  collapsedOptions: CollapsedSectionsState;
  onToggleGroup: () => void;
  onToggleOption: (optionId: string) => void;
  onNavigateToGroup: () => void;
  onToggleTodo: (id: string) => void;
  onPressTodo?: (todo: Todo) => void;
  onLongPressTodo?: (todo: Todo) => void;
}

export function NestedStatusSection({
  group,
  statusSections,
  totalCount,
  isCollapsed,
  collapsedOptions,
  onToggleGroup,
  onToggleOption,
  onNavigateToGroup,
  onToggleTodo,
  onPressTodo,
  onLongPressTodo,
}: NestedStatusSectionProps) {
  // Don't render empty groups
  if (totalCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Parent group header - same style as StatusSection */}
      <View style={styles.header}>
        {/* Left area: Disclosure triangle + Title → Tap to collapse/expand */}
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={onToggleGroup}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isCollapsed ? 'chevron-forward' : 'chevron-down'}
            size={24}
            color="#6B7280"
            style={styles.disclosureIcon}
          />
          <Text style={styles.headerTitle}>{group.name}</Text>
        </TouchableOpacity>

        {/* Right area: Count + Chevron → Tap to navigate */}
        <TouchableOpacity
          style={styles.headerRight}
          onPress={onNavigateToGroup}
          activeOpacity={0.7}
        >
          <Text style={styles.taskCount}>{totalCount} tasks</Text>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Render sub-sections when not collapsed */}
      {!isCollapsed && (
        <View style={styles.subSectionsContainer}>
          <StatusGroupContent
            group={group}
            statusSections={statusSections}
            collapsedSections={collapsedOptions}
            onToggleOption={onToggleOption}
            onToggleTodo={onToggleTodo}
            onPressTodo={onPressTodo}
            onLongPressTodo={onLongPressTodo}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    minHeight: 56,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  disclosureIcon: {
    width: 24,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  subSectionsContainer: {
    marginTop: 8,
  },
});
