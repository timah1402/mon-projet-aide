import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function InvoiceDetailScreen() {
  // Données statiques pour l'instant (pas de useLocalSearchParams)
  const invoice = {
    id: 'INV-001',
    title: 'Réservation Pikine',
    amount: '54 000 CFA',
    date: '20/06/2024',
    host: 'Moussa Diagne',
    location: 'Pikine, Dakar',
    period: '20-23 juin 2024',
    status: 'Payé',
    quantity: '25 kg',
    goodsType: 'Poulets'
  };

  const download = () => {
    Alert.alert("Téléchargement", `Facture ${invoice.id} en cours...`);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Facture {invoice.id}</Text>
      </View>

      <View style={tw`m-4 bg-white rounded-xl p-5 shadow`}>
        {/* Logo + Référence */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <View>
            <Text style={tw`text-xl font-bold text-blue-700`}>Senfrais</Text>
            <Text style={tw`text-xs text-gray-500`}>www.senfrais.com</Text>
          </View>
          <View style={tw`items-end`}>
            <Text style={tw`text-xs text-gray-500`}>Facture</Text>
            <Text style={tw`text-sm font-bold`}>{invoice.id}</Text>
          </View>
        </View>

        {/* Infos principales */}
        <View style={tw`border-t border-b border-gray-200 py-3 mb-4`}>
          <Text style={tw`text-sm text-gray-500 mb-1`}>Réservation</Text>
          <Text style={tw`text-base font-semibold text-black mb-1`}>{invoice.title}</Text>

          <Text style={tw`text-sm text-gray-500 mb-1`}>Dates</Text>
          <Text style={tw`text-base text-black mb-1`}>{invoice.period}</Text>

          <Text style={tw`text-sm text-gray-500 mb-1`}>Lieu</Text>
          <Text style={tw`text-base text-black mb-1`}>{invoice.location}</Text>

          <Text style={tw`text-sm text-gray-500 mb-1`}>Quantité</Text>
          <Text style={tw`text-base text-black mb-1`}>{invoice.quantity}</Text>

          <Text style={tw`text-sm text-gray-500 mb-1`}>Type de marchandise</Text>
          <Text style={tw`text-base text-black`}>{invoice.goodsType}</Text>
        </View>

        {/* Infos de paiement */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-sm text-gray-500 mb-1`}>Montant total</Text>
          <Text style={tw`text-xl font-bold text-green-700`}>{invoice.amount}</Text>

          <Text style={tw`text-sm text-gray-500 mt-3 mb-1`}>Hôte</Text>
          <Text style={tw`text-base`}>{invoice.host}</Text>

          <Text style={tw`text-sm text-gray-500 mt-3 mb-1`}>Date de paiement</Text>
          <Text style={tw`text-base`}>{invoice.date}</Text>
        </View>

        {/* Bouton Télécharger */}
        <TouchableOpacity
          onPress={download}
          style={tw`bg-blue-600 py-3 rounded-lg mt-4 flex-row justify-center items-center`}
        >
          <Ionicons name="download-outline" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold`}>Télécharger la facture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}