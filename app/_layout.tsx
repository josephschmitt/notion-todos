import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoProvider } from '../contexts/TodoContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TodoProvider>
        <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Todos',
            headerStyle: { backgroundColor: '#f9fafb' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="completed/[statusId]"
          options={{
            presentation: 'modal',
            title: 'Completed',
            headerStyle: { backgroundColor: '#f9fafb' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
      </TodoProvider>
    </SafeAreaProvider>
  );
}