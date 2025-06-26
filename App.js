import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HostDashboardScreen from './screens/HostDashboard';
import CreateListingScreen from './screens/CreateListing';
import SearchScreen from './screens/SearchScreen';
import MonitoringScreen from './screens/Monitoring';
import TenantDashboard from './screens/TenantDashboard';
import ChatScreen from './screens/ChatScreen';
import ViewDetailsScreen from './screens/ViewDetailsScreen';
import ExpediteurDashboardScreen from './screens/ExpediteurDashboard';
import TrackingScreen from './screens/TrackingScreen';
import DeliveryRequestScreen from './screens/DeliveryRequestScreen';
import ChauffeurDashboardScreen from './screens/DriverDashboard';
import LeaveReviewScreen from './screens/LeaveReviewScreen';
import HostFeaturesScreen from './screens/HostFeaturesScreen';
import ListChatScreen from './screens/ListChatScreen';
import HostPaymentScreen from './screens/HostPaymentScreen';
import ReservationRequestsScreen from './screens/ReservationRequestsScreen';
import HostReviewScreen from './screens/HostReviewScreen';
import HostMyListingsScreen from './screens/HostMyListingsScreen';
import TenantFeaturesScreen from './screens/TenantFeaturesScreen';
import TenantReservationsScreen from './screens/TenantReservationsScreen';
import ReservationEditScreen from './screens/ReservationEditScreen';
import TenantPaymentMethodsScreen from './screens/TenantPaymentMethodsScreen';
import TenantTransactionsScreen from './screens/TenantTransactionsScreen';
import InvoiceDetailScreen from './screens/InvoiceDetailScreen';
import TenantDisputeScreen from './screens/TenantDisputeScreen';
import TenantReviewScreen from './screens/TenantReviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TenantDashboard" screenOptions={{ headerShown: false }}>
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
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}
