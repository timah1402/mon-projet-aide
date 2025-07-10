import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import

export default function AdminIoTAlertsScreen() {
  // Navigation removed

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      location: 'Chambre Pikine',
      date: '01/07/2025 11:30',
      type: 'Température élevée',
      value: '12.5°C',
      status: 'Critique',
    },
    {
      id: 2,
      location: 'Espace Almadies',
      date: '30/06/2025 18:10',
      type: 'Humidité basse',
      value: '35%',
      status: 'Warning',
    },
  ]);

  const handleResolve = (id) => {
    Alert.alert(
      'Marquer comme traité',
      'Voulez-vous vraiment marquer cette alerte comme traitée ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          onPress: () => {
            setAlerts(alerts.filter(a => a.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-6`}>
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-6 text-green-700 text-center`}>Alertes IoT</Text>

        {alerts.length === 0 ? (
          <View style={tw`items-center justify-center mt-20`}>
            <Ionicons name="checkmark-circle-outline" size={64} color="green" />
            <Text style={tw`text-lg font-semibold mt-4`}>Aucune alerte active</Text>
          </View>
        ) : (
          alerts.map(alert => (
            <View key={alert.id} style={tw`bg-white p-5 mb-4 rounded-xl shadow`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Ionicons
                  name="alert-circle-outline"
                  size={24}
                  color={alert.status === 'Critique' ? 'red' : 'orange'}
                  style={tw`mr-2`}
                />
                <Text style={tw`text-lg font-bold text-gray-800`}>{alert.type}</Text>
              </View>

              <Text style={tw`text-sm text-gray-600 mb-1`}>📍 {alert.location}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>📅 {alert.date}</Text>
              <Text style={tw`text-sm text-gray-600 mb-4`}>🔎 Mesure : {alert.value}</Text>

              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => router.push("/monitoring")}
                  style={tw`bg-blue-600 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Ionicons name="analytics-outline" size={20} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold`}>Voir détails IoT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleResolve(alert.id)}
                  style={tw`bg-green-600 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Ionicons name="checkmark-outline" size={20} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold`}>Traiter</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
