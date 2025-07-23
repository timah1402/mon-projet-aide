// screens/ShopManagementScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Alert,
  Modal 
} from 'react-native';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface Produit {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  photo: string;
  stock: number;
  vendu: number;
  statut: 'Disponible' | 'Stock faible' | 'Rupture' | 'En attente';
  revenu: string;
  vendeurId: string;
  dateCreation: string;
  localisation: string;
}

const ShopManagementScreen: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>([
    {
      id: 'prod_001',
      nom: 'Poisson frais (Thiof)',
      description: 'Thiof frais pêché du jour, excellent pour la cuisine sénégalaise traditionnelle',
      categorie: 'Poissons',
      prix: 2500,
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      stock: 150,
      vendu: 45,
      statut: 'Disponible',
      revenu: '112 500 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-10',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_002',
      nom: 'Crevettes roses',
      description: 'Crevettes roses fraîches de Casamance, idéales pour les plats de fête',
      categorie: 'Fruits de mer',
      prix: 8000,
      photo: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400',
      stock: 25,
      vendu: 18,
      statut: 'Stock faible',
      revenu: '144 000 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-08',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_003',
      nom: 'Légumes bio mélangés',
      description: 'Mélange de légumes biologiques cultivés localement sans pesticides',
      categorie: 'Légumes',
      prix: 1200,
      photo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      stock: 80,
      vendu: 32,
      statut: 'Disponible',
      revenu: '38 400 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-12',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_004',
      nom: 'Fruits tropicaux',
      description: 'Assortiment de fruits tropicaux : mangues, papayes, ananas de saison',
      categorie: 'Fruits',
      prix: 1800,
      photo: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
      stock: 0,
      vendu: 25,
      statut: 'Rupture',
      revenu: '45 000 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-05',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_005',
      nom: 'Riz local de qualité',
      description: 'Riz blanc cultivé localement, idéal pour les repas familiaux',
      categorie: 'Céréales',
      prix: 450,
      photo: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      stock: 200,
      vendu: 85,
      statut: 'Disponible',
      revenu: '38 250 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-15',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_006',
      nom: 'Épices traditionnelles',
      description: 'Mélange d\'épices pour thieboudienne et autres plats sénégalais',
      categorie: 'Épices',
      prix: 1500,
      photo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
      stock: 40,
      vendu: 22,
      statut: 'Disponible',
      revenu: '33 000 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-11',
      localisation: 'Marché de Soumbédioune, Dakar'
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const getStatutColor = (statut: string): string => {
    switch (statut) {
      case 'Disponible':
        return 'text-green-600';
      case 'Stock faible':
        return 'text-orange-600';
      case 'Rupture':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatutBackgroundColor = (statut: string): string => {
    switch (statut) {
      case 'Disponible':
        return 'bg-green-100';
      case 'Stock faible':
        return 'bg-orange-100';
      case 'Rupture':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('Aucun produit sélectionné', 'Veuillez sélectionner au moins un produit à supprimer.');
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setProduits(prev => prev.filter(produit => !selectedProducts.includes(produit.id)));
    setSelectedProducts([]);
    setShowDeleteConfirmation(false);
    Alert.alert('Suppression réussie', `${selectedProducts.length} produit(s) supprimé(s) avec succès.`);
  };

  const handleProductPress = (productId: string) => {
    console.log('Navigating to product:', productId);
    // Navigation vers product-details.tsx avec paramètres
    try {
      router.push({
        pathname: '/product-details',
        params: { id: productId }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Erreur de navigation', error.toString());
    }
  };

  const handleEditProduct = (productId: string) => {
    // Navigation vers la page d'édition du produit
    router.push(`/edit-product/${productId}`);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={tw`mr-3`}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold`}>Gérer ma boutique</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push('/add-product')}
          style={tw`bg-green-600 px-3 py-2 rounded-md flex-row items-center`}
        >
          <Ionicons name="add" size={18} color="white" />
          <Text style={tw`text-white ml-1 font-medium`}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Actions Bar */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200`}>
        <Text style={tw`text-gray-600`}>
          {produits.length} produit{produits.length > 1 ? 's' : ''}
          {selectedProducts.length > 0 && ` • ${selectedProducts.length} sélectionné${selectedProducts.length > 1 ? 's' : ''}`}
        </Text>
        
        {selectedProducts.length > 0 && (
          <TouchableOpacity 
            onPress={handleDeleteSelected}
            style={tw`bg-red-600 px-3 py-2 rounded-md flex-row items-center`}
          >
            <MaterialIcons name="delete" size={16} color="white" />
            <Text style={tw`text-white ml-1 font-medium`}>Supprimer</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Products List */}
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {produits.map((produit) => (
          <TouchableOpacity 
            key={produit.id} 
            style={tw`bg-white border-b border-gray-100`}
            onPress={() => {
              console.log('Product pressed:', produit.id);
              handleProductPress(produit.id);
            }}
            activeOpacity={0.7}
          >
            <View style={tw`flex-row items-center p-4`}>
              {/* Checkbox */}
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation(); // Empêche la navigation vers les détails
                  handleSelectProduct(produit.id);
                }}
                style={tw`mr-3`}
              >
                <Ionicons 
                  name={selectedProducts.includes(produit.id) ? "checkbox" : "checkbox-outline"} 
                  size={24} 
                  color={selectedProducts.includes(produit.id) ? "#10B981" : "#9CA3AF"} 
                />
              </TouchableOpacity>

              {/* Product Image */}
              <Image 
                source={{ uri: produit.photo }} 
                style={tw`w-20 h-20 rounded-lg mr-3`}
                resizeMode="cover"
              />

              {/* Product Info */}
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-semibold text-gray-900 mb-1`}>
                  {produit.nom}
                </Text>
                <Text style={tw`text-sm text-gray-600 mb-1`}>
                  {produit.categorie}
                </Text>
                <Text style={tw`text-sm font-bold text-green-600 mb-2`}>
                  {produit.prix.toLocaleString()} CFA/kg
                </Text>
                
                {/* Status and Stock */}
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`${getStatutBackgroundColor(produit.statut)} px-2 py-1 rounded-full`}>
                      <Text style={tw`text-xs font-medium ${getStatutColor(produit.statut)}`}>
                        {produit.statut}
                      </Text>
                    </View>
                    <Text style={tw`text-xs text-gray-500 ml-2`}>
                      Stock: {produit.stock}kg
                    </Text>
                  </View>
                  
                  {/* Edit Action */}
                 
                </View>

                {/* Revenue */}
                <Text style={tw`text-xs text-gray-600 mt-1`}>
                  Revenus: {produit.revenu} • Vendu: {produit.vendu}kg
                </Text>
              </View>

              {/* Arrow indicator */}
              <View style={tw`ml-2`}>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {produits.length === 0 && (
          <View style={tw`flex-1 items-center justify-center py-20`}>
            <Ionicons name="storefront-outline" size={64} color="#D1D5DB" />
            <Text style={tw`text-gray-500 text-lg mt-4 mb-2`}>Aucun produit</Text>
            <Text style={tw`text-gray-400 text-center px-8 mb-6`}>
              Commencez par ajouter des produits à votre boutique
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/add-product')}
              style={tw`bg-green-600 px-6 py-3 rounded-lg`}
            >
              <Text style={tw`text-white font-medium`}>Ajouter un produit</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-6 mx-4 w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Confirmer la suppression</Text>
            <Text style={tw`text-gray-600 mb-6`}>
              Êtes-vous sûr de vouloir supprimer {selectedProducts.length} produit{selectedProducts.length > 1 ? 's' : ''} ? 
              Cette action est irréversible.
            </Text>
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity 
                onPress={() => setShowDeleteConfirmation(false)}
                style={tw`px-4 py-2 mr-3`}
              >
                <Text style={tw`text-gray-600 font-medium`}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={confirmDelete}
                style={tw`bg-red-600 px-4 py-2 rounded-md`}
              >
                <Text style={tw`text-white font-medium`}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShopManagementScreen;