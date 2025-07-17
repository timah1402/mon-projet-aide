// screens/VendeurTransactionsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Animated,
  Modal,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Transaction {
  id: string;
  type: 'Vente' | 'Remboursement' | 'Commission' | 'Frais';
  montant: number;
  statut: 'Complétée' | 'En attente' | 'Échouée' | 'Annulée';
  date: string;
  heure: string;
  commandeId?: string;
  clientNom?: string;
  methode: 'Mobile Money' | 'Espèces' | 'Carte bancaire' | 'Virement';
  description: string;
  fraisTransaction?: number;
}

interface RevenuMensuel {
  mois: string;
  ventes: number;
  commissions: number;
  frais: number;
  net: number;
}

export default function VendeurTransactionsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Cette semaine');
  const [selectedFilter, setSelectedFilter] = useState('Toutes');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      type: 'Vente',
      montant: 15500,
      statut: 'Complétée',
      date: '16 Jan 2025',
      heure: '14:30',
      commandeId: 'CMD001',
      clientNom: 'Fatou Diallo',
      methode: 'Mobile Money',
      description: 'Vente: Thiof frais (3kg) + Crevettes roses (1kg)',
      fraisTransaction: 155
    },
    {
      id: 'TXN002',
      type: 'Vente',
      montant: 6000,
      statut: 'Complétée',
      date: '16 Jan 2025',
      heure: '12:15',
      commandeId: 'CMD002',
      clientNom: 'Ousmane Ba',
      methode: 'Espèces',
      description: 'Vente: Légumes bio mélangés (5kg)',
      fraisTransaction: 0
    },
    {
      id: 'TXN003',
      type: 'Commission',
      montant: -775,
      statut: 'Complétée',
      date: '16 Jan 2025',
      heure: '14:35',
      methode: 'Mobile Money',
      description: 'Commission Senfrais - Commande #CMD001 (5%)',
    },
    {
      id: 'TXN004',
      type: 'Vente',
      montant: 12000,
      statut: 'En attente',
      date: '16 Jan 2025',
      heure: '10:20',
      commandeId: 'CMD004',
      clientNom: 'Moussa Diop',
      methode: 'Mobile Money',
      description: 'Vente: Poisson séché (4kg)',
      fraisTransaction: 120
    },
    {
      id: 'TXN005',
      type: 'Remboursement',
      montant: -3600,
      statut: 'Complétée',
      date: '15 Jan 2025',
      heure: '16:45',
      commandeId: 'CMD003',
      clientNom: 'Aïda Sow',
      methode: 'Mobile Money',
      description: 'Remboursement: Fruits tropicaux (2kg) - Produit défectueux',
      fraisTransaction: 36
    },
    {
      id: 'TXN006',
      type: 'Frais',
      montant: -500,
      statut: 'Complétée',
      date: '15 Jan 2025',
      heure: '09:00',
      methode: 'Mobile Money',
      description: 'Frais mensuel abonnement vendeur premium',
    },
    {
      id: 'TXN007',
      type: 'Vente',
      montant: 8500,
      statut: 'Complétée',
      date: '14 Jan 2025',
      heure: '15:20',
      commandeId: 'CMD005',
      clientNom: 'Ibrahima Fall',
      methode: 'Carte bancaire',
      description: 'Vente: Crevettes roses (2kg) + Légumes (3kg)',
      fraisTransaction: 170
    },
    {
      id: 'TXN008',
      type: 'Vente',
      montant: 5200,
      statut: 'Échouée',
      date: '14 Jan 2025',
      heure: '11:30',
      commandeId: 'CMD006',
      clientNom: 'Aminata Ly',
      methode: 'Mobile Money',
      description: 'Vente: Poisson frais (2kg) - Échec de paiement',
      fraisTransaction: 0
    }
  ]);

  const [revenusMensuels] = useState<RevenuMensuel[]>([
    {
      mois: 'Janvier 2025',
      ventes: 487500,
      commissions: -24375,
      frais: -2500,
      net: 460625
    },
    {
      mois: 'Décembre 2024',
      ventes: 523800,
      commissions: -26190,
      frais: -2500,
      net: 495110
    },
    {
      mois: 'Novembre 2024',
      ventes: 456200,
      commissions: -22810,
      frais: -2500,
      net: 430890
    },
    {
      mois: 'Octobre 2024',
      ventes: 398750,
      commissions: -19937,
      frais: -2500,
      net: 376313
    }
  ]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const periodes = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Tous'];
  const filtres = ['Toutes', 'Vente', 'Remboursement', 'Commission', 'Frais'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Vente':
        return 'text-green-600';
      case 'Remboursement':
        return 'text-red-600';
      case 'Commission':
        return 'text-purple-600';
      case 'Frais':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Vente':
        return 'trending-up';
      case 'Remboursement':
        return 'return-down-back';
      case 'Commission':
        return 'business';
      case 'Frais':
        return 'card';
      default:
        return 'help-circle';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Complétée':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Échouée':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Annulée':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Complétée':
        return 'checkmark-circle';
      case 'En attente':
        return 'time';
      case 'Échouée':
        return 'close-circle';
      case 'Annulée':
        return 'ban';
      default:
        return 'help-circle';
    }
  };

  const getMethodeIcon = (methode: string) => {
    switch (methode) {
      case 'Mobile Money':
        return 'phone-portrait';
      case 'Espèces':
        return 'cash';
      case 'Carte bancaire':
        return 'card';
      case 'Virement':
        return 'swap-horizontal';
      default:
        return 'wallet';
    }
  };

  const transactionsFiltrees = transactions.filter(t => {
    if (selectedFilter !== 'Toutes' && t.type !== selectedFilter) return false;
    
    const today = new Date();
    const transactionDate = new Date(t.date);
    
    switch (selectedPeriod) {
      case 'Aujourd\'hui':
        return transactionDate.toDateString() === today.toDateString();
      case 'Cette semaine':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transactionDate >= weekAgo;
      case 'Ce mois':
        return transactionDate.getMonth() === today.getMonth() && 
               transactionDate.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  });

  const calculateStats = () => {
    const stats = transactionsFiltrees.reduce((acc, t) => {
      if (t.statut === 'Complétée') {
        switch (t.type) {
          case 'Vente':
            acc.ventes += t.montant;
            acc.fraisTotal += t.fraisTransaction || 0;
            break;
          case 'Commission':
            acc.commissions += Math.abs(t.montant);
            break;
          case 'Remboursement':
            acc.remboursements += Math.abs(t.montant);
            break;
          case 'Frais':
            acc.frais += Math.abs(t.montant);
            break;
        }
      }
      return acc;
    }, { ventes: 0, commissions: 0, remboursements: 0, frais: 0, fraisTotal: 0 });

    stats.net = stats.ventes - stats.commissions - stats.remboursements - stats.frais - stats.fraisTotal;
    return stats;
  };

  const stats = calculateStats();

  const openTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header avec dégradé - FIXE */}
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
            <Text style={tw`text-2xl font-bold text-white`}>Revenus & Transactions</Text>
            <Text style={tw`text-green-100 text-sm`}>Suivez vos finances en détail</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setStatsModalVisible(true)}
            style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          >
            <FontAwesome5 name="chart-line" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* CONTENU SCROLLABLE - Changement principal ici */}
      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Carte de revenus principal */}
          <View style={tw`mx-4 mt-4`}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={tw`rounded-2xl p-6 shadow-lg`}
            >
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-white text-lg font-semibold`}>Revenus nets</Text>
                <View style={tw`bg-white bg-opacity-20 rounded-full p-2`}>
                  <FontAwesome5 name="money-bill-wave" size={20} color="white" />
                </View>
              </View>
              <Text style={tw`text-white text-3xl font-bold mb-2`}>
                {stats.net.toLocaleString()} CFA
              </Text>
              <Text style={tw`text-green-100 text-sm`}>Pour {selectedPeriod.toLowerCase()}</Text>
              
              <View style={tw`flex-row justify-between mt-4 pt-4 border-t border-green-400`}>
                <View>
                  <Text style={tw`text-green-100 text-xs`}>Ventes brutes</Text>
                  <Text style={tw`text-white font-bold`}>{stats.ventes.toLocaleString()}</Text>
                </View>
                <View>
                  <Text style={tw`text-green-100 text-xs`}>Commissions</Text>
                  <Text style={tw`text-white font-bold`}>-{stats.commissions.toLocaleString()}</Text>
                </View>
                <View>
                  <Text style={tw`text-green-100 text-xs`}>Transactions</Text>
                  <Text style={tw`text-white font-bold`}>{transactionsFiltrees.length}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Statistiques détaillées */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Répartition des revenus</Text>
            <View style={tw`flex-row flex-wrap justify-between`}>
              <View style={tw`w-1/2 p-2`}>
                <View style={tw`bg-green-50 rounded-xl p-3 items-center`}>
                  <Ionicons name="trending-up" size={20} color="#059669" />
                  <Text style={tw`text-2xl font-bold text-green-600 mt-1`}>{stats.ventes.toLocaleString()}</Text>
                  <Text style={tw`text-gray-600 text-sm text-center`}>Ventes</Text>
                </View>
              </View>
              <View style={tw`w-1/2 p-2`}>
                <View style={tw`bg-purple-50 rounded-xl p-3 items-center`}>
                  <Ionicons name="business" size={20} color="#8B5CF6" />
                  <Text style={tw`text-2xl font-bold text-purple-600 mt-1`}>{stats.commissions.toLocaleString()}</Text>
                  <Text style={tw`text-gray-600 text-sm text-center`}>Commissions</Text>
                </View>
              </View>
              <View style={tw`w-1/2 p-2`}>
                <View style={tw`bg-red-50 rounded-xl p-3 items-center`}>
                  <Ionicons name="return-down-back" size={20} color="#EF4444" />
                  <Text style={tw`text-2xl font-bold text-red-600 mt-1`}>{stats.remboursements.toLocaleString()}</Text>
                  <Text style={tw`text-gray-600 text-sm text-center`}>Remboursements</Text>
                </View>
              </View>
              <View style={tw`w-1/2 p-2`}>
                <View style={tw`bg-orange-50 rounded-xl p-3 items-center`}>
                  <Ionicons name="card" size={20} color="#F97316" />
                  <Text style={tw`text-2xl font-bold text-orange-600 mt-1`}>{(stats.frais + stats.fraisTotal).toLocaleString()}</Text>
                  <Text style={tw`text-gray-600 text-sm text-center`}>Frais total</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Section Filtres intégrée */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-4 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>Filtres</Text>
              <TouchableOpacity 
                onPress={() => {
                  setSelectedPeriod('Cette semaine');
                  setSelectedFilter('Toutes');
                }}
                style={tw`bg-gray-100 rounded-lg py-1 px-3`}
              >
                <Text style={tw`text-gray-600 text-sm`}>Reset</Text>
              </TouchableOpacity>
            </View>
            
            {/* Sélecteur de période */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>Période</Text>
              <View style={tw`flex-row flex-wrap`}>
                {periodes.map((periode) => (
                  <TouchableOpacity
                    key={periode}
                    onPress={() => setSelectedPeriod(periode)}
                    style={[
                      tw`py-2 px-4 mr-2 mb-2 rounded-xl`,
                      selectedPeriod === periode 
                        ? tw`bg-green-500` 
                        : tw`bg-gray-100`
                    ]}
                  >
                    <Text style={[
                      tw`text-sm font-medium`,
                      { color: selectedPeriod === periode ? 'white' : '#374151' }
                    ]}>
                      {periode}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sélecteur de type */}
            <View>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>Type de transaction</Text>
              <View style={tw`flex-row flex-wrap`}>
                {filtres.map((filtre) => (
                  <TouchableOpacity
                    key={filtre}
                    onPress={() => setSelectedFilter(filtre)}
                    style={[
                      tw`py-2 px-3 mr-2 mb-2 rounded-xl border`,
                      selectedFilter === filtre 
                        ? tw`bg-blue-500 border-blue-500` 
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
          </View>

          {/* Liste des transactions */}
          <View style={tw`px-4 mt-4`}>
            {transactionsFiltrees.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                onPress={() => openTransactionDetails(transaction)}
                style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}
              >
                {/* En-tête simplifié */}
                <View style={tw`flex-row items-center justify-between mb-3`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    <View style={[
                      tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                      transaction.type === 'Vente' ? tw`bg-green-100` :
                      transaction.type === 'Commission' ? tw`bg-purple-100` :
                      transaction.type === 'Remboursement' ? tw`bg-red-100` : tw`bg-orange-100`
                    ]}>
                      <Ionicons 
                        name={getTypeIcon(transaction.type)} 
                        size={18} 
                        color={transaction.type === 'Vente' ? '#059669' : 
                               transaction.type === 'Commission' ? '#8B5CF6' :
                               transaction.type === 'Remboursement' ? '#EF4444' : '#F97316'}
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-base font-semibold text-gray-800`}>{transaction.type}</Text>
                      <Text style={tw`text-gray-500 text-sm`}>
                        {transaction.date} • {transaction.heure}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={tw`items-end`}>
                    <Text style={[
                      tw`text-lg font-bold`,
                      { color: transaction.montant >= 0 ? '#059669' : '#EF4444' }
                    ]}>
                      {transaction.montant >= 0 ? '+' : ''}{transaction.montant.toLocaleString()}
                    </Text>
                    <Text style={tw`text-xs text-gray-500`}>CFA</Text>
                  </View>
                </View>

                {/* Ligne d'information */}
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center flex-1`}>
                    {transaction.clientNom && (
                      <Text style={tw`text-gray-600 text-sm mr-2`}>{transaction.clientNom}</Text>
                    )}
                    <View style={tw`flex-row items-center`}>
                      <Ionicons 
                        name={getMethodeIcon(transaction.methode)} 
                        size={14} 
                        color="#9CA3AF" 
                        style={tw`mr-1`}
                      />
                      <Text style={tw`text-gray-500 text-xs`}>{transaction.methode}</Text>
                    </View>
                  </View>
                  
                  <View style={[
                    tw`py-1 px-2 rounded-md`,
                    transaction.statut === 'Complétée' ? tw`bg-green-50` :
                    transaction.statut === 'En attente' ? tw`bg-yellow-50` :
                    transaction.statut === 'Échouée' ? tw`bg-red-50` : tw`bg-gray-50`
                  ]}>
                    <Text style={[
                      tw`text-xs font-medium`,
                      transaction.statut === 'Complétée' ? tw`text-green-700` :
                      transaction.statut === 'En attente' ? tw`text-yellow-700` :
                      transaction.statut === 'Échouée' ? tw`text-red-700` : tw`text-gray-700`
                    ]}>
                      {transaction.statut}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {transactionsFiltrees.length === 0 && (
              <View style={tw`bg-white rounded-2xl p-8 items-center`}>
                <FontAwesome5 name="receipt" size={48} color="#9CA3AF" />
                <Text style={tw`text-gray-500 text-lg font-semibold mt-4`}>Aucune transaction</Text>
                <Text style={tw`text-gray-400 text-center mt-2`}>
                  Aucune transaction trouvée pour la période "{selectedPeriod}"
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Modal détails transaction */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-4/5`}>
            {selectedTransaction && (
              <>
                <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
                  <View>
                    <Text style={tw`text-xl font-bold text-gray-800`}>Transaction #{selectedTransaction.id}</Text>
                    <Text style={tw`text-gray-600`}>{selectedTransaction.date} • {selectedTransaction.heure}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={tw`flex-1 px-6`}>
                  {/* Montant principal */}
                  <View style={tw`my-6 items-center`}>
                    <Text style={tw`text-gray-600 text-base mb-2`}>Montant</Text>
                    <Text style={[
                      tw`text-4xl font-bold`,
                      { color: selectedTransaction.montant >= 0 ? '#059669' : '#EF4444' }
                    ]}>
                      {selectedTransaction.montant >= 0 ? '+' : ''}{selectedTransaction.montant.toLocaleString()} CFA
                    </Text>
                    <View style={[tw`py-2 px-4 rounded-full border mt-3`, tw`${getStatutColor(selectedTransaction.statut)}`]}>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons 
                          name={getStatutIcon(selectedTransaction.statut)} 
                          size={16} 
                          color={selectedTransaction.statut === 'Complétée' ? '#059669' : 
                                 selectedTransaction.statut === 'En attente' ? '#D97706' :
                                 selectedTransaction.statut === 'Échouée' ? '#DC2626' : '#6B7280'} 
                          style={tw`mr-2`}
                        />
                        <Text style={tw`font-semibold`}>{selectedTransaction.statut}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Détails de la transaction */}
                  <View style={tw`bg-gray-50 rounded-xl p-4 mb-4`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Détails</Text>
                    
                    <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-200`}>
                      <Text style={tw`text-gray-600`}>Type</Text>
                      <Text style={[tw`font-semibold`, tw`${getTypeColor(selectedTransaction.type)}`]}>
                        {selectedTransaction.type}
                      </Text>
                    </View>
                    
                    <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-200`}>
                      <Text style={tw`text-gray-600`}>Méthode de paiement</Text>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons 
                          name={getMethodeIcon(selectedTransaction.methode)} 
                          size={16} 
                          color="#6B7280" 
                          style={tw`mr-2`}
                        />
                        <Text style={tw`text-gray-800 font-semibold`}>{selectedTransaction.methode}</Text>
                      </View>
                    </View>

                    {selectedTransaction.clientNom && (
                      <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-200`}>
                        <Text style={tw`text-gray-600`}>Client</Text>
                        <Text style={tw`text-gray-800 font-semibold`}>{selectedTransaction.clientNom}</Text>
                      </View>
                    )}

                    {selectedTransaction.commandeId && (
                      <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-200`}>
                        <Text style={tw`text-gray-600`}>Commande</Text>
                        <Text style={tw`text-blue-600 font-semibold`}>{selectedTransaction.commandeId}</Text>
                      </View>
                    )}

                    {selectedTransaction.fraisTransaction && selectedTransaction.fraisTransaction > 0 && (
                      <View style={tw`flex-row justify-between items-center py-2`}>
                        <Text style={tw`text-gray-600`}>Frais de transaction</Text>
                        <Text style={tw`text-orange-600 font-semibold`}>
                          -{selectedTransaction.fraisTransaction.toLocaleString()} CFA
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Description détaillée */}
                  <View style={tw`bg-white border border-gray-200 rounded-xl p-4 mb-6`}>
                    <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Description</Text>
                    <Text style={tw`text-gray-700 text-base leading-6`}>{selectedTransaction.description}</Text>
                  </View>

                  {/* Actions selon le statut */}
                  {selectedTransaction.statut === 'En attente' && selectedTransaction.type === 'Vente' && (
                    <View style={tw`mb-6`}>
                      <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Actions</Text>
                      <View style={tw`bg-yellow-50 rounded-xl p-4 flex-row items-center`}>
                        <Ionicons name="time" size={20} color="#D97706" style={tw`mr-3`} />
                        <Text style={tw`text-yellow-700 text-sm flex-1`}>
                          Cette transaction est en attente de confirmation du client
                        </Text>
                      </View>
                    </View>
                  )}

                  {selectedTransaction.statut === 'Échouée' && (
                    <View style={tw`mb-6`}>
                      <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>Statut</Text>
                      <View style={tw`bg-red-50 rounded-xl p-4 flex-row items-center`}>
                        <Ionicons name="close-circle" size={20} color="#DC2626" style={tw`mr-3`} />
                        <Text style={tw`text-red-700 text-sm flex-1`}>
                          La transaction a échoué. Veuillez contacter le support si nécessaire.
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal statistiques mensuelles */}
      <Modal
        visible={statsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStatsModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl max-h-4/5`}>
            <View style={tw`flex-row justify-between items-center p-6 border-b border-gray-200`}>
              <View>
                <Text style={tw`text-xl font-bold text-gray-800`}>Analyse mensuelle</Text>
                <Text style={tw`text-gray-600`}>Évolution de vos revenus</Text>
              </View>
              <TouchableOpacity onPress={() => setStatsModalVisible(false)}>
                <Ionicons name="close" size={28} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView style={tw`flex-1 px-6`}>
              {/* Graphique simple des revenus */}
              <View style={tw`my-4`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Revenus nets par mois</Text>
                <View style={tw`bg-gray-50 rounded-xl p-4`}>
                  {revenusMensuels.map((revenu, index) => {
                    const maxRevenu = Math.max(...revenusMensuels.map(r => r.net));
                    const pourcentage = (revenu.net / maxRevenu) * 100;
                    
                    return (
                      <View key={revenu.mois} style={tw`mb-4`}>
                        <View style={tw`flex-row justify-between items-center mb-2`}>
                          <Text style={tw`text-gray-700 font-medium`}>{revenu.mois}</Text>
                          <Text style={tw`text-gray-800 font-bold`}>{revenu.net.toLocaleString()} CFA</Text>
                        </View>
                        <View style={tw`bg-gray-200 rounded-full h-3`}>
                          <View 
                            style={[
                              tw`h-3 rounded-full`,
                              index === 0 ? tw`bg-green-500` : tw`bg-blue-500`,
                              { width: `${pourcentage}%` }
                            ]} 
                          />
                        </View>
                        <View style={tw`flex-row justify-between mt-1 text-xs`}>
                          <Text style={tw`text-green-600 text-xs`}>
                            Ventes: {revenu.ventes.toLocaleString()}
                          </Text>
                          <Text style={tw`text-red-600 text-xs`}>
                            Déductions: {(Math.abs(revenu.commissions) + Math.abs(revenu.frais)).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Comparaison mensuelle */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Comparaison détaillée</Text>
                {revenusMensuels.map((revenu, index) => (
                  <View key={revenu.mois} style={tw`bg-white border border-gray-200 rounded-xl p-4 mb-3`}>
                    <Text style={tw`text-base font-bold text-gray-800 mb-3`}>{revenu.mois}</Text>
                    
                    <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-100`}>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="trending-up" size={16} color="#059669" style={tw`mr-2`} />
                        <Text style={tw`text-gray-600`}>Ventes brutes</Text>
                      </View>
                      <Text style={tw`text-green-600 font-semibold`}>+{revenu.ventes.toLocaleString()}</Text>
                    </View>
                    
                    <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-100`}>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="business" size={16} color="#8B5CF6" style={tw`mr-2`} />
                        <Text style={tw`text-gray-600`}>Commissions</Text>
                      </View>
                      <Text style={tw`text-purple-600 font-semibold`}>{revenu.commissions.toLocaleString()}</Text>
                    </View>
                    
                    <View style={tw`flex-row justify-between items-center py-2 border-b border-gray-100`}>
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="card" size={16} color="#F97316" style={tw`mr-2`} />
                        <Text style={tw`text-gray-600`}>Frais divers</Text>
                      </View>
                      <Text style={tw`text-orange-600 font-semibold`}>{revenu.frais.toLocaleString()}</Text>
                    </View>
                    
                    <View style={tw`flex-row justify-between items-center pt-3 mt-2 border-t border-gray-200`}>
                      <Text style={tw`text-gray-800 font-bold`}>Revenus nets</Text>
                      <Text style={tw`text-xl font-bold text-green-600`}>{revenu.net.toLocaleString()}</Text>
                    </View>

                    {/* Évolution par rapport au mois précédent */}
                    {index < revenusMensuels.length - 1 && (
                      <View style={tw`mt-3 pt-3 border-t border-gray-100`}>
                        {(() => {
                          const evolution = revenu.net - revenusMensuels[index + 1].net;
                          const pourcentageEvolution = ((evolution / revenusMensuels[index + 1].net) * 100).toFixed(1);
                          const isPositive = evolution >= 0;
                          
                          return (
                            <View style={tw`flex-row items-center justify-center`}>
                              <Ionicons 
                                name={isPositive ? "trending-up" : "trending-down"} 
                                size={16} 
                                color={isPositive ? "#059669" : "#DC2626"}
                                style={tw`mr-2`}
                              />
                              <Text style={[
                                tw`text-sm font-semibold`,
                                { color: isPositive ? "#059669" : "#DC2626" }
                              ]}>
                                {isPositive ? "+" : ""}{evolution.toLocaleString()} CFA ({isPositive ? "+" : ""}{pourcentageEvolution}%)
                              </Text>
                            </View>
                          );
                        })()}
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Conseils */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>💡 Conseils pour optimiser vos revenus</Text>
                <View style={tw`bg-blue-50 rounded-xl p-4`}>
                  <View style={tw`flex-row items-start mb-3`}>
                    <Text style={tw`text-blue-600 mr-2`}>📈</Text>
                    <Text style={tw`text-blue-700 text-sm flex-1`}>
                      Ajoutez plus de produits de saison pour augmenter vos ventes
                    </Text>
                  </View>
                  <View style={tw`flex-row items-start mb-3`}>
                    <Text style={tw`text-blue-600 mr-2`}>💰</Text>
                    <Text style={tw`text-blue-700 text-sm flex-1`}>
                      Privilégiez les paiements en espèces pour réduire les frais de transaction
                    </Text>
                  </View>
                  <View style={tw`flex-row items-start`}>
                    <Text style={tw`text-blue-600 mr-2`}>⭐</Text>
                    <Text style={tw`text-blue-700 text-sm flex-1`}>
                      Obtenez plus d'avis positifs pour augmenter votre visibilité
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}