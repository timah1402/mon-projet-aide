import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function TenantReservationsScreen() {
  // Navigation removed

  const [reservations] = useState([
    {
      id: '1',
      title: 'Chambre froide Port',
      location: 'Dakar, Sénégal',
      host: 'Moussa Diagne',
      startDate: '20/06/2024',
      endDate: '23/06/2024',
      price: '48 000 CFA',
      status: 'active',
    },
    {
      id: '2',
      title: 'Espace Almadies',
      location: 'Almadies, Dakar',
      host: 'Fatou Sall',
      startDate: '10/06/2024',
      endDate: '12/06/2024',
      price: '36 000 CFA',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Entrepôt Pikine',
      location: 'Pikine, Dakar',
      host: 'Abdoulaye Sy',
      startDate: '28/06/2024',
      endDate: '30/06/2024',
      price: '54 000 CFA',
      status: 'confirmed',
    },
  ]);

  const renderStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'completed': return 'text-gray-500';
      case 'confirmed': return 'text-blue-600';
      default: return 'text-gray-500';
    }
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-white rounded-xl shadow-md px-4 py-4 mb-4 mx-4`}>
      <Text style={tw`text-base font-semibold mb-1`}>{item.title}</Text>
      <Text style={tw`text-xs text-gray-600`}>📍 {item.location}</Text>
      <Text style={tw`text-xs text-gray-600`}>📅 {item.startDate} - {item.endDate}</Text>
      <Text style={tw`text-xs text-gray-600`}>👤 Hôte : {item.host}</Text>
      <Text style={tw`${renderStatusColor(item.status)} text-xs mt-1 mb-2 capitalize`}>
        {item.status === 'active' ? 'En cours' : item.status === 'completed' ? 'Terminée' : 'Confirmée'}
      </Text>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-sm font-bold`}>{item.price}</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => router.push("/chat")} style={tw`mr-3`}>
            <Text style={tw`text-blue-600 text-sm`}>Contacter</Text>
          </TouchableOpacity>
          {item.status === 'active' || item.status === 'confirmed' ? (
            <TouchableOpacity onPress={() => router.replace('reservation-edit', { id: item.id })}>
              <Text style={tw`text-yellow-600 text-sm`}>Modifier</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mes réservations</Text>
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pt-4 pb-10`}
      />
    </SafeAreaView>
  );
}
