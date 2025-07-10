import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function DriverEarningsScreen() {
  const navigation = useNavigation();

  const paymentHistory = [
    { id: '1', date: '26 juin 2025', amount: '15 000 FCFA', status: 'Payé', description: 'Livraison Supermarché Auchan' },
    { id: '2', date: '25 juin 2025', amount: '20 000 FCFA', status: 'Payé', description: 'Livraison Restaurant Le Baobab' },
    { id: '3', date: '24 juin 2025', amount: '18 000 FCFA', status: 'En attente', description: 'Livraison Pharmacie Dakar' },
    { id: '4', date: '23 juin 2025', amount: '22 000 FCFA', status: 'Payé', description: 'Livraison Hôtel Teranga' },
    { id: '5', date: '22 juin 2025', amount: '16 000 FCFA', status: 'Payé', description: 'Livraison Marché Kermel' },
    { id: '6', date: '21 juin 2025', amount: '19 000 FCFA', status: 'Payé', description: 'Livraison Bureau Poste' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Historique des gains</Text>
      </View>

      {/* Historique des paiements */}
      <FlatList
        data={paymentHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4 py-4`}
        renderItem={({ item }) => (
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-3`}>
            <View style={tw`flex-row justify-between items-start mb-2`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-bold text-gray-800 mb-1`}>{item.amount}</Text>
                <Text style={tw`text-sm text-gray-600`}>{item.description}</Text>
              </View>
              <View style={tw`items-end`}>
                <Text style={tw`text-sm text-gray-500 mb-1`}>{item.date}</Text>
                <View style={tw`flex-row items-center`}>
                  <Ionicons 
                    name={item.status === 'Payé' ? 'checkmark-circle' : 'time-outline'} 
                    size={16} 
                    color={item.status === 'Payé' ? '#16A34A' : '#EAB308'} 
                    style={tw`mr-1`}
                  />
                  <Text
                    style={tw`text-sm ${
                      item.status === 'Payé' ? 'text-green-600' : 'text-yellow-500'
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={tw`items-center justify-center py-12`}>
            <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
            <Text style={tw`text-gray-500 text-center mt-4`}>Aucun historique de paiement</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}