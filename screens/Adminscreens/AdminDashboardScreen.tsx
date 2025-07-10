import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* En-tête */}
      <View style={tw`flex-row justify-between items-center px-4 pt-4 pb-2 bg-white`}>
        <Text style={tw`text-xl font-bold`}>Senfrais Admin</Text>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity style={tw`mr-3`}>
            <Ionicons name="notifications-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={32} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`px-4 pt-4`}>
        <View style={tw`bg-green-700 rounded-xl p-4 mb-6`}>
          <Text style={tw`text-white text-lg font-semibold mb-1`}>Bienvenue, Administrateur !</Text>
          <Text style={tw`text-white mb-4`}>Supervisez les activités et garantissez l’intégrité de la plateforme</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminFeaturesScreen')}
            style={tw`bg-white px-4 py-2 rounded-md items-center`}
          >
            <Text style={tw`text-green-700 font-semibold`}>📋 Accéder aux fonctionnalités</Text>
          </TouchableOpacity>
        </View>

        {/* Statistiques opérationnelles */}
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="document-text-outline" size={20} color="blue" />
            <Text style={tw`text-sm mt-2`}>12</Text>
            <Text style={tw`text-xs text-gray-500 text-center`}>Annonces en attente</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="car-outline" size={20} color="green" />
            <Text style={tw`text-sm mt-2`}>4</Text>
            <Text style={tw`text-xs text-gray-500 text-center`}>Chauffeurs à valider</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="alert-circle-outline" size={20} color="red" />
            <Text style={tw`text-sm mt-2`}>3</Text>
            <Text style={tw`text-xs text-gray-500 text-center`}>Alertes IoT</Text>
          </View>
        </View>

        {/* Litiges récents */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Litiges récents</Text>
          {[1, 2].map((_, i) => (
            <View key={i} style={tw`bg-white p-4 rounded-xl shadow-sm mb-3`}>
              <Text style={tw`text-sm font-semibold mb-1`}>Litige #{i + 1}</Text>
              <Text style={tw`text-xs text-gray-500 mb-1`}>Signalé par : Aïssatou Sow</Text>
              <Text style={tw`text-xs text-gray-500 mb-2`}>📅 30/06/2024</Text>
              <TouchableOpacity style={tw`bg-gray-100 py-2 rounded-md items-center`}>
                <Text style={tw`text-sm text-gray-700`} onPress={() => navigation.navigate('ListChatScreen')}>
                  Consulter le chat
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Alertes IoT */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Alertes IoT récentes</Text>
          {[1, 2].map((_, i) => (
            <View key={i} style={tw`bg-white p-4 rounded-xl shadow-sm mb-3`}>
              <Text style={tw`text-sm font-semibold mb-1`}>Température hors limite détectée</Text>
              <Text style={tw`text-xs text-gray-500 mb-1`}>Chambre n° A{i + 10}</Text>
              <Text style={tw`text-xs text-red-500 mb-1`}>🚨 Température : 12.5°C</Text>
              <TouchableOpacity
                style={tw`bg-gray-100 py-2 rounded-md items-center`}
                onPress={() => navigation.navigate('MonitoringScreen')}
              >
                <Text style={tw`text-sm text-gray-700`}>Voir les détails IoT</Text>
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

        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => navigation.navigate('MonitoringScreen')}
        >
          <Ionicons name="analytics" size={24} color="gray" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => navigation.navigate('AdminFeaturesScreen')}
        >
          <Ionicons name="menu" size={24} color="gray" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
