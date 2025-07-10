import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import

export default function AdminHostValidationScreen() {
  // Navigation removed

  const [pendingListings, setPendingListings] = useState([
    {
      id: 1,
      title: 'Chambre froide Almadies',
      host: 'Moussa Diop',
      address: 'Almadies, Dakar',
      volume: '20 m³',
      tempRange: '0-4°C',
    },
    {
      id: 2,
      title: 'Espace réfrigéré Plateau',
      host: 'Fatou Sow',
      address: 'Plateau, Dakar',
      volume: '15 m³',
      tempRange: '-2-3°C',
    },
  ]);

  const handleDecision = (id, decision) => {
    Alert.alert(
      `${decision === 'validate' ? 'Valider' : 'Rejeter'} l’annonce`,
      `Êtes-vous sûr de vouloir ${decision === 'validate' ? 'valider' : 'rejeter'} cette annonce ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          onPress: () => {
            setPendingListings(pendingListings.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-6 text-green-700 text-center`}>Validation Annonces Hôte</Text>

        {pendingListings.length === 0 ? (
          <View style={tw`items-center justify-center mt-20`}>
            <Ionicons name="checkmark-circle-outline" size={64} color="green" />
            <Text style={tw`text-lg font-semibold mt-4`}>Aucune annonce en attente</Text>
          </View>
        ) : (
          pendingListings.map(listing => (
            <View key={listing.id} style={tw`bg-white p-5 mb-4 rounded-xl shadow`}>
              <Text style={tw`text-lg font-bold mb-1 text-gray-800`}>{listing.title}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>👤 Hôte : {listing.host}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>📍 {listing.address}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>📦 Volume : {listing.volume}</Text>
              <Text style={tw`text-sm text-gray-600 mb-4`}>🌡️ Température : {listing.tempRange}</Text>

              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => handleDecision(listing.id, 'reject')}
                  style={tw`bg-red-500 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Text style={tw`text-white font-semibold`}>Rejeter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDecision(listing.id, 'validate')}
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
