import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function DriverFeatureScreen() {
  const navigation = useNavigation();

  const features = [
    
    {
        label: "Accepter une mission & suivre le GPS",
        icon: <Ionicons name="navigate-outline" size={20} color="black" />,
        screen: "DriverAvailableMissionsScreen",
        },

    {
      label: "Confirmer la collecte (scan QR ou bouton)",
      icon: <Ionicons name="qr-code-outline" size={20} color="black" />,
      onPress: () => alert("Scanner le QR ou confirmer manuellement la collecte"),
    },
    {
      label: "Livrer, prendre photo & OTP",
      icon: <Ionicons name="camera-outline" size={20} color="black" />,
      onPress: () => alert("Prendre une photo et saisir l’OTP du destinataire"),
    },
    {
      label: "Voir missions assignées",
      icon: <Ionicons name="list-outline" size={20} color="black" />,
      onPress: () => alert("Afficher les missions assignées au chauffeur"),
    },
    {
      label: "Gains & historique de paiements",
  icon: <FontAwesome5 name="money-bill-wave" size={20} color="black" />,
  screen: "DriverEarningsScreen",
    },
    {
      label: "Mode hors-ligne",
      icon: <MaterialIcons name="cloud-off" size={20} color="black" />,
      onPress: () => alert("Activer le mode hors-ligne, synchronisation ultérieure"),
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
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
