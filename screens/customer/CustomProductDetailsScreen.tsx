import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface Avis {
  id: string;
  utilisateur: {
    nom: string;
    avatar: string;
  };
  rating: number;
  commentaire: string;
  date: string;
  photos?: string[];
}

interface Produit {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  prixOriginal?: number;
  unite: string;
  stock: number;
  vendeur: {
    nom: string;
    avatar: string;
    verified: boolean;
    rating: number;
    totalVentes: number;
    tempsMoyenReponse: string;
  };
  photos: string[];
  bio: boolean;
  tags: string[];
  promotion?: {
    actif: boolean;
    pourcentageReduction: number;
    dateFin: string;
  };
  localisation: string;
  distance: number;
  dateCreation: string;
  avis: Avis[];
  ratingMoyen: number;
  totalAvis: number;
}

export default function CustomProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('details');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [modeLivraison, setModeLivraison] = useState('retrait');
  const [instructions, setInstructions] = useState('');

  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const produit: Produit = {
    id: id as string,
    nom: 'Thiof frais du jour',
    description: 'Poisson frais pêché ce matin par nos pêcheurs locaux. Parfait pour préparer un délicieux ceebu jën traditionnel.',
    categorie: 'Poissons',
    prix: 2125,
    prixOriginal: 2500,
    unite: 'kg',
    stock: 15,
    vendeur: {
      nom: 'Mamadou Seck',
      avatar: 'M',
      verified: true,
      rating: 4.8,
      totalVentes: 245,
      tempsMoyenReponse: '2h'
    },
    photos: [
      'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Thiof+Frais',
      'https://via.placeholder.com/400x300/059669/FFFFFF?text=Produit+2',
      'https://via.placeholder.com/400x300/047857/FFFFFF?text=Produit+3'
    ],
    bio: false,
    tags: ['frais', 'local', 'poisson'],
    promotion: {
      actif: true,
      pourcentageReduction: 15,
      dateFin: '2025-01-25'
    },
    localisation: 'Marché de Soumbédioune',
    distance: 2.3,
    dateCreation: '2025-01-20',
    ratingMoyen: 4.6,
    totalAvis: 23,
    avis: [
      {
        id: '1',
        utilisateur: { nom: 'Fatou Diallo', avatar: 'F' },
        rating: 5,
        commentaire: 'Excellent thiof, très frais ! Mon ceebu jën était délicieux.',
        date: '2025-01-19'
      },
      {
        id: '2',
        utilisateur: { nom: 'Ousmane Ba', avatar: 'O' },
        rating: 4,
        commentaire: 'Bonne qualité, livraison rapide.',
        date: '2025-01-18'
      }
    ]
  };

  const handleAddToCart = () => {
    setShowOrderModal(true);
  };

  const handleConfirmOrder = () => {
    if (modeLivraison === 'livraison' && !adresseLivraison) {
      Alert.alert('Erreur', 'Veuillez saisir une adresse de livraison');
      return;
    }

    setShowOrderModal(false);
    Alert.alert(
      'Commande confirmée !',
      `Votre commande de ${quantity} ${produit.unite} de ${produit.nom} a été envoyée.`,
      [
        {
          text: 'Voir mes commandes',
          onPress: () => router.push('/customer-orders')
        },
        {
          text: 'Continuer',
          onPress: () => router.back()
        }
      ]
    );
  };

  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={size} color="#F59E0B" />);
    }
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#D1D5DB" />);
    }
    return stars;
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header avec images */}
      <View style={tw`relative`}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        >
          {produit.photos.map((photo, index) => (
            <View key={index} style={{ width, height: 300 }}>
              <Image
                source={{ uri: photo }}
                style={[tw`w-full h-full bg-gray-200`]}
                resizeMode="cover"
                onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
                onLoad={() => console.log('Image loaded successfully:', photo)}
              />
            </View>
          ))}
        </ScrollView>

        {/* Indicateurs d'images */}
        {produit.photos.length > 1 && (
          <View style={tw`absolute bottom-4 left-0 right-0 flex-row justify-center`}>
            {produit.photos.map((_, index) => (
              <View
                key={index}
                style={[
                  tw`w-2 h-2 rounded-full mx-1`,
                  { backgroundColor: index === currentImageIndex ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }
                ]}
              />
            ))}
          </View>
        )}

        {/* Boutons header */}
        <View style={tw`absolute top-12 left-0 right-0 flex-row justify-between items-center px-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#EF4444" : "white"} 
            />
          </TouchableOpacity>
        </View>

        {/* Badges */}
        <View style={tw`absolute top-20 left-4 flex-row`}>
          {produit.bio && (
            <View style={tw`bg-green-500 rounded-full py-1 px-3 mr-2`}>
              <Text style={tw`text-white text-xs font-bold`}>🌱 BIO</Text>
            </View>
          )}
          {produit.promotion?.actif && (
            <View style={tw`bg-red-500 rounded-full py-1 px-3`}>
              <Text style={tw`text-white text-xs font-bold`}>-{produit.promotion.pourcentageReduction}%</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Informations principales */}
        <View style={tw`p-4 bg-white`}>
          <View style={tw`flex-row justify-between items-start mb-2`}>
            <Text style={tw`text-2xl font-bold text-gray-800 flex-1 mr-4`}>
              {produit.nom}
            </Text>
            <View style={tw`items-end`}>
              {produit.prixOriginal && (
                <Text style={tw`text-gray-400 text-sm line-through`}>
                  {produit.prixOriginal.toLocaleString()} CFA
                </Text>
              )}
              <Text style={tw`text-3xl font-bold text-green-600`}>
                {produit.prix.toLocaleString()} CFA
              </Text>
              <Text style={tw`text-gray-500 text-sm`}>par {produit.unite}</Text>
            </View>
          </View>

          {/* Rating et localisation */}
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`flex-row items-center mr-4`}>
              {renderStars(produit.ratingMoyen, 18)}
              <Text style={tw`text-gray-600 ml-2 font-semibold`}>
                {produit.ratingMoyen} ({produit.totalAvis} avis)
              </Text>
            </View>
          </View>

          {/* Stock */}
          <View style={tw`flex-row items-center mb-4`}>
            <View style={[
              tw`w-3 h-3 rounded-full mr-2`,
              produit.stock > 10 ? tw`bg-green-500` : 
              produit.stock > 5 ? tw`bg-orange-500` : tw`bg-red-500`
            ]} />
            <Text style={tw`text-gray-600 text-sm`}>
              {produit.stock > 10 ? 'En stock' : `Stock limité (${produit.stock} restants)`}
            </Text>
          </View>

          {/* Tags */}
          <View style={tw`flex-row flex-wrap mb-4`}>
            {produit.tags.map((tag, index) => (
              <View key={index} style={tw`bg-gray-100 rounded-full py-2 px-3 mr-2 mb-2`}>
                <Text style={tw`text-gray-600 text-xs font-semibold`}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Onglets */}
        <View style={tw`flex-row bg-white border-b border-gray-200`}>
          {[
            { key: 'details', label: 'Détails', icon: 'information-circle' },
            { key: 'avis', label: `Avis (${produit.totalAvis})`, icon: 'star' },
            { key: 'vendeur', label: 'Vendeur', icon: 'person' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setSelectedTab(tab.key)}
              style={[
                tw`flex-1 py-4 items-center border-b-2`,
                selectedTab === tab.key ? tw`border-green-500` : tw`border-transparent`
              ]}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={20} 
                color={selectedTab === tab.key ? '#10B981' : '#6B7280'} 
              />
              <Text style={[
                tw`text-sm font-semibold mt-1`,
                selectedTab === tab.key ? tw`text-green-600` : tw`text-gray-600`
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenu des onglets */}
        <View style={tw`bg-white p-4`}>
          {selectedTab === 'details' && (
            <View>
              <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Description</Text>
              <Text style={tw`text-gray-600 text-base leading-6`}>
                {produit.description}
              </Text>
            </View>
          )}

          {selectedTab === 'avis' && (
            <View>
              {produit.avis.map((avis) => (
                <View key={avis.id} style={tw`border-b border-gray-100 pb-4 mb-4`}>
                  <View style={tw`flex-row items-center mb-2`}>
                    <View style={tw`w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3`}>
                      <Text style={tw`text-white font-bold`}>{avis.utilisateur.avatar}</Text>
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-gray-800 font-semibold`}>
                        {avis.utilisateur.nom}
                      </Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        {renderStars(avis.rating, 14)}
                      </View>
                    </View>
                  </View>
                  <Text style={tw`text-gray-600 text-sm`}>
                    {avis.commentaire}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {selectedTab === 'vendeur' && (
            <View>
              <View style={tw`bg-gray-50 rounded-xl p-4 mb-4`}>
                <View style={tw`flex-row items-center mb-4`}>
                  <View style={tw`w-16 h-16 bg-green-500 rounded-full items-center justify-center mr-4`}>
                    <Text style={tw`text-white text-2xl font-bold`}>
                      {produit.vendeur.avatar}
                    </Text>
                  </View>
                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center mb-1`}>
                      <Text style={tw`text-xl font-bold text-gray-800`}>
                        {produit.vendeur.nom}
                      </Text>
                      {produit.vendeur.verified && (
                        <Ionicons name="checkmark-circle" size={20} color="#10B981" style={tw`ml-2`} />
                      )}
                    </View>
                    <Text style={tw`text-gray-600`}>
                      {produit.vendeur.totalVentes} ventes
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`flex-row`}>
                <TouchableOpacity
                  onPress={() => router.push(`/chat?vendeur=${produit.vendeur.nom}`)}
                  style={tw`flex-1 bg-blue-500 rounded-xl py-3 mr-2 flex-row items-center justify-center`}
                >
                  <Ionicons name="chatbubble" size={20} color="white" style={tw`mr-2`} />
                  <Text style={tw`text-white font-semibold`}>Contacter</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => router.push(`/seller-public-shop?vendeur=${produit.vendeur.nom}`)}
                  style={tw`flex-1 bg-gray-200 rounded-xl py-3 ml-2 flex-row items-center justify-center`}
                >
                  <Ionicons name="storefront" size={20} color="#374151" style={tw`mr-2`} />
                  <Text style={tw`text-gray-700 font-semibold`}>Boutique</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={tw`bg-white border-t border-gray-200 p-4`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw`text-lg font-bold text-gray-800`}>Quantité</Text>
          <View style={tw`flex-row items-center bg-gray-100 rounded-xl`}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={tw`p-3`}
            >
              <Ionicons name="remove" size={20} color="#374151" />
            </TouchableOpacity>
            <Text style={tw`text-lg font-bold text-gray-800 px-4`}>
              {quantity} {produit.unite}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(Math.min(produit.stock, quantity + 1))}
              style={tw`p-3`}
            >
              <Ionicons name="add" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-gray-600 text-sm`}>Total</Text>
            <Text style={tw`text-2xl font-bold text-green-600`}>
              {(produit.prix * quantity).toLocaleString()} CFA
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleAddToCart}
            style={tw`px-8 py-4 rounded-xl flex-row items-center bg-green-500`}
          >
            <Ionicons name="bag-add" size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`font-bold text-lg text-white`}>Commander</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de commande */}
      <Modal
        visible={showOrderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOrderModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl p-6`}>
            <View style={tw`flex-row items-center justify-between mb-6`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>Finaliser</Text>
              <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                <Ionicons name="close" size={28} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* Mode de livraison */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Mode de récupération</Text>
                
                <TouchableOpacity
                  onPress={() => setModeLivraison('retrait')}
                  style={[
                    tw`border-2 rounded-xl p-4 mb-3`,
                    modeLivraison === 'retrait' ? tw`border-green-500 bg-green-50` : tw`border-gray-200`
                  ]}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="storefront" size={20} color="#374151" style={tw`mr-3`} />
                    <View>
                      <Text style={tw`text-gray-800 font-semibold`}>Retrait sur place</Text>
                      <Text style={tw`text-gray-600 text-sm`}>Gratuit</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModeLivraison('livraison')}
                  style={[
                    tw`border-2 rounded-xl p-4`,
                    modeLivraison === 'livraison' ? tw`border-green-500 bg-green-50` : tw`border-gray-200`
                  ]}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="bicycle" size={20} color="#374151" style={tw`mr-3`} />
                    <View>
                      <Text style={tw`text-gray-800 font-semibold`}>Livraison</Text>
                      <Text style={tw`text-gray-600 text-sm`}>1000 CFA</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Adresse */}
              {modeLivraison === 'livraison' && (
                <View style={tw`mb-6`}>
                  <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Adresse</Text>
                  <TextInput
                    placeholder="Votre adresse..."
                    value={adresseLivraison}
                    onChangeText={setAdresseLivraison}
                    style={tw`bg-gray-50 rounded-xl p-4 text-gray-800`}
                  />
                </View>
              )}

              {/* Total */}
              <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-lg font-bold text-gray-800`}>Total</Text>
                  <Text style={tw`text-xl font-bold text-green-600`}>
                    {((produit.prix * quantity) + (modeLivraison === 'livraison' ? 1000 : 0)).toLocaleString()} CFA
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={handleConfirmOrder}
              style={tw`bg-green-500 rounded-xl py-4 items-center`}
            >
              <Text style={tw`text-white text-lg font-bold`}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}