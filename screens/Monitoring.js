import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native'; // en haut du fichier

export default function MonitoringScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4 mb-20`}>
        {/* Bouton retour */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold mb-2`}>📡 Monitoring IoT</Text>
        <Text style={tw`text-gray-600 mb-6`}>Surveillez vos chambres froides actives en temps réel</Text>

        {/* Sélecteur de période + bouton paramètres */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <TouchableOpacity style={tw`border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm`}>
            <Text style={tw`text-gray-700 text-sm`}>Dernières 24h ▼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-blue-600 px-4 py-2 rounded-xl shadow-sm`}>
            <Text style={tw`text-white text-sm`}>⚙️ Paramètres</Text>
          </TouchableOpacity>
        </View>

        {/* Statistiques */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-[48%] bg-gray-50 p-4 mb-4 rounded-xl items-center shadow-sm`}>
            <Ionicons name="pulse" size={24} color="blue" />
            <Text style={tw`text-sm text-gray-500 mt-2`}>Espaces surveillés</Text>
            <Text style={tw`text-xl font-bold mt-1`}>2</Text>
          </View>
          <View style={tw`w-[48%] bg-gray-50 p-4 mb-4 rounded-xl items-center shadow-sm`}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={tw`text-sm text-gray-500 mt-2`}>Statut optimal</Text>
            <Text style={tw`text-xl font-bold mt-1`}>1</Text>
          </View>
          <View style={tw`w-[48%] bg-gray-50 p-4 mb-4 rounded-xl items-center shadow-sm`}>
            <Ionicons name="warning" size={24} color="orange" />
            <Text style={tw`text-sm text-gray-500 mt-2`}>Alertes actives</Text>
            <Text style={tw`text-xl font-bold mt-1`}>1</Text>
          </View>
          <View style={tw`w-[48%] bg-gray-50 p-4 mb-4 rounded-xl items-center shadow-sm`}>
            <MaterialCommunityIcons name="thermometer" size={24} color="#0f766e" />
            <Text style={tw`text-sm text-gray-500 mt-2`}>Temp. moyenne</Text>
            <Text style={tw`text-xl font-bold mt-1`}>6°C</Text>
          </View>
        </View>

        {/* Carte 1 */}
        <View style={tw`bg-white rounded-xl p-5 shadow-md mb-10`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <View>
              <Text style={tw`text-base font-semibold`}>Chambre froide proche du Port</Text>
              <Text style={tw`text-sm text-gray-500`}>Dakar, Sénégal</Text>
            </View>
            <View style={tw`bg-green-100 px-3 py-1 rounded-full`}>
              <Text style={tw`text-green-700 text-xs font-semibold`}>🟢 Optimal</Text>
            </View>
          </View>

          <View style={tw`mt-3 mb-3`}>
            <Text style={tw`text-sm text-gray-700 mb-1`}>🌡️ Température</Text>
            <View style={tw`w-full h-2 bg-gray-300 rounded-full mb-1`}>
              <View style={[tw`h-2 bg-green-500 rounded-full`, { width: '50%' }]} />
            </View>
            <Text style={tw`text-sm`}>4.2°C <Text style={tw`text-gray-400`}>(Cible: 4°C)</Text></Text>
          </View>

          <View style={tw`mt-3 mb-3`}>
            <Text style={tw`text-sm text-gray-700 mb-1`}>💧 Humidité</Text>
            <View style={tw`w-full h-2 bg-gray-300 rounded-full mb-1`}>
              <View style={[tw`h-2 bg-green-500 rounded-full`, { width: '75%' }]} />
            </View>
            <Text style={tw`text-sm`}>65% <Text style={tw`text-gray-400`}>(Cible: 60%)</Text></Text>
          </View>

          <Text style={tw`text-xs text-gray-500 mt-2`}>🕒 Dernière mise à jour : Il y a 8684h</Text>

          <TouchableOpacity style={tw`mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg items-center`}>
            <Text style={tw`text-sm text-blue-700 font-semibold`}>📈 Voir le graphique 24h</Text>
          </TouchableOpacity>
        </View>

        {/* Carte 2 */}
        <View style={tw`bg-white rounded-xl p-5 shadow-md mb-10`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <View>
              <Text style={tw`text-base font-semibold`}>Espace réfrigéré Almadies</Text>
              <Text style={tw`text-sm text-gray-500`}>Almadies, Dakar</Text>
            </View>
            <View style={tw`bg-yellow-100 px-3 py-1 rounded-full`}>
              <Text style={tw`text-yellow-700 text-xs font-semibold`}>⚠️ Attention</Text>
            </View>
          </View>

          <View style={tw`mt-3 mb-3`}>
            <Text style={tw`text-sm text-gray-700 mb-1`}>🌡️ Température</Text>
            <View style={tw`w-full h-2 bg-gray-300 rounded-full mb-1`}>
              <View style={[tw`h-2 bg-yellow-500 rounded-full`, { width: '85%' }]} />
            </View>
            <Text style={tw`text-sm`}>7.8°C <Text style={tw`text-gray-400`}>(Cible: 6°C)</Text></Text>
          </View>

          <View style={tw`mt-3 mb-3`}>
            <Text style={tw`text-sm text-gray-700 mb-1`}>💧 Humidité</Text>
            <View style={tw`w-full h-2 bg-gray-300 rounded-full mb-1`}>
              <View style={[tw`h-2 bg-green-500 rounded-full`, { width: '80%' }]} />
            </View>
            <Text style={tw`text-sm`}>72% <Text style={tw`text-gray-400`}>(Cible: 65%)</Text></Text>
          </View>

          <Text style={tw`text-xs text-gray-500 mt-2`}>🕒 Dernière mise à jour : Il y a 8684h</Text>

          <TouchableOpacity style={tw`mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg items-center`}>
            <Text style={tw`text-sm text-blue-700 font-semibold`}>📈 Voir le graphique 24h</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* NAVBAR en bas */}
     
    </SafeAreaView>
  );
}
