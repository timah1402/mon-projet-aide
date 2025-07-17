import { router } from 'expo-router';
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function AdminFeaturesScreen() {
  // Helper pour la navigation
  const navigateToScreen = (screenName: string) => {
    switch (screenName) {
      case 'AdminHostValidationScreen':
        router.push('/admin-host-validation');
        break;
      case 'AdminDriverValidationScreen':
        router.push('/admin-driver-validation');
        break;
      case 'AdminDisputesScreen':
        router.push('/admin-disputes');
        break;
      case 'AdminIoTAlertsScreen':
        router.push('/admin-iot-alerts');
        break;
      case 'AdminUserManagementScreen':
        router.push('/admin-user-management');
        break;
      case 'InvoiceDetailScreen':
        router.push('/invoice-detail');
        break;
      case 'ReservationEditScreen':
        router.push('/reservation-edit');
        break;
      default:
        console.warn(`Route non trouvée pour: ${screenName}`);
    }
  };

  const features = [
    {
      icon: 'document-text-outline',
      title: 'Annonces à valider',
      description: 'Examiner et approuver ou rejeter les annonces proposées par les hôtes.',
      screen: 'AdminHostValidationScreen',
    },
    {
      icon: 'car-outline',
      title: 'Vérification Chauffeurs',
      description: 'Approuver ou refuser les nouveaux chauffeurs inscrits.',
      screen: 'AdminDriverValidationScreen',
    },
    {
      icon: 'chatbox-ellipses-outline',
      title: 'Litiges et Chats',
      description: 'Consulter les conversations et résoudre les litiges signalés.',
      screen: 'AdminDisputesScreen',
    },
    {
      icon: 'alert-circle-outline',
      title: 'Alertes IoT',
      description: 'Surveiller les alertes liées aux capteurs de température et intervenir.',
      screen: 'AdminIoTAlertsScreen',
    },
    {
      icon: 'people-outline',
      title: 'Gestion Utilisateurs',
      description: 'Rechercher et gérer tous les profils utilisateurs.',
      screen: 'AdminUserManagementScreen',
    },
    {
      icon: 'stats-chart-outline',
      title: 'Indicateurs Opérationnels',
      description: 'Consulter les statistiques clés sur l\'activité de la plateforme.',
      screen: 'InvoiceDetailScreen',
    },
    {
      icon: 'construct-outline',
      title: 'Interventions Manuelles',
      description: 'Traiter les cas exceptionnels comme les pannes ou livraisons échouées.',
      screen: 'ReservationEditScreen',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-6`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={tw`text-3xl font-bold text-green-700 mb-6 text-center`}>
          Fonctionnalités Admin
        </Text>

        {features.map((feature, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigateToScreen(feature.screen)}
            style={tw`bg-white rounded-xl p-5 mb-4 shadow flex-row items-start`}
          >
            <Ionicons 
              name={feature.icon as any} 
              size={28} 
              color="green" 
              style={tw`mr-4 mt-1`} 
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>
                {feature.title}
              </Text>
              <Text style={tw`text-gray-600 text-sm`}>
                {feature.description}
              </Text>
            </View>
            {/* Petite flèche pour indiquer la navigation */}
            <Ionicons name="chevron-forward" size={16} color="gray" style={tw`mt-2`} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}