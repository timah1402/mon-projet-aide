import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function DeliveryTransactionsScreen() {
  // Navigation removed

  const transactions = [
    {
      id: 'INV-001',
      title: 'Livraison Pikine -> Almadies',
      amount: '8 500 CFA',
      date: '25/06/2024',
      status: 'Payé',
    },
    {
      id: 'INV-002',
      title: 'Livraison Rufisque -> VDN',
      amount: '12 000 CFA',
      date: '20/06/2024',
      status: 'Payé',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={tw`bg-gray-100 rounded-lg p-4 mb-3 mx-4`}>
      <Text style={tw`text-base font-semibold mb-1`}>{item.title}</Text>
      <Text style={tw`text-xs text-gray-600`}>📅 {item.date}</Text>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-sm font-bold`}>{item.amount}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('InvoiceDetailScreen', { invoice: item })}
        >
          <Text style={tw`text-blue-600 text-sm`}>📜 Voir facture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
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
