import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Pages principales */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="home" />
        
        {/* Écrans Admin */}
        <Stack.Screen name="admin-dashboard" />
        <Stack.Screen name="admin-features" />
        <Stack.Screen name="admin-host-validation" />
        <Stack.Screen name="admin-driver-validation" />
        <Stack.Screen name="admin-disputes" />
        <Stack.Screen name="admin-iot-alerts" />
        <Stack.Screen name="admin-user-management" />
        
        {/* Écrans Host */}
        <Stack.Screen name="host-dashboard" />
        <Stack.Screen name="host-features" />
        <Stack.Screen name="host-payment" />
        <Stack.Screen name="host-reviews" />
        <Stack.Screen name="host-my-listings" />
        
        {/* Écrans Tenant */}
        <Stack.Screen name="tenant-dashboard" />
        <Stack.Screen name="create-listing" />
        <Stack.Screen name="search" />
        <Stack.Screen name="view-details" />
        <Stack.Screen name="tenant-features" />
        <Stack.Screen name="tenant-reservations" />
        <Stack.Screen name="reservation-edit" />
        <Stack.Screen name="tenant-payment-methods" />
        <Stack.Screen name="tenant-transactions" />
        <Stack.Screen name="tenant-dispute" />
        <Stack.Screen name="tenant-review" />
        <Stack.Screen name="reservation-requests" />
        
        {/* Écrans Expediteur */}
        <Stack.Screen name="expediteur-dashboard" />
        <Stack.Screen name="expediteur-features" />
        <Stack.Screen name="delivery-request" />
        <Stack.Screen name="delivery-history" />
        <Stack.Screen name="delivery-transactions" />
        <Stack.Screen name="expediteur-dispute" />
        <Stack.Screen name="expediteur-payment-methods" />
        <Stack.Screen name="searching-driver" />
        <Stack.Screen name="driver-found" />
        
        {/* Écrans Driver/Chauffeur */}
        <Stack.Screen name="chauffeur-dashboard" />
        <Stack.Screen name="driver-features" />
        <Stack.Screen name="driver-available-missions" />
        <Stack.Screen name="driver-earnings" />
        
        {/* Écrans partagés */}
        <Stack.Screen name="monitoring" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="list-chat" />
        <Stack.Screen name="leave-review" />
        <Stack.Screen name="tracking" />
        <Stack.Screen name="invoice-detail" />
      </Stack>
    </UserProvider>
  );
}