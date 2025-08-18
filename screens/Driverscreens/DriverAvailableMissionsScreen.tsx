import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Mission {
  id: string;
  type: 'surgelés' | 'frais' | 'sec';
  description: string;
  collectPoint: string;
  destination: string;
  client: string;
  temperature?: string;
  price: number;
  distance: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  urgency: 'normal' | 'urgent';
  completedAt?: string;
}

export default function DriverHistoryScreen() {



  // Historique des missions complétées
  const [completedMissions, setCompletedMissions] = useState<Mission[]>([
    {
      id: 'h1',
      type: 'surgelés',
      description: 'Produits surgelés',
      collectPoint: 'Marché Sandaga, Dakar',
      destination: 'Restaurant Le Baobab, Almadies',
      client: 'Aminata Ba',
      temperature: '-3°C',
      price: 6000,
      distance: '15 km',
      estimatedTime: '50 min',
      status: 'completed',
      urgency: 'normal',
      completedAt: '2024-01-15 14:30'
    },
    {
      id: 'h2',
      type: 'frais',
      description: 'Produits laitiers',
      collectPoint: 'Laiterie du Berger, Thiès',
      destination: 'Supermarché Auchan, Plateau',
      client: 'Omar Sy',
      temperature: '3°C',
      price: 8500,
      distance: '22 km',
      estimatedTime: '75 min',
      status: 'completed',
      urgency: 'urgent',
      completedAt: '2024-01-14 16:45'
    },
    {
      id: 'h3',
      type: 'sec',
      description: 'Produits secs',
      collectPoint: 'Entrepôt Colobane, Dakar',
      destination: 'Boutique Mansour, Médina',
      client: 'Khadija Diop',
      price: 4200,
      distance: '9 km',
      estimatedTime: '35 min',
      status: 'completed',
      urgency: 'normal',
      completedAt: '2024-01-14 11:20'
    },
    {
      id: 'h4',
      type: 'frais',
      description: 'Produits laitiers',
      collectPoint: 'Centrale Laitière, Dakar',
      destination: 'Hôpital Principal, Dakar',
      client: 'Dr. Ibrahima Seck',
      temperature: '2°C',
      price: 5500,
      distance: '11 km',
      estimatedTime: '40 min',
      status: 'completed',
      urgency: 'urgent',
      completedAt: '2024-01-13 09:15'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'surgelés': return 'snowflake';
      case 'frais': return 'water';
      case 'sec': return 'archive-outline';
      default: return 'cube-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'surgelés': return '#3B82F6';
      case 'frais': return '#10B981';
      case 'sec': return '#F59E0B';
      default: return '#6B7280';
    }
  };



  const renderCompletedMission = ({ item }: { item: Mission }) => (
    <View style={tw`bg-gray-50 p-4 rounded-xl mb-3 border border-gray-200`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <View style={tw`flex-row items-center`}>
          <MaterialCommunityIcons
            name={getTypeIcon(item.type)}
            size={24}
            color={getTypeColor(item.type)}
            style={tw`mr-3`}
          />
          <View>
            <Text style={tw`text-base font-semibold text-gray-800`}>{item.description}</Text>
            <Text style={tw`text-xs text-gray-500`}>Client: {item.client}</Text>
          </View>
        </View>
        <View style={tw`items-end`}>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" style={tw`mr-1`} />
            <Text style={tw`text-sm font-bold text-green-600`}>+{item.price} FCFA</Text>
          </View>
          <Text style={tw`text-xs text-gray-500`}>{item.completedAt}</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-xs text-gray-600 flex-1`}>📍 {item.collectPoint}</Text>
        <Ionicons name="arrow-forward" size={12} color="#9CA3AF" style={tw`mx-2 mt-1`} />
        <Text style={tw`text-xs text-gray-600 flex-1 text-right`}>🚩 {item.destination}</Text>
      </View>
    </View>
  );

  const totalEarnings = completedMissions.reduce((sum, mission) => sum + mission.price, 0);
  const totalMissions = completedMissions.length;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Historique des Missions</Text>
      </View>

      {/* Statistiques */}
      <View style={tw`mx-4 mt-4 mb-6`}>
        <View style={tw`bg-green-50 p-4 rounded-xl border border-green-200`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-green-800 text-lg font-bold`}>{totalMissions} missions</Text>
              <Text style={tw`text-green-600 text-sm`}>complétées avec succès</Text>
            </View>
            <View style={tw`items-end`}>
              <Text style={tw`text-green-800 text-xl font-bold`}>{totalEarnings.toLocaleString()} FCFA</Text>
              <Text style={tw`text-green-600 text-sm`}>gains totaux</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Liste des missions complétées */}
      <ScrollView style={tw`flex-1 px-4 pb-6`}>
        {completedMissions.map((mission) => (
          <View key={mission.id}>
            {renderCompletedMission({ item: mission })}
          </View>
        ))}
      </ScrollView>

      {/* Bouton flottant pour retourner au dashboard */}
      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-yellow-500 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
        onPress={() => router.replace("/chauffeur-dashboard")}
      >
        <Ionicons name="grid" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}