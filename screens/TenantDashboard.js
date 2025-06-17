import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function TenantDashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const roles = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* En-tête */}
      <View style={tw`flex-row justify-between items-center px-4 pt-4 pb-2 bg-white`}> 
        <Text style={tw`text-xl font-bold`}>Senfrais</Text>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}
          >
            <Text style={tw`text-sm mr-1`}>Locataire</Text>
            <Ionicons name="chevron-down" size={16} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mr-3`}>
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={32} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal déroulant pour changer de rôle */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-30`}
          onPress={() => setModalVisible(false)}
        >
          <View style={tw`bg-white rounded-lg p-4 w-3/4`}>
            {roles.map((role, i) => (
              <TouchableOpacity key={i} style={tw`flex-row items-center py-2`}>
                <Ionicons name={role.icon} size={20} color="gray" style={tw`mr-2`} />
                <Text>{role.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={tw`px-4 pt-4 mb-20`}>
        <View style={tw`bg-green-700 rounded-xl p-4 mb-6`}>
          <Text style={tw`text-white text-lg font-semibold mb-1`}>Bienvenue, Aïssatou !</Text>
          <Text style={tw`text-white mb-4`}>Trouvez l'espace frigorifique parfait pour vos besoins</Text>
          <TouchableOpacity style={tw`bg-white px-4 py-2 rounded-md items-center`}>
            <Text style={tw`text-green-700 font-semibold`}>🔍 Rechercher un espace</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="calendar" size={20} color="green" />
            <Text style={tw`text-sm mt-2`}>1</Text>
            <Text style={tw`text-xs text-gray-500`}>Locations actives</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="location" size={20} color="blue" />
            <Text style={tw`text-sm mt-2`}>3</Text>
            <Text style={tw`text-xs text-gray-500`}>Réservations</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="star" size={20} color="purple" />
            <Text style={tw`text-sm mt-2`}>180 000 CFA</Text>
            <Text style={tw`text-xs text-gray-500 text-center`}>Dépenses</Text>
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Location en cours</Text>
          <View style={tw`bg-white p-4 rounded-xl shadow-sm`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Chambre froide proche du Port</Text>
            <Text style={tw`text-xs text-gray-500 mb-1`}>Dakar, Sénégal</Text>
            <Text style={tw`text-xs text-gray-500 mb-1`}>📅 20/06/2024 - 23/06/2024</Text>
            <Text style={tw`text-xs text-gray-500 mb-3`}>👤 Hôte: Moussa Diagne</Text>

            <View style={tw`flex-row justify-between mb-3`}>
              <View style={tw`bg-blue-50 px-4 py-2 rounded-lg w-[48%]`}>
                <Text style={tw`text-xs text-gray-500`}>🌡️ Température</Text>
                <Text style={tw`text-sm font-bold text-blue-700`}>4.2°C</Text>
                <Text style={tw`text-xs text-green-500`}>Optimal</Text>
              </View>
              <View style={tw`bg-green-50 px-4 py-2 rounded-lg w-[48%]`}>
                <Text style={tw`text-xs text-gray-500`}>💧 Humidité</Text>
                <Text style={tw`text-sm font-bold text-green-700`}>65%</Text>
                <Text style={tw`text-xs text-green-500`}>Normal</Text>
              </View>
            </View>
            <TouchableOpacity style={tw`bg-gray-100 py-2 rounded-md items-center`}>
              <Text style={tw`text-sm text-gray-700`}>Contacter l'hôte</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Mes réservations</Text>
          {['Actif', 'Terminé', 'Confirmé'].map((status, idx) => (
            <View key={idx} style={tw`bg-white p-4 rounded-xl shadow-sm mb-3`}>
              <Text style={tw`text-sm font-semibold mb-1`}>Espace réfrigéré Almadies</Text>
              <Text style={tw`text-xs text-gray-500`}>Almadies, Dakar</Text>
              <Text style={tw`text-xs text-gray-500`}>📅 15/06/2024 - 18/06/2024</Text>
              <Text style={tw`text-xs text-gray-500 mb-1`}>👤 Hôte: Fatou Sall</Text>
              {status === 'Terminé' && <Text style={tw`text-yellow-500 text-xs`}>⭐ 5/5</Text>}
              <Text style={tw`text-right text-sm font-bold`}>48 000 CFA</Text>
              <TouchableOpacity style={tw`mt-1`}>
                <Text style={tw`text-blue-600 text-xs text-right`}>Contacter l'hôte</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          <Text style={tw`text-base font-semibold mb-2`}>Recherches récentes</Text>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={tw`bg-white p-4 rounded-xl shadow-sm mb-2 flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-sm font-semibold`}>📍 Dakar, Sénégal</Text>
                <Text style={tw`text-xs text-gray-500`}>20-23 juin 2024 · 10-15 m³</Text>
              </View>
              <TouchableOpacity>
                <Text style={tw`text-blue-600 text-sm`}>Rechercher à nouveau</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* NAVBAR */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="blue" />
          <Text style={tw`text-xs text-blue-600`}>Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="search" size={24} color="gray" />
          <Text style={tw`text-xs`}>Recherche</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="analytics" size={24} color="gray" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
