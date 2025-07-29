// screens/MarketplaceScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  SafeAreaView,
  Animated,
  Dimensions,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

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
}

export default function MarketplaceScreen() {
  // États pour les filtres et la recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent'); // recent, price_low, price_high, distance, rating
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [onlyBio, setOnlyBio] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [maxDistance, setMaxDistance] = useState('10');

  // Animation states
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

  // Catégories avec design amélioré
  const categories = [
    { name: 'Tous', icon: '🏪', color: '#6B7280', count: 45 },
    { name: 'Poissons', icon: '🐟', color: '#3B82F6', count: 12 },
    { name: 'Fruits de mer', icon: '🦐', color: '#06B6D4', count: 8 },
    { name: 'Légumes', icon: '🥬', color: '#10B981', count: 15 },
    { name: 'Fruits', icon: '🍎', color: '#F59E0B', count: 7 },
    { name: 'Viandes', icon: '🥩', color: '#EF4444', count: 3 },
  ];

  // Options de tri
  const sortOptions = [
    { value: 'recent', label: 'Plus récents', icon: 'time' },
    { value: 'price_low', label: 'Prix croissant', icon: 'arrow-up' },
    { value: 'price_high', label: 'Prix décroissant', icon: 'arrow-down' },
    { value: 'distance', label: 'Plus proches', icon: 'location' },
    { value: 'rating', label: 'Mieux notés', icon: 'star' },
  ];

  // Données de test pour les produits
  const produits: Produit[] = [
    {
      id: '1',
      nom: 'Thiof frais du jour',
      description: 'Poisson frais pêché ce matin, parfait pour le ceebu jën',
      categorie: 'Poissons',
      prix: 2125,
      prixOriginal: 2500,
      unite: 'kg',
      stock: 15,
      vendeur: {
        nom: 'Mamadou Seck',
        avatar: 'M',
        verified: true,
        rating: 4.8
      },
      photos: ['https://images.unsplash.com/photo-1544943102-e3f4bf97a567?ixlib=rb-4.0.3&w=300&h=200&fit=crop'],
      bio: false,
      tags: ['frais', 'local', 'poisson'],
      promotion: {
        actif: true,
        pourcentageReduction: 15,
        dateFin: '2025-01-25'
      },
      localisation: 'Marché de Soumbédioune',
      distance: 2.3,
      dateCreation: '2025-01-20'
    },
    {
      id: '2',
      nom: 'Légumes bio du jardin',
      description: 'Mélange de légumes biologiques cultivés sans pesticides',
      categorie: 'Légumes',
      prix: 800,
      unite: 'kg',
      stock: 25,
      vendeur: {
        nom: 'Fatou Ba',
        avatar: 'F',
        verified: true,
        rating: 4.9
      },
      photos: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&w=300&h=200&fit=crop'],
      bio: true,
      tags: ['bio', 'naturel', 'jardin'],
      localisation: 'Marché de Tilène',
      distance: 5.1,
      dateCreation: '2025-01-19'
    },
    {
      id: '3',
      nom: 'Crevettes roses premium',
      description: 'Crevettes fraîches de Casamance, extra grosses',
      categorie: 'Fruits de mer',
      prix: 7200,
      unite: 'kg',
      stock: 8,
      vendeur: {
        nom: 'Ousmane Diallo',
        avatar: 'O',
        verified: false,
        rating: 4.5
      },
      photos: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&w=300&h=200&fit=crop'],
      bio: false,
      tags: ['premium', 'casamance', 'frais'],
      localisation: 'Marché Kermel',
      distance: 1.8,
      dateCreation: '2025-01-18'
    },
    {
      id: '4',
      nom: 'Mangues de Casamance',
      description: 'Mangues mûres et sucrées, directement du producteur',
      categorie: 'Fruits',
      prix: 1200,
      unite: 'kg',
      stock: 50,
      vendeur: {
        nom: 'Aida Sow',
        avatar: 'A',
        verified: true,
        rating: 4.7
      },
      photos: ['https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&w=300&h=200&fit=crop'],
      bio: true,
      tags: ['casamance', 'mûres', 'sucrées'],
      localisation: 'Marché de Tilène',
      distance: 5.1,
      dateCreation: '2025-01-17'
    }
  ];

  // Filtrer les produits
  const filteredProducts = produits.filter(produit => {
    const matchesSearch = produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         produit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tous' || produit.categorie === selectedCategory;
    const matchesBio = !onlyBio || produit.bio;
    const matchesPromo = !onlyPromo || (produit.promotion && produit.promotion.actif);
    const matchesPrice = (!priceRange.min || produit.prix >= parseInt(priceRange.min)) &&
                        (!priceRange.max || produit.prix <= parseInt(priceRange.max));
    const matchesDistance = produit.distance <= parseInt(maxDistance);
    
    return matchesSearch && matchesCategory && matchesBio && matchesPromo && matchesPrice && matchesDistance;
  });

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.prix - b.prix;
      case 'price_high':
        return b.prix - a.prix;
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.vendeur.rating - a.vendeur.rating;
      default: // recent
        return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    }
  });

  const CategoryCard = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`mr-3 rounded-2xl border-2 overflow-hidden min-w-20`,
        isSelected 
          ? { borderColor: category.color, backgroundColor: `${category.color}15` }
          : tw`border-gray-200 bg-white`
      ]}
    >
      <View style={tw`py-3 px-3 items-center`}>
        <Text style={tw`text-2xl mb-1`}>{category.icon}</Text>
        <Text style={[
          tw`text-xs font-semibold text-center`,
          { color: isSelected ? category.color : '#374151' }
        ]}>
          {category.name}
        </Text>
        <Text style={tw`text-xs text-gray-400 mt-1`}>
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ProductCard = ({ produit }) => (
    <TouchableOpacity
      onPress={() => router.push(`/custom-product-detail?id=${produit.id}`)}
      style={tw`bg-white rounded-2xl shadow-lg mb-4 overflow-hidden`}
    >
      {/* Image du produit */}
      <View style={tw`relative`}>
        <Image 
          source={{ uri: produit.photos[0] }} 
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

        {/* Distance */}
        <View style={tw`absolute top-3 right-3 bg-black bg-opacity-50 rounded-full py-1 px-3`}>
          <Text style={tw`text-white text-xs font-semibold`}>📍 {produit.distance}km</Text>
        </View>

        {/* Stock faible */}
        {produit.stock <= 5 && (
          <View style={tw`absolute bottom-3 left-3 bg-orange-500 rounded-full py-1 px-3`}>
            <Text style={tw`text-white text-xs font-bold`}>⚠️ Stock faible</Text>
          </View>
        )}
      </View>

      {/* Informations du produit */}
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
        <View style={tw`flex-row items-center mb-3`}>
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

        {/* Vendeur */}
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw`w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-2`}>
              <Text style={tw`text-white text-sm font-bold`}>{produit.vendeur.avatar}</Text>
            </View>
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-gray-800 text-sm font-semibold`}>{produit.vendeur.nom}</Text>
                {produit.vendeur.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" style={tw`ml-1`} />
                )}
              </View>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={tw`text-xs text-gray-500 ml-1`}>
                  {produit.vendeur.rating} • {produit.localisation}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => router.push(`/custom-product-detail?id=${produit.id}`)}
            style={tw`bg-green-500 rounded-full py-2 px-4`}
          >
            <Text style={tw`text-white text-sm font-semibold`}>Commander</Text>
          </TouchableOpacity>
        </View>

        {/* Tags */}
        {produit.tags.length > 0 && (
          <View style={tw`flex-row flex-wrap mt-3`}>
            {produit.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={tw`bg-gray-100 rounded-full py-1 px-3 mr-2 mb-1`}>
                <Text style={tw`text-gray-600 text-xs`}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={tw`pb-4`}
      >
        <View style={tw`flex-row items-center pt-4 px-4 mb-4`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[tw`rounded-full p-2 mr-4`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl font-bold text-white`}>Marketplace</Text>
            <Text style={tw`text-green-100 text-sm`}>{sortedProducts.length} produits disponibles</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          >
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Barre de recherche */}
        <View style={tw`px-4`}>
          <View style={tw`bg-white rounded-2xl flex-row items-center shadow-lg`}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={tw`ml-4`} />
            <TextInput
              placeholder="Rechercher des produits frais..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={tw`flex-1 py-4 px-4 text-gray-800 text-base`}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={tw`mr-4`}
              >
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[
          tw`flex-1`,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView 
          style={tw`flex-1`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-5`}
        >
          {/* Filtres rapides */}
          {showFilters && (
            <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
              <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Filtres</Text>
              
              {/* Fourchette de prix */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>Prix (CFA)</Text>
                <View style={tw`flex-row`}>
                  <TextInput
                    placeholder="Min"
                    value={priceRange.min}
                    onChangeText={(text) => setPriceRange({...priceRange, min: text})}
                    keyboardType="numeric"
                    style={tw`flex-1 bg-gray-50 rounded-xl py-3 px-4 mr-2 border border-gray-200`}
                  />
                  <TextInput
                    placeholder="Max"
                    value={priceRange.max}
                    onChangeText={(text) => setPriceRange({...priceRange, max: text})}
                    keyboardType="numeric"
                    style={tw`flex-1 bg-gray-50 rounded-xl py-3 px-4 ml-2 border border-gray-200`}
                  />
                </View>
              </View>

              {/* Options */}
              <View style={tw`flex-row justify-between mb-4`}>
                <TouchableOpacity
                  onPress={() => setOnlyBio(!onlyBio)}
                  style={tw`flex-row items-center`}
                >
                  <View style={[
                    tw`w-5 h-5 rounded mr-2 border-2`,
                    onlyBio ? tw`bg-green-500 border-green-500` : tw`border-gray-300`
                  ]}>
                    {onlyBio && <Ionicons name="checkmark" size={14} color="white" />}
                  </View>
                  <Text style={tw`text-gray-700`}>🌱 Bio seulement</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setOnlyPromo(!onlyPromo)}
                  style={tw`flex-row items-center`}
                >
                  <View style={[
                    tw`w-5 h-5 rounded mr-2 border-2`,
                    onlyPromo ? tw`bg-red-500 border-red-500` : tw`border-gray-300`
                  ]}>
                    {onlyPromo && <Ionicons name="checkmark" size={14} color="white" />}
                  </View>
                  <Text style={tw`text-gray-700`}>🏷️ En promotion</Text>
                </TouchableOpacity>
              </View>

              {/* Distance maximale */}
              <View>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>Distance max: {maxDistance}km</Text>
                <View style={tw`flex-row justify-between`}>
                  {['5', '10', '20', '50'].map(dist => (
                    <TouchableOpacity
                      key={dist}
                      onPress={() => setMaxDistance(dist)}
                      style={[
                        tw`py-2 px-4 rounded-xl border-2`,
                        maxDistance === dist ? tw`bg-blue-500 border-blue-500` : tw`border-gray-200`
                      ]}
                    >
                      <Text style={[
                        tw`text-sm font-semibold`,
                        maxDistance === dist ? tw`text-white` : tw`text-gray-600`
                      ]}>
                        {dist}km
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Catégories */}
          <View style={tw`mt-4`}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={tw`px-4`}
              nestedScrollEnabled={true}
            >
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.name}
                  category={cat}
                  isSelected={selectedCategory === cat.name}
                  onPress={() => setSelectedCategory(cat.name)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Tri et nombre de résultats */}
          <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-4`}>
            <Text style={tw`text-gray-600 text-sm`}>
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                const currentIndex = sortOptions.findIndex(opt => opt.value === sortBy);
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setSortBy(sortOptions[nextIndex].value);
              }}
              style={tw`flex-row items-center bg-white rounded-full py-2 px-4 shadow-sm border border-gray-200`}
            >
              <Ionicons name="swap-vertical" size={16} color="#6B7280" style={tw`mr-2`} />
              <Text style={tw`text-gray-600 text-sm font-semibold`}>
                {sortOptions.find(opt => opt.value === sortBy)?.label}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liste des produits */}
          <View style={tw`px-4`}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((produit) => (
                <ProductCard key={produit.id} produit={produit} />
              ))
            ) : (
              <View style={tw`bg-white rounded-2xl p-8 items-center mt-8`}>
                <Ionicons name="search" size={64} color="#9CA3AF" />
                <Text style={tw`text-xl font-bold text-gray-800 mt-4 mb-2`}>Aucun produit trouvé</Text>
                <Text style={tw`text-gray-600 text-center mb-4`}>
                  Essayez de modifier vos critères de recherche ou explorez d'autres catégories
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory('Tous');
                    setOnlyBio(false);
                    setOnlyPromo(false);
                    setPriceRange({ min: '', max: '' });
                  }}
                  style={tw`bg-green-500 rounded-full py-3 px-6`}
                >
                  <Text style={tw`text-white font-semibold`}>Réinitialiser les filtres</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}