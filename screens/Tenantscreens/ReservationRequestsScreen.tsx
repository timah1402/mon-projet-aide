import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function ReservationRequestsScreen() {
  // Navigation removed

  const [requests, setRequests] = useState([
    {
      id: '1',
      name: 'Fatou Ndiaye',
      listing: 'Chambre froide Port',
      dates: '3 au 6 juillet',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Aliou Ba',
      listing: 'Espace Almadies',
      dates: '10 au 12 juillet',
      status: 'accepted',
    },
  ]);

  const handleResponse = (id, action) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: action } : req
    );
    setRequests(updated);
    Alert.alert(
      'Succès',
      action === 'accepted' ? 'Réservation acceptée.' : 'Réservation refusée.'
    );
  };

  const goToChat = (userName, userId) => {
    navigation.navigate('ChatScreen', {
      userId,
      userName,
    });
  };

  const renderStatusBadge = (status) => {
    let bgColor, text;
    if (status === 'pending') {
      bgColor = 'bg-yellow-200';
      text = 'En attente';
    } else if (status === 'accepted') {
      bgColor = 'bg-green-200';
      text = 'Acceptée';
    } else {
      bgColor = 'bg-red-200';
      text = 'Refusée';
    }

    return (
      <View style={tw`px-2 py-1 rounded-full ${bgColor}`}>
        <Text style={tw`text-xs font-semibold text-gray-800`}>{text}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-gray-100 rounded-xl shadow-md px-4 py-4 mb-4 mx-4`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="person" size={20} color="#2563eb" style={tw`mr-2`} />
          <Text style={tw`font-semibold text-base`}>{item.name}</Text>
        </View>
        {renderStatusBadge(item.status)}
      </View>

      <Text style={tw`text-sm text-gray-700 mb-1`}>
        🏠 {item.listing}
      </Text>
      <Text style={tw`text-sm text-gray-700`}>
        📅 {item.dates}
      </Text>

      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => goToChat(item.name, item.id)}
          style={tw`flex-row items-center bg-blue-500 px-4 py-2 rounded-full`}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-sm`}>Contacter</Text>
        </TouchableOpacity>

        {item.status === 'pending' ? (
          <View style={tw`flex-row`}>
            <TouchableOpacity
              onPress={() => handleResponse(item.id, 'refused')}
              style={tw`bg-red-500 px-4 py-2 rounded-full mr-2`}
            >
              <Text style={tw`text-white text-sm font-semibold`}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleResponse(item.id, 'accepted')}
              style={tw`bg-green-600 px-4 py-2 rounded-full`}
            >
              <Text style={tw`text-white text-sm font-semibold`}>Accepter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={tw`text-sm italic text-gray-500 mt-2`}>
            Vous avez {item.status === 'accepted' ? 'accepté' : 'refusé'} cette demande.
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Demandes de réservation</Text>
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pt-4 pb-8`}
      />
    </SafeAreaView>
  );
}
