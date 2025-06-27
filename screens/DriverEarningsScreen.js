import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function DriverEarningsScreen() {
  const navigation = useNavigation();

  const earningsSummary = [
    { label: "Aujourd'hui", amount: "15 000 FCFA" },
    { label: "Cette semaine", amount: "82 000 FCFA" },
    { label: "Ce mois", amount: "340 000 FCFA" },
  ];

  const paymentHistory = [
    { id: '1', date: '26 juin 2025', amount: '15 000 FCFA', status: 'Payé' },
    { id: '2', date: '25 juin 2025', amount: '20 000 FCFA', status: 'Payé' },
    { id: '3', date: '24 juin 2025', amount: '18 000 FCFA', status: 'En attente' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mes gains</Text>
      </View>

      {/* Résumé des gains */}
      <View style={tw`flex-row justify-between px-4 mb-6`}>
        {earningsSummary.map((item, i) => (
          <View key={i} style={tw`bg-gray-100 rounded-xl p-4 flex-1 mx-1 items-center`}>
            <Text style={tw`text-gray-500 text-xs mb-1`}>{item.label}</Text>
            <Text style={tw`text-lg font-bold text-gray-800`}>{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Historique des paiements */}
      <FlatList
        data={paymentHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4 pb-6`}
        ListHeaderComponent={<Text style={tw`text-lg font-semibold mb-4`}>Historique des paiements</Text>}
        renderItem={({ item }) => (
          <View style={tw`bg-gray-100 p-4 rounded-lg mb-3`}>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-base font-bold text-gray-800`}>{item.amount}</Text>
              <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
            </View>
            <Text
              style={tw`text-sm ${
                item.status === 'Payé' ? 'text-green-600' : 'text-yellow-500'
              }`}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
