import { Stack } from 'expo-router';

export default function ExpediteurLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExpediteurDashboardScreen" />
      <Stack.Screen name="ExpediteurFeaturesScreen" />
      <Stack.Screen name="DeliveryRequestScreen" />
      <Stack.Screen name="DeliveryHistoryScreen" />
      <Stack.Screen name="DeliveryTransactionsScreen" />
      <Stack.Screen name="ExpediteurDisputeScreen" />
      <Stack.Screen name="ExpediteurPaymentMethodsScreen" />
      <Stack.Screen name="SearchingDriverScreen" />
      <Stack.Screen name="DriverFoundScreen" />
    </Stack>
  );
}