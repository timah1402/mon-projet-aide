import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HostDashboardScreen from './screens/HostDashboard';
import CreateListingScreen from './screens/CreateListing'
import SearchScreen from './screens/SearchScreen';
import MonitoringScreen from './screens/Monitoring';
import TenantDashboard from './screens/TenantDashboard';
import ChatScreen from './screens/ChatScreen';
import ViewDetailsScreen from './screens/ViewDetailsScreen';
export default function App() {
  return (
 <ViewDetailsScreen></ViewDetailsScreen>
  );
}
