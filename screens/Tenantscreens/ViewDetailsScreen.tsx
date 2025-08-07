import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function ViewDetailsScreenShared() {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4 `}>
        {/* Bouton retour */}
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Header */}
        <Text style={tw`text-xl font-bold mb-2`}>Grande chambre froide industrielle</Text>
        <Text style={tw`text-sm text-gray-500 mb-4`}>⭐ 4.7 (38 avis)  ·  Zone Industrielle, Dakar, Sénégal</Text>

        {/* Badge Type de location */}
        <View style={tw`flex-row mb-4`}>
          <View style={tw`bg-orange-100 px-3 py-1 rounded-full flex-row items-center`}>
            <Ionicons name="people-outline" size={16} color="#ea580c" style={tw`mr-1`} />
            <Text style={tw`text-orange-700 text-sm font-medium`}>Location partagée</Text>
          </View>
        </View>

        {/* Image */}
        <Image source={require('../../assets/chambrefroide.jpg')} style={tw`w-full h-48 rounded-lg mb-4`} resizeMode="cover" />

        {/* Booking card */}
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-lg font-bold`}>8 500 CFA <Text style={tw`text-sm text-gray-600`}>/ jour / utilisateur</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-3`}>-10% pour 7+ jours  ·  -15% pour 30+ jours</Text>
          
          {/* Info sur la location partagée */}
          <View style={tw`bg-orange-50 p-2 rounded-md mb-3 flex-row items-center`}>
            <Ionicons name="people" size={16} color="#ea580c" style={tw`mr-2`} />
            <Text style={tw`text-orange-700 text-xs flex-1`}>Espace partagé - Jusqu'à 4 utilisateurs simultanés</Text>
          </View>

          {/* Disponibilité des espaces */}
          <View style={tw`bg-green-50 p-2 rounded-md mb-3`}>
            <Text style={tw`text-green-700 text-xs font-medium mb-1`}>Disponibilité actuelle :</Text>
            <Text style={tw`text-green-600 text-xs`}>✓ 2 espaces libres sur 4</Text>
          </View>

          <TextInput placeholder="Date de début" style={tw`border border-gray-300 rounded-md px-3 py-2 mb-2`} />
          <TextInput placeholder="Date de fin" style={tw`border border-gray-300 rounded-md px-3 py-2 mb-4`} />
          <TextInput placeholder="Quantité en kg " style={tw`border border-gray-300 rounded-md px-3 py-2 mb-4`} />
          <TextInput placeholder="Type de marchandise" style={tw`border border-gray-300 rounded-md px-3 py-2 mb-4`} />
          <TouchableOpacity style={tw`bg-blue-600 py-3 rounded-md items-center`}>
            <Text style={tw`text-white font-semibold`}>Réserver maintenant</Text>
          </TouchableOpacity>
          <Text style={tw`text-xs text-gray-500 text-center mt-2`}>Vous ne serez débité qu'après confirmation</Text>
        </View>

        {/* Host */}
        <View style={tw`flex-row justify-between items-center bg-white px-4 py-4 rounded-md border border-gray-200 mb-6 mx-[-16px]`}>          
          <View style={tw`flex-1 pr-4`}>
            <Text style={tw`font-semibold`}>Mamadou Fall</Text>
            <Text style={tw`text-xs text-gray-500`}>⭐ 4.9 (62 avis) · Membre depuis Mars 2022</Text>
          </View>
          <TouchableOpacity style={tw`bg-blue-500 px-4 py-2 rounded-md`} onPress={()=>router.push("/chat")}>
            <Text style={tw`text-white font-medium`}>Contacter</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={tw`text-base font-semibold mb-1`}>Description</Text>
        <Text style={tw`text-sm text-gray-700 mb-4`}>
          Grande chambre froide industrielle de 80m³ divisée en 4 espaces sécurisés et séparés. Idéale pour les entreprises cherchant une solution économique tout en bénéficiant d'équipements professionnels. Chaque espace dispose de son propre accès et système de sécurité.
        </Text>

        {/* Type de location détaillé */}
        <Text style={tw`text-base font-semibold mb-2`}>Type de location</Text>
        <View style={tw`bg-gray-50 p-3 rounded-md mb-4`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="people-outline" size={20} color="#ea580c" style={tw`mr-2`} />
            <Text style={tw`font-medium text-orange-700`}>Location partagée</Text>
          </View>
          <Text style={tw`text-sm text-gray-600 mb-2`}>
            Espace de stockage partagé avec d'autres utilisateurs. Chaque locataire dispose de son propre compartiment 
            sécurisé avec accès individuel. Solution économique idéale pour les PME.
          </Text>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="shield-outline" size={16} color="#6b7280" style={tw`mr-2`} />
            <Text style={tw`text-xs text-gray-500`}>Compartiments individuels verrouillables</Text>
          </View>
        </View>

        {/* Caractéristiques */}
        <Text style={tw`text-base font-semibold mb-2`}>Caractéristiques</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`items-center`}>
            <Ionicons name="volume-high" size={20} color="black" />
            <Text style={tw`text-sm mt-1`}>20 m³ / espace</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="thermometer" size={20} color="black" />
            <Text style={tw`text-sm mt-1`}>0°C à 4°C</Text>
          </View>
          <View style={tw`items-center`}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={tw`text-sm mt-1 text-center`}>Tous produits frais</Text>
          </View>
        </View>

        {/* Équipements */}
        <Text style={tw`text-base font-semibold mb-2`}>Équipements</Text>
        <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
          {['Accès 24/7', 'Surveillance', 'Étagères individuelles', 'Parking', 'Quai de chargement', 'Compartiments verrouillables'].map((item, idx) => (
            <Text key={idx} style={tw`bg-gray-200 text-xs px-2 py-1 mr-2 mb-2 rounded-full`}>{item}</Text>
          ))}
        </View>

        {/* Règles */}
        <Text style={tw`text-base font-semibold mb-1`}>Règles d'utilisation</Text>
        <Text style={tw`text-sm text-gray-700 mb-4`}>
          Respect des autres utilisateurs obligatoire. Chaque locataire doit maintenir son espace propre. 
          Accès par badge personnel fourni. Communication des entrées/sorties via l'application.
        </Text>

        {/* Avis */}
        <TouchableOpacity
          onPress={() => router.push("/leave-review")}
          style={tw`bg-gray-200 py-2 px-4 rounded-md mb-6 items-center`}
        >
          <Text style={tw`text-sm font-medium`}>Donner mon avis</Text>
        </TouchableOpacity>

        <Text style={tw`text-base font-semibold mb-2`}>Avis (38)</Text>
        <View style={tw`bg-white border border-gray-200 p-4 rounded-md mb-2`}>
          <Text style={tw`font-semibold`}>Fatou Ndiaye <Text style={tw`text-yellow-500`}>★★★★★</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-1`}>20/06/2024</Text>
          <Text style={tw`text-sm text-gray-700`}>Parfait pour notre restaurant ! L'espace partagé est bien organisé et le prix très abordable. Les autres utilisateurs sont respectueux.</Text>
        </View>
        <View style={tw`bg-white border border-gray-200 p-4 rounded-md mb-6`}>
          <Text style={tw`font-semibold`}>Ousmane Ba <Text style={tw`text-yellow-500`}>★★★★☆</Text></Text>
          <Text style={tw`text-xs text-gray-500 mb-1`}>15/06/2024</Text>
          <Text style={tw`text-sm text-gray-700`}>Bon rapport qualité-prix. Le système de compartiments individuels fonctionne bien. Seul bémol : parfois du monde aux heures de pointe.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}