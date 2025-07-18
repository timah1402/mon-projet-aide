// screens/VendeurInventoryScreen.tsx
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

interface Produit {
  id: string;
  nom: string;
  categorie: string;
  prix: number;
  unite: string;
  stock: number;
  stockMin: number;
  vendu: number;
  statut: 'Disponible' | 'Stock faible' | 'Rupture' | 'En attente';
  dateCreation: string;
  localisation: string;
}

interface MouvementStock {
  id: string;
  produitId: string;
  type: 'Entrée' | 'Sortie' | 'Ajustement' | 'Vente';
  quantite: number;
  motif: string;
  date: string;
  heure: string;
}

export default function VendeurInventoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [selectedProduct, setSelectedProduct] = useState<Produit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [adjustModalVisible, setAdjustModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [newStock, setNewStock] = useState('');
  const [newStockMin, setNewStockMin] = useState('');
  const [motif, setMotif] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const [produits, setProduits] = useState<Produit[]>([
    {
      id: 'prod_001',
      nom: 'Poisson frais (Thiof)',
      categorie: 'Poissons',
      prix: 2500,
      unite: 'kg',
      stock: 150,
      stockMin: 20,
      vendu: 45,
      statut: 'Disponible',
      dateCreation: '2025-01-10',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_002',
      nom: 'Crevettes roses',
      categorie: 'Fruits de mer',
      prix: 8000,
      unite: 'kg',
      stock: 8,
      stockMin: 10,
      vendu: 18,
      statut: 'Stock faible',
      dateCreation: '2025-01-08',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_003',
      nom: 'Légumes bio mélangés',
      categorie: 'Légumes',
      prix: 1200,
      unite: 'kg',
      stock: 80,
      stockMin: 15,
      vendu: 32,
      statut: 'Disponible',
      dateCreation: '2025-01-12',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_004',
      nom: 'Fruits tropicaux',
      categorie: 'Fruits',
      prix: 1800,
      unite: 'kg',
      stock: 0,
      stockMin: 5,
      vendu: 25,
      statut: 'Rupture',
      dateCreation: '2025-01-05',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_005',
      nom: 'Mangues bio',
      categorie: 'Fruits',
      prix: 1500,
      unite: 'kg',
      stock: 25,
      stockMin: 8,
      vendu: 15,
      statut: 'Disponible',
      dateCreation: '2025-01-11',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_006',
      nom: 'Tomates cerises',
      categorie: 'Légumes',
      prix: 2000,
      unite: 'kg',
      stock: 12,
      stockMin: 15,
      vendu: 8,
      statut: 'Stock faible',
      dateCreation: '2025-01-09',
      localisation: 'Marché de Soumbédioune, Dakar'
    }
  ]);

  const [mouvements] = useState<MouvementStock[]>([
    {
      id: 'mvt_001',
      produitId: 'prod_001',
      type: 'Vente',
      quantite: -3,
      motif: 'Commande #CMD001 - Fatou Diallo',
      date: '14 Jan 2025',
      heure: '14:30'
    },
    {
      id: 'mvt_002',
      produitId: 'prod_002',
      type: 'Vente',
      quantite: -1,
      motif: 'Commande #CMD001 - Fatou Diallo',
      date: '14 Jan 2025',
      heure: '14:30'
    },
    {
      id: 'mvt_003',
      produitId: 'prod_001',
      type: 'Entrée',
      quantite: 50,
      motif: 'Réapprovisionnement du matin',
      date: '14 Jan 2025',
      heure: '08:00'
    },
    {
      id: 'mvt_004',
      produitId: 'prod_003',
      type: 'Ajustement',
      quantite: -5,
      motif: 'Correction inventaire',
      date: '13 Jan 2025',
      heure: '18:00'
    },
    {
      id: 'mvt_005',
      produitId: 'prod_002',
      type: 'Entrée',
      quantite: 20,
      motif: 'Nouvelle livraison',
      date: '13 Jan 2025',
      heure: '10:15'
    },
    {
      id: 'mvt_006',
      produitId: 'prod_004',
      type: 'Sortie',
      quantite: -5,
      motif: 'Produits abîmés',
      date: '12 Jan 2025',
      heure: '16:45'
    },
    {
      id: 'mvt_007',
      produitId: 'prod_005',
      type: 'Vente',
      quantite: -2,
      motif: 'Commande #CMD002 - Amadou Ba',
      date: '12 Jan 2025',
      heure: '11:20'
    },
    {
      id: 'mvt_008',
      produitId: 'prod_006',
      type: 'Entrée',
      quantite: 30,
      motif: 'Réapprovisionnement hebdomadaire',
      date: '11 Jan 2025',
      heure: '07:30'
    }
  ]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filtres = ['Tous', 'Disponible', 'Stock faible', 'Rupture'];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Disponible':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Stock faible':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rupture':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Disponible':
        return 'checkmark-circle';
      case 'Stock faible':
        return 'warning';
      case 'Rupture':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const getCategorieIcon = (categorie: string) => {
    switch (categorie) {
      case 'Poissons': return '🐟';
      case 'Fruits de mer': return '🦐';
      case 'Légumes': return '🥬';
      case 'Fruits': return '🍎';
      case 'Viandes': return '🥩';
      default: return '📦';
    }
  };

  const updateStatut = (produitId: string) => {
    setProduits(prevProduits => 
      prevProduits.map(produit => {
        if (produit.id === produitId) {
          let newStatut: Produit['statut'];
          if (produit.stock === 0) {
            newStatut = 'Rupture';
          } else if (produit.stock <= produit.stockMin) {
            newStatut = 'Stock faible';
          } else {
            newStatut = 'Disponible';
          }
          return { ...produit, statut: newStatut };
        }
        return produit;
      })
    );
  };

  const produitsFiltres = selectedFilter === 'Tous' 
    ? produits 
    : produits.filter(p => p.statut === selectedFilter);

  const openProductDetails = (produit: Produit) => {
    setSelectedProduct(produit);
    setNewStock(produit.stock.toString());
    setNewStockMin(produit.stockMin.toString());
    setModalVisible(true);
  };

  const openAdjustStock = (produit: Produit) => {
    setSelectedProduct(produit);
    setNewStock('');
    setMotif('');
    setAdjustModalVisible(true);
  };

  const openHistory = (produit: Produit) => {
    setSelectedProduct(produit);
    setHistoryModalVisible(true);
  };

  const adjustStock = () => {
    if (!selectedProduct || !newStock || !motif) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const quantite = parseInt(newStock);
    if (isNaN(quantite)) {
      Alert.alert('Erreur', 'Quantité invalide');
      return;
    }

    setProduits(prevProduits => 
      prevProduits.map(produit => {
        if (produit.id === selectedProduct.id) {
          const newStockValue = Math.max(0, produit.stock + quantite);
          return { ...produit, stock: newStockValue };
        }
        return produit;
      })
    );

    // Mettre à jour le statut après modification du stock
    setTimeout(() => updateStatut(selectedProduct.id), 100);

    setAdjustModalVisible(false);
    setNewStock('');
    setMotif('');
    
    Alert.alert(
      'Stock mis à jour',
      `${quantite > 0 ? 'Ajout' : 'Retrait'} de ${Math.abs(quantite)} ${selectedProduct.unite} effectué`
    );
  };

  const updateProductSettings = () => {
    if (!selectedProduct || !newStockMin) {
      Alert.alert('Erreur', 'Veuillez remplir le stock minimum');
      return;
    }

    const stockMinValue = parseInt(newStockMin);
    if (isNaN(stockMinValue) || stockMinValue < 0) {
      Alert.alert('Erreur', 'Stock minimum invalide');
      return;
    }

    setProduits(prevProduits => 
      prevProduits.map(produit => {
        if (produit.id === selectedProduct.id) {
          return { ...produit, stockMin: stockMinValue };
        }
        return produit;
      })
    );

    // Mettre à jour le statut après modification
    setTimeout(() => updateStatut(selectedProduct.id), 100);

    setModalVisible(false);
    Alert.alert('Paramètres mis à jour', 'Les paramètres du produit ont été modifiés');
  };

  const getMovementsByProduct = (produitId: string) => {
    return mouvements.filter(m => m.produitId === produitId);
  };

  const getTotalStock = () => {
    return produits.reduce((total, p) => total + p.stock, 0);
  };

  const getStockFaibleCount = () => {
    return produits.filter(p => p.statut === 'Stock faible').length;
  };

  const getRuptureCount = () => {
    return produits.filter(p => p.statut === 'Rupture').length;
  };

  const getValeurStock = () => {
    return produits.reduce((total, p) => total + (p.stock * p.prix), 0);
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
            <Text style={tw`text-2xl font-bold text-white`}>Gestion du stock</Text>
            <Text style={tw`text-green-100 text-sm`}>Suivez et gérez votre inventaire</Text>
          </View>
          <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <MaterialIcons name="inventory" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      {/* Contenu principal avec scroll global */}
      <ScrollView 
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        <Animated.View style={[{ opacity: fadeAnim }]}>
          {/* Statistiques rapides */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Vue d'ensemble</Text>
            <View style={tw`flex-row justify-around`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-2xl font-bold text-blue-600`}>{getTotalStock()}</Text>
                <Text style={tw`text-gray-600 text-sm`}>Unités total</Text>
              </View>
              <View style={tw`w-px bg-gray-200`} />
              <View style={tw`items-center`}>
                <Text style={tw`text-2xl font-bold text-orange-600`}>{getStockFaibleCount()}</Text>
                <Text style={tw`text-gray-600 text-sm`}>Stock faible</Text>
              </View>
              <View style={tw`w-px bg-gray-200`} />
              <View style={tw`items-center`}>
                <Text style={tw`text-2xl font-bold text-red-600`}>{getRuptureCount()}</Text>
                <Text style={tw`text-gray-600 text-sm`}>En rupture</Text>
              </View>
            </View>
            
            <View style={tw`mt-4 bg-green-50 rounded-xl p-3 flex-row items-center`}>
              <Ionicons name="cash" size={20} color="#059669" style={tw`mr-3`} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-green-700 text-sm font-medium`}>Valeur du stock</Text>
                <Text style={tw`text-green-800 text-lg font-bold`}>{getValeurStock().toLocaleString()} CFA</Text>
              </View>
            </View>

            {/* Alertes */}
            {(getStockFaibleCount() > 0 || getRuptureCount() > 0) && (
              <View style={tw`mt-4 bg-yellow-100 rounded-xl p-3 flex-row items-center`}>
                <Ionicons name="warning" size={20} color="#D97706" style={tw`mr-3`} />
                <Text style={tw`text-yellow-700 text-sm font-medium flex-1`}>
                  {getRuptureCount() > 0 && `${getRuptureCount()} produit(s) en rupture`}
                  {getRuptureCount() > 0 && getStockFaibleCount() > 0 && ' • '}
                  {getStockFaibleCount() > 0 && `${getStockFaibleCount()} stock(s) faible(s)`}
                </Text>
              </View>
            )}
          </View>

          {/* Bouton d'ajout rapide */}
          <View style={tw`px-4 mt-4`}>
            <TouchableOpacity
              onPress={() => router.push("/add-product")}
              style={tw`bg-green-600 rounded-xl py-3 px-4 flex-row items-center justify-center shadow-lg`}
            >
              <Ionicons name="add" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white font-semibold`}>Ajouter un nouveau produit</Text>
            </TouchableOpacity>
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

          {/* Liste des produits */}
          <View style={tw`px-4 mt-4`}>
            {produitsFiltres.map((produit) => (
              <TouchableOpacity
                key={produit.id}
                onPress={() => openProductDetails(produit)}
                style={tw`bg-white rounded-2xl p-4 mb-4 shadow-lg`}
              >
                {/* En-tête produit */}
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-1 mr-3`}>
                    <View style={tw`flex-row items-center mb-1`}>
                      <Text style={tw`text-2xl mr-2`}>{getCategorieIcon(produit.categorie)}</Text>
                      <Text style={tw`text-lg font-bold text-gray-800 flex-1`}>{produit.nom}</Text>
                    </View>
                    <Text style={tw`text-gray-600 text-sm`}>{produit.categorie} • {produit.prix.toLocaleString()} CFA/{produit.unite}</Text>
                  </View>
                  <View style={[tw`py-1 px-3 rounded-full border`, tw`${getStatutColor(produit.statut)}`]}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons 
                        name={getStatutIcon(produit.statut)} 
                        size={14} 
                        color={produit.statut === 'Disponible' ? '#059669' : 
                               produit.statut === 'Stock faible' ? '#D97706' : '#DC2626'} 
                        style={tw`mr-1`}
                      />
                      <Text style={tw`text-xs font-semibold`}>{produit.statut}</Text>
                    </View>
                  </View>
                </View>

                {/* Informations stock */}
                <View style={tw`bg-gray-50 rounded-xl p-3 mb-3`}>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-gray-700 font-medium`}>Stock actuel</Text>
                    <Text style={tw`text-2xl font-bold text-gray-800`}>
                      {produit.stock} {produit.unite}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-gray-600 text-sm`}>Stock minimum: {produit.stockMin} {produit.unite}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>Vendu: {produit.vendu} {produit.unite}</Text>
                  </View>
                  
                  {/* Barre de progression du stock */}
                  <View style={tw`mt-2`}>
                    <View style={tw`bg-gray-200 rounded-full h-2`}>
                      <View 
                        style={[
                          tw`h-2 rounded-full`,
                          produit.stock === 0 ? tw`bg-red-500` :
                          produit.stock <= produit.stockMin ? tw`bg-yellow-500` : tw`bg-green-500`,
                          { width: `${Math.min(100, (produit.stock / (produit.stockMin * 3)) * 100)}%` }
                        ]} 
                      />
                    </View>
                  </View>
                </View>

                {/* Actions rapides */}
                <View style={tw`flex-row`}>
                  <TouchableOpacity
                    onPress={() => openAdjustStock(produit)}
                    style={tw`flex-1 bg-blue-500 rounded-xl py-2 px-4 mr-2 flex-row items-center justify-center`}
                  >
                    <Ionicons name="create" size={16} color="white" style={tw`mr-1`} />
                    <Text style={tw`text-white font-semibold text-sm`}>Ajuster</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openHistory(produit)}
                    style={tw`flex-1 bg-gray-500 rounded-xl py-2 px-4 ml-2 flex-row items-center justify-center`}
                  >
                    <Ionicons name="time" size={16} color="white" style={tw`mr-1`} />
                    <Text style={tw`text-white font-semibold text-sm`}>Historique</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

            {produitsFiltres.length === 0 && (
              <View style={tw`bg-white rounded-2xl p-8 items-center`}>
                <MaterialIcons name="inventory" size={48} color="#9CA3AF" />
                <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucun produit</Text>
                <Text style={tw`text-gray-400 text-center mt-2`}>
                  Aucun produit trouvé pour le filtre "{selectedFilter}"
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Modal détails produit */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={[tw`bg-white rounded-t-3xl`, { maxHeight: '80%' }]}>
            {selectedProduct && (
              <>
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>{selectedProduct.nom}</Text>
                    <Text style={tw`text-gray-600`}>{selectedProduct.categorie}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={tw`flex-1 px-6`}>
                  {/* Stock minimum */}
                  <View style={tw`my-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Paramètres d'alerte</Text>
                    <View style={tw`bg-gray-50 rounded-xl p-4`}>
                      <Text style={tw`text-gray-700 mb-2`}>Stock minimum d'alerte</Text>
                      <TextInput
                        value={newStockMin}
                        onChangeText={setNewStockMin}
                        keyboardType="numeric"
                        style={tw`bg-white rounded-lg p-3 text-gray-800 border border-gray-200`}
                        placeholder="Ex: 10"
                      />
                      <Text style={tw`text-gray-500 text-sm mt-2`}>
                        Vous recevrez une alerte quand le stock descendra en dessous de cette valeur
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={updateProductSettings}
                    style={tw`bg-green-500 rounded-xl py-3 px-4 flex-row items-center justify-center mb-6`}
                  >
                    <Ionicons name="save" size={20} color="white" style={tw`mr-2`} />
                    <Text style={tw`text-white font-semibold`}>Sauvegarder les paramètres</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal ajustement stock */}
      <Modal
        visible={adjustModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAdjustModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl`}>
            {selectedProduct && (
              <>
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>Ajuster le stock</Text>
                    <Text style={tw`text-gray-600`}>{selectedProduct.nom}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setAdjustModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <View style={tw`p-6`}>
                  <View style={tw`bg-blue-50 rounded-xl p-4 mb-4`}>
                    <Text style={tw`text-blue-700 font-semibold`}>Stock actuel: {selectedProduct.stock} {selectedProduct.unite}</Text>
                  </View>

                  <View style={tw`mb-4`}>
                    <Text style={tw`text-gray-700 mb-2 font-semibold`}>Quantité à ajouter/retirer</Text>
                    <TextInput
                      value={newStock}
                      onChangeText={setNewStock}
                      keyboardType="numeric"
                      style={tw`bg-gray-50 rounded-lg p-3 text-gray-800 border border-gray-200`}
                      placeholder="Ex: +50 ou -10"
                    />
                    <Text style={tw`text-gray-500 text-sm mt-1`}>
                      Utilisez + pour ajouter, - pour retirer, ou un nombre positif pour ajouter
                    </Text>
                  </View>

                  <View style={tw`mb-6`}>
                    <Text style={tw`text-gray-700 mb-2 font-semibold`}>Motif de l'ajustement</Text>
                    <TextInput
                      value={motif}
                      onChangeText={setMotif}
                      style={tw`bg-gray-50 rounded-lg p-3 text-gray-800 border border-gray-200`}
                      placeholder="Ex: Réapprovisionnement, correction d'inventaire..."
                      multiline
                    />
                  </View>

                  <TouchableOpacity
                    onPress={adjustStock}
                    style={tw`bg-green-500 rounded-xl py-3 px-4 flex-row items-center justify-center`}
                  >
                    <Ionicons name="checkmark" size={20} color="white" style={tw`mr-2`} />
                    <Text style={tw`text-white font-semibold`}>Confirmer l'ajustement</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal historique des mouvements */}
      <Modal
        visible={historyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setHistoryModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
          <View style={[tw`bg-white rounded-3xl mx-4`, { width: '90%', maxHeight: '80%' }]}>
            <View style={tw`p-6`}>
              <View style={tw`flex-row justify-between items-start mb-4`}>
                <View style={tw`flex-1 pr-4`}>
                  <Text style={tw`text-xl font-bold text-gray-800`}>Historique des mouvements</Text>
                  {selectedProduct && (
                    <Text style={tw`text-gray-600 mt-1`}>{selectedProduct.nom}</Text>
                  )}
                </View>
                <TouchableOpacity 
                  onPress={() => setHistoryModalVisible(false)}
                  style={tw`p-2 bg-gray-100 rounded-full`}
                >
                  <Ionicons name="close" size={20} color="#374151" />
                </TouchableOpacity>
              </View>

              {selectedProduct ? (
                <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                  {getMovementsByProduct(selectedProduct.id).length > 0 ? (
                    getMovementsByProduct(selectedProduct.id).map((mouvement, index) => (
                      <View key={`${mouvement.id}-${index}`} style={tw`bg-gray-50 rounded-xl p-4 mb-3`}>
                        <View style={tw`flex-row justify-between items-center mb-2`}>
                          <View style={tw`flex-row items-center`}>
                            <Ionicons 
                              name={mouvement.type === 'Entrée' ? 'arrow-down' : 
                                    mouvement.type === 'Sortie' ? 'arrow-up' :
                                    mouvement.type === 'Vente' ? 'bag' : 'sync'} 
                              size={16} 
                              color={mouvement.quantite > 0 ? '#059669' : '#DC2626'} 
                              style={tw`mr-2`}
                            />
                            <Text style={tw`text-gray-800 font-semibold`}>{mouvement.type}</Text>
                          </View>
                          <Text style={[
                            tw`font-bold`,
                            { color: mouvement.quantite > 0 ? '#059669' : '#DC2626' }
                          ]}>
                            {mouvement.quantite > 0 ? '+' : ''}{mouvement.quantite} {selectedProduct.unite}
                          </Text>
                        </View>
                        <Text style={tw`text-gray-600 text-sm mb-1`}>{mouvement.motif}</Text>
                        <Text style={tw`text-gray-500 text-xs`}>{mouvement.date} • {mouvement.heure}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={tw`py-8 items-center`}>
                      <Ionicons name="time-outline" size={48} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucun mouvement</Text>
                      <Text style={tw`text-gray-400 text-center mt-2`}>
                        Aucun mouvement de stock enregistré pour ce produit
                      </Text>
                    </View>
                  )}
                </ScrollView>
              ) : (
                <Text style={tw`text-red-500`}>Erreur: Aucun produit sélectionné</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}