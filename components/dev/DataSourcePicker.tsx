import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_DATA_SOURCES, MockDataSource } from '../../config/mockDataSources';

interface DataSourcePickerProps {
  visible: boolean;
  currentDataSourceId: string;
  onSelect: (dataSourceId: string) => void;
  onClose: () => void;
}

export function DataSourcePicker({
  visible,
  currentDataSourceId,
  onSelect,
  onClose,
}: DataSourcePickerProps) {
  const handleSelect = (dataSourceId: string) => {
    onSelect(dataSourceId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mock Data Sources</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Data Sources List */}
        <ScrollView style={styles.scrollView}>
          {MOCK_DATA_SOURCES.map((source: MockDataSource) => {
            const isSelected = source.id === currentDataSourceId;
            return (
              <TouchableOpacity
                key={source.id}
                style={[styles.sourceItem, isSelected && styles.sourceItemSelected]}
                onPress={() => handleSelect(source.id)}
                activeOpacity={0.7}
              >
                <View style={styles.sourceContent}>
                  <View style={styles.sourceHeader}>
                    <Text style={styles.sourceName}>{source.name}</Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                    )}
                  </View>
                  <Text style={styles.sourceDescription}>{source.description}</Text>
                  <View style={styles.sourceStats}>
                    <Text style={styles.statText}>
                      {source.todos.length} todos
                    </Text>
                    <Text style={styles.statDivider}>•</Text>
                    <Text style={styles.statText}>
                      {source.statusGroups.length} groups
                    </Text>
                    <Text style={styles.statDivider}>•</Text>
                    <Text style={styles.statText}>
                      {source.statusOptions.length} statuses
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dev Mode Notice */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🛠️ Dev Mode: Data source selection persists across restarts
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sourceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  sourceItemSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  sourceContent: {
    gap: 8,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sourceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  sourceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  statDivider: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  footerText: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
  },
});
