import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function DriverAvailableMissionsScreen() {
  const navigation = useNavigation();

  const availableMissions = [
    {
      id: '1',
      title: 'Livraison Surgelés',
      pickup: 'Marché Kermel',
      dropoff: 'Restaurant Le Baobab',
      client: 'Aïssatou Diallo',
      icon: 'snowflake',
    },
    {
      id: '2',
      title: 'Produits Laitiers',
      pickup: 'Entrepôt Yoff',
      dropoff: 'Supermarché Auchan',
      client: 'Mamadou Ndiaye',
      icon: 'milk',
    },
  ];

  const handleAcceptMission = (mission) => {
    alert(`Mission "${mission.title}" acceptée`);
    navigation.navigate('TrackingScreen');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Missions disponibles</Text>
      </View>

      {/* Liste des missions */}
      <FlatList
        data={availableMissions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
        renderItem={({ item }) => (
          <View style={tw`bg-white p-5 rounded-xl mb-4 shadow`}>
            <View style={tw`flex-row items-center mb-3`}>
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color="#facc15"
                style={tw`mr-2`}
              />
              <Text style={tw`text-xl font-bold text-gray-800`}>{item.title}</Text>
            </View>

            <View style={tw`mb-2`}>
              <Text style={tw`text-xs uppercase text-gray-500 mb-1`}>Collecte</Text>
              <Text style={tw`text-base text-gray-700`}>{item.pickup}</Text>
            </View>

            <View style={tw`mb-2`}>
              <Text style={tw`text-xs uppercase text-gray-500 mb-1`}>Destination</Text>
              <Text style={tw`text-base text-gray-700`}>{item.dropoff}</Text>
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`text-xs uppercase text-gray-500 mb-1`}>Client</Text>
              <Text style={tw`text-base text-gray-700`}>{item.client}</Text>
            </View>

            <TouchableOpacity
              style={tw`flex-row items-center justify-center bg-yellow-500 py-3 rounded-full`}
              onPress={() => handleAcceptMission(item)}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white font-bold text-base`}>Accepter la mission</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
