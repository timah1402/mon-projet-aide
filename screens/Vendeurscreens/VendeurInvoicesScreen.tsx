// screens/VendeurInvoicesScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';

const { width } = Dimensions.get('window');

// Types
interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  amount: number;
  items: InvoiceItem[];
  vendeurInfo: {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
  };
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function VendeurInvoicesScreen() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Données de démonstration avec noms sénégalais
  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        number: 'FACT-2025-001',
        clientName: 'Aminata Diallo',
        clientEmail: 'aminata.diallo@gmail.com',
        clientPhone: '+221 77 123 45 67',
        date: '2025-07-15',
        amount: 75000,
        vendeurInfo: {
          nom: 'Moussa Ndiaye - Poissonnerie Dakar',
          adresse: 'Marché de Soumbédioune, Stand 15, Dakar',
          telephone: '+221 70 456 78 90',
          email: 'moussa.ndiaye@poissonnerie.sn'
        },
        items: [
          { id: '1', description: 'Thiof frais - 1kg', quantity: 2, unitPrice: 25000, total: 50000 },
          { id: '2', description: 'Crevettes roses - 500g', quantity: 1, unitPrice: 25000, total: 25000 },
        ]
      },
      {
        id: '2',
        number: 'FACT-2025-002',
        clientName: 'Ibrahima Sarr',
        clientEmail: 'ibrahima.sarr@email.com',
        clientPhone: '+221 78 987 65 43',
        date: '2025-07-20',
        amount: 150000,
        vendeurInfo: {
          nom: 'Moussa Ndiaye - Poissonnerie Dakar',
          adresse: 'Marché de Soumbédioune, Stand 15, Dakar',
          telephone: '+221 70 456 78 90',
          email: 'moussa.ndiaye@poissonnerie.sn'
        },
        items: [
          { id: '1', description: 'Dorade royale - 2kg', quantity: 3, unitPrice: 30000, total: 90000 },
          { id: '2', description: 'Sole - 1kg', quantity: 2, unitPrice: 30000, total: 60000 },
        ]
      },
      {
        id: '3',
        number: 'FACT-2025-003',
        clientName: 'Fatou Mbaye',
        clientEmail: 'fatou.mbaye@gmail.com',
        clientPhone: '+221 76 555 44 33',
        date: '2025-07-18',
        amount: 45000,
        vendeurInfo: {
          nom: 'Moussa Ndiaye - Poissonnerie Dakar',
          adresse: 'Marché de Soumbédioune, Stand 15, Dakar',
          telephone: '+221 70 456 78 90',
          email: 'moussa.ndiaye@poissonnerie.sn'
        },
        items: [
          { id: '1', description: 'Mérou local - 1.5kg', quantity: 1, unitPrice: 45000, total: 45000 },
        ]
      },
      {
        id: '4',
        number: 'FACT-2025-004',
        clientName: 'Ousmane Diouf',
        clientEmail: 'ousmane.diouf@email.com',
        clientPhone: '+221 77 888 99 00',
        date: '2025-07-22',
        amount: 120000,
        vendeurInfo: {
          nom: 'Moussa Ndiaye - Poissonnerie Dakar',
          adresse: 'Marché de Soumbédioune, Stand 15, Dakar',
          telephone: '+221 70 456 78 90',
          email: 'moussa.ndiaye@poissonnerie.sn'
        },
        items: [
          { id: '1', description: 'Pageot rose - 2kg', quantity: 2, unitPrice: 35000, total: 70000 },
          { id: '2', description: 'Capitaine - 1kg', quantity: 1, unitPrice: 50000, total: 50000 },
        ]
      }
    ];
    setInvoices(mockInvoices);
    setFilteredInvoices(mockInvoices);
  }, []);

  // Filtrage et recherche
  useEffect(() => {
    let filtered = invoices;

    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(invoice =>
        invoice.number.toLowerCase().includes(query) ||
        invoice.clientName.toLowerCase().includes(query) ||
        invoice.clientEmail.toLowerCase().includes(query)
      );
    }

    setFilteredInvoices(filtered);
  }, [searchQuery, invoices]);

  const handleDownloadInvoice = async (invoice: Invoice) => {
    setLoading(true);
    try {
      // Simulation du téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Succès', `Facture ${invoice.number} téléchargée avec succès !`);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger la facture.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const formatCFA = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA';
  };

  const renderInvoiceItem = ({ item: invoice }: { item: Invoice }) => (
    <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-lg border border-gray-100`}>
      <View style={tw`flex-row justify-between items-start mb-4`}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center mb-2`}>
            <View style={tw`bg-green-100 rounded-full p-1 mr-2`}>
              <Ionicons name="document-text" size={16} color="#10B981" />
            </View>
            <Text style={tw`text-lg font-bold text-gray-900`}>{invoice.number}</Text>
          </View>
          <Text style={tw`text-gray-800 font-semibold text-base`}>{invoice.clientName}</Text>
          <Text style={tw`text-gray-500 text-sm`}>{invoice.clientEmail}</Text>
          <Text style={tw`text-gray-500 text-sm`}>{invoice.clientPhone}</Text>
        </View>
        <View style={tw`items-end`}>
          <Text style={tw`text-2xl font-bold text-green-600`}>{formatCFA(invoice.amount)}</Text>
          <View style={tw`bg-green-100 rounded-full px-3 py-1 mt-2`}>
            <Text style={tw`text-green-700 text-xs font-bold`}>✓ PAYÉE</Text>
          </View>
        </View>
      </View>

      <View style={tw`flex-row justify-between text-sm text-gray-500 mb-4`}>
        <Text>📅 {new Date(invoice.date).toLocaleDateString('fr-FR')}</Text>
        <Text>📦 {invoice.items.length} article(s)</Text>
      </View>

      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => handleDownloadInvoice(invoice)}
          style={tw`flex-row items-center bg-blue-500 px-4 py-3 rounded-xl mr-2 shadow-md`}
          disabled={loading}
        >
          <MaterialIcons name="download" size={16} color="white" />
          <Text style={tw`text-white text-sm ml-1 font-semibold`}>Télécharger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleViewInvoice(invoice)}
          style={tw`flex-row items-center bg-gray-500 px-4 py-3 rounded-xl shadow-md`}
        >
          <Ionicons name="eye-outline" size={16} color="white" />
          <Text style={tw`text-white text-sm ml-1 font-semibold`}>Voir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const InvoiceDetailModal = () => {
    if (!selectedInvoice) return null;

    return (
      <Modal
        visible={showInvoiceModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
          {/* Header */}
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={tw`pb-4`}
          >
            <View style={tw`flex-row items-center justify-between pt-4 px-4`}>
              <TouchableOpacity 
                onPress={() => setShowInvoiceModal(false)}
                style={[tw`rounded-full p-2`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={tw`text-xl font-bold text-white`}>Facture Détaillée</Text>
              <TouchableOpacity 
                onPress={() => handleDownloadInvoice(selectedInvoice)}
                style={[tw`rounded-full p-2`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <MaterialIcons name="download" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <ScrollView style={tw`flex-1 p-4`}>
            {/* Facture Design */}
            <View style={tw`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6`}>
              {/* En-tête vendeur */}
              <View style={tw`border-b border-gray-200 pb-6 mb-6`}>
                <View style={tw`flex-row items-center mb-4`}>
                  <View style={tw`bg-green-100 rounded-full p-3 mr-4`}>
                    <Ionicons name="storefront" size={24} color="#10B981" />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xl font-bold text-gray-900`}>{selectedInvoice.vendeurInfo.nom}</Text>
                    <Text style={tw`text-gray-600`}>{selectedInvoice.vendeurInfo.adresse}</Text>
                    <Text style={tw`text-gray-600`}>📞 {selectedInvoice.vendeurInfo.telephone}</Text>
                    <Text style={tw`text-gray-600`}>✉️ {selectedInvoice.vendeurInfo.email}</Text>
                  </View>
                </View>
              </View>

              {/* Informations facture */}
              <View style={tw`flex-row justify-between mb-6`}>
                <View>
                  <Text style={tw`text-sm text-gray-500 mb-1`}>FACTURE N°</Text>
                  <Text style={tw`text-xl font-bold text-gray-900`}>{selectedInvoice.number}</Text>
                  <Text style={tw`text-sm text-gray-500 mt-2`}>DATE</Text>
                  <Text style={tw`text-gray-800 font-semibold`}>
                    {new Date(selectedInvoice.date).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={tw`bg-green-100 rounded-xl p-4 items-center`}>
                  <Text style={tw`text-green-700 font-bold text-xs`}>STATUT</Text>
                  <Text style={tw`text-green-800 font-bold text-lg`}>PAYÉE</Text>
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                </View>
              </View>

              {/* Informations client */}
              <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
                <Text style={tw`text-sm font-bold text-gray-700 mb-3`}>FACTURÉ À :</Text>
                <Text style={tw`text-gray-900 font-bold text-lg`}>{selectedInvoice.clientName}</Text>
                <Text style={tw`text-gray-600`}>✉️ {selectedInvoice.clientEmail}</Text>
                <Text style={tw`text-gray-600`}>📞 {selectedInvoice.clientPhone}</Text>
              </View>

              {/* Détails des articles */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Détails des articles</Text>
                <View style={tw`bg-gray-50 rounded-xl p-4`}>
                  {selectedInvoice.items.map((item, index) => (
                    <View key={item.id} style={tw`mb-4 p-4 bg-white rounded-xl border border-gray-200 ${index === selectedInvoice.items.length - 1 ? 'mb-0' : ''}`}>
                      <View style={tw`flex-row justify-between items-start mb-2`}>
                        <Text style={tw`text-gray-900 font-semibold flex-1 mr-2`}>{item.description}</Text>
                        <View style={tw`bg-green-100 px-2 py-1 rounded-full`}>
                          <Text style={tw`text-green-700 text-xs font-bold`}>x{item.quantity}</Text>
                        </View>
                      </View>
                      
                      <View style={tw`flex-row justify-between items-center`}>
                        <View>
                          <Text style={tw`text-gray-500 text-xs`}>Prix unitaire</Text>
                          <Text style={tw`text-gray-800 font-semibold`}>{formatCFA(item.unitPrice)}</Text>
                        </View>
                        <View style={tw`items-end`}>
                          <Text style={tw`text-gray-500 text-xs`}>Total</Text>
                          <Text style={tw`text-green-600 font-bold text-lg`}>{formatCFA(item.total)}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Total */}
              <View style={tw`border-t-2 border-gray-300 pt-4`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-lg font-bold text-gray-900`}>TOTAL À PAYER</Text>
                  <Text style={tw`text-2xl font-bold text-green-600`}>{formatCFA(selectedInvoice.amount)}</Text>
                </View>
              </View>

              {/* Footer */}
              <View style={tw`mt-6 pt-6 border-t border-gray-200`}>
                <Text style={tw`text-center text-gray-500 text-sm`}>
                  Merci pour votre confiance ! 🙏
                </Text>
                <Text style={tw`text-center text-gray-400 text-xs mt-2`}>
                  Marketplace Locale Sénégal - Fraîcheur garantie
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <Animated.View 
        style={[
          tw`flex-1`,
          { opacity: fadeAnim }
        ]}
      >
        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          {/* Header avec dégradé */}
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={tw`pb-4`}
          >
            <View style={tw`flex-row items-center pt-4 px-4`}>
              <TouchableOpacity 
                onPress={() => router.back()}
                style={[tw`rounded-full p-2 mr-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View style={tw`flex-1`}>
                <Text style={tw`text-xl font-bold text-white`}>Mes Factures</Text>
                <Text style={tw`text-green-100 text-sm`}>Toutes vos ventes facturées automatiquement</Text>
              </View>
              <View style={tw`bg-green-100 rounded-full p-2`}>
                <MaterialIcons name="receipt" size={24} color="#10B981" />
              </View>
            </View>
          </LinearGradient>

          {/* Barre de recherche */}
          <View style={tw`px-4 py-4 bg-white border-b border-gray-100`}>
            <View style={tw`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200`}>
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                style={tw`flex-1 ml-3 text-base text-gray-800`}
                placeholder="Rechercher par numéro, nom ou email..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Statistiques simplifiées */}
          <View style={tw`bg-white px-4 py-4 border-b border-gray-100`}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 items-center bg-green-50 rounded-xl py-4 mx-1`}>
                <Text style={tw`text-2xl font-bold text-green-600`}>{invoices.length}</Text>
                <Text style={tw`text-xs text-green-700 font-semibold`}>Total factures</Text>
              </View>
              <View style={tw`flex-1 items-center bg-blue-50 rounded-xl py-4 mx-1`}>
                <Text style={tw`text-lg font-bold text-blue-600`}>
                  {formatCFA(invoices.reduce((sum, inv) => sum + inv.amount, 0)).replace(' CFA', '')}
                </Text>
                <Text style={tw`text-xs text-blue-700 font-semibold`}>Chiffre d'affaires</Text>
              </View>
            </View>
          </View>

          {/* Message informatif */}
          <View style={tw`bg-blue-50 mx-4 mt-4 p-4 rounded-xl border border-blue-200`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <Text style={tw`text-blue-700 text-sm ml-2 flex-1`}>
                💡 Les factures sont générées automatiquement à chaque vente validée
              </Text>
            </View>
          </View>

          {/* Liste des factures */}
          <View style={tw`px-4 py-4`}>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, index) => (
                <View key={invoice.id}>
                  {renderInvoiceItem({ item: invoice })}
                </View>
              ))
            ) : (
              <View style={tw`items-center py-12`}>
                <View style={tw`bg-gray-100 rounded-full p-6 mb-4`}>
                  <MaterialIcons name="receipt" size={64} color="#9CA3AF" />
                </View>
                <Text style={tw`text-gray-500 text-lg font-semibold mb-2`}>
                  {searchQuery ? 'Aucune facture trouvée' : 'Aucune facture'}
                </Text>
                <Text style={tw`text-gray-400 text-center px-8`}>
                  {searchQuery 
                    ? 'Essayez avec d\'autres mots-clés' 
                    : 'Vos factures apparaîtront ici automatiquement après vos premières ventes'
                  }
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Modal de visualisation de facture */}
      <InvoiceDetailModal />

      {/* Loading overlay */}
      {loading && (
        <View style={tw`absolute inset-0 bg-black bg-opacity-50 items-center justify-center`}>
          <View style={tw`bg-white p-6 rounded-2xl items-center shadow-xl`}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={tw`mt-3 text-gray-700 font-semibold`}>Traitement en cours...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}