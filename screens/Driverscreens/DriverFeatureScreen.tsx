import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// Removed navigation import
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function DriverFeatureScreen() {
  // Navigation removed

  const features = [
    
    {
        label: "Accepter une mission & suivre le GPS",
        icon: <Ionicons name="navigate-outline" size={20} color="black" />,
        screen: "DriverAvailableMissionsScreen",
        },

   
    
    {
      label: "Gains & historique de paiements",
  icon: <FontAwesome5 name="money-bill-wave" size={20} color="black" />,
  screen: "DriverEarningsScreen",
    },
    
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <ScrollView style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Fonctionnalités Chauffeur</Text>

        {features.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              item.screen ? navigation.navigate(item.screen) : item.onPress()
            }
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
