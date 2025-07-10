import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
        <Stack.Screen name="monitoring" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="list-chat" />
        <Stack.Screen name="tracking" />
        <Stack.Screen name="leave-review" options={{ title: 'Donner un avis' }} />
        <Stack.Screen name="invoice-detail" />
        <Stack.Screen name="host" />
        <Stack.Screen name="tenant" />
        <Stack.Screen name="expediteur" />
        <Stack.Screen name="driver" />
        <Stack.Screen name="admin" />
      </Stack>
    </UserProvider>
  );
}