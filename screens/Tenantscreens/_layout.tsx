import { Stack } from 'expo-router';

export default function TenantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TenantDashboard" />
      <Stack.Screen name="CreateListingScreen" />
      <Stack.Screen name="SearchScreen" />
      <Stack.Screen name="ViewDetailsScreen" />
      <Stack.Screen name="TenantFeaturesScreen" />
      <Stack.Screen name="TenantReservationsScreen" />
      <Stack.Screen name="ReservationEditScreen" />
      <Stack.Screen name="TenantPaymentMethodsScreen" />
      <Stack.Screen name="TenantTransactionsScreen" />
      <Stack.Screen name="TenantDisputeScreen" />
      <Stack.Screen name="TenantReviewScreen" />
      <Stack.Screen name="ReservationRequestsScreen" />
    </Stack>
  );
}