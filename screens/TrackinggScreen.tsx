import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function TrackingScreen() {
  const [collected, setCollected] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const pickupLocation = {
    latitude: 14.6928, // Dakar
    longitude: -17.4467,
  };

  const dropoffLocation = {
    latitude: 14.7167, // Almadies (approx.)
    longitude: -17.4948,
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <MapView
        style={tw`h-1/2`}
        initialRegion={{
          ...pickupLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={pickupLocation} title="Collecte" description="Marché Kermel" />
        <Marker coordinate={dropoffLocation} title="Destination" description="Restaurant Le Baobab" />
      </MapView>

      <ScrollView style={tw`p-4`}>
        {/* Infos mission */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Détails de la livraison</Text>
          <Text style={tw`text-sm text-gray-700`}>Client : Aïssatou Diallo</Text>
          <Text style={tw`text-sm text-gray-700`}>Produit : 🧊 Produits surgelés</Text>
          <Text style={tw`text-sm text-gray-700`}>Température actuelle : -2°C</Text>
        </View>

        {/* Étapes */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Suivi de mission</Text>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name={collected ? "checkmark-circle" : "ellipse-outline"} size={20} color="green" style={tw`mr-2`} />
            <Text>1. Collecte au Marché Kermel</Text>
          </View>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name={collected && !delivered ? "walk" : "ellipse-outline"} size={20} color="orange" style={tw`mr-2`} />
            <Text>2. En route vers la destination</Text>
          </View>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name={delivered ? "checkmark-done" : "ellipse-outline"} size={20} color="blue" style={tw`mr-2`} />
            <Text>3. Livraison au Restaurant Le Baobab</Text>
          </View>
        </View>

        {/* Actions */}
        {!collected && (
          <TouchableOpacity
            style={tw`bg-yellow-500 py-3 rounded-lg mb-3`}
            onPress={() => setCollected(true)}
          >
            <Text style={tw`text-center text-white font-semibold`}>Confirmer la collecte</Text>
          </TouchableOpacity>
        )}

        {collected && !delivered && (
          <TouchableOpacity
            style={tw`bg-green-600 py-3 rounded-lg`}
            onPress={() => setDelivered(true)}
          >
            <Text style={tw`text-center text-white font-semibold`}>Finaliser la livraison</Text>
          </TouchableOpacity>
        )}

        {delivered && (
          <Text style={tw`text-center mt-4 text-green-700 font-semibold`}>✅ Livraison terminée</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
