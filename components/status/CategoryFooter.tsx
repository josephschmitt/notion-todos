import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusGroup } from '@/types/todo';

interface CategoryFooterProps {
  group: StatusGroup;
  totalCount: number;
  onNavigate: () => void;
}

export function CategoryFooter({ group, totalCount, onNavigate }: CategoryFooterProps) {
  // Notion category name mapping
  const categoryLabel = {
    'in-progress-group': 'In Progress',
    'not-started-group': 'To-do',
    'done-group': 'Complete',
  }[group.id] || group.name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.footer}
        onPress={onNavigate}
        activeOpacity={0.7}
      >
        <Text style={styles.footerText}>
          View {totalCount} {categoryLabel} tasks
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
