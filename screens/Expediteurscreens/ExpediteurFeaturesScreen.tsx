import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function ExpediteurFeaturesScreen() {
  // Navigation removed

  const features = [
    {
      label: 'Mes livraisons',
      icon: <Ionicons name="cube-outline" size={20} color="black" />,
      screen: 'DeliveryHistoryScreen',
    },
    {
      label: 'Moyens de paiement',
      icon: <Ionicons name="card-outline" size={20} color="black" />,
      screen: 'ExpediteurPaymentMethodsScreen',
    },
    {
      label: 'Signaler un problème',
      icon: <Ionicons name="alert-circle-outline" size={20} color="black" />,
      screen: 'ExpediteurDisputeScreen',
    },
    {
      label: 'Factures & historique',
      icon: <Ionicons name="document-text-outline" size={20} color="black" />,
      screen: 'DeliveryTransactionsScreen',
    },
    {
      label: 'Paramètres du compte',
      icon: <Ionicons name="settings-outline" size={20} color="black" />,
      screen: 'ExpediteurSettingsScreen',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Menu Expéditeur</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {features.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(item.screen)}
            style={tw`flex-row items-center bg-gray-100 px-4 py-4 rounded-lg mb-3`}
          >
            <View style={tw`mr-3`}>{item.icon}</View>
            <Text style={tw`text-base`}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
