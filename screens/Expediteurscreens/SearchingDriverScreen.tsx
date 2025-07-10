import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function SearchingDriverScreen() {
  const pickupLocation = { latitude: 14.6928, longitude: -17.4467 }; // Dakar

  const nearbyDrivers = [
    { id: '1', latitude: 14.6935, longitude: -17.4470 },
    { id: '2', latitude: 14.6922, longitude: -17.4455 },
    { id: '3', latitude: 14.6940, longitude: -17.4480 },
  ];

  // Simuler une confirmation de chauffeur après 6 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/driver-found'); // Correction: utiliser le chemin expo-router
    }, 6000);

    return () => clearTimeout(timer);
  }, []); // Correction: supprimer la dépendance navigation

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Recherche d'un chauffeur</Text>
      </View>

      {/* Carte */}
      <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker pickup */}
        <Marker
          coordinate={pickupLocation}
          title="Point de collecte"
          pinColor="blue" // Point de collecte en bleu
        />

        {/* Markers chauffeurs */}
        {nearbyDrivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={`Chauffeur ${driver.id}`}
            pinColor="green" // Chauffeurs en vert
          />
        ))}
      </MapView>

      {/* Status */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-lg items-center`}>
        <ActivityIndicator size="large" color="#EA580C" />
        <Text style={tw`text-base font-semibold mt-4 text-center`}>
          Recherche d'un chauffeur disponible…
        </Text>
        
        {/* Bouton d'annulation optionnel */}
        <TouchableOpacity 
          onPress={() => router.back()}
          style={tw`mt-4 px-6 py-2 border border-gray-300 rounded-lg`}
        >
          <Text style={tw`text-gray-600`}>Annuler la recherche</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}