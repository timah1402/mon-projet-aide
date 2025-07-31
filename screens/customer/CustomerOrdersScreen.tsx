import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Avis {
  note: number;
  commentaire: string;
  date: string;
}

interface Commande {
  id: string;
  vendeur: string;
  produits: string;
  montantTotal: number;
  statut: 'En attente' | 'Confirmée' | 'Préparée' | 'En livraison' | 'Livrée' | 'Annulée';
  date: string;
  avis?: Avis;
}

export default function CustomerOrdersScreen() {
  const [commandes, setCommandes] = useState<Commande[]>([
    {
      id: 'CMD001',
      vendeur: 'Marché Frais de Fatou',
      produits: '3x Thiof, 1x Crevettes',
      montantTotal: 15500,
      statut: 'En attente',
      date: '28 Juil 2025, 14:30'
    },
    {
      id: 'CMD002',
      vendeur: 'Bio Légumes Dakar',
      produits: '2x Tomates, 3x Oignons',
      montantTotal: 6600,
      statut: 'Livrée',
      date: '27 Juil 2025, 10:15',
      avis: {
        note: 5,
        commentaire: 'Produits très frais, livraison rapide !',
        date: '27 Juil 2025, 16:00'
      }
    },
    {
      id: 'CMD003',
      vendeur: 'Fruits Tropicaux Sénégal',
      produits: '5x Mangues, 2x Ananas',
      montantTotal: 10000,
      statut: 'Confirmée',
      date: '28 Juil 2025, 11:45'
    },
    {
      id: 'CMD004',
      vendeur: 'Poissonnerie Atlantique',
      produits: '2x Dorade fraîche',
      montantTotal: 7000,
      statut: 'En livraison',
      date: '28 Juil 2025, 09:00'
    },
    {
      id: 'CMD005',
      vendeur: 'Marché Bio Sénégal',
      produits: '1x Poulet du pays',
      montantTotal: 4500,
      statut: 'Livrée',
      date: '26 Juil 2025, 15:20'
    }
  ]);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<Commande | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Confirmée':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Préparée':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'En livraison':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Livrée':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Annulée':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'En attente':
        return 'time';
      case 'Confirmée':
        return 'checkmark-circle';
      case 'Préparée':
        return 'cube';
      case 'En livraison':
        return 'car';
      case 'Livrée':
        return 'checkmark-done-circle';
      case 'Annulée':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const canCancelOrder = (statut: string): boolean => {
    return statut === 'En attente' || statut === 'Confirmée';
  };

  const cancelOrder = (commandeId: string) => {
    Alert.alert(
      'Annuler la commande',
      'Êtes-vous sûr de vouloir annuler cette commande ?',
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            setCommandes(prevCommandes => 
              prevCommandes.map(commande => 
                commande.id === commandeId 
                  ? { ...commande, statut: 'Annulée' as const }
                  : commande
              )
            );
            Alert.alert('Succès', 'Votre commande a été annulée.');
          },
        },
      ]
    );
  };

  const openRatingModal = (commande: Commande) => {
    setSelectedCommand(commande);
    setRating(commande.avis?.note || 0);
    setComment(commande.avis?.commentaire || '');
    setShowRatingModal(true);
  };

  const submitRating = () => {
    if (rating === 0) {
      Alert.alert('Erreur', 'Veuillez donner une note avant de soumettre.');
      return;
    }

    if (selectedCommand) {
      const newAvis: Avis = {
        note: rating,
        commentaire: comment,
        date: new Date().toLocaleString('fr-FR')
      };

      setCommandes(prevCommandes =>
        prevCommandes.map(commande =>
          commande.id === selectedCommand.id
            ? { ...commande, avis: newAvis }
            : commande
        )
      );

      Alert.alert('Merci !', 'Votre avis a été enregistré avec succès.');
      setShowRatingModal(false);
      setRating(0);
      setComment('');
    }
  };

  const renderStars = (note: number, interactive: boolean = false) => {
    return (
      <View style={tw`flex-row`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => interactive && setRating(star)}
            disabled={!interactive}
          >
            <Ionicons
              name={star <= note ? 'star' : 'star-outline'}
              size={interactive ? 32 : 16}
              color="#F59E0B"
              style={tw`${interactive ? 'mx-1' : ''}`}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header avec dégradé vert */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={tw`pb-4`}
      >
        <View style={tw`flex-row items-center pt-4 px-4`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[tw`rounded-full p-2 mr-4`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold text-white flex-1`}>Mes commandes</Text>
          <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="bag-handle" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* Liste des commandes */}
      <ScrollView 
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-4`}
      >
        {commandes.map((commande) => (
          <View
            key={commande.id}
            style={tw`bg-white rounded-2xl p-4 mb-4 shadow-lg`}
          >
            {/* En-tête */}
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <View>
                <Text style={tw`text-lg font-bold text-gray-800`}>#{commande.id}</Text>
                <Text style={tw`text-gray-600 text-sm`}>{commande.date}</Text>
              </View>
              <View style={[tw`py-1 px-3 rounded-full border`, tw`${getStatutColor(commande.statut)}`]}>
                <View style={tw`flex-row items-center`}>
                  <Ionicons 
                    name={getStatutIcon(commande.statut)} 
                    size={14} 
                    color={commande.statut === 'En attente' ? '#D97706' : 
                           commande.statut === 'Confirmée' ? '#1D4ED8' :
                           commande.statut === 'Préparée' ? '#7C3AED' :
                           commande.statut === 'En livraison' ? '#D97706' :
                           commande.statut === 'Livrée' ? '#059669' : '#DC2626'} 
                    style={tw`mr-1`}
                  />
                  <Text style={tw`text-xs font-semibold`}>{commande.statut}</Text>
                </View>
              </View>
            </View>

            {/* Informations */}
            <View style={tw`bg-gray-50 rounded-xl p-3 mb-3`}>
              <View style={tw`flex-row items-center mb-1`}>
                <Ionicons name="storefront" size={16} color="#6B7280" style={tw`mr-2`} />
                <Text style={tw`text-gray-800 font-semibold`}>{commande.vendeur}</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="basket" size={16} color="#6B7280" style={tw`mr-2`} />
                <Text style={tw`text-gray-600 text-sm`}>{commande.produits}</Text>
              </View>
            </View>

            {/* Total et action */}
            <View style={tw`border-t border-gray-200 pt-3`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>Total</Text>
                <Text style={tw`text-xl font-bold text-green-600`}>
                  {commande.montantTotal.toLocaleString()} CFA
                </Text>
              </View>

              {/* Afficher l'avis si déjà donné */}
              {commande.avis && (
                <View style={tw`bg-blue-50 rounded-xl p-3 mb-3`}>
                  <View style={tw`flex-row items-center justify-between mb-2`}>
                    <Text style={tw`text-sm font-semibold text-gray-700`}>Votre avis</Text>
                    {renderStars(commande.avis.note)}
                  </View>
                  {commande.avis.commentaire && (
                    <Text style={tw`text-gray-600 text-sm italic`}>"{commande.avis.commentaire}"</Text>
                  )}
                  <Text style={tw`text-gray-500 text-xs mt-1`}>{commande.avis.date}</Text>
                </View>
              )}

              {/* Bouton pour donner/modifier un avis si la commande est livrée */}
              {commande.statut === 'Livrée' && (
                <TouchableOpacity
                  onPress={() => openRatingModal(commande)}
                  style={tw`bg-yellow-500 rounded-xl py-2 px-4 flex-row items-center justify-center mt-3`}
                >
                  <Ionicons name="star" size={16} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold text-sm`}>
                    {commande.avis ? 'Modifier mon avis' : 'Donner mon avis'}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Bouton annuler si la commande est en attente ou confirmée */}
              {canCancelOrder(commande.statut) && (
                <TouchableOpacity
                  onPress={() => cancelOrder(commande.id)}
                  style={tw`bg-red-500 rounded-xl py-2 px-4 flex-row items-center justify-center mt-3`}
                >
                  <Ionicons name="close" size={16} color="white" style={tw`mr-1`} />
                  <Text style={tw`text-white font-semibold text-sm`}>Annuler la commande</Text>
                </TouchableOpacity>
              )}

              {/* Message pour les commandes en livraison */}
              {commande.statut === 'En livraison' && (
                <View style={tw`bg-yellow-50 rounded-lg p-2 flex-row items-center mt-3`}>
                  <Ionicons name="bicycle" size={14} color="#D97706" style={tw`mr-2`} />
                  <Text style={tw`text-yellow-700 text-sm`}>Votre commande est en route</Text>
                </View>
              )}

              {/* Message pour les commandes livrées sans avis */}
              {commande.statut === 'Livrée' && !commande.avis && (
                <View style={tw`bg-green-50 rounded-lg p-2 flex-row items-center mt-3`}>
                  <Ionicons name="checkmark-circle" size={14} color="#059669" style={tw`mr-2`} />
                  <Text style={tw`text-green-700 text-sm`}>Commande livrée avec succès</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {commandes.length === 0 && (
          <View style={tw`bg-white rounded-2xl p-8 items-center`}>
            <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
            <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucune commande</Text>
            <Text style={tw`text-gray-400 text-center mt-2`}>
              Vous n'avez pas encore passé de commande
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/marketplace')}
              style={tw`bg-green-500 rounded-xl py-3 px-6 mt-4`}
            >
              <Text style={tw`text-white font-semibold`}>Découvrir les produits</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Modal pour donner un avis */}
      <Modal
        visible={showRatingModal}
        transparent
        animationType="slide"
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl p-6`}>
            {/* Header du modal */}
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>
                {selectedCommand?.avis ? 'Modifier votre avis' : 'Donner votre avis'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRatingModal(false);
                  setRating(0);
                  setComment('');
                }}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Informations de la commande */}
            {selectedCommand && (
              <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
                <Text style={tw`font-semibold text-gray-800 mb-1`}>{selectedCommand.vendeur}</Text>
                <Text style={tw`text-gray-600 text-sm`}>{selectedCommand.produits}</Text>
                <Text style={tw`text-gray-500 text-xs mt-1`}>Commandé le {selectedCommand.date}</Text>
              </View>
            )}

            {/* Notation par étoiles */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-lg font-semibold text-gray-800 mb-3 text-center`}>
                Comment évaluez-vous votre commande ?
              </Text>
              <View style={tw`items-center`}>
                {renderStars(rating, true)}
              </View>
            </View>

            {/* Champ de commentaire */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>
                Votre commentaire (optionnel)
              </Text>
              <TextInput
                style={tw`bg-gray-50 rounded-xl p-4 text-gray-800 h-24`}
                placeholder="Partagez votre expérience..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={comment}
                onChangeText={setComment}
                textAlignVertical="top"
              />
            </View>

            {/* Boutons d'action */}
            <View style={tw`flex-row`}>
              <TouchableOpacity
                onPress={() => {
                  setShowRatingModal(false);
                  setRating(0);
                  setComment('');
                }}
                style={tw`flex-1 bg-gray-200 rounded-xl py-3 mr-2`}
              >
                <Text style={tw`text-gray-700 font-semibold text-center`}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitRating}
                style={tw`flex-1 bg-green-500 rounded-xl py-3 ml-2`}
              >
                <Text style={tw`text-white font-semibold text-center`}>Soumettre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}