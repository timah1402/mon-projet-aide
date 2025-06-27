import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function DeliveryHistoryScreen() {
  const navigation = useNavigation();

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
      case 'En cours': return '#EA580C';
      case 'Livré': return '#16A34A';
      case 'En attente': return '#CA8A04';
      default: return 'gray';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mes livraisons</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {deliveries.map((item) => (
          <View key={item.id} style={tw`bg-gray-100 rounded-xl p-4 mb-4`}>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={[tw`text-sm font-semibold`, { color: statusColor(item.status) }]}>
                {item.status}
              </Text>
              <Text style={tw`text-sm font-bold`}>{item.price}</Text>
            </View>
            <Text style={tw`text-base font-bold mb-1`}>{item.product}</Text>
            <Text style={tw`text-xs text-gray-600 mb-1`}>De : {item.from}</Text>
            <Text style={tw`text-xs text-gray-600 mb-1`}>Vers : {item.to}</Text>
            <Text style={tw`text-xs text-gray-600 mb-2`}>Chauffeur : {item.driver}</Text>

            {item.status === 'En cours' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('DeliveryTrackingScreen')}
                style={tw`bg-blue-600 py-2 rounded-md items-center mt-2`}
              >
                <Text style={tw`text-white font-medium`} onPress={() => navigation.navigate('TrackingScreen')}>Suivi en temps réel</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
