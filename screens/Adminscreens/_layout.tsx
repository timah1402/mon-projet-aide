import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboardScreen" />
      <Stack.Screen name="AdminFeaturesScreen" />
      <Stack.Screen name="AdminHostValidationScreen" />
      <Stack.Screen name="AdminDriverValidationScreen" />
      <Stack.Screen name="AdminDisputesScreen" />
      <Stack.Screen name="AdminIoTAlertsScreen" />
      <Stack.Screen name="AdminUserManagementScreen" />
    </Stack>
  );
}