import { Stack } from 'expo-router';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChauffeurDashboardScreen" />
      <Stack.Screen name="DriverFeatureScreen" />
      <Stack.Screen name="DriverAvailableMissionsScreen" />
      <Stack.Screen name="DriverEarningsScreen" />
    </Stack>
  );
}