import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminDriverValidationScreen() {
  const navigation = useNavigation();

  const [pendingDrivers, setPendingDrivers] = useState([
    {
      id: 1,
      name: 'Amadou Ba',
      phone: '+221 77 123 45 67',
      license: 'Permis B123456',
      idCard: 'CNI 123456789',
    },
    {
      id: 2,
      name: 'Mariama Diouf',
      phone: '+221 77 765 43 21',
      license: 'Permis C654321',
      idCard: 'CNI 987654321',
    },
  ]);

  const handleDecision = (id, decision) => {
    Alert.alert(
      `${decision === 'validate' ? 'Valider' : 'Rejeter'} le chauffeur`,
      `Êtes-vous sûr de vouloir ${decision === 'validate' ? 'valider' : 'rejeter'} ce chauffeur ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          onPress: () => {
            setPendingDrivers(pendingDrivers.filter(driver => driver.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-6 text-green-700 text-center`}>Validation Chauffeurs</Text>

        {pendingDrivers.length === 0 ? (
          <View style={tw`items-center justify-center mt-20`}>
            <Ionicons name="checkmark-circle-outline" size={64} color="green" />
            <Text style={tw`text-lg font-semibold mt-4`}>Aucun chauffeur en attente</Text>
          </View>
        ) : (
          pendingDrivers.map(driver => (
            <View key={driver.id} style={tw`bg-white p-5 mb-4 rounded-xl shadow`}>
              <Text style={tw`text-lg font-bold mb-1 text-gray-800`}>{driver.name}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>📞 Téléphone : {driver.phone}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>🚗 Permis : {driver.license}</Text>
              <Text style={tw`text-sm text-gray-600 mb-4`}>🆔 Pièce d’identité : {driver.idCard}</Text>

              <View style={tw`bg-gray-100 p-3 rounded-md mb-4`}>
                <Text style={tw`text-sm text-gray-700 mb-1 font-semibold`}>Pièces justificatives :</Text>
                <Text style={tw`text-xs text-blue-600 mb-1`}>• Voir Permis (PDF)</Text>
                <Text style={tw`text-xs text-blue-600`}>• Voir CNI (Image)</Text>
              </View>

              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => handleDecision(driver.id, 'reject')}
                  style={tw`bg-red-500 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Text style={tw`text-white font-semibold`}>Rejeter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDecision(driver.id, 'validate')}
                  style={tw`bg-green-600 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Text style={tw`text-white font-semibold`}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
