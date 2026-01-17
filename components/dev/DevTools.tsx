import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DEV_MODE } from '../../config/devMode';
import { DataSourcePicker } from './DataSourcePicker';
import { useTodos } from '../../contexts/TodoContext';

export function DevTools() {
  const [pickerVisible, setPickerVisible] = useState(false);
  const { currentDataSourceId, setDataSource } = useTodos();

  // Don't render if dev mode is disabled
  if (!DEV_MODE) {
    return null;
  }

  const handleSelectDataSource = (dataSourceId: string) => {
    setDataSource(dataSourceId);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPickerVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons name="hammer" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>DEV</Text>
      </TouchableOpacity>

      <DataSourcePicker
        visible={pickerVisible}
        currentDataSourceId={currentDataSourceId}
        onSelect={handleSelectDataSource}
        onClose={() => setPickerVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
