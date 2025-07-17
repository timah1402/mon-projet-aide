// screens/DriverDocumentsScreen.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface Document {
  id: string;
  title: string;
  description: string;
  status: 'validé' | 'en-attente' | 'manquant' | 'rejeté';
  required: boolean;
}

interface ValidationStats {
  validés: number;
  enAttente: number;
  manquants: number;
  refusés: number;
}

const DriverDocumentsScreen: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'permis-conduire',
      title: 'Permis de conduire',
      description: 'Permis de conduire',
      status: 'validé',
      required: true
    },
    {
      id: 'carte-identite',
      title: 'Carte d\'identité nationale',
      description: 'Carte d\'identité nationale valide',
      status: 'validé',
      required: true
    },
    {
      id: 'certificat-medical',
      title: 'Certificat médical',
      description: 'Certificat médical d\'aptitude',
      status: 'validé',
      required: true
    },
    {
      id: 'assurance-vehicule',
      title: 'Assurance véhicule',
      description: 'Attestation d\'assurance véhicule en cours',
      status: 'en-attente',
      required: true
    },
    {
      id: 'carte-grise',
      title: 'Carte grise',
      description: 'Carte grise du véhicule',
      status: 'validé',
      required: true
    },
    {
      id: 'casier-judiciaire',
      title: 'Casier judiciaire',
      description: 'Extrait de casier judiciaire',
      status: 'validé',
      required: true
    },
    {
      id: 'photo-profil',
      title: 'Photo de profil',
      description: 'Photo de profil',
      status: 'validé',
      required: true
    },
    {
      id: 'attestation-formation',
      title: 'Attestation de formation',
      description: 'Attestation de formation transport frigorifique',
      status: 'rejeté',
      required: true
    }
  ]);

  const stats: ValidationStats = {
    validés: documents.filter(doc => doc.status === 'validé').length,
    enAttente: documents.filter(doc => doc.status === 'en-attente').length,
    manquants: documents.filter(doc => doc.status === 'manquant').length,
    refusés: documents.filter(doc => doc.status === 'rejeté').length,
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'validé': return '#16A34A';
      case 'en-attente': return '#CA8A04';
      case 'manquant': return '#DC2626';
      case 'rejeté': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'validé': return 'Validé';
      case 'en-attente': return 'En attente';
      case 'manquant': return 'Manquant';
      case 'rejeté': return 'Refusé';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string): keyof typeof Ionicons.glyphMap => {
    switch (status) {
      case 'validé': return 'checkmark-circle';
      case 'en-attente': return 'time';
      case 'manquant': return 'close-circle';
      case 'rejeté': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const handleDocumentAction = (documentId: string, status: string): void => {
    if (status === 'validé') {
      Alert.alert('Document validé', 'Ce document est déjà validé.');
    } else if (status === 'en-attente') {
      Alert.alert('En cours de validation', 'Ce document est en cours de validation par notre équipe.');
    } else {
      Alert.alert('Télécharger un document', 'Fonctionnalité de téléchargement à implémenter.');
    }
  };

  const handleContactSupport = (): void => {
    Alert.alert(
      'Contacter le support',
      'Voulez-vous contacter notre équipe de support pour obtenir de l\'aide avec vos documents ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Contacter', onPress: () => console.log('Contacter le support') }
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold`}>Documents & Validation</Text>
      </View>

      <ScrollView style={tw`flex-1 px-4 pt-4`}>
        {/* Description */}
        <Text style={tw`text-gray-600 text-sm mb-6`}>
          Téléchargez et gérez vos documents administratifs nécessaires pour conduire sur notre plateforme
        </Text>

        {/* Statut de validation */}
        <Text style={tw`text-lg font-semibold mb-4`}>Statut de validation</Text>
        
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-green-50 p-4 rounded-xl items-center border border-green-200`}>
              <Text style={tw`text-2xl font-bold text-green-600`}>{stats.validés}</Text>
              <Text style={tw`text-green-600 text-sm text-center`}>Documents validés</Text>
            </View>
          </View>
          
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-blue-50 p-4 rounded-xl items-center border border-blue-200`}>
              <Text style={tw`text-2xl font-bold text-blue-600`}>{stats.enAttente}</Text>
              <Text style={tw`text-blue-600 text-sm text-center`}>En attente</Text>
            </View>
          </View>
          
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-yellow-50 p-4 rounded-xl items-center border border-yellow-200`}>
              <Text style={tw`text-2xl font-bold text-yellow-600`}>{stats.manquants}</Text>
              <Text style={tw`text-yellow-600 text-sm text-center`}>Manquants</Text>
            </View>
          </View>
          
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-red-50 p-4 rounded-xl items-center border border-red-200`}>
              <Text style={tw`text-2xl font-bold text-red-600`}>{stats.refusés}</Text>
              <Text style={tw`text-red-600 text-sm text-center`}>Refusés</Text>
            </View>
          </View>
        </View>

        {/* Progression de validation */}
        <View style={tw`bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-200`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="warning" size={20} color="#CA8A04" style={tw`mr-2`} />
            <Text style={tw`text-yellow-700 font-semibold`}>Validation en cours</Text>
          </View>
          <Text style={tw`text-yellow-700 text-sm`}>
            Veuillez compléter tous vos documents requis pour commencer à recevoir des missions.
          </Text>
        </View>

        {/* Mes documents */}
        <Text style={tw`text-lg font-semibold mb-4`}>Mes documents</Text>
        
        {documents.map((document) => (
          <View key={document.id} style={tw`bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <View style={tw`flex-1`}>
                <Text style={tw`font-semibold text-base mb-1`}>{document.title}</Text>
                <Text style={tw`text-gray-500 text-sm`}>{document.description}</Text>
              </View>
              
              <View style={tw`flex-row items-center`}>
                <Ionicons 
                  name={getStatusIcon(document.status)} 
                  size={20} 
                  color={getStatusColor(document.status)}
                  style={tw`mr-2`}
                />
                <Text style={[tw`text-sm font-medium`, { color: getStatusColor(document.status) }]}>
                  {getStatusText(document.status)}
                </Text>
              </View>
            </View>
            
            <View style={tw`flex-row justify-between items-center mt-3`}>
              <TouchableOpacity
                style={[
                  tw`flex-1 py-2 px-4 rounded-lg mr-2`,
                  document.status === 'validé' 
                    ? tw`bg-gray-100` 
                    : document.status === 'rejeté'
                    ? tw`bg-red-500`
                    : tw`bg-blue-500`
                ]}
                onPress={() => handleDocumentAction(document.id, document.status)}
              >
                <Text style={[
                  tw`text-center font-medium`,
                  document.status === 'validé' 
                    ? tw`text-gray-600` 
                    : tw`text-white`
                ]}>
                  {document.status === 'validé' ? 'Voir' : 
                   document.status === 'rejeté' ? 'Re-télécharger' : 'Télécharger'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={tw`p-2`}>
                <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Besoin d'aide */}
        <View style={tw`bg-blue-50 p-4 rounded-xl mt-6 mb-8 border border-blue-200`}>
          <Text style={tw`font-semibold text-blue-900 mb-2`}>Besoin d'aide ?</Text>
          <Text style={tw`text-blue-700 text-sm mb-4`}>
            Si vous avez des questions concernant vos documents ou le processus de validation, notre équipe support est là pour vous aider.
          </Text>
          <TouchableOpacity
            style={tw`bg-blue-500 py-3 rounded-lg`}
            onPress={handleContactSupport}
          >
            <Text style={tw`text-white text-center font-semibold`}>Contacter le support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverDocumentsScreen;