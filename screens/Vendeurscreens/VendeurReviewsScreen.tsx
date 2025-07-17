// screens/VendeurReviewsScreen.tsx
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

interface Avis {
  id: string;
  clientNom: string;
  clientAvatar: string;
  note: number;
  commentaire: string;
  date: string;
  heure: string;
  produitNom: string;
  commandeId: string;
  photos?: string[];
  reponseVendeur?: string;
  dateReponse?: string;
  utile: number;
  signale: boolean;
}

export default function VendeurReviewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [selectedReview, setSelectedReview] = useState<Avis | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const [avis, setAvis] = useState<Avis[]>([
    {
      id: 'AV001',
      clientNom: 'Fatou Diallo',
      clientAvatar: 'F',
      note: 5,
      commentaire: 'Excellent thiof ! Très frais, livraison rapide. Je recommande vivement ce vendeur. La qualité est au rendez-vous et le service client parfait.',
      date: '15 Jan 2025',
      heure: '14:30',
      produitNom: 'Poisson frais (Thiof)',
      commandeId: 'CMD001',
      photos: [],
      utile: 12,
      signale: false
    },
    {
      id: 'AV002',
      clientNom: 'Ousmane Ba',
      clientAvatar: 'O',
      note: 4,
      commentaire: 'Bon produit dans l\'ensemble. Les légumes étaient frais et de bonne qualité. Petit bémol sur l\'emballage qui pourrait être amélioré.',
      date: '14 Jan 2025',
      heure: '16:45',
      produitNom: 'Légumes bio mélangés',
      commandeId: 'CMD002',
      reponseVendeur: 'Merci pour votre retour ! Nous avons pris note de votre remarque sur l\'emballage et nous l\'améliorerons.',
      dateReponse: '14 Jan 2025',
      utile: 8,
      signale: false
    },
    {
      id: 'AV003',
      clientNom: 'Aïda Sow',
      clientAvatar: 'A',
      note: 2,
      commentaire: 'Déçue de mon achat. Les fruits n\'étaient pas aussi frais que promis. Certains étaient même abîmés. Dommage car j\'avais de grandes attentes.',
      date: '13 Jan 2025',
      heure: '11:20',
      produitNom: 'Fruits tropicaux',
      commandeId: 'CMD003',
      photos: ['fruit1.jpg', 'fruit2.jpg'],
      utile: 5,
      signale: false
    },
    {
      id: 'AV004',
      clientNom: 'Moussa Diop',
      clientAvatar: 'M',
      note: 5,
      commentaire: 'Parfait ! Le poisson séché était exactement ce que je cherchais. Goût authentique, bien conservé. Livraison dans les temps. Bravo !',
      date: '12 Jan 2025',
      heure: '09:15',
      produitNom: 'Poisson séché',
      commandeId: 'CMD004',
      reponseVendeur: 'Merci beaucoup ! Nous sommes ravis que notre poisson séché vous ait plu. À bientôt !',
      dateReponse: '12 Jan 2025',
      utile: 15,
      signale: false
    },
    {
      id: 'AV005',
      clientNom: 'Ibrahima Fall',
      clientAvatar: 'I',
      note: 3,
      commentaire: 'Moyen. Les crevettes étaient correctes mais pas exceptionnelles pour le prix. Service correct sans plus.',
      date: '11 Jan 2025',
      heure: '15:30',
      produitNom: 'Crevettes roses',
      commandeId: 'CMD005',
      utile: 3,
      signale: false
    },
    {
      id: 'AV006',
      clientNom: 'Aminata Ly',
      clientAvatar: 'A',
      note: 1,
      commentaire: 'Très déçue ! Commande arrivée en retard et produits pas frais du tout. Le vendeur n\'a même pas répondu à mes messages. À éviter !',
      date: '10 Jan 2025',
      heure: '18:45',
      produitNom: 'Légumes mélangés',
      commandeId: 'CMD006',
      utile: 7,
      signale: true
    }
  ]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filtres = ['Tous', '⭐⭐⭐⭐⭐ (5)', '⭐⭐⭐⭐ (4)', '⭐⭐⭐ (3)', '⭐⭐ (2)', '⭐ (1)', 'Sans réponse'];

  const getFilteredReviews = () => {
    switch (selectedFilter) {
      case '⭐⭐⭐⭐⭐ (5)':
        return avis.filter(a => a.note === 5);
      case '⭐⭐⭐⭐ (4)':
        return avis.filter(a => a.note === 4);
      case '⭐⭐⭐ (3)':
        return avis.filter(a => a.note === 3);
      case '⭐⭐ (2)':
        return avis.filter(a => a.note === 2);
      case '⭐ (1)':
        return avis.filter(a => a.note === 1);
      case 'Sans réponse':
        return avis.filter(a => !a.reponseVendeur);
      default:
        return avis;
    }
  };

  const avisFiltres = getFilteredReviews();

  const calculateStats = () => {
    const totalAvis = avis.length;
    const moyenneNote = avis.reduce((sum, a) => sum + a.note, 0) / totalAvis;
    const repartition = {
      5: avis.filter(a => a.note === 5).length,
      4: avis.filter(a => a.note === 4).length,
      3: avis.filter(a => a.note === 3).length,
      2: avis.filter(a => a.note === 2).length,
      1: avis.filter(a => a.note === 1).length
    };
    const sansReponse = avis.filter(a => !a.reponseVendeur).length;
    
    return { totalAvis, moyenneNote, repartition, sansReponse };
  };

  const stats = calculateStats();

  const renderStars = (note: number, size: number = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < note ? 'star' : 'star-outline'}
        size={size}
        color={index < note ? '#10B981' : '#D1D5DB'}
        style={tw`mr-1`}
      />
    ));
  };

  const openReviewDetails = (review: Avis) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const openResponseModal = (review: Avis) => {
    setSelectedReview(review);
    setResponseText(review.reponseVendeur || '');
    setResponseModalVisible(true);
  };

  const submitResponse = () => {
    if (!selectedReview || !responseText.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir une réponse');
      return;
    }

    setAvis(prevAvis =>
      prevAvis.map(a =>
        a.id === selectedReview.id
          ? {
              ...a,
              reponseVendeur: responseText.trim(),
              dateReponse: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
            }
          : a
      )
    );

    setResponseModalVisible(false);
    setResponseText('');
    Alert.alert('Succès', 'Votre réponse a été publiée !');
  };

  const getScoreColor = (note: number) => {
    if (note >= 4.5) return '#10B981';
    if (note >= 3.5) return '#059669';
    if (note >= 2.5) return '#F97316';
    return '#EF4444';
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
            <Text style={tw`text-2xl font-bold text-white`}>Avis clients</Text>
            <Text style={tw`text-green-100 text-sm`}>Gérez votre réputation</Text>
          </View>
          <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="star" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* CONTENU SCROLLABLE - Correction du scroll */}
      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Carte de statistiques avec thème vert */}
          <View style={tw`mx-4 mt-4`}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={tw`rounded-2xl p-6 shadow-lg`}
            >
              <View style={tw`flex-row items-center mb-4`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white text-lg font-semibold mb-2`}>Note moyenne</Text>
                  <View style={tw`flex-row items-center mb-2`}>
                    <Text style={tw`text-white text-4xl font-bold mr-3`}>
                      {stats.moyenneNote.toFixed(1)}
                    </Text>
                    <View style={tw`flex-row`}>
                      {renderStars(Math.round(stats.moyenneNote), 20)}
                    </View>
                  </View>
                  <Text style={tw`text-green-100 text-sm`}>
                    Basée sur {stats.totalAvis} avis client{stats.totalAvis > 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={tw`bg-white bg-opacity-20 rounded-full p-4`}>
                  <Ionicons name="star" size={32} color="white" />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Répartition des notes avec thème vert */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Répartition des notes</Text>
            
            {[5, 4, 3, 2, 1].map(note => {
              const count = stats.repartition[note];
              const percentage = stats.totalAvis > 0 ? (count / stats.totalAvis) * 100 : 0;
              
              return (
                <View key={note} style={tw`flex-row items-center mb-3`}>
                  <View style={tw`flex-row items-center w-16`}>
                    <Text style={tw`text-gray-700 font-medium mr-1`}>{note}</Text>
                    <Ionicons name="star" size={14} color="#10B981" />
                  </View>
                  <View style={tw`flex-1 bg-gray-200 rounded-full h-2 mx-3`}>
                    <View 
                      style={[
                        tw`h-2 rounded-full bg-green-500`,
                        { width: `${percentage}%` }
                      ]} 
                    />
                  </View>
                  <Text style={tw`text-gray-600 text-sm w-8 text-right`}>{count}</Text>
                </View>
              );
            })}

            {/* Alerte pour avis sans réponse */}
            {stats.sansReponse > 0 && (
              <View style={tw`mt-4 bg-green-50 rounded-xl p-3 flex-row items-center`}>
                <Ionicons name="chatbubble-outline" size={20} color="#059669" style={tw`mr-3`} />
                <Text style={tw`text-green-700 text-sm flex-1`}>
                  {stats.sansReponse} avis en attente de réponse
                </Text>
              </View>
            )}
          </View>

          {/* Filtres avec thème vert */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>Filtrer par note</Text>
              <TouchableOpacity 
                onPress={() => setSelectedFilter('Tous')}
                style={tw`bg-gray-100 rounded-lg py-1 px-3`}
              >
                <Text style={tw`text-gray-600 text-sm`}>Reset</Text>
              </TouchableOpacity>
            </View>
            
            <View style={tw`flex-row flex-wrap`}>
              {filtres.map((filtre) => (
                <TouchableOpacity
                  key={filtre}
                  onPress={() => setSelectedFilter(filtre)}
                  style={[
                    tw`py-2 px-3 mr-2 mb-2 rounded-xl border`,
                    selectedFilter === filtre 
                      ? tw`bg-green-500 border-green-500` 
                      : tw`bg-white border-gray-200`
                  ]}
                >
                  <Text style={[
                    tw`text-sm font-medium`,
                    { color: selectedFilter === filtre ? 'white' : '#374151' }
                  ]}>
                    {filtre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Liste des avis */}
          <View style={tw`px-4 mt-4`}>
            {avisFiltres.map((review) => (
              <TouchableOpacity
                key={review.id}
                onPress={() => openReviewDetails(review)}
                style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}
              >
                {/* En-tête de l'avis */}
                <View style={tw`flex-row items-center justify-between mb-3`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View style={tw`w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3`}>
                      <Text style={tw`text-white font-bold`}>{review.clientAvatar}</Text>
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-base font-semibold text-gray-800`}>{review.clientNom}</Text>
                      <Text style={tw`text-gray-500 text-sm`}>
                        {review.date} • {review.heure}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={tw`items-end`}>
                    <View style={tw`flex-row mb-1`}>
                      {renderStars(review.note)}
                    </View>
                    <Text style={tw`text-gray-500 text-xs`}>{review.note}/5</Text>
                  </View>
                </View>

                {/* Produit commandé */}
                <View style={tw`bg-green-50 rounded-lg p-2 mb-3`}>
                  <Text style={tw`text-green-600 text-xs`}>Produit commandé</Text>
                  <Text style={tw`text-green-800 text-sm font-medium`}>{review.produitNom}</Text>
                </View>

                {/* Commentaire */}
                <Text style={tw`text-gray-700 text-sm mb-3 leading-5`}>
                  {review.commentaire.length > 120 
                    ? `${review.commentaire.substring(0, 120)}...` 
                    : review.commentaire}
                </Text>

                {/* Photos s'il y en a */}
                {review.photos && review.photos.length > 0 && (
                  <View style={tw`flex-row items-center mb-3`}>
                    <Ionicons name="image" size={16} color="#6B7280" style={tw`mr-2`} />
                    <Text style={tw`text-gray-600 text-sm`}>
                      {review.photos.length} photo{review.photos.length > 1 ? 's' : ''} jointe{review.photos.length > 1 ? 's' : ''}
                    </Text>
                  </View>
                )}

                {/* Statut de la réponse */}
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="thumbs-up" size={14} color="#6B7280" style={tw`mr-1`} />
                    <Text style={tw`text-gray-600 text-xs mr-4`}>{review.utile} utile{review.utile > 1 ? 's' : ''}</Text>
                    {review.signale && (
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="flag" size={14} color="#EF4444" style={tw`mr-1`} />
                        <Text style={tw`text-red-600 text-xs`}>Signalé</Text>
                      </View>
                    )}
                  </View>
                  
                  <TouchableOpacity
                    onPress={() => openResponseModal(review)}
                    style={[
                      tw`py-1 px-3 rounded-lg`,
                      review.reponseVendeur ? tw`bg-green-50` : tw`bg-green-100`
                    ]}
                  >
                    <Text style={[
                      tw`text-xs font-medium`,
                      review.reponseVendeur ? tw`text-green-700` : tw`text-green-600`
                    ]}>
                      {review.reponseVendeur ? 'Répondu' : 'Répondre'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Réponse du vendeur si elle existe */}
                {review.reponseVendeur && (
                  <View style={tw`mt-3 pt-3 border-t border-gray-100`}>
                    <View style={tw`flex-row items-center mb-2`}>
                      <Ionicons name="storefront" size={14} color="#059669" style={tw`mr-2`} />
                      <Text style={tw`text-green-600 text-sm font-semibold`}>Réponse du vendeur</Text>
                      <Text style={tw`text-gray-500 text-xs ml-2`}>• {review.dateReponse}</Text>
                    </View>
                    <Text style={tw`text-gray-700 text-sm pl-6`}>{review.reponseVendeur}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}

            {avisFiltres.length === 0 && (
              <View style={tw`bg-white rounded-2xl p-8 items-center`}>
                <Ionicons name="star-outline" size={48} color="#9CA3AF" />
                <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucun avis</Text>
                <Text style={tw`text-gray-400 text-center mt-2`}>
                  Aucun avis trouvé pour le filtre "{selectedFilter}"
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Modal détails de l'avis */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-4/5`}>
            {selectedReview && (
              <>
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>Avis de {selectedReview.clientNom}</Text>
                    <Text style={tw`text-gray-600`}>{selectedReview.date} • {selectedReview.heure}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={tw`flex-1 px-6`}>
                  {/* Note et produit */}
                  <View style={tw`my-4`}>
                    <View style={tw`flex-row items-center justify-between mb-4`}>
                      <View>
                        <Text style={tw`text-gray-600 mb-2`}>Note attribuée</Text>
                        <View style={tw`flex-row items-center`}>
                          {renderStars(selectedReview.note, 24)}
                          <Text style={tw`text-2xl font-bold text-gray-800 ml-2`}>{selectedReview.note}/5</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={tw`bg-green-50 rounded-xl p-4`}>
                      <Text style={tw`text-green-600 text-sm mb-1`}>Produit commandé</Text>
                      <Text style={tw`text-green-800 text-base font-semibold`}>{selectedReview.produitNom}</Text>
                      <Text style={tw`text-green-600 text-sm mt-1`}>Commande #{selectedReview.commandeId}</Text>
                    </View>
                  </View>

                  {/* Commentaire complet */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Commentaire</Text>
                    <Text style={tw`text-gray-700 text-base leading-6`}>{selectedReview.commentaire}</Text>
                  </View>

                  {/* Photos si présentes */}
                  {selectedReview.photos && selectedReview.photos.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Photos jointes</Text>
                      <View style={tw`bg-gray-50 rounded-xl p-4`}>
                        <Text style={tw`text-gray-600 text-sm`}>
                          {selectedReview.photos.length} photo{selectedReview.photos.length > 1 ? 's' : ''} jointe{selectedReview.photos.length > 1 ? 's' : ''} par le client
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Réponse existante */}
                  {selectedReview.reponseVendeur && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Votre réponse</Text>
                      <View style={tw`bg-green-50 rounded-xl p-4 border border-green-200`}>
                        <Text style={tw`text-green-700 text-base leading-6`}>{selectedReview.reponseVendeur}</Text>
                        <Text style={tw`text-green-600 text-sm mt-2`}>Publié le {selectedReview.dateReponse}</Text>
                      </View>
                    </View>
                  )}

                  {/* Statistiques */}
                  <View style={tw`mb-6`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Engagement</Text>
                    <View style={tw`flex-row justify-around bg-gray-50 rounded-xl p-4`}>
                      <View style={tw`items-center`}>
                        <Ionicons name="thumbs-up" size={20} color="#059669" />
                        <Text style={tw`text-lg font-bold text-gray-800 mt-1`}>{selectedReview.utile}</Text>
                        <Text style={tw`text-gray-600 text-sm`}>Utiles</Text>
                      </View>
                      <View style={tw`w-px bg-gray-200`} />
                      <View style={tw`items-center`}>
                        <Ionicons 
                          name={selectedReview.signale ? "flag" : "flag-outline"} 
                          size={20} 
                          color={selectedReview.signale ? "#EF4444" : "#6B7280"} 
                        />
                        <Text style={tw`text-lg font-bold text-gray-800 mt-1`}>
                          {selectedReview.signale ? "1" : "0"}
                        </Text>
                        <Text style={tw`text-gray-600 text-sm`}>Signalements</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                {/* Action de réponse */}
                <View style={tw`p-6 border-t border-gray-200`}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      openResponseModal(selectedReview);
                    }}
                    style={tw`bg-green-500 rounded-xl py-3 px-4 flex-row items-center justify-center`}
                  >
                    <Ionicons name="chatbubble" size={20} color="white" style={tw`mr-2`} />
                    <Text style={tw`text-white font-semibold`}>
                      {selectedReview.reponseVendeur ? 'Modifier la réponse' : 'Répondre à cet avis'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de réponse */}
      <Modal
        visible={responseModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setResponseModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl`}>
            {selectedReview && (
              <>
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>
                      {selectedReview.reponseVendeur ? 'Modifier votre réponse' : 'Répondre à l\'avis'}
                    </Text>
                    <Text style={tw`text-gray-600`}>Avis de {selectedReview.clientNom}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setResponseModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <View style={tw`p-6`}>
                  {/* Rappel de l'avis */}
                  <View style={tw`bg-green-50 rounded-xl p-4 mb-4`}>
                    <View style={tw`flex-row items-center mb-2`}>
                      {renderStars(selectedReview.note)}
                      <Text style={tw`text-gray-600 text-sm ml-2`}>{selectedReview.note}/5</Text>
                    </View>
                    <Text style={tw`text-gray-700 text-sm`}>{selectedReview.commentaire}</Text>
                  </View>

                  {/* Zone de saisie de la réponse */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>Votre réponse publique</Text>
                    <TextInput
                      value={responseText}
                      onChangeText={setResponseText}
                      style={tw`bg-gray-50 rounded-xl p-4 text-gray-800 border border-gray-200 h-32`}
                      placeholder="Rédigez une réponse professionnelle et courtoise..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      textAlignVertical="top"
                    />
                    <Text style={tw`text-gray-500 text-xs mt-2`}>
                      Caractères: {responseText.length}/500 • Soyez professionnel et constructif
                    </Text>
                  </View>

                  {/* Conseils */}
                  <View style={tw`bg-green-50 rounded-xl p-4 mb-6`}>
                    <Text style={tw`text-green-700 font-semibold text-sm mb-2`}>💡 Conseils pour une bonne réponse :</Text>
                    <Text style={tw`text-green-700 text-sm leading-5`}>
                      • Remerciez le client pour son retour{'\n'}
                      • Restez professionnel et courtois{'\n'}
                      • Proposez des solutions si nécessaire{'\n'}
                      • Invitez à vous contacter en privé si besoin
                    </Text>
                  </View>

                  {/* Boutons d'action */}
                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      onPress={() => setResponseModalVisible(false)}
                      style={tw`flex-1 bg-gray-500 rounded-xl py-3 px-4 mr-2 flex-row items-center justify-center`}
                    >
                      <Ionicons name="close" size={20} color="white" style={tw`mr-2`} />
                      <Text style={tw`text-white font-semibold`}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={submitResponse}
                      style={tw`flex-1 bg-green-500 rounded-xl py-3 px-4 ml-2 flex-row items-center justify-center`}
                    >
                      <Ionicons name="send" size={20} color="white" style={tw`mr-2`} />
                      <Text style={tw`text-white font-semibold`}>
                        {selectedReview.reponseVendeur ? 'Modifier' : 'Publier'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}