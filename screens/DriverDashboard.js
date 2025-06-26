import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function ChauffeurDashboardScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [enLigne, setEnLigne] = useState(true);

  // Étapes de la mission
  const [steps, setSteps] = useState([
    { label: 'Mission acceptée', checked: true },
    { label: 'En route vers le point de collecte', checked: false },
    { label: 'Scanner le QR code du colis', checked: false },
    { label: 'En route vers la destination', checked: false },
    { label: 'Prendre une photo et saisir le code OTP', checked: false },
  ]);

  const toggleStep = (index) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      if (index === 0 || newSteps[index - 1].checked) {
        newSteps[index].checked = !newSteps[index].checked;
      }
      return newSteps;
    });
  };

  const roles = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
  ];

  const handleRoleNavigation = (role) => {
    setModalVisible(false);
    switch (role) {
      case 'Hôte':
        navigation.navigate('HostDashboardScreen');
        break;
      case 'Locataire':
        navigation.navigate('TenantDashboard');
        break;
      case 'Expéditeur':
        navigation.navigate('ExpediteurDashboardScreen');
        break;
      case 'Chauffeur':
        navigation.navigate('ChauffeurDashboardScreen');
        break;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4`}>
        {/* En-tête */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}>
              <Text style={tw`text-sm mr-1`}>Chauffeur</Text>
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

        {/* Section bienvenue */}
        <View style={tw`bg-yellow-500 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Ousmane !</Text>
          <Text style={tw`text-white`}>Suivez vos livraisons et températures en temps réel</Text>
          <View style={tw`flex-row items-center justify-between mt-4`}>
            <Text style={tw`text-white text-sm`}>Statut : {enLigne ? 'En ligne' : 'Hors ligne'}</Text>
            <TouchableOpacity
              onPress={() => setEnLigne(!enLigne)}
              style={tw`bg-white px-3 py-1 rounded-full`}
            >
              <Text style={tw`text-yellow-500 font-bold text-sm`}>
                {enLigne ? 'Basculer Hors ligne' : 'Basculer En ligne'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistiques */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          {[
            { label: 'Livraisons du jour', value: 3, icon: 'calendar-outline', color: '#0284C7' },
            { label: 'En transit', value: 1, icon: 'car-sport-outline', color: '#9333EA' },
            { label: 'Terminé', value: 2, icon: 'checkmark-done-outline', color: '#16A34A' },
            { label: 'Alertes température', value: 1, icon: 'warning-outline', color: '#DC2626' },
          ].map((item, idx) => (
            <View key={idx} style={tw`w-1/2 p-2`}>
              <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={tw`text-lg font-bold mt-1`}>{item.value}</Text>
                <Text style={tw`text-gray-600 text-sm text-center`}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Livraison assignée */}
        <Text style={tw`text-lg font-semibold mb-2`}>Ma livraison actuelle</Text>
        <View style={tw`bg-gray-100 p-4 rounded-md mb-4`}>
          <Text style={tw`text-sm text-gray-700 mb-1`}>🛻 Produits surgelés</Text>
          <Text style={tw`text-xs text-gray-600`}>Collecte: Marché Kermel, Dakar</Text>
          <Text style={tw`text-xs text-gray-600`}>Destination: Restaurant Le Baobab, Almadies</Text>
          <Text style={tw`text-xs text-gray-600`}>Client: Aïssatou Diallo</Text>
          <Text style={tw`text-xs text-gray-600`}>Température actuelle: -2°C</Text>

          <View style={tw`mt-4`}>
            <Text style={tw`text-xs text-gray-500 mb-2`}>Suivi de mission :</Text>
            {steps.map((step, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleStep(index)}
                disabled={index !== 0 && !steps[index - 1].checked}
                style={tw`flex-row items-center mb-2`}
              >
                <Ionicons
                  name={step.checked ? 'checkbox-outline' : 'square-outline'}
                  size={20}
                  color={step.checked ? '#16a34a' : '#9ca3af'}
                  style={tw`mr-2`}
                />
                <Text style={tw`text-sm ${step.checked ? 'text-green-600' : 'text-gray-700'}`}>{step.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={tw`mt-4 bg-yellow-500 py-2 px-3 rounded-md self-start`}
            onPress={() => navigation.navigate('TrackingScreen')}
          >
            <Text style={tw`text-white text-sm font-medium`}>Continuer la mission</Text>
          </TouchableOpacity>
        </View>

        {/* Activité récente */}
        <Text style={tw`text-lg font-semibold mb-2`}>Activité récente</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>✅ Livraison complétée pour "Supermarché Auchan" (il y a 1h)</Text>
          <Text style={tw`text-sm mb-1`}>⚠️ Alerte température détectée sur "Produits laitiers" (il y a 3h)</Text>
          <Text style={tw`text-sm`}>📦 Nouvelle mission assignée pour "Produits surgelés" (il y a 5h)</Text>
        </View>
      </ScrollView>

      {/* Modal rôle */}
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
              <TouchableOpacity
                key={i}
                style={tw`flex-row items-center py-2`}
                onPress={() => handleRoleNavigation(role.label)}
              >
                <Ionicons name={role.icon} size={20} color="gray" style={tw`mr-2`} />
                <Text>{role.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Nav */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('TrackingScreen')}>
          <Ionicons name="navigate" size={24} color="#facc15" />
          <Text style={tw`text-xs text-yellow-500`}>Suivi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="wallet" size={24} color="gray" />
          <Text style={tw`text-xs`}>Gains</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
