import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function TenantFeaturesScreen() {
  const navigation = useNavigation();

  const features = [
    {
      label: 'Mes réservations',
      icon: <Ionicons name="calendar-outline" size={20} color="black" />,
      screen: 'TenantReservationsScreen',
    },

    
    {
      label: 'Moyens de paiement',
      icon: <FontAwesome5 name="credit-card" size={18} color="black" />,
      screen: 'TenantPaymentMethodsScreen',
    },
    {
      label: 'Factures & transactions',
      icon: <Ionicons name="document-text-outline" size={20} color="black" />,
      screen: 'TenantTransactionsScreen',
    },
    {
      label: 'Signaler un litige',
      icon: <Ionicons name="alert-circle-outline" size={20} color="black" />,
      screen: 'TenantDisputeScreen',
    },
    {
      label: 'Laisser un avis',
      icon: <Ionicons name="star-outline" size={20} color="black" />,
      screen: 'TenantReviewScreen',
    },

  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Menu locataire</Text>
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
