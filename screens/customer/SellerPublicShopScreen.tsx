// screens/SellerPublicShopScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  Dimensions 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Produit {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  prixOriginal?: number;
  photo: string;
  stock: number;
  unite: string;
  bio: boolean;
  promotion?: {
    actif: boolean;
    pourcentageReduction: number;
  };
  rating: number;
  totalAvis: number;
  tags: string[];
}

interface Vendeur {
  nom: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalVentes: number;
  tempsMoyenReponse: string;
  description: string;
  localisation: string;
  ouvertureHeure: string;
  fermetureHeure: string;
  joursOuverture: string[];
  photo: string;
}

const SellerPublicShopScreen: React.FC = () => {
  const { vendeur } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Données du vendeur
  const vendeurInfo: Vendeur = {
    nom: vendeur as string || 'Mamadou Seck',
    avatar: 'M',
    verified: true,
    rating: 4.8,
    totalVentes: 245,
    tempsMoyenReponse: '2h',
    description: 'Spécialiste en produits frais de mer, poissons et fruits de mer de qualité. Plus de 10 ans d\'expérience dans la vente au marché de Soumbédioune.',
    localisation: 'Marché de Soumbédioune, Stand 15',
    ouvertureHeure: '06:00',
    fermetureHeure: '18:00',
    joursOuverture: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    photo: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=Boutique+Mamadou'
  };

  // Produits du vendeur
  const produits: Produit[] = [
    {
      id: 'prod_001',
      nom: 'Thiof frais du jour',
      description: 'Thiof frais pêché du jour, excellent pour la cuisine sénégalaise',
      categorie: 'Poissons',
      prix: 2125,
      prixOriginal: 2500,
      photo: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Thiof',
      stock: 150,
      unite: 'kg',
      bio: false,
      promotion: {
        actif: true,
        pourcentageReduction: 15
      },
      rating: 4.7,
      totalAvis: 23,
      tags: ['frais', 'local']
    },
    {
      id: 'prod_002',
      nom: 'Crevettes roses premium',
      description: 'Crevettes roses fraîches de Casamance, idéales pour les plats de fête',
      categorie: 'Fruits de mer',
      prix: 8000,
      photo: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Crevettes',
      stock: 25,
      unite: 'kg',
      bio: false,
      rating: 4.9,
      totalAvis: 18,
      tags: ['premium', 'casamance']
    },
    {
      id: 'prod_003',
      nom: 'Légumes bio mélangés',
      description: 'Mélange de légumes biologiques cultivés localement',
      categorie: 'Légumes', 
      prix: 1200,
      photo: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Legumes',
      stock: 80,
      unite: 'kg',
      bio: true,
      rating: 4.6,
      totalAvis: 32,
      tags: ['bio', 'local']
    },
    {
      id: 'prod_004',
      nom: 'Fruits tropicaux',
      description: 'Assortiment de fruits tropicaux de saison',
      categorie: 'Fruits',
      prix: 1800,
      photo: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Fruits',
      stock: 0,
      unite: 'kg',
      bio: true,
      rating: 4.5,
      totalAvis: 25,
      tags: ['tropical', 'saison']
    }
  ];

  const categories = ['Tous', 'Poissons', 'Fruits de mer', 'Légumes', 'Fruits'];

  const filteredProducts = selectedCategory === 'Tous' 
    ? produits 
    : produits.filter(p => p.categorie === selectedCategory);

  const renderStars = (rating: number, size: number = 14) => {
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
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white border-b border-gray-200`}>
        <View style={tw`flex-row items-center px-4 py-3`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={tw`mr-3`}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold flex-1`}>Boutique {vendeurInfo.nom}</Text>
          
          <TouchableOpacity 
            onPress={() => router.push(`/chat?vendeur=${vendeurInfo.nom}`)}
            style={tw`bg-blue-500 px-3 py-2 rounded-full flex-row items-center`}
          >
            <Ionicons name="chatbubble" size={16} color="white" style={tw`mr-1`} />
            <Text style={tw`text-white text-sm font-medium`}>Contacter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photo de couverture de la boutique */}
        <View style={tw`relative`}>
          <Image 
            source={{ uri: vendeurInfo.photo }} 
            style={[tw`w-full bg-gray-200`, { height: 200 }]}
            resizeMode="cover"
          />
          <View style={tw`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4`}>
            <Text style={tw`text-white text-xl font-bold`}>{vendeurInfo.nom}</Text>
            <Text style={tw`text-white text-sm`}>{vendeurInfo.localisation}</Text>
          </View>
        </View>

        {/* Informations du vendeur */}
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={tw`w-16 h-16 bg-green-500 rounded-full items-center justify-center mr-4`}>
              <Text style={tw`text-white text-2xl font-bold`}>{vendeurInfo.avatar}</Text>
            </View>
            
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center mb-1`}>
                <Text style={tw`text-xl font-bold text-gray-800 mr-2`}>{vendeurInfo.nom}</Text>
                {vendeurInfo.verified && (
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                )}
              </View>
              
              <View style={tw`flex-row items-center mb-1`}>
                {renderStars(vendeurInfo.rating, 16)}
                <Text style={tw`text-gray-600 ml-2 font-semibold`}>
                  {vendeurInfo.rating} ({vendeurInfo.totalVentes} ventes)
                </Text>
              </View>
              
              <Text style={tw`text-gray-500 text-sm`}>
                Répond en {vendeurInfo.tempsMoyenReponse}
              </Text>
            </View>
          </View>

          <Text style={tw`text-gray-600 text-sm mb-4 leading-5`}>
            {vendeurInfo.description}
          </Text>

          {/* Horaires */}
          <View style={tw`bg-gray-50 rounded-xl p-3`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="time-outline" size={16} color="#6B7280" style={tw`mr-2`} />
              <Text style={tw`text-gray-700 font-semibold text-sm`}>
                Ouvert de {vendeurInfo.ouvertureHeure} à {vendeurInfo.fermetureHeure}
              </Text>
            </View>
            <View style={tw`flex-row flex-wrap`}>
              {vendeurInfo.joursOuverture.map((jour, index) => (
                <View key={index} style={tw`bg-green-100 rounded-full py-1 px-2 mr-1 mb-1`}>
                  <Text style={tw`text-green-700 text-xs font-medium`}>{jour}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Statistiques */}
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Statistiques</Text>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>{produits.length}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Produits</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>{vendeurInfo.totalVentes}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Ventes</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>{vendeurInfo.rating}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Note moyenne</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>98%</Text>
              <Text style={tw`text-gray-600 text-sm`}>Satisfaction</Text>
            </View>
          </View>
        </View>

        {/* Filtres par catégorie */}
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Catégories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex-row`}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    tw`mr-3 rounded-full py-2 px-4 border-2`,
                    selectedCategory === cat 
                      ? tw`bg-green-500 border-green-500` 
                      : tw`bg-white border-gray-200`
                  ]}
                >
                  <Text style={[
                    tw`text-sm font-semibold`,
                    selectedCategory === cat ? tw`text-white` : tw`text-gray-600`
                  ]}>
                    {cat} ({cat === 'Tous' ? produits.length : produits.filter(p => p.categorie === cat).length})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Liste des produits */}
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>
            Produits ({filteredProducts.length})
          </Text>
          
          {filteredProducts.map((produit) => (
            <TouchableOpacity 
              key={produit.id} 
              style={tw`bg-white rounded-2xl shadow-sm mb-4 overflow-hidden`}
              onPress={() => router.push(`/custom-product-detail?id=${produit.id}`)}
            >
              <View style={tw`relative`}>
                <Image 
                  source={{ uri: produit.photo }} 
                  style={tw`w-full h-48`}
                  resizeMode="cover"
                />
                
                {/* Badges */}
                <View style={tw`absolute top-3 left-3 flex-row`}>
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

                {/* Stock */}
                <View style={tw`absolute top-3 right-3`}>
                  <View style={[
                    tw`rounded-full py-1 px-3`,
                    produit.stock > 10 ? tw`bg-green-500` : 
                    produit.stock > 0 ? tw`bg-orange-500` : tw`bg-red-500`
                  ]}>
                    <Text style={tw`text-white text-xs font-bold`}>
                      {produit.stock > 0 ? `${produit.stock} ${produit.unite}` : 'Rupture'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw`p-4`}>
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <Text style={tw`text-lg font-bold text-gray-800 flex-1`} numberOfLines={2}>
                    {produit.nom}
                  </Text>
                  <TouchableOpacity style={tw`ml-2`}>
                    <Ionicons name="heart-outline" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <Text style={tw`text-gray-600 text-sm mb-3`} numberOfLines={2}>
                  {produit.description}
                </Text>

                {/* Prix */}
                <View style={tw`flex-row items-center justify-between mb-3`}>
                  <View style={tw`flex-row items-center`}>
                    {produit.prixOriginal && (
                      <Text style={tw`text-gray-400 text-sm line-through mr-2`}>
                        {produit.prixOriginal.toLocaleString()} CFA
                      </Text>
                    )}
                    <Text style={tw`text-2xl font-bold text-green-600`}>
                      {produit.prix.toLocaleString()} CFA
                    </Text>
                    <Text style={tw`text-gray-500 text-sm ml-1`}>/{produit.unite}</Text>
                  </View>

                  <TouchableOpacity 
                    onPress={() => router.push(`/custom-product-detail?id=${produit.id}`)}
                    style={[
                      tw`rounded-full py-2 px-4`,
                      produit.stock > 0 ? tw`bg-green-500` : tw`bg-gray-300`
                    ]}
                  >
                    <Text style={[
                      tw`font-semibold text-sm`,
                      produit.stock > 0 ? tw`text-white` : tw`text-gray-500`
                    ]}>
                      {produit.stock > 0 ? 'Commander' : 'Rupture'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Rating et tags */}
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    {renderStars(produit.rating, 12)}
                    <Text style={tw`text-xs text-gray-500 ml-1`}>
                      {produit.rating} ({produit.totalAvis})
                    </Text>
                  </View>
                  
                  <View style={tw`flex-row flex-wrap`}>
                    {produit.tags.slice(0, 2).map((tag, index) => (
                      <View key={index} style={tw`bg-gray-100 rounded-full py-1 px-2 ml-1`}>
                        <Text style={tw`text-gray-600 text-xs`}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {filteredProducts.length === 0 && (
            <View style={tw`bg-white rounded-2xl p-8 items-center`}>
              <Ionicons name="basket-outline" size={64} color="#D1D5DB" />
              <Text style={tw`text-gray-500 text-lg mt-4 mb-2`}>Aucun produit</Text>
              <Text style={tw`text-gray-400 text-center`}>
                Aucun produit disponible dans cette catégorie
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerPublicShopScreen;