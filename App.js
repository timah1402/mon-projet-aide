import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HostDashboardScreen from './screens/Hostscreens/HostDashboard';
import CreateListingScreen from './screens/Tenantscreens/CreateListing';
import SearchScreen from './screens/Tenantscreens/SearchScreen';
import MonitoringScreen from './screens/Monitoring';
import TenantDashboard from './screens/Tenantscreens/TenantDashboard';
import ChatScreen from './screens/ChatScreen';
import ViewDetailsScreen from './screens/Tenantscreens/ViewDetailsScreen';
import ExpediteurDashboardScreen from './screens/Expediteurscreens/ExpediteurDashboard';
import TrackingScreen from './screens/TrackingScreen';
import DeliveryRequestScreen from './screens/Expediteurscreens/DeliveryRequestScreen';
import ChauffeurDashboardScreen from './screens/Driverscreens/DriverDashboard';
import LeaveReviewScreen from './screens/LeaveReviewScreen';
import HostFeaturesScreen from './screens/Hostscreens/HostFeaturesScreen';
import ListChatScreen from './screens/ListChatScreen';
import HostPaymentScreen from './screens/Hostscreens/HostPaymentScreen';
import ReservationRequestsScreen from './screens/Tenantscreens/ReservationRequestsScreen';
import HostReviewScreen from './screens/Hostscreens/HostReviewScreen';
import HostMyListingsScreen from './screens/Hostscreens/HostMyListingsScreen';
import TenantFeaturesScreen from './screens/Tenantscreens/TenantFeaturesScreen';
import TenantReservationsScreen from './screens/Tenantscreens/TenantReservationsScreen';
import ReservationEditScreen from './screens/Tenantscreens/ReservationEditScreen';
import TenantPaymentMethodsScreen from './screens/Tenantscreens/TenantPaymentMethodsScreen';
import TenantTransactionsScreen from './screens/Tenantscreens/TenantTransactionsScreen';
import InvoiceDetailScreen from './screens/InvoiceDetailScreen';
import TenantDisputeScreen from './screens/Tenantscreens/TenantDisputeScreen';
import TenantReviewScreen from './screens/Tenantscreens/TenantReviewScreen';
import ExpediteurFeaturesScreen from './screens/Expediteurscreens/ExpediteurFeaturesScreen';
import DeliveryHistoryScreen from './screens/Expediteurscreens/DeliveryHistoryScreen';
import DeliveryTransactionsScreen from './screens/Expediteurscreens/DeliveryTransactionsScreen';
import ExpediteurDisputeScreen from './screens/Expediteurscreens/ExpediteurDisputeScreen';
import ExpediteurPaymentMethodsScreen from './screens/Expediteurscreens/ExpediteurPaymentMethodsScreen';
import SearchingDriverScreen from './screens/Expediteurscreens/SearchingDriverScreen';
import DriverFoundScreen from './screens/Expediteurscreens/DriverFoundScreen';
import DriverFeatureScreen from './screens/Driverscreens/DriverFeatureScreen';
import DriverAvailableMissionsScreen from './screens/Driverscreens/DriverAvailableMissionsScreen';
import DriverEarningsScreen from './screens/Driverscreens/DriverEarningsScreen'
import { UserProvider } from './context/UserContext';
import AdminDashboardScreen from './screens/Adminscreens/AdminDashboardScreen';
import AdminFeaturesScreen from './screens/Adminscreens/AdminFeaturesScreen';
import AdminHostValidationScreen from './screens/Adminscreens/AdminHostValidationScreen';
import AdminDriverValidationScreen from './screens/Adminscreens/AdminDriverValidationScreen';
import AdminDisputesScreen from './screens/Adminscreens/AdminDisputesScreen';
import AdminIoTAlertsScreen from './screens/Adminscreens/AdminIoTAlertsScreen';
import AdminUserManagementScreen from './screens/Adminscreens/AdminUserManagementScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HostDashboardScreen" component={HostDashboardScreen} />
        <Stack.Screen name="CreateListingScreen" component={CreateListingScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MonitoringScreen" component={MonitoringScreen} />
        <Stack.Screen name="TenantDashboard" component={TenantDashboard} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ViewDetailsScreen" component={ViewDetailsScreen} />
        <Stack.Screen name="ExpediteurDashboardScreen" component={ExpediteurDashboardScreen} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen name="DeliveryRequestScreen" component={DeliveryRequestScreen} />
        <Stack.Screen name="ChauffeurDashboardScreen" component={ChauffeurDashboardScreen} />
        <Stack.Screen name="LeaveReviewScreen" component={LeaveReviewScreen} options={{ title: 'Donner un avis' }} />
        <Stack.Screen name="HostFeaturesScreen" component={HostFeaturesScreen} options={{ title: 'Fonctionnalités Hôte' }} />
        <Stack.Screen name="ListChatScreen"component={ListChatScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HostPaymentScreen"component={HostPaymentScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="ReservationRequestsScreen" component={ReservationRequestsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HostReviewScreen" component={HostReviewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HostMyListingsScreen" component={HostMyListingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TenantFeaturesScreen"component={TenantFeaturesScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="TenantReservationsScreen" component={TenantReservationsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ReservationEditScreen" component={ReservationEditScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TenantPaymentMethodsScreen" component={TenantPaymentMethodsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TenantTransactionsScreen"component={TenantTransactionsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="InvoiceDetailScreen" component={InvoiceDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TenantDisputeScreen" component={TenantDisputeScreen} ptions={{ headerShown: false }}/>
        <Stack.Screen name="TenantReviewScreen" component={TenantReviewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ExpediteurFeaturesScreen"component={ExpediteurFeaturesScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="DeliveryHistoryScreen" component={DeliveryHistoryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DeliveryTransactionsScreen" component={DeliveryTransactionsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ExpediteurDisputeScreen" component={ExpediteurDisputeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ExpediteurPaymentMethodsScreen" component={ExpediteurPaymentMethodsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchingDriverScreen" component={SearchingDriverScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="DriverFoundScreen"component={DriverFoundScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="DriverFeatureScreen" component={DriverFeatureScreen} />
        <Stack.Screen name="DriverAvailableMissionsScreen" component={DriverAvailableMissionsScreen} />
        <Stack.Screen name="DriverEarningsScreen" component={DriverEarningsScreen} />
        <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminFeaturesScreen" component={AdminFeaturesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHostValidationScreen" component={AdminHostValidationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDriverValidationScreen" component={AdminDriverValidationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDisputesScreen" component={AdminDisputesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminIoTAlertsScreen" component={AdminIoTAlertsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminUserManagementScreen" component={AdminUserManagementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
