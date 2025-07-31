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
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';

// Types
interface Transaction {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorAddress: string;
  vendorPhone: string;
  date: string;
  amount: number;
  paymentMethod: 'Espèces' | 'Wave' | 'Orange Money' | 'Free Money' | 'Carte bancaire';
  status: 'Payée' | 'En attente' | 'Remboursée';
  items: TransactionItem[];
}

interface TransactionItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function CustomerTransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Données de démonstration
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        invoiceNumber: 'FACT-2025-001',
        vendorName: 'Marché Frais de Fatou',
        vendorAddress: 'Marché Sandaga, Dakar',
        vendorPhone: '+221 77 123 45 67',
        date: '2025-07-28',
        amount: 15500,
        paymentMethod: 'Wave',
        status: 'Payée',
        items: [
          { id: '1', name: 'Thiof frais', quantity: 3, unitPrice: 2500, total: 7500 },
          { id: '2', name: 'Crevettes roses', quantity: 1, unitPrice: 8000, total: 8000 },
        ]
      },
      {
        id: '2',
        invoiceNumber: 'FACT-2025-002',
        vendorName: 'Bio Légumes Dakar',
        vendorAddress: 'Marché HLM, Dakar',
        vendorPhone: '+221 76 987 65 43',
        date: '2025-07-27',
        amount: 6600,
        paymentMethod: 'Espèces',
        status: 'Payée',
        items: [
          { id: '1', name: 'Tomates bio', quantity: 2, unitPrice: 1500, total: 3000 },
          { id: '2', name: 'Oignons locaux', quantity: 3, unitPrice: 800, total: 2400 },
          { id: '3', name: 'Aubergines fraîches', quantity: 1, unitPrice: 1200, total: 1200 },
        ]
      },
      {
        id: '3',
        invoiceNumber: 'FACT-2025-003',
        vendorName: 'Fruits Tropicaux Sénégal',
        vendorAddress: 'Marché Castors, Dakar',
        vendorPhone: '+221 78 456 78 90',
        date: '2025-07-28',
        amount: 10000,
        paymentMethod: 'Orange Money',
        status: 'En attente',
        items: [
          { id: '1', name: 'Mangues Kent', quantity: 5, unitPrice: 1000, total: 5000 },
          { id: '2', name: 'Ananas victoria', quantity: 2, unitPrice: 2500, total: 5000 },
        ]
      },
      {
        id: '4',
        invoiceNumber: 'FACT-2025-004',
        vendorName: 'Poissonnerie Atlantique',
        vendorAddress: 'Soumbédioune, Dakar',
        vendorPhone: '+221 77 888 99 00',
        date: '2025-07-26',
        amount: 4500,
        paymentMethod: 'Carte bancaire',
        status: 'Remboursée',
        items: [
          { id: '1', name: 'Poulet du pays', quantity: 1, unitPrice: 4500, total: 4500 },
        ]
      }
    ];
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = transactions;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.invoiceNumber.toLowerCase().includes(query) ||
        transaction.vendorName.toLowerCase().includes(query) ||
        transaction.date.includes(query)
      );
    }

    setFilteredTransactions(filtered);
  }, [searchQuery, transactions]);

  const handleDownloadInvoice = async (transaction: Transaction) => {
    setLoading(true);
    try {
      // Simulation du téléchargement
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Succès', `Facture ${transaction.invoiceNumber} téléchargée avec succès !`);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger la facture.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowInvoiceModal(true);
  };

  const formatCFA = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payée':
        return 'bg-green-100 text-green-700';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Remboursée':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Wave':
      case 'Orange Money':
      case 'Free Money':
        return 'mobile-alt';
      case 'Carte bancaire':
        return 'credit-card';
      case 'Espèces':
        return 'money-bill-wave';
      default:
        return 'wallet';
    }
  };

  const getTotalSpent = () => {
    return transactions
      .filter(t => t.status === 'Payée')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const InvoiceDetailModal = () => {
    if (!selectedTransaction) return null;

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
              <Text style={tw`text-xl font-bold text-white`}>Facture</Text>
              <TouchableOpacity 
                onPress={() => handleDownloadInvoice(selectedTransaction)}
                style={[tw`rounded-full p-2`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <MaterialIcons name="download" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <ScrollView style={tw`flex-1 p-4`}>
            <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
              {/* Logo et titre */}
              <View style={tw`items-center mb-6`}>
                <View style={tw`bg-green-100 rounded-full p-4 mb-3`}>
                  <MaterialIcons name="receipt" size={32} color="#10B981" />
                </View>
                <Text style={tw`text-2xl font-bold text-gray-900`}>FACTURE D'ACHAT</Text>
                <Text style={tw`text-gray-500 text-sm mt-1`}>{selectedTransaction.invoiceNumber}</Text>
              </View>

              {/* Informations vendeur */}
              <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
                <Text style={tw`text-sm font-bold text-gray-700 mb-3`}>VENDEUR</Text>
                <View style={tw`flex-row items-start`}>
                  <Ionicons name="storefront" size={20} color="#6B7280" style={tw`mr-3 mt-1`} />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-gray-900 font-bold text-lg`}>{selectedTransaction.vendorName}</Text>
                    <Text style={tw`text-gray-600`}>{selectedTransaction.vendorAddress}</Text>
                    <Text style={tw`text-gray-600`}>{selectedTransaction.vendorPhone}</Text>
                  </View>
                </View>
              </View>

              {/* Date et statut */}
              <View style={tw`flex-row justify-between mb-6`}>
                <View>
                  <Text style={tw`text-sm text-gray-500`}>Date d'achat</Text>
                  <Text style={tw`text-gray-800 font-semibold`}>
                    {new Date(selectedTransaction.date).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={tw`items-end`}>
                  <Text style={tw`text-sm text-gray-500 mb-1`}>Statut</Text>
                  <View style={[tw`px-3 py-1 rounded-full`, tw`${getStatusColor(selectedTransaction.status)}`]}>
                    <Text style={tw`font-semibold text-sm`}>{selectedTransaction.status}</Text>
                  </View>
                </View>
              </View>

              {/* Articles */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Détails de la commande</Text>
                {selectedTransaction.items.map((item) => (
                  <View key={item.id} style={tw`bg-gray-50 rounded-xl p-4 mb-3`}>
                    <View style={tw`flex-row justify-between items-start mb-2`}>
                      <Text style={tw`text-gray-900 font-semibold flex-1`}>{item.name}</Text>
                      <Text style={tw`text-gray-600 text-sm`}>x{item.quantity}</Text>
                    </View>
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-gray-500 text-sm`}>
                        {formatCFA(item.unitPrice)} / unité
                      </Text>
                      <Text style={tw`text-green-600 font-bold`}>{formatCFA(item.total)}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Mode de paiement */}
              <View style={tw`bg-blue-50 rounded-xl p-4 mb-6`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <FontAwesome5 
                      name={getPaymentIcon(selectedTransaction.paymentMethod)} 
                      size={16} 
                      color="#3B82F6" 
                      style={tw`mr-3`}
                    />
                    <Text style={tw`text-blue-700 font-semibold`}>{selectedTransaction.paymentMethod}</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                </View>
              </View>

              {/* Total */}
              <View style={tw`border-t-2 border-gray-300 pt-4`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-xl font-bold text-gray-900`}>TOTAL PAYÉ</Text>
                  <Text style={tw`text-2xl font-bold text-green-600`}>{formatCFA(selectedTransaction.amount)}</Text>
                </View>
              </View>

              {/* Footer */}
              <View style={tw`mt-6 pt-6 border-t border-gray-200`}>
                <Text style={tw`text-center text-gray-500 text-sm`}>
                  Merci pour votre achat ! 🛒
                </Text>
                <Text style={tw`text-center text-gray-400 text-xs mt-2`}>
                  Conservez cette facture pour vos archives
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
        {/* Header */}
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
              <Text style={tw`text-2xl font-bold text-white`}>Mes transactions</Text>
              <Text style={tw`text-green-100 text-sm`}>Historique de vos achats</Text>
            </View>
            <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <FontAwesome5 name="receipt" size={24} color="white" />
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          {/* Barre de recherche */}
          <View style={tw`bg-white px-4 py-3 border-b border-gray-200`}>
            <View style={tw`flex-row items-center bg-gray-50 rounded-xl px-4 py-2`}>
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                style={tw`flex-1 ml-3 text-base text-gray-800`}
                placeholder="Rechercher une transaction..."
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

          {/* Statistiques */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Résumé</Text>
            <View style={tw`flex-row justify-around`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-2xl font-bold text-blue-600`}>{transactions.length}</Text>
                <Text style={tw`text-gray-600 text-sm`}>Transactions</Text>
              </View>
              <View style={tw`w-px bg-gray-200`} />
              <View style={tw`items-center`}>
                <Text style={tw`text-2xl font-bold text-green-600`}>{formatCFA(getTotalSpent()).split(' ')[0]}</Text>
                <Text style={tw`text-gray-600 text-sm`}>CFA dépensés</Text>
              </View>
            </View>
          </View>

          {/* Liste des transactions */}
          <View style={tw`px-4 mt-4 pb-6`}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <View key={transaction.id} style={tw`bg-white rounded-2xl p-4 mb-4 shadow-lg`}>
                  {/* En-tête */}
                  <View style={tw`flex-row justify-between items-start mb-3`}>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-lg font-bold text-gray-800`}>{transaction.vendorName}</Text>
                      <Text style={tw`text-gray-600 text-sm`}>{transaction.invoiceNumber}</Text>
                      <Text style={tw`text-gray-500 text-sm`}>
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                    <View style={[tw`px-3 py-1 rounded-full`, tw`${getStatusColor(transaction.status)}`]}>
                      <Text style={tw`text-xs font-semibold`}>{transaction.status}</Text>
                    </View>
                  </View>

                  {/* Articles */}
                  <View style={tw`bg-gray-50 rounded-xl p-3 mb-3`}>
                    {transaction.items.slice(0, 2).map((item, index) => (
                      <Text key={index} style={tw`text-gray-700 text-sm`}>
                        {item.quantity}x {item.name}
                      </Text>
                    ))}
                    {transaction.items.length > 2 && (
                      <Text style={tw`text-gray-500 text-sm italic`}>
                        +{transaction.items.length - 2} autre(s) article(s)
                      </Text>
                    )}
                  </View>

                  {/* Paiement et montant */}
                  <View style={tw`flex-row items-center justify-between mb-3`}>
                    <View style={tw`flex-row items-center`}>
                      <FontAwesome5 
                        name={getPaymentIcon(transaction.paymentMethod)} 
                        size={14} 
                        color="#6B7280" 
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-gray-600 text-sm`}>{transaction.paymentMethod}</Text>
                    </View>
                    <Text style={tw`text-xl font-bold text-green-600`}>
                      {formatCFA(transaction.amount)}
                    </Text>
                  </View>

                  {/* Actions */}
                  <View style={tw`flex-row justify-end border-t border-gray-200 pt-3`}>
                    <TouchableOpacity
                      onPress={() => handleViewInvoice(transaction)}
                      style={tw`flex-row items-center bg-gray-500 px-4 py-2 rounded-xl mr-2`}
                    >
                      <Ionicons name="eye-outline" size={16} color="white" />
                      <Text style={tw`text-white text-sm ml-1 font-semibold`}>Voir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDownloadInvoice(transaction)}
                      style={tw`flex-row items-center bg-green-500 px-4 py-2 rounded-xl`}
                    >
                      <MaterialIcons name="download" size={16} color="white" />
                      <Text style={tw`text-white text-sm ml-1 font-semibold`}>Télécharger</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={tw`items-center py-12`}>
                <View style={tw`bg-gray-100 rounded-full p-6 mb-4`}>
                  <FontAwesome5 name="receipt" size={48} color="#9CA3AF" />
                </View>
                <Text style={tw`text-gray-500 text-lg font-semibold mb-2`}>
                  Aucune transaction trouvée
                </Text>
                <Text style={tw`text-gray-400 text-center px-8`}>
                  {searchQuery 
                    ? 'Essayez avec d\'autres mots-clés' 
                    : 'Vos transactions apparaîtront ici après vos achats'
                  }
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Modal de facture */}
      <InvoiceDetailModal />

      {/* Loading overlay */}
      {loading && (
        <View style={tw`absolute inset-0 bg-black bg-opacity-50 items-center justify-center`}>
          <View style={tw`bg-white p-6 rounded-2xl items-center shadow-xl`}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={tw`mt-3 text-gray-700 font-semibold`}>Téléchargement...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}