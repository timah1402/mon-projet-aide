// screens/VendeurFeaturesScreen.tsx
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function VendeurFeaturesScreen() {
  // Helper pour la navigation
  const navigateToScreen = (screenName: string) => {
    switch (screenName) {
      case 'VendeurInventoryScreen':
        router.push('/vendeur-inventory');
        break;
      case 'VendeurPaymentMethodsScreen':
        router.push('/vendeur-payment-methods');
        break;
      case 'VendeurTransactionsScreen':
        router.push('/vendeur-transactions');
        break;
      case 'VendeurReviewsScreen':
        router.push('/vendeur-reviews');
        break;
      case 'ListChatScreen':
        router.push('/list-chat');
        break;
      case 'VendeurInvoicesScreen':
        router.push('/vendeur-invoices');
        break;
      default:
        console.warn(`Route non trouvée pour: ${screenName}`);
    }
  };

  const features = [
    {
      label: 'Gestion du stock',
      icon: <MaterialIcons name="inventory" size={20} color="black" />,
      screen: 'VendeurInventoryScreen',
    },
    {
      label: 'Messages',
      icon: <Ionicons name="chatbubble-outline" size={20} color="black" />,
      screen: 'ListChatScreen',
    },
    {
      label: 'Revenus & transactions',
      icon: <FontAwesome5 name="money-bill-wave" size={18} color="black" />,
      screen: 'VendeurTransactionsScreen',
    },
    {
      label: 'Factures',
      icon: <MaterialIcons name="receipt" size={20} color="black" />,
      screen: 'VendeurInvoicesScreen',
    },
    {
      label: 'Avis clients',
      icon: <Ionicons name="star-outline" size={20} color="black" />,
      screen: 'VendeurReviewsScreen',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Menu vendeur</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {features.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigateToScreen(item.screen)}
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