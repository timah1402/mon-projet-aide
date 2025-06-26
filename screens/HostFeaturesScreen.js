import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function HostFeaturesScreen() {
  const navigation = useNavigation();

  const features = [
    { label: "Gérer les paiements", icon: <FontAwesome5 name="money-check-alt" size={20} color="black" />, screen: "HostPaymentScreen" },

    { label: "Messages", icon: <Ionicons name="chatbubble-outline" size={20} color="black" />, screen: "ListChatScreen" },
    { label: "Avis & commentaires", icon: <Ionicons name="star-outline" size={20} color="black" />, screen: "HostReviewScreen" },
    { label: "Demandes de réservation", icon: <MaterialIcons name="event-note" size={20} color="black" />, screen: "ReservationRequestsScreen" },
    { label: "Télémétrie IoT", icon: <Ionicons name="thermometer-outline" size={20} color="black" />, screen: "MonitoringScreen" },
    { label: "Gérer mes annonces", icon: <Ionicons name="folder-outline" size={20} color="black" />, screen: "HostMyListingsScreen" },

  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
      </View>
      <ScrollView style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Fonctionnalités Hôte</Text>

        {features.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(item.screen)}
            style={tw`flex-row items-center bg-gray-100 p-4 rounded-lg mb-3`}
          >
            <View style={tw`mr-3`}>{item.icon}</View>
            <Text style={tw`text-base`}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
