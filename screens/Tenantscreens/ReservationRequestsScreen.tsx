import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function ReservationRequestsScreen() {
  const [activeTab, setActiveTab] = useState('pending');

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
    {
      id: '3',
      name: 'Moussa Diallo',
      listing: 'Entrepôt Pikine',
      dates: '15 au 18 juillet',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Awa Seck',
      listing: 'Chambre froide Port',
      dates: '5 au 8 juillet',
      status: 'refused',
    },
  ]);

  // Filtrer les demandes selon l'onglet actif
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const historyRequests = requests.filter(req => req.status === 'accepted' || req.status === 'refused');

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
    // navigation.navigate('ChatScreen', {
    //   userId,
    //   userName,
    // });
    console.log(`Chat avec ${userName}`);
  };

  const renderStatusBadge = (status) => {
    let bgColor, text, textColor;
    if (status === 'pending') {
      bgColor = 'bg-yellow-200';
      textColor = 'text-yellow-800';
      text = 'En attente';
    } else if (status === 'accepted') {
      bgColor = 'bg-green-200';
      textColor = 'text-green-800';
      text = 'Acceptée';
    } else {
      bgColor = 'bg-red-200';
      textColor = 'text-red-800';
      text = 'Refusée';
    }

    return (
      <View style={tw`px-3 py-1 rounded-full ${bgColor}`}>
        <Text style={tw`text-xs font-semibold ${textColor}`}>{text}</Text>
      </View>
    );
  };

  const renderPendingItem = ({ item }) => (
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
      <Text style={tw`text-sm text-gray-700 mb-4`}>
        📅 {item.dates}
      </Text>

      <View style={tw`flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() => goToChat(item.name, item.id)}
          style={tw`flex-row items-center bg-blue-500 px-4 py-2 rounded-full`}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-sm`}>Contacter</Text>
        </TouchableOpacity>

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
      </View>
    </View>
  );

  const renderHistoryItem = ({ item }) => (
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
      <Text style={tw`text-sm text-gray-700 mb-4`}>
        📅 {item.dates}
      </Text>

      <View style={tw`flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() => goToChat(item.name, item.id)}
          style={tw`flex-row items-center bg-blue-500 px-4 py-2 rounded-full`}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-sm`}>Contacter</Text>
        </TouchableOpacity>
        
        <Text style={tw`text-sm italic text-gray-500`}>
          {item.status === 'accepted' ? 'Demande acceptée' : 'Demande refusée'}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = (type) => (
    <View style={tw`flex-1 justify-center items-center px-8`}>
      <Ionicons 
        name={type === 'pending' ? 'hourglass-outline' : 'document-text-outline'} 
        size={64} 
        color="#9CA3AF" 
      />
      <Text style={tw`text-gray-500 text-lg font-semibold mt-4 text-center`}>
        {type === 'pending' ? 'Aucune demande en attente' : 'Aucun historique'}
      </Text>
      <Text style={tw`text-gray-400 text-sm mt-2 text-center`}>
        {type === 'pending' 
          ? 'Les nouvelles demandes de réservation apparaîtront ici'
          : 'Les demandes acceptées ou refusées apparaîtront ici'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Demandes de réservation</Text>
      </View>

      {/* Tabs */}
      <View style={tw`flex-row bg-gray-100 mx-4 mt-4 rounded-lg`}>
        <TouchableOpacity
          style={tw`flex-1 py-3 px-4 rounded-lg ${activeTab === 'pending' ? 'bg-blue-500' : ''}`}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={tw`text-center font-semibold ${activeTab === 'pending' ? 'text-white' : 'text-gray-600'}`}>
            À accepter ({pendingRequests.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`flex-1 py-3 px-4 rounded-lg ${activeTab === 'history' ? 'bg-blue-500' : ''}`}
          onPress={() => setActiveTab('history')}
        >
          <Text style={tw`text-center font-semibold ${activeTab === 'history' ? 'text-white' : 'text-gray-600'}`}>
            Historique ({historyRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={tw`flex-1 mt-4`}>
        {activeTab === 'pending' ? (
          pendingRequests.length > 0 ? (
            <FlatList
              data={pendingRequests}
              keyExtractor={(item) => item.id}
              renderItem={renderPendingItem}
              contentContainerStyle={tw`pb-8`}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyState('pending')
          )
        ) : (
          historyRequests.length > 0 ? (
            <FlatList
              data={historyRequests}
              keyExtractor={(item) => item.id}
              renderItem={renderHistoryItem}
              contentContainerStyle={tw`pb-8`}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyState('history')
          )
        )}
      </View>
    </SafeAreaView>
  );
}