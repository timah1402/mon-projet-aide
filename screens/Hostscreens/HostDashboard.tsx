import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HostDashboardScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

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
        {/* Header with role switch, notification, and profile */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}>
              <Text style={tw`text-sm mr-1`}>Hôte</Text>
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

        {/* Welcome Section with background */}
        <View style={tw`bg-blue-600 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Aïssatou !</Text>
          <Text style={tw`text-white`}>Gérez vos espaces frigorifiques et suivez vos performances</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateListingScreen')}
          style={tw`bg-blue-600 rounded-md py-3 px-4 mb-6`}
        >
          <Text style={tw`text-white text-center font-semibold`}>+ Créer une nouvelle annonce</Text>
        </TouchableOpacity>

        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <FontAwesome5 name="money-bill-wave" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>850 000 CFA</Text>
              <Text style={tw`text-gray-600 text-sm`}>Revenus totaux</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="albums-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>3</Text>
              <Text style={tw`text-gray-600 text-sm`}>Annonces actives</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="calendar-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>24</Text>
              <Text style={tw`text-gray-600 text-sm`}>Réservations</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="trending-up-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>85%</Text>
              <Text style={tw`text-gray-600 text-sm`}>Taux d'occupation</Text>
            </View>
          </View>
        </View>

        <Text style={tw`text-lg font-semibold mb-2`}>Mes annonces</Text>

        {[
          {
            title: 'Chambre froide proche du Port',
            location: 'Dakar,  Sénégal',
            price: '15 000 CFA/jour',
            reservations: 8,
            occupancy: '90%',
            status: 'Actif',
            revenu: '120 000 CFA'
          },
          {
            title: 'Espace réfrigéré Almadies',
            location: 'Almadies,  Dakar',
            price: '12 000 CFA/jour',
            reservations: 12,
            occupancy: '75%',
            status: 'Actif',
            revenu: '144 000 CFA'
          },
          {
            title: 'Entrepôt frigorifique Pikine',
            location: 'Pikine,  Dakar',
            price: '18 000 CFA/jour',
            reservations: 4,
            occupancy: '60%',
            status: 'En  attente',
            revenu: '72 000 CFA'
          }
        ].map((annonce, index) => (
          <View key={index} style={tw`bg-gray-100 rounded-md p-4 mb-3`}>
            <View style={tw`flex-row justify-between items-center mb-1`}>
              <Text style={tw`text-base font-semibold`}>{annonce.title}</Text>
              <Text style={tw`text-sm`}>{annonce.revenu}</Text>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{annonce.location}  -  {annonce.price}</Text>
            <Text style={tw`text-sm text-gray-600`}>{annonce.reservations} réservations  -  {annonce.occupancy} d'occupation</Text>
            <Text style={tw`text-xs mt-1 text-${annonce.status === 'Actif' ? 'green' : 'yellow'}-600`}>{annonce.status}</Text>
          </View>
        ))}

        <Text style={tw`text-lg font-semibold mt-6 mb-2`}>Activité récente</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>✅ Nouvelle  réservation  pour  "Chambre froide  proche  du  Port"  (il y a 2 heures)</Text>
          <Text style={tw`text-sm mb-1`}>👁️ Votre  annonce  "Espace  réfrigéré  Almadies"  a  été  vue  15  fois  (il y a 4 heures)</Text>
          <Text style={tw`text-sm`}>⚠️ Alerte  température  pour  l'espace  Pikine  (7°C détecté, il y a 6 heures)</Text>
        </View>
      </ScrollView>

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

      {/* Bottom Navbar */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`items-center`}  onPress={() => navigation.navigate('MonitoringScreen')}>
          <Ionicons name="analytics" size={24} color="black" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('HostFeaturesScreen')}>
        <Ionicons name="ellipsis-horizontal-circle" size={24} color="black" />
        <Text style={tw`text-xs`}>Menu</Text>
      </TouchableOpacity>
              
      </View>
    </SafeAreaView>
  );
}
