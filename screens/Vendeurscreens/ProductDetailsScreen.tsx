// screens/ProductDetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Alert,
  Modal,
  Dimensions 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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

const { width } = Dimensions.get('window');

const ProductDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Données simulées - en réalité, vous récupéreriez cela depuis votre base de données
  const [produit, setProduit] = useState<Produit | null>(null);

  const produitsData: Produit[] = [
    {
      id: 'prod_001',
      nom: 'Poisson frais (Thiof)',
      description: 'Thiof frais pêché du jour, excellent pour la cuisine sénégalaise traditionnelle. Ce poisson de haute qualité est idéal pour préparer le thieboudienne et autres plats traditionnels.',
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
      description: 'Crevettes roses fraîches de Casamance, idéales pour les plats de fête. Pêchées dans les eaux pures de la Casamance, ces crevettes offrent une saveur exceptionnelle.',
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
      description: 'Mélange de légumes biologiques cultivés localement sans pesticides. Cultivés dans les meilleures conditions pour garantir fraîcheur et qualité.',
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
      description: 'Assortiment de fruits tropicaux : mangues, papayes, ananas de saison. Fruits cueillis à maturité pour une saveur optimale.',
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
      description: 'Riz blanc cultivé localement, idéal pour les repas familiaux. Riz de première qualité, parfait pour tous vos plats.',
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
      description: 'Mélange d\'épices pour thieboudienne et autres plats sénégalais. Épices sélectionnées et mélangées selon les traditions.',
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
  ];

  useEffect(() => {
    console.log('Received product ID:', id);
    // Trouver le produit par ID
    const foundProduct = produitsData.find(p => p.id === id);
    console.log('Found product:', foundProduct);
    setProduit(foundProduct || null);
  }, [id]);

  const getStatutColor = (statut: string): string => {
    switch (statut) {
      case 'Disponible':
        return 'text-green-600';
      case 'Stock faible':
        return 'text-orange-600';
      case 'Rupture':
        return 'text-red-600';
      case 'En attente':
        return 'text-gray-600';
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
      case 'En attente':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleDeleteProduct = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmation(false);
    Alert.alert(
      'Produit supprimé', 
      'Le produit a été supprimé avec succès.',
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleEditProduct = () => {
    router.push(`/edit-product/${produit?.id}`);
  };

  const handleChangeStatus = (newStatus: string) => {
    if (produit) {
      setProduit({
        ...produit,
        statut: newStatus as 'Disponible' | 'Stock faible' | 'Rupture' | 'En attente'
      });
      setShowStatusModal(false);
      Alert.alert('Statut modifié', `Le statut du produit a été changé vers "${newStatus}".`);
    }
  };

  const getStatusOptions = () => {
    return ['Disponible', 'En attente', 'Rupture'];
  };

  if (!produit) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text style={tw`text-xl font-bold text-gray-900 mt-4`}>Produit introuvable</Text>
          <Text style={tw`text-gray-600 mt-2 text-center px-8`}>
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={tw`bg-green-600 px-6 py-3 rounded-lg mt-6`}
          >
            <Text style={tw`text-white font-medium`}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
        <View style={tw`flex-row items-center flex-1`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={tw`mr-3`}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold flex-1`} numberOfLines={1}>
            Détails du produit
          </Text>
        </View>
        
        <View style={tw`flex-row items-center`}>
         
          
          <TouchableOpacity 
            onPress={handleDeleteProduct}
            style={tw`p-2`}
          >
            <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={tw`bg-gray-50`}>
          <Image 
            source={{ uri: produit.photo }} 
            style={{ width: width, height: 250 }}
            resizeMode="cover"
          />
        </View>

        <View style={tw`p-4`}>
          {/* Product Name and Category */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
              {produit.nom}
            </Text>
            <Text style={tw`text-base text-gray-600 mb-3`}>
              {produit.categorie}
            </Text>
            
            {/* Price */}
            <Text style={tw`text-3xl font-bold text-green-600`}>
              {produit.prix.toLocaleString()} CFA/kg
            </Text>
          </View>

          {/* Status and Actions */}
          <View style={tw`bg-gray-50 rounded-lg p-4 mb-4`}>
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text style={tw`text-lg font-semibold text-gray-900`}>Statut</Text>
              <TouchableOpacity 
                onPress={() => setShowStatusModal(true)}
                style={tw`bg-blue-600 px-3 py-2 rounded-md`}
              >
                <Text style={tw`text-white font-medium text-sm`}>Modifier</Text>
              </TouchableOpacity>
            </View>
            
            <View style={tw`${getStatutBackgroundColor(produit.statut)} px-3 py-2 rounded-full self-start`}>
              <Text style={tw`text-sm font-medium ${getStatutColor(produit.statut)}`}>
                {produit.statut}
              </Text>
            </View>
          </View>

          {/* Stock and Sales Info */}
          <View style={tw`bg-gray-50 rounded-lg p-4 mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>Inventaire</Text>
            
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-gray-600`}>Stock disponible</Text>
              <Text style={tw`font-semibold text-gray-900`}>{produit.stock} kg</Text>
            </View>
            
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-gray-600`}>Quantité vendue</Text>
              <Text style={tw`font-semibold text-gray-900`}>{produit.vendu} kg</Text>
            </View>
            
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Revenus générés</Text>
              <Text style={tw`font-bold text-green-600`}>{produit.revenu}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>Description</Text>
            <Text style={tw`text-gray-700 leading-6`}>
              {produit.description}
            </Text>
          </View>

          {/* Additional Info */}
          <View style={tw`bg-gray-50 rounded-lg p-4 mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>Informations</Text>
            
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text style={tw`text-gray-600 ml-2`}>Ajouté le {new Date(produit.dateCreation).toLocaleDateString('fr-FR')}</Text>
            </View>
            
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text style={tw`text-gray-600 ml-2 flex-1`}>{produit.localisation}</Text>
            </View>
            
            <View style={tw`flex-row items-center`}>
              <Ionicons name="person-outline" size={16} color="#6B7280" />
              <Text style={tw`text-gray-600 ml-2`}>ID Vendeur: {produit.vendeurId}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Status Change Modal */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-t-lg p-6`}>
            <Text style={tw`text-lg font-bold mb-4`}>Changer le statut</Text>
            
            {getStatusOptions().map((status) => (
              <TouchableOpacity 
                key={status}
                onPress={() => handleChangeStatus(status)}
                style={tw`py-3 px-4 border-b border-gray-100 flex-row items-center justify-between`}
              >
                <Text style={tw`text-base text-gray-900`}>{status}</Text>
                {produit.statut === status && (
                  <Ionicons name="checkmark" size={20} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              onPress={() => setShowStatusModal(false)}
              style={tw`mt-4 py-3 px-4 bg-gray-100 rounded-lg`}
            >
              <Text style={tw`text-center font-medium text-gray-700`}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-6 mx-4 w-80`}>
            <View style={tw`items-center mb-4`}>
              <MaterialIcons name="delete-outline" size={48} color="#EF4444" />
              <Text style={tw`text-lg font-bold mt-2`}>Supprimer le produit</Text>
            </View>
            
            <Text style={tw`text-gray-600 mb-6 text-center`}>
              Êtes-vous sûr de vouloir supprimer "{produit.nom}" ? Cette action est irréversible.
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

export default ProductDetailsScreen;