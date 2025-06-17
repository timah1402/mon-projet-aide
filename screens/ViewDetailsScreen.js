import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function ViewDetailsScreen() {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4 `}>
        {/* Header */}
        <Text style={tw`text-xl font-bold mb-2`}>Chambre froide proche du Port</Text>
        <Text style={tw`text-sm text-gray-500 mb-4`}>⭐ 4.9 (23 avis)  ·  Port de Dakar, Dakar, Sénégal</Text>

        {/* Image */}
        <Image source={require('../assets/chambrefroide.jpg')} style={tw`w-full h-48 rounded-lg mb-4`} resizeMode="cover" />

        {/* Booking card */}
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-lg font-bold`}>15 000 CFA <Text style={tw`text-sm text-gray-600`}>/ jour</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-3`}>-10% pour 7+ jours  ·  -15% pour 30+ jours</Text>
          <TextInput placeholder="Date de début" style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`} />
          <TextInput placeholder="Date de fin" style={tw`border border-gray-300 rounded-md px-3 py-2 mb-4`} />
          <TouchableOpacity style={tw`bg-blue-600 py-3 rounded-md items-center`}>
            <Text style={tw`text-white font-semibold`}>Réserver maintenant</Text>
          </TouchableOpacity>
          <Text style={tw`text-xs text-gray-500 text-center mt-2`}>Vous ne serez débité qu'après confirmation</Text>
        </View>

        {/* Host */}
        <View style={tw`flex-row justify-between items-center bg-white px-4 py-4 rounded-md border border-gray-200 mb-6 mx-[-16px]`}>          
          <View style={tw`flex-1 pr-4`}>
            <Text style={tw`font-semibold`}>Moussa Diagne</Text>
            <Text style={tw`text-xs text-gray-500`}>⭐ 4.8 (47 avis) · Membre depuis Juin 2023</Text>
          </View>
          <TouchableOpacity style={tw`bg-blue-500 px-4 py-2 rounded-md`}>
            <Text style={tw`text-white font-medium`}>Contacter</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={tw`text-base font-semibold mb-1`}>Description</Text>
        <Text style={tw`text-sm text-gray-700 mb-4`}>
          Chambre froide moderne et sécurisée située près du port de Dakar. Parfaite pour le stockage de produits frais avec accès facile pour les livraisons. Équipée de systèmes de surveillance et de contrôle de température de pointe.
        </Text>

        {/* Caractéristiques */}
        <Text style={tw`text-base font-semibold mb-2`}>Caractéristiques</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`items-center`}>
            <Ionicons name="volume-high" size={20} color="black" />
            <Text style={tw`text-sm mt-1`}>15 m³</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="thermometer" size={20} color="black" />
            <Text style={tw`text-sm mt-1`}>2°C à 8°C</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={tw`text-sm mt-1 text-center`}>Fruits, Laitiers, Viandes</Text>
          </View>
        </View>

        {/* Équipements */}
        <Text style={tw`text-base font-semibold mb-2`}>Équipements</Text>
        <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
          {['Accès 24/7', 'Surveillance', 'Étagères', 'Parking'].map((item, idx) => (
            <Text key={idx} style={tw`bg-gray-200 text-xs px-2 py-1 mr-2 mb-2 rounded-full`}>{item}</Text>
          ))}
        </View>

        {/* Règles */}
        <Text style={tw`text-base font-semibold mb-1`}>Règles d'utilisation</Text>
        <Text style={tw`text-sm text-gray-700 mb-4`}>
          Accès uniquement sur rendez-vous. Pas de stockage de produits dangereux. Respect des normes d'hygiène obligatoire.
        </Text>

        {/* Avis */}
        <Text style={tw`text-base font-semibold mb-2`}>Avis (23)</Text>
        <View style={tw`bg-white border border-gray-200 p-4 rounded-md mb-2`}>
          <Text style={tw`font-semibold`}>Aïssatou Diallo <Text style={tw`text-yellow-500`}>★★★★★</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-1`}>15/06/2024</Text>
          <Text style={tw`text-sm text-gray-700`}>Excellent service, chambre froide parfaitement maintenue. Moussa est très réactif et professionnel.</Text>
        </View>
        <View style={tw`bg-white border border-gray-200 p-4 rounded-md mb-6`}>
          <Text style={tw`font-semibold`}>Ibrahim Sy <Text style={tw`text-yellow-500`}>★★★★★</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-1`}>10/06/2024</Text>
          <Text style={tw`text-sm text-gray-700`}>Idéal pour mes besoins de restauration. Température stable et accès facile.</Text>
        </View>
      </ScrollView>

      {/* NAVBAR */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="gray" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="search" size={24} color="blue" />
          <Text style={tw`text-xs text-blue-600`}>Recherche</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="analytics" size={24} color="gray" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
