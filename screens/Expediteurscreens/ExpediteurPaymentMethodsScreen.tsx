import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function ExpediteurPaymentMethodsScreen() {
  // Navigation removed

  const [cards, setCards] = useState([
    { id: '1', type: 'Visa', number: '**** **** **** 1234' },
    { id: '2', type: 'MasterCard', number: '**** **** **** 5678' },
  ]);

  const removeCard = (id) => {
    Alert.alert('Carte supprimée', 'Votre carte a été retirée.');
    setCards(cards.filter((card) => card.id !== id));
  };

  const addCard = () => {
    Alert.alert('Ajouter une carte', 'Simulation : nouvelle carte ajoutée.');
    setCards([
      ...cards,
      { id: Date.now().toString(), type: 'Visa', number: '**** **** **** 9999' },
    ]);
  };

  const renderCard = ({ item }) => (
    <View style={tw`bg-gray-100 rounded-xl p-4 mb-3 flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-base font-semibold`}>{item.type}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.number}</Text>
      </View>
      <TouchableOpacity onPress={() => removeCard(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Moyens de paiement</Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={tw`p-4 pb-10`}
        ListEmptyComponent={
          <Text style={tw`text-center text-gray-500 mt-20`}>
            Aucun moyen de paiement enregistré.
          </Text>
        }
      />

      {/* Add button */}
      <TouchableOpacity
        onPress={addCard}
        style={tw`bg-blue-600 py-3 rounded-xl mx-4 my-4 flex-row justify-center items-center`}
      >
        <Ionicons name="add-circle-outline" size={20} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white font-semibold text-base`}>Ajouter un moyen de paiement</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
