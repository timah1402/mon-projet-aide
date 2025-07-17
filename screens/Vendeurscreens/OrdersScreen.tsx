// screens/OrdersScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Animated,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Commande {
  id: string;
  acheteurNom: string;
  acheteurPhone: string;
  produits: {
    nom: string;
    quantite: number;
    prixUnitaire: number;
    total: number;
  }[];
  montantTotal: number;
  statut: 'En attente' | 'Confirmée' | 'Préparée' | 'En livraison' | 'Livrée' | 'Annulée';
  dateCommande: string;
  heureCommande: string;
  adresseLivraison: string;
  noteClient?: string;
}

export default function OrdersScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Toutes');
  const [selectedOrder, setSelectedOrder] = useState<Commande | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [commandes, setCommandes] = useState<Commande[]>([
    {
      id: 'CMD001',
      acheteurNom: 'Fatou Diallo',
      acheteurPhone: '+221 77 123 4567',
      produits: [
        {
          nom: 'Thiof frais',
          quantite: 3,
          prixUnitaire: 2500,
          total: 7500
        },
        {
          nom: 'Crevettes roses',
          quantite: 1,
          prixUnitaire: 8000,
          total: 8000
        }
      ],
      montantTotal: 15500,
      statut: 'En attente',
      dateCommande: '14 Jan 2025',
      heureCommande: '14:30',
      adresseLivraison: 'Médina, Dakar',
      noteClient: 'Livraison avant 18h SVP'
    },
    {
      id: 'CMD002',
      acheteurNom: 'Ousmane Ba',
      acheteurPhone: '+221 76 987 6543',
      produits: [
        {
          nom: 'Légumes bio mélangés',
          quantite: 5,
          prixUnitaire: 1200,
          total: 6000
        }
      ],
      montantTotal: 6000,
      statut: 'Confirmée',
      dateCommande: '14 Jan 2025',
      heureCommande: '12:15',
      adresseLivraison: 'Plateau, Dakar'
    },
    {
      id: 'CMD003',
      acheteurNom: 'Aïda Sow',
      acheteurPhone: '+221 78 456 7890',
      produits: [
        {
          nom: 'Fruits tropicaux',
          quantite: 2,
          prixUnitaire: 1800,
          total: 3600
        }
      ],
      montantTotal: 3600,
      statut: 'Livrée',
      dateCommande: '13 Jan 2025',
      heureCommande: '16:45',
      adresseLivraison: 'Almadies, Dakar'
    },
    {
      id: 'CMD004',
      acheteurNom: 'Moussa Diop',
      acheteurPhone: '+221 77 555 4444',
      produits: [
        {
          nom: 'Poisson séché',
          quantite: 4,
          prixUnitaire: 3000,
          total: 12000
        }
      ],
      montantTotal: 12000,
      statut: 'En livraison',
      dateCommande: '14 Jan 2025',
      heureCommande: '10:20',
      adresseLivraison: 'Parcelles Assainies, Dakar'
    }
  ]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filtres = ['Toutes', 'En attente', 'Confirmée', 'Préparée', 'En livraison', 'Livrée'];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Confirmée':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Préparée':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'En livraison':
        return 'bg-orange-100 text-orange-700 border-orange-200';
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

  const commandesFiltrees = selectedFilter === 'Toutes' 
    ? commandes 
    : commandes.filter(cmd => cmd.statut === selectedFilter);

  const getNextStatut = (currentStatut: string) => {
    const workflow = ['En attente', 'Confirmée', 'Préparée', 'En livraison', 'Livrée'];
    const currentIndex = workflow.indexOf(currentStatut);
    return currentIndex < workflow.length - 1 ? workflow[currentIndex + 1] : null;
  };

  const updateStatut = (commandeId: string, newStatut: string) => {
    // Mettre à jour le statut dans la liste des commandes
    setCommandes(prevCommandes => 
      prevCommandes.map(commande => 
        commande.id === commandeId 
          ? { ...commande, statut: newStatut as Commande['statut'] }
          : commande
      )
    );

    // Mettre à jour la commande sélectionnée si c'est celle-ci
    if (selectedOrder && selectedOrder.id === commandeId) {
      setSelectedOrder({ ...selectedOrder, statut: newStatut as Commande['statut'] });
    }

    // Afficher le message de confirmation
    const messages = {
      'Confirmée': 'Commande validée avec succès ! 🎉',
      'Annulée': 'Commande refusée.',
      'Préparée': 'Commande marquée comme préparée.',
      'En livraison': 'Commande en cours de livraison.',
      'Livrée': 'Commande livrée avec succès ! 🚚'
    };

    Alert.alert(
      'Statut mis à jour', 
      messages[newStatut] || `La commande a été marquée comme "${newStatut}"`,
      [{ text: 'OK', onPress: () => setModalVisible(false) }]
    );

    console.log(`Mise à jour commande ${commandeId} vers ${newStatut}`);
    // Note: Dans une vraie app, vous enverriez cette mise à jour à votre base de données ici
  };

  const validateOrder = (commandeId: string) => {
    Alert.alert(
      'Valider la commande',
      'Confirmer cette commande ? Le client sera notifié.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          style: 'default',
          onPress: () => updateStatut(commandeId, 'Confirmée'),
        },
      ]
    );
  };

  const rejectOrder = (commandeId: string) => {
    Alert.alert(
      'Refuser la commande',
      'Êtes-vous sûr de vouloir refuser cette commande ? Cette action ne peut pas être annulée.',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Refuser',
          style: 'destructive',
          onPress: () => updateStatut(commandeId, 'Annulée'),
        },
      ]
    );
  };

  const openOrderDetails = (commande: Commande) => {
    setSelectedOrder(commande);
    setModalVisible(true);
  };

  const getTotalCommandesToday = () => {
    return commandes.filter(cmd => cmd.dateCommande === '14 Jan 2025').length;
  };

  const getRevenuToday = () => {
    return commandes
      .filter(cmd => cmd.dateCommande === '14 Jan 2025' && cmd.statut === 'Livrée')
      .reduce((total, cmd) => total + cmd.montantTotal, 0);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header avec dégradé */}
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
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl font-bold text-white`}>Mes commandes</Text>
            <Text style={tw`text-green-100 text-sm`}>Gérez vos commandes en temps réel</Text>
          </View>
          <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="bag-handle" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <Animated.View style={[tw`flex-1`, { opacity: fadeAnim }]}>
        {/* Statistiques rapides */}
        <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Aujourd'hui</Text>
          <View style={tw`flex-row justify-around`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-blue-600`}>{getTotalCommandesToday()}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Commandes</Text>
            </View>
            <View style={tw`w-px bg-gray-200`} />
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-green-600`}>{getRevenuToday().toLocaleString()}</Text>
              <Text style={tw`text-gray-600 text-sm`}>CFA livrés</Text>
            </View>
            <View style={tw`w-px bg-gray-200`} />
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-orange-600`}>
                {commandes.filter(cmd => cmd.statut === 'En attente').length}
              </Text>
              <Text style={tw`text-gray-600 text-sm`}>À valider</Text>
            </View>
          </View>
          
          {/* Alerte pour commandes en attente */}
          {commandes.filter(cmd => cmd.statut === 'En attente').length > 0 && (
            <View style={tw`mt-4 bg-orange-50 rounded-xl p-3 flex-row items-center`}>
              <Ionicons name="warning" size={20} color="#EA580C" style={tw`mr-3`} />
              <Text style={tw`text-orange-700 text-sm font-medium flex-1`}>
                Vous avez {commandes.filter(cmd => cmd.statut === 'En attente').length} commande(s) en attente de validation
              </Text>
            </View>
          )}
        </View>

        {/* Filtres */}
        <View style={tw`px-4 mt-4`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex-row`}>
              {filtres.map((filtre) => (
                <TouchableOpacity
                  key={filtre}
                  onPress={() => setSelectedFilter(filtre)}
                  style={[
                    tw`py-2 px-4 mr-3 rounded-full border-2`,
                    selectedFilter === filtre 
                      ? tw`bg-green-500 border-green-500` 
                      : tw`bg-white border-gray-300`
                  ]}
                >
                  <Text style={[
                    tw`text-sm font-semibold`,
                    { color: selectedFilter === filtre ? 'white' : '#374151' }
                  ]}>
                    {filtre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Liste des commandes */}
        <ScrollView style={tw`flex-1 px-4 mt-4`} showsVerticalScrollIndicator={false}>
          {commandesFiltrees.map((commande) => (
            <TouchableOpacity
              key={commande.id}
              onPress={() => openOrderDetails(commande)}
              style={tw`bg-white rounded-2xl p-4 mb-4 shadow-lg`}
            >
              {/* En-tête de la commande */}
              <View style={tw`flex-row justify-between items-center mb-3`}>
                <View>
                  <Text style={tw`text-lg font-bold text-gray-800`}>#{commande.id}</Text>
                  <Text style={tw`text-gray-600 text-sm`}>{commande.dateCommande} • {commande.heureCommande}</Text>
                </View>
                <View style={[tw`py-1 px-3 rounded-full border`, tw`${getStatutColor(commande.statut)}`]}>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons 
                      name={getStatutIcon(commande.statut)} 
                      size={14} 
                      color={commande.statut === 'En attente' ? '#B45309' : 
                             commande.statut === 'Confirmée' ? '#1D4ED8' :
                             commande.statut === 'Préparée' ? '#7C3AED' :
                             commande.statut === 'En livraison' ? '#EA580C' :
                             commande.statut === 'Livrée' ? '#059669' : '#DC2626'} 
                      style={tw`mr-1`}
                    />
                    <Text style={tw`text-xs font-semibold`}>{commande.statut}</Text>
                  </View>
                </View>
              </View>

              {/* Informations client */}
              <View style={tw`bg-gray-50 rounded-xl p-3 mb-3`}>
                <View style={tw`flex-row items-center mb-1`}>
                  <Ionicons name="person" size={16} color="#6B7280" style={tw`mr-2`} />
                  <Text style={tw`text-gray-800 font-semibold`}>{commande.acheteurNom}</Text>
                </View>
                <View style={tw`flex-row items-center mb-1`}>
                  <Ionicons name="call" size={16} color="#6B7280" style={tw`mr-2`} />
                  <Text style={tw`text-gray-600 text-sm`}>{commande.acheteurPhone}</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="location" size={16} color="#6B7280" style={tw`mr-2`} />
                  <Text style={tw`text-gray-600 text-sm`}>{commande.adresseLivraison}</Text>
                </View>
              </View>

              {/* Produits commandés */}
              <View style={tw`mb-3`}>
                {commande.produits.map((produit, index) => (
                  <View key={index} style={tw`flex-row justify-between items-center py-1`}>
                    <Text style={tw`text-gray-700 flex-1`}>
                      {produit.quantite}x {produit.nom}
                    </Text>
                    <Text style={tw`text-gray-800 font-semibold`}>
                      {produit.total.toLocaleString()} CFA
                    </Text>
                  </View>
                ))}
              </View>

              {/* Total et note */}
              <View style={tw`border-t border-gray-200 pt-3`}>
                <View style={tw`flex-row justify-between items-center mb-2`}>
                  <Text style={tw`text-lg font-bold text-gray-800`}>Total</Text>
                  <Text style={tw`text-xl font-bold text-green-600`}>
                    {commande.montantTotal.toLocaleString()} CFA
                  </Text>
                </View>
                {commande.noteClient && (
                  <View style={tw`bg-blue-50 rounded-lg p-2 flex-row items-start mb-3`}>
                    <Ionicons name="chatbubble" size={14} color="#3B82F6" style={tw`mr-2 mt-1`} />
                    <Text style={tw`text-blue-700 text-sm flex-1`}>{commande.noteClient}</Text>
                  </View>
                )}
                
                {/* Actions rapides pour commandes en attente */}
                {commande.statut === 'En attente' && (
                  <View style={tw`flex-row mt-3`}>
                    <TouchableOpacity
                      onPress={() => rejectOrder(commande.id)}
                      style={tw`flex-1 bg-red-500 rounded-xl py-2 px-4 mr-2 flex-row items-center justify-center`}
                    >
                      <Ionicons name="close" size={16} color="white" style={tw`mr-1`} />
                      <Text style={tw`text-white font-semibold text-sm`}>Refuser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => validateOrder(commande.id)}
                      style={tw`flex-1 bg-green-500 rounded-xl py-2 px-4 ml-2 flex-row items-center justify-center`}
                    >
                      <Ionicons name="checkmark" size={16} color="white" style={tw`mr-1`} />
                      <Text style={tw`text-white font-semibold text-sm`}>Confirmer</Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                {/* Indicateur de progression pour autres statuts */}
                {commande.statut !== 'En attente' && commande.statut !== 'Livrée' && commande.statut !== 'Annulée' && (
                  <View style={tw`mt-3`}>
                    <View style={tw`flex-row items-center justify-center py-2 px-4 bg-gray-50 rounded-xl`}>
                      <Ionicons name="time" size={16} color="#6B7280" style={tw`mr-2`} />
                      <Text style={tw`text-gray-600 text-sm font-medium`}>
                        Prochaine étape: {getNextStatut(commande.statut) || 'Terminée'}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {commandesFiltrees.length === 0 && (
            <View style={tw`bg-white rounded-2xl p-8 items-center`}>
              <Ionicons name="bag-outline" size={48} color="#9CA3AF" />
              <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucune commande</Text>
              <Text style={tw`text-gray-400 text-center mt-2`}>
                Aucune commande trouvée pour le filtre "{selectedFilter}"
              </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>

      {/* Modal détails de commande */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-5/6`}>
            {selectedOrder && (
              <>
                {/* Header modal */}
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>Commande #{selectedOrder.id}</Text>
                    <Text style={tw`text-gray-600`}>{selectedOrder.dateCommande} • {selectedOrder.heureCommande}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={tw`flex-1 px-6`}>
                  {/* Statut actuel */}
                  <View style={tw`my-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Statut</Text>
                    <View style={[tw`py-3 px-4 rounded-xl border-2`, tw`${getStatutColor(selectedOrder.statut)}`]}>
                      <View style={tw`flex-row items-center justify-center`}>
                        <Ionicons 
                          name={getStatutIcon(selectedOrder.statut)} 
                          size={20} 
                          color={selectedOrder.statut === 'En attente' ? '#B45309' : 
                                 selectedOrder.statut === 'Confirmée' ? '#1D4ED8' :
                                 selectedOrder.statut === 'Préparée' ? '#7C3AED' :
                                 selectedOrder.statut === 'En livraison' ? '#EA580C' :
                                 selectedOrder.statut === 'Livrée' ? '#059669' : '#DC2626'} 
                          style={tw`mr-2`}
                        />
                        <Text style={tw`text-base font-semibold`}>{selectedOrder.statut}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Actions rapides */}
                  {selectedOrder.statut === 'En attente' && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Actions</Text>
                      <View style={tw`flex-row`}>
                        <TouchableOpacity
                          onPress={() => rejectOrder(selectedOrder.id)}
                          style={tw`flex-1 bg-red-500 rounded-xl py-3 px-4 mr-2 flex-row items-center justify-center`}
                        >
                          <Ionicons name="close" size={20} color="white" style={tw`mr-2`} />
                          <Text style={tw`text-white font-semibold`}>Refuser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => validateOrder(selectedOrder.id)}
                          style={tw`flex-1 bg-green-500 rounded-xl py-3 px-4 ml-2 flex-row items-center justify-center`}
                        >
                          <Ionicons name="checkmark" size={20} color="white" style={tw`mr-2`} />
                          <Text style={tw`text-white font-semibold`}>Confirmer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {/* Progression du statut pour autres commandes */}
                  {getNextStatut(selectedOrder.statut) && selectedOrder.statut !== 'En attente' && (
                    <View style={tw`mb-4`}>
                      <TouchableOpacity
                        onPress={() => updateStatut(selectedOrder.id, getNextStatut(selectedOrder.statut)!)}
                        style={tw`bg-green-500 rounded-xl py-3 px-4 flex-row items-center justify-center`}
                      >
                        <Ionicons name="arrow-forward" size={20} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white font-semibold`}>
                          Marquer comme "{getNextStatut(selectedOrder.statut)}"
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Workflow de progression visuel */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Progression</Text>
                    <View style={tw`bg-gray-50 rounded-xl p-4`}>
                      {['En attente', 'Confirmée', 'Préparée', 'En livraison', 'Livrée'].map((etape, index) => {
                        const isCompleted = ['En attente', 'Confirmée', 'Préparée', 'En livraison', 'Livrée'].indexOf(selectedOrder.statut) >= index;
                        const isCurrent = selectedOrder.statut === etape;
                        const isRejected = selectedOrder.statut === 'Annulée' && etape === 'En attente';
                        
                        return (
                          <View key={etape} style={tw`flex-row items-center mb-2`}>
                            <View style={[
                              tw`w-4 h-4 rounded-full mr-3`,
                              isRejected ? tw`bg-red-500` :
                              isCurrent ? tw`bg-blue-500` :
                              isCompleted ? tw`bg-green-500` : tw`bg-gray-300`
                            ]}>
                              {(isCompleted || isRejected) && (
                                <Ionicons 
                                  name={isRejected ? "close" : "checkmark"} 
                                  size={12} 
                                  color="white" 
                                  style={tw`ml-0.5 mt-0.5`}
                                />
                              )}
                            </View>
                            <Text style={[
                              tw`text-base`,
                              isCurrent ? tw`font-bold text-blue-600` :
                              isCompleted ? tw`font-semibold text-green-600` :
                              isRejected ? tw`font-semibold text-red-600` :
                              tw`text-gray-500`
                            ]}>
                              {etape}
                            </Text>
                            {isCurrent && (
                              <View style={tw`ml-2 bg-blue-100 rounded-full px-2 py-1`}>
                                <Text style={tw`text-blue-600 text-xs font-semibold`}>Actuel</Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                      {selectedOrder.statut === 'Annulée' && (
                        <View style={tw`flex-row items-center mt-2 bg-red-50 rounded-lg p-2`}>
                          <Ionicons name="warning" size={16} color="#DC2626" style={tw`mr-2`} />
                          <Text style={tw`text-red-600 text-sm font-semibold`}>Commande annulée</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Informations client détaillées */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Client</Text>
                    <View style={tw`bg-gray-50 rounded-xl p-4`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <Ionicons name="person" size={20} color="#6B7280" style={tw`mr-3`} />
                        <Text style={tw`text-gray-800 font-semibold text-base`}>{selectedOrder.acheteurNom}</Text>
                      </View>
                      <TouchableOpacity style={tw`flex-row items-center mb-2`}>
                        <Ionicons name="call" size={20} color="#10B981" style={tw`mr-3`} />
                        <Text style={tw`text-green-600 text-base`}>{selectedOrder.acheteurPhone}</Text>
                      </TouchableOpacity>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="location" size={20} color="#6B7280" style={tw`mr-3`} />
                        <Text style={tw`text-gray-600 text-base flex-1`}>{selectedOrder.adresseLivraison}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Détail des produits */}
                  <View style={tw`mb-6`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Produits commandés</Text>
                    {selectedOrder.produits.map((produit, index) => (
                      <View key={index} style={tw`bg-white border border-gray-200 rounded-xl p-4 mb-2`}>
                        <View style={tw`flex-row justify-between items-center mb-2`}>
                          <Text style={tw`text-gray-800 font-semibold flex-1`}>{produit.nom}</Text>
                          <Text style={tw`text-gray-600`}>{produit.prixUnitaire.toLocaleString()} CFA/unité</Text>
                        </View>
                        <View style={tw`flex-row justify-between items-center`}>
                          <Text style={tw`text-gray-600`}>Quantité: {produit.quantite}</Text>
                          <Text style={tw`text-lg font-bold text-green-600`}>
                            {produit.total.toLocaleString()} CFA
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Total */}
                  <View style={tw`border-t border-gray-200 pt-4 mb-6`}>
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-xl font-bold text-gray-800`}>Total à recevoir</Text>
                      <Text style={tw`text-2xl font-bold text-green-600`}>
                        {selectedOrder.montantTotal.toLocaleString()} CFA
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}