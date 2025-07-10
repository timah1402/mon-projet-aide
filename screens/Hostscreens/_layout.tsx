import { Stack } from 'expo-router';

export default function HostLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HostDashboardScreen" />
      <Stack.Screen name="HostFeaturesScreen" options={{ title: 'Fonctionnalités Hôte' }} />
      <Stack.Screen name="HostPaymentScreen" />
      <Stack.Screen name="HostReviewScreen" />
      <Stack.Screen name="HostMyListingsScreen" />
    </Stack>
  );
}