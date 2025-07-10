import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function TenantTransactionsScreen() {
  // Navigation removed

  const transactions = [
    {
      id: 'INV-001',
      title: 'Réservation Pikine',
      amount: '54 000 CFA',
      date: '20/06/2024',
      host: 'Moussa Diagne',
      location: 'Pikine, Dakar',
      period: '20-23 juin 2024',
      status: 'Payé',
    },
    {
      id: 'INV-002',
      title: 'Espace Almadies',
      amount: '36 000 CFA',
      date: '10/06/2024',
      host: 'Fatou Sall',
      location: 'Almadies, Dakar',
      period: '10-12 juin 2024',
      status: 'Payé',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={tw`bg-white rounded-lg shadow px-4 py-4 mb-3 mx-4`}>
      <Text style={tw`text-base font-semibold`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-600`}>📅 {item.date}</Text>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-sm font-bold`}>{item.amount}</Text>
        <TouchableOpacity onPress={() => router.replace('/invoice-detail', { invoice: item })}>
          <Text style={tw`text-blue-600 text-sm`}>📜 Voir facture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Transactions & Factures</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pt-4 pb-10`}
      />
    </SafeAreaView>
  );
}
