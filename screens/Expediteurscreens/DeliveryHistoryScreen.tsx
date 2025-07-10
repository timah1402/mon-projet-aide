import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function DeliveryHistoryScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('enCours');

  const deliveries = [
    {
      id: '1',
      status: 'En cours',
      product: 'Produits surgelés',
      from: 'Marché Kermel, Dakar',
      to: 'Restaurant Le Baobab, Almadies',
      driver: 'Ousmane Sarr',
      price: '8 500 CFA',
    },
    {
      id: '2',
      status: 'Livré',
      product: 'Produits laitiers',
      from: 'Usine Laitière, Rufisque',
      to: 'Supermarché Auchan, VDN',
      driver: 'Aminata Fall',
      price: '12 000 CFA',
    },
    {
      id: '3',
      status: 'En attente',
      product: 'Fruits et légumes',
      from: 'Entrepôt Fruits, Thiaroye',
      to: 'Marché HLM, Dakar',
      driver: '—',
      price: '6 500 CFA',
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'En cours':
        return '#EA580C';
      case 'Livré':
        return '#16A34A';
      case 'En attente':
        return '#CA8A04';
      default:
        return 'gray';
    }
  };

  const filteredDeliveries = deliveries.filter((item) => {
    if (selectedTab === 'enCours') {
      return item.status === 'En cours' || item.status === 'En attente';
    }
    return item.status === 'Livré';
  });

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>Mes livraisons</Text>
      </View>

      {/* Onglets raffinés */}
      <View style={tw`flex-row justify-around mt-4 px-4`}>
        {[
          { key: 'enCours', label: 'En cours' },
          { key: 'historique', label: 'Historique' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setSelectedTab(tab.key)}
            style={tw`flex-1 items-center py-2 ${
              selectedTab === tab.key ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            <Text
              style={tw`text-base ${
                selectedTab === tab.key ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste des livraisons */}
      <ScrollView style={tw`px-4 mt-4`}>
        {filteredDeliveries.length === 0 ? (
          <Text style={tw`text-center text-gray-500 mt-10`}>
            Aucune livraison trouvée.
          </Text>
        ) : (
          filteredDeliveries.map((item) => (
            <View
              key={item.id}
              style={tw`bg-white shadow-sm rounded-xl p-4 mb-4 border border-gray-200`}
            >
              <View style={tw`flex-row justify-between items-center mb-1`}>
                <Text style={[tw`text-sm font-bold`, { color: statusColor(item.status) }]}>
                  {item.status}
                </Text>
                <Text style={tw`text-sm text-gray-700 font-semibold`}>{item.price}</Text>
              </View>

              <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                {item.product}
              </Text>
              <Text style={tw`text-xs text-gray-500 mb-0.5`}>De : {item.from}</Text>
              <Text style={tw`text-xs text-gray-500 mb-0.5`}>Vers : {item.to}</Text>
              <Text style={tw`text-xs text-gray-500 mb-2`}>
                Chauffeur : {item.driver}
              </Text>

              {item.status === 'En cours' && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TrackingScreen')}
                  style={tw`bg-blue-600 py-2 rounded-md items-center mt-2`}
                >
                  <Text style={tw`text-white font-medium text-sm`}>Suivi en temps réel</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
