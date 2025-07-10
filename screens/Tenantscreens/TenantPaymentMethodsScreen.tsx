import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function TenantPaymentMethodsScreen() {
  // Navigation removed

  const [methods, setMethods] = useState([
    { id: '1', type: 'Carte bancaire', details: '**** **** **** 1234', icon: 'credit-card' },
    { id: '2', type: 'Orange Money', details: '+221 77 123 45 67', icon: 'mobile-alt' },
  ]);

  const removeMethod = (id) => {
    Alert.alert(
      "Supprimer",
      "Voulez-vous vraiment supprimer cette méthode de paiement ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            setMethods((prev) => prev.filter((m) => m.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Moyens de paiement</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {methods.map((method) => (
          <View
            key={method.id}
            style={tw`flex-row justify-between items-center bg-gray-100 rounded-lg p-4 mb-3`}
          >
            <View style={tw`flex-row items-center`}>
              <FontAwesome5 name={method.icon} size={20} color="black" style={tw`mr-3`} />
              <View>
                <Text style={tw`text-base`}>{method.type}</Text>
                <Text style={tw`text-xs text-gray-600`}>{method.details}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeMethod(method.id)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add new method */}
        <TouchableOpacity
          onPress={() => alert("Formulaire d'ajout à venir")}
          style={tw`flex-row items-center justify-center bg-blue-600 py-3 rounded-lg mt-4`}
        >
          <Ionicons name="add-circle-outline" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold`}>Ajouter un moyen de paiement</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
