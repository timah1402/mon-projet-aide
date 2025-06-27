import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function TrackingScreen() {
  const navigation = useNavigation();

  const pickupLocation = { latitude: 14.6928, longitude: -17.4467 }; // Collecte
  const dropoffLocation = { latitude: 14.7150, longitude: -17.4790 }; // Livraison
  const [driverLocation, setDriverLocation] = useState({ latitude: 14.6928, longitude: -17.4467 }); // démarre au pickup

  const mapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        const latDiff = dropoffLocation.latitude - prev.latitude;
        const lonDiff = dropoffLocation.longitude - prev.longitude;

        if (Math.abs(latDiff) < 0.0001 && Math.abs(lonDiff) < 0.0001) {
          clearInterval(interval);
          return dropoffLocation; // arrivé
        }

        const nextLat = prev.latitude + latDiff * 0.02;
        const nextLon = prev.longitude + lonDiff * 0.02;

        // animer la caméra sur la position du chauffeur
        mapRef.current?.animateCamera({
          center: { latitude: nextLat, longitude: nextLon },
        });

        return { latitude: nextLat, longitude: nextLon };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Carte en haut avec style arrondi */}
      <View style={{ width: '100%', height: Dimensions.get('window').height * 0.35, overflow: 'hidden', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={pickupLocation} title="Collecte" pinColor="blue" />
          <Marker coordinate={dropoffLocation} title="Livraison" pinColor="purple" />
          <Marker coordinate={driverLocation} title="Votre chauffeur" pinColor="green" />
        </MapView>
      </View>

      <ScrollView style={tw`px-4 pt-4`}>
        {/* Bouton retour */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Header */}
        <Text style={tw`text-2xl font-bold mb-1`}>Suivi de livraison #1</Text>
        <Text style={tw`text-sm text-gray-600 mb-4`}>Suivez votre livraison en temps réel</Text>

        {/* Monitoring & Chauffeur */}
        <View style={tw`flex-row justify-between mb-6`}>
          <View style={tw`bg-green-50 p-4 rounded-md w-1/2 mr-2`}>
            <Text style={tw`text-sm text-gray-700 mb-1`}>Monitoring température</Text>
            <Text style={tw`text-xl font-bold text-green-800`}>4.4°C</Text>
            <Text style={tw`text-green-600 text-sm`}>Optimal</Text>
            <Text style={tw`text-xs text-gray-500 mt-1`}>Température requise: 4°C</Text>
          </View>
          <View style={tw`bg-white border border-gray-200 p-4 rounded-md w-1/2 ml-2`}>
            <Text style={tw`text-sm font-semibold mb-2`}>Votre chauffeur</Text>
            <Text style={tw`text-sm mb-1`}>Ousmane Sarr</Text>
            <Text style={tw`text-xs text-gray-500 mb-2`}>⭐ 4.8</Text>
            <TouchableOpacity style={tw`bg-blue-600 px-3 py-1 rounded-md mb-1`}>
              <Text style={tw`text-white text-sm text-center`}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-gray-200 px-3 py-1 rounded-md`}>
              <Text style={tw`text-sm text-center`}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Itinéraire */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Itinéraire</Text>
          <Text style={tw`text-sm`}>📍 Collecte - Marché Kermel, Dakar</Text>
          <Text style={tw`text-xs text-green-600 mb-2`}>✓ Collecté à 12:45</Text>
          <Text style={tw`text-sm`}>📦 Livraison - Restaurant Le Baobab, Almadies</Text>
          <Text style={tw`text-xs text-blue-600`}>Arrivée estimée: 14:30</Text>
        </View>

        {/* Chronologie */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Chronologie</Text>
          {[
            ['Commande confirmée', '12:00'],
            ['Chauffeur assigné', '12:15'],
            ['Colis collecté', '12:45'],
            ['En transit', '13:00'],
            ['Livré', '14:30']
          ].map(([label, time], i) => (
            <View key={i} style={tw`flex-row items-center mb-1`}>
              <Ionicons name={label === 'Livré' ? 'time-outline' : 'checkmark-circle'} size={16} color={label === 'Livré' ? 'gray' : 'green'} />
              <Text style={tw`ml-2`}>{label} <Text style={tw`text-gray-500`}>{time}</Text></Text>
            </View>
          ))}
        </View>

        {/* Détails du colis */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Détails du colis</Text>
          <Text style={tw`text-sm text-gray-800 mb-1`}>📦 Description : 5 caisses de poissons frais, 20kg total</Text>
          <Text style={tw`text-sm text-gray-800`}>🌡️ Température : 4°C</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
