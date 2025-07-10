import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function HostMyListingsScreen() {
  // Navigation removed

  const [listings, setListings] = useState([
    {
      id: '1',
      title: 'Chambre froide proche du Port',
      location: 'Dakar',
      price: '15 000 CFA/jour',
      status: 'Actif',
    },
    {
      id: '2',
      title: 'Espace réfrigéré Almadies',
      location: 'Almadies',
      price: '12 000 CFA/jour',
      status: 'En attente',
    },
    {
      id: '3',
      title: 'Entrepôt frigorifique Pikine',
      location: 'Pikine',
      price: '18 000 CFA/jour',
      status: 'Actif',
    },
  ]);

  const handleDelete = (id) => {
    Alert.alert(
      "Supprimer l'annonce",
      "Es-tu sûr de vouloir supprimer cette annonce ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            const updated = listings.filter(item => item.id !== id);
            setListings(updated);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-gray-100 rounded-xl shadow-md px-4 py-4 mb-4 mx-4`}>
      <Text style={tw`text-base font-semibold mb-1`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-600 mb-1`}>
        📍 {item.location} — 💰 {item.price}
      </Text>
      <Text style={tw`text-xs text-${item.status === 'Actif' ? 'green' : 'yellow'}-600 mb-3`}>
        Statut : {item.status}
      </Text>

      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => router.replace('/create-listing', { listingId: item.id })}
          style={tw`flex-row items-center bg-blue-600 px-4 py-2 rounded-full mr-2`}
        >
          <Ionicons name="create-outline" size={16} color="white" style={tw`mr-1`} />
          <Text style={tw`text-white text-sm`}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={tw`flex-row items-center bg-red-500 px-4 py-2 rounded-full`}
        >
          <Ionicons name="trash-outline" size={16} color="white" style={tw`mr-1`} />
          <Text style={tw`text-white text-sm`}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mes annonces</Text>
      </View>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pt-4 pb-12`}
      />
    </SafeAreaView>
  );
}
