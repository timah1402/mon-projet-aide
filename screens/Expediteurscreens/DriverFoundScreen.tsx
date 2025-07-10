import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function DriverFoundScreen() {
  // Navigation removed

  const pickupLocation = { latitude: 14.6928, longitude: -17.4467 };
  const [driverLocation, setDriverLocation] = useState({ latitude: 14.6950, longitude: -17.4490 });

  // Simuler mouvement du chauffeur en direction du pickup
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        const latDiff = pickupLocation.latitude - prev.latitude;
        const lonDiff = pickupLocation.longitude - prev.longitude;

        if (Math.abs(latDiff) < 0.0001 && Math.abs(lonDiff) < 0.0001) {
          clearInterval(interval);
          return pickupLocation; // Arrivé
        }

        return {
          latitude: prev.latitude + latDiff * 0.2,
          longitude: prev.longitude + lonDiff * 0.2,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const driver = {
    name: 'Ousmane Sarr',
    vehicle: 'Moto - Yamaha XTZ',
    phone: '+221 77 123 45 67',
    eta: '5 minutes',
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
  <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
  <Text style={tw`text-lg font-bold`}>Votre chauffeur</Text>
</View>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-lg font-semibold mt-4 mb-6 text-center`}>
          Votre chauffeur est en route 🚗
        </Text>

        <View style={tw`bg-gray-100 w-full p-5 rounded-xl mb-4`}>
          <Text style={tw`text-base font-bold mb-2`}>Informations du chauffeur</Text>
          <Text style={tw`text-sm mb-1`}>👤 Nom: {driver.name}</Text>
          <Text style={tw`text-sm mb-1`}>🏍️ Véhicule: {driver.vehicle}</Text>
          <Text style={tw`text-sm mb-1`}>📞 Téléphone: {driver.phone}</Text>
          <Text style={tw`text-sm`}>⏱️ Arrivée estimée: {driver.eta}</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/expediteur-dashboard")}
          style={tw`bg-blue-600 py-3 px-6 rounded-lg flex-row items-center`}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-base`}>OK, compris</Text>
        </TouchableOpacity>
      </View>

      {/* Carte */}
      <View style={{ width: '100%', height: Dimensions.get('window').height * 0.35 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Point de collecte */}
          <Marker
            coordinate={pickupLocation}
            title="Point de collecte"
            pinColor="blue"
          />
          {/* Chauffeur en mouvement */}
          <Marker
            coordinate={driverLocation}
            title="Votre chauffeur"
            pinColor="green"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}
