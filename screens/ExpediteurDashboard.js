import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function ExpediteurDashboardScreen({ navigation }) {
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

        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}>
              <Text style={tw`text-sm mr-1`}>Expediteur</Text>
              <Ionicons name="chevron-down" size={16} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`mr-3`}>
              <Ionicons name="notifications-outline" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfilScreen')}>
              <Ionicons name="person-circle" size={32} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Vue bleu/vert de bienvenue */}
<View style={[tw`rounded-xl p-5 mb-6`, { backgroundColor: '#2563EB' /* ou '#16A34A' */ }]}>
  <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Aïssatou !</Text>
  <Text style={tw`text-white`}>Gérez vos livraisons réfrigérées en toute simplicité</Text>
  <TouchableOpacity
    style={tw`bg-white mt-4 px-4 py-2 rounded-md self-start`}
    onPress={() => navigation.navigate('DeliveryRequestScreen')}
  >
    <Text style={{ color: '#2563EB', fontWeight: '600' /* ou '#16A34A' */ }}>+ Nouvelle livraison</Text>
  </TouchableOpacity>
</View>


        {/* Statistiques */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          {[
            { label: 'En cours', value: 1, icon: 'car-outline', color: '#9333EA' },
            { label: 'Livrées', value: 1, icon: 'checkmark-circle-outline', color: '#16A34A' },
            { label: 'En attente', value: 1, icon: 'time-outline', color: '#CA8A04' },
            { label: 'Total dépensé', value: '27 000 CFA', icon: 'cube-outline', color: '#2563EB' },
          ].map((item, idx) => (
            <View key={idx} style={tw`w-1/2 p-2`}>
              <View style={tw`bg-gray-100 p-4 rounded-md`}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={tw`text-lg font-bold mt-2`}>{item.value}</Text>
                <Text style={tw`text-gray-600 text-sm`}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Livraison en cours */}
        <Text style={tw`text-lg font-semibold mb-2`}>Livraison en cours</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-4`}>
          <View style={tw`mb-2`}>
            <Text style={tw`font-semibold text-sm`}>📍 Collecte</Text>
            <Text style={tw`text-gray-600`}>Marché Kermel, Dakar</Text>
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`font-semibold text-sm`}>📦 Livraison</Text>
            <Text style={tw`text-gray-600`}>Restaurant Le Baobab, Almadies</Text>
            <Text style={{ color: '#2563EB', fontSize: 12, marginTop: 4 }}>Arrivée estimée: 14:30</Text>
          </View>
          <View style={tw`bg-blue-50 p-3 rounded-md mt-2`}>
            <Text style={{ fontSize: 12, color: '#2563EB' }}>Température</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' }}>-2°C</Text>
            <Text style={{ fontSize: 12, color: '#16A34A' }}>Optimal</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mt-2`}>Chauffeur: Ousmane Sarr</Text>
          <TouchableOpacity
            style={tw`bg-blue-600 py-2 rounded-md items-center`}
            onPress={() => navigation.navigate('TrackingScreen')}
          >
            <Text style={tw`text-white font-medium`}>Suivi en temps réel</Text>
          </TouchableOpacity>
        </View>

        {/* Mes livraisons */}
        <Text style={tw`text-lg font-semibold mb-2`}>Mes livraisons</Text>
        {[
          {
            status: 'En transit',
            product: 'Produits surgelés',
            from: 'Marché Kermel, Dakar',
            to: 'Restaurant Le Baobab, Almadies',
            driver: 'Ousmane Sarr',
            price: '8 500 CFA',
            arrival: '14:30',
            color: '#9333EA'
          },
          {
            status: 'Livré',
            product: 'Produits laitiers',
            from: 'Usine Laitière, Rufisque',
            to: 'Supermarché Auchan, VDN',
            driver: 'Aminata Fall',
            price: '12 000 CFA',
            arrival: '11:45',
            color: '#16A34A'
          },
          {
            status: 'En attente',
            product: 'Fruits et légumes',
            from: 'Entrepôt Fruits, Thiaroye',
            to: 'Marché HLM, Dakar',
            driver: '—',
            price: '6 500 CFA',
            arrival: '',
            color: '#CA8A04'
          }
        ].map((item, i) => (
          <View key={i} style={tw`bg-gray-100 rounded-md p-4 mb-3`}>
            <Text style={tw`text-sm mb-1`}>
              <Text style={{ color: item.color }}>{item.status}</Text>  •  {item.product}
            </Text>
            <Text style={tw`text-xs text-gray-600`}>De: {item.from}</Text>
            <Text style={tw`text-xs text-gray-600`}>Vers: {item.to}</Text>
            <Text style={tw`text-xs text-gray-600`}>Chauffeur: {item.driver}</Text>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`font-bold`}>{item.price}</Text>
              {item.arrival ? <Text style={{ color: '#2563EB', fontSize: 12 }}>Arrivée: {item.arrival}</Text> : null}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal pour changer de rôle */}
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

      {/* Barre de navigation inférieure */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('ExpediteurDashboard')}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('DeliveryRequestScreen')}>
          <Ionicons name="add-circle" size={24} color="black" />
          <Text style={{ fontSize: 12, color: 'black' }}>Livraison</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('ExpediteurFeaturesScreen')}>
          <Ionicons name="menu" size={24} color="gray" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
