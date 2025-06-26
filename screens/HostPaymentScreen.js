import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function HostPaymentScreen() {
  const navigation = useNavigation();

  const [iban, setIban] = useState('');
  const [mobileMoney, setMobileMoney] = useState('');

  const payoutHistory = [
    { id: '1', amount: '120 000 CFA', method: 'Orange Money', date: '18 juin 2025' },
    { id: '2', amount: '96 500 CFA', method: 'IBAN', date: '10 juin 2025' },
    { id: '3', amount: '110 000 CFA', method: 'Wave', date: '02 juin 2025' },
  ];

  const handleSave = () => {
    alert('Coordonnées mises à jour avec succès.');
  };

  const renderPayout = ({ item }) => (
    <View style={tw`flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded mb-2`}>
      <View>
        <Text style={tw`text-base font-semibold`}>{item.amount}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.method}</Text>
      </View>
      <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Paiements</Text>
      </View>

      <ScrollView style={tw`px-4 py-4`} keyboardShouldPersistTaps="handled">
        <Text style={tw`text-base font-semibold mb-2`}>Coordonnées de paiement</Text>

        <Text style={tw`text-sm mb-1`}>Numéro Mobile Money</Text>
        <TextInput
          placeholder="Ex: +221 77 123 45 67"
          value={mobileMoney}
          onChangeText={setMobileMoney}
          keyboardType="phone-pad"
          style={tw`border border-gray-300 rounded px-4 py-2 mb-4`}
        />

        <Text style={tw`text-sm mb-1`}>IBAN / RIB (optionnel)</Text>
        <TextInput
          placeholder="Ex: SN08 0100 1010 0100 1234 5678 900"
          value={iban}
          onChangeText={setIban}
          style={tw`border border-gray-300 rounded px-4 py-2 mb-6`}
        />

        <TouchableOpacity
          onPress={handleSave}
          style={tw`bg-blue-600 py-3 rounded`}
        >
          <Text style={tw`text-white text-center font-semibold`}>Enregistrer</Text>
        </TouchableOpacity>

        <Text style={tw`text-base font-semibold mt-8 mb-2`}>Historique des virements</Text>

        <FlatList
          data={payoutHistory}
          renderItem={renderPayout}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
