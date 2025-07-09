import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import chambreFroideImage from '../assets/chambrefroide.jpg'; 

export default function AdminDisputesScreen() {
  const navigation = useNavigation();

  // Exemples de litiges
  const [disputes, setDisputes] = useState([
    {
    id: 1,
    reservation: 'Chambre Pikine',
    dates: '10/06/2024 - 13/06/2024',
    user: 'Aïssatou Sow',
    description: 'Température non respectée, produits endommagés.',
    image: null,
  },
    {
      id: 2,
      reservation: 'Espace Almadies',
      dates: '01/06/2024 - 03/06/2024',
      user: 'Mamadou Ndiaye',
      description: 'Chambre sale à l’arrivée.',
      image: null,
    },
  ]);

  const handleResolve = (id) => {
    Alert.alert(
      'Marquer comme résolu',
      'Voulez-vous vraiment marquer ce litige comme résolu ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          onPress: () => {
            setDisputes(disputes.filter(d => d.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-6`}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-6 text-green-700 text-center`}>Litiges à traiter</Text>

        {disputes.length === 0 ? (
          <View style={tw`items-center justify-center mt-20`}>
            <Ionicons name="checkmark-circle-outline" size={64} color="green" />
            <Text style={tw`text-lg font-semibold mt-4`}>Aucun litige en attente</Text>
          </View>
        ) : (
          disputes.map(dispute => (
            <View key={dispute.id} style={tw`bg-white p-5 mb-4 rounded-xl shadow`}>
              <Text style={tw`text-lg font-bold mb-1 text-gray-800`}>{dispute.reservation}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>📅 {dispute.dates}</Text>
              <Text style={tw`text-sm text-gray-600 mb-2`}>👤 Utilisateur : {dispute.user}</Text>

              <View style={tw`bg-gray-100 p-3 rounded-md mb-4`}>
                <Text style={tw`text-sm text-gray-700 mb-1 font-semibold`}>Description :</Text>
                <Text style={tw`text-sm text-gray-600`}>{dispute.description}</Text>
              </View>

              {dispute.image && (
                <Image
                  source={{ uri: dispute.image }}
                  style={tw`w-full h-48 rounded-md mb-4`}
                  resizeMode="cover"
                />
              )}

              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChatScreen')}
                  style={tw`bg-blue-600 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold`}>Voir le chat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleResolve(dispute.id)}
                  style={tw`bg-green-600 px-4 py-2 rounded-md w-[48%] items-center`}
                >
                  <Ionicons name="checkmark-outline" size={20} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold`}>Résoudre</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
