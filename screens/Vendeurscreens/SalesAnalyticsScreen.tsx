// screens/SalesAnalyticsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SalesAnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('7j');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const periods = [
    { key: '7j', label: '7 jours' },
    { key: '30j', label: '30 jours' },
    { key: '3m', label: '3 mois' }
  ];

  // Données par période
  const dataByPeriod = {
    '7j': {
      stats: {
        revenus: 339900,
        commandes: 32,
        clients: 18,
        moyenneJour: 48557
      },
      ventesJours: [
        { jour: 'Lun', montant: 45000 },
        { jour: 'Mar', montant: 52000 },
        { jour: 'Mer', montant: 38000 },
        { jour: 'Jeu', montant: 67000 },
        { jour: 'Ven', montant: 89000 },
        { jour: 'Sam', montant: 125000 },
        { jour: 'Dim', montant: 95000 }
      ],
      topProduits: [
        { nom: 'Thiof frais', vendu: 45, revenus: 112500 },
        { nom: 'Crevettes roses', vendu: 18, revenus: 144000 },
        { nom: 'Légumes bio', vendu: 32, revenus: 38400 },
        { nom: 'Fruits tropicaux', vendu: 25, revenus: 45000 }
      ]
    },
    '30j': {
      stats: {
        revenus: 1245600,
        commandes: 156,
        clients: 89,
        moyenneJour: 41520
      },
      ventesJours: [
        { jour: 'S1', montant: 285000 },
        { jour: 'S2', montant: 320000 },
        { jour: 'S3', montant: 298000 },
        { jour: 'S4', montant: 342600 }
      ],
      topProduits: [
        { nom: 'Crevettes roses', vendu: 125, revenus: 750000 },
        { nom: 'Thiof frais', vendu: 180, revenus: 450000 },
        { nom: 'Légumes bio', vendu: 95, revenus: 114000 },
        { nom: 'Fruits tropicaux', vendu: 78, revenus: 140400 }
      ]
    },
    '3m': {
      stats: {
        revenus: 3856200,
        commandes: 487,
        clients: 234,
        moyenneJour: 42847
      },
      ventesJours: [
        { jour: 'Jan', montant: 1145000 },
        { jour: 'Fév', montant: 1285600 },
        { jour: 'Mar', montant: 1425600 }
      ],
      topProduits: [
        { nom: 'Crevettes roses', vendu: 395, revenus: 2370000 },
        { nom: 'Thiof frais', vendu: 520, revenus: 1300000 },
        { nom: 'Légumes bio', vendu: 298, revenus: 357600 },
        { nom: 'Fruits tropicaux', vendu: 234, revenus: 421200 }
      ]
    }
  };

  // Données actuelles selon la période sélectionnée
  const currentData = dataByPeriod[selectedPeriod];
  const stats = currentData.stats;
  const ventesJours = currentData.ventesJours;
  const topProduits = currentData.topProduits;

  const maxVente = Math.max(...ventesJours.map(v => v.montant));

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
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
            <Text style={tw`text-2xl font-bold text-white`}>Mes analyses</Text>
            <Text style={tw`text-green-100 text-sm`}>Vos performances de vente</Text>
          </View>
        </View>
      </LinearGradient>

      <Animated.View style={[tw`flex-1`, { opacity: fadeAnim }]}>
        <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
          
          {/* Période */}
          <View style={tw`mt-4 mb-4`}>
            <View style={tw`flex-row`}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.key}
                  onPress={() => setSelectedPeriod(period.key)}
                  style={[
                    tw`py-2 px-4 mr-3 rounded-full`,
                    selectedPeriod === period.key 
                      ? tw`bg-green-500` 
                      : tw`bg-white border border-gray-300`
                  ]}
                >
                  <Text style={[
                    tw`text-sm font-semibold`,
                    { color: selectedPeriod === period.key ? 'white' : '#374151' }
                  ]}>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Statistiques principales */}
          <View style={tw`bg-white rounded-2xl p-4 shadow-lg mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Résumé</Text>
            <View style={tw`flex-row flex-wrap`}>
              <View style={tw`w-1/2 mb-4`}>
                <Text style={tw`text-2xl font-bold text-green-600`}>
                  {stats.revenus.toLocaleString()} CFA
                </Text>
                <Text style={tw`text-gray-600 text-sm`}>Revenus totaux</Text>
              </View>
              <View style={tw`w-1/2 mb-4`}>
                <Text style={tw`text-2xl font-bold text-blue-600`}>{stats.commandes}</Text>
                <Text style={tw`text-gray-600 text-sm`}>Commandes</Text>
              </View>
              <View style={tw`w-1/2`}>
                <Text style={tw`text-2xl font-bold text-purple-600`}>{stats.clients}</Text>
                <Text style={tw`text-gray-600 text-sm`}>Clients</Text>
              </View>
              <View style={tw`w-1/2`}>
                <Text style={tw`text-2xl font-bold text-orange-600`}>
                  {stats.moyenneJour.toLocaleString()} CFA
                </Text>
                <Text style={tw`text-gray-600 text-sm`}>Moyenne/jour</Text>
              </View>
            </View>
          </View>

          {/* Graphique simple */}
          <View style={tw`bg-white rounded-2xl p-4 shadow-lg mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>
              Ventes par {selectedPeriod === '7j' ? 'jour' : selectedPeriod === '30j' ? 'semaine' : 'mois'}
            </Text>
            <View style={tw`flex-row items-end justify-between h-32 mb-4`}>
              {ventesJours.map((vente, index) => (
                <View key={index} style={tw`items-center flex-1`}>
                  <View 
                    style={[
                      tw`bg-green-500 rounded-t w-6 mb-2`,
                      { height: (vente.montant / maxVente) * 80 + 10 }
                    ]} 
                  />
                  <Text style={tw`text-gray-600 text-xs`}>{vente.jour}</Text>
                </View>
              ))}
            </View>
            <View style={tw`flex-row justify-between bg-gray-50 rounded-xl p-3`}>
              <Text style={tw`text-gray-600 text-sm`}>
                Max: {maxVente.toLocaleString()} CFA
              </Text>
              <Text style={tw`text-gray-600 text-sm`}>
                Min: {Math.min(...ventesJours.map(v => v.montant)).toLocaleString()} CFA
              </Text>
            </View>
          </View>

          {/* Top produits */}
          <View style={tw`bg-white rounded-2xl p-4 shadow-lg mb-8`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Meilleurs produits</Text>
            {topProduits.map((produit, index) => (
              <View key={index} style={tw`flex-row justify-between items-center py-3 border-b border-gray-100`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-800 font-semibold`}>{produit.nom}</Text>
                  <Text style={tw`text-gray-600 text-sm`}>{produit.vendu} unités</Text>
                </View>
                <Text style={tw`text-gray-800 font-bold`}>
                  {produit.revenus.toLocaleString()} CFA
                </Text>
              </View>
            ))}
          </View>

          {/* Conseil simple */}
          <View style={tw`bg-blue-50 rounded-2xl p-4 mb-8`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="bulb" size={20} color="#3B82F6" style={tw`mr-2`} />
              <Text style={tw`text-blue-800 font-semibold`}>Conseil</Text>
            </View>
            <Text style={tw`text-blue-700 text-sm`}>
              {selectedPeriod === '7j' 
                ? "Les crevettes roses génèrent le plus de revenus par unité. Pensez à augmenter votre stock !"
                : selectedPeriod === '30j'
                ? "Vos ventes du mois sont excellentes ! Les crevettes restent votre produit star."
                : "Sur 3 mois, vous montrez une belle progression. Continuez à miser sur les crevettes roses."
              }
            </Text>
          </View>

        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}