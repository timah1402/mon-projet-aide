import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const services = [
    {
      id: 'hote',
      title: 'Hôte',
      subtitle: 'Gérez vos espaces',
      description: 'Gérez vos espaces frigorifiques et suivez vos performances',
      icon: 'business-outline',
      bgColor: '#EFF6FF',
      borderColor: '#3B82F6',
      iconColor: '#3B82F6',
      screen: 'HostDashboardScreen'
    },
    {
      id: 'locataire',
      title: 'Locataire',
      subtitle: 'Trouvez votre espace',
      description: 'Trouvez l\'espace frigorifique parfait pour vos besoins',
      icon: 'search-outline',
      bgColor: '#F0FDF4',
      borderColor: '#10B981',
      iconColor: '#10B981',
      screen: 'TenantDashboard'
    },
    {
      id: 'expediteur',
      title: 'Expéditeur',
      subtitle: 'Livraisons réfrigérées',
      description: 'Gérez vos livraisons réfrigérées en toute simplicité',
      icon: 'cube-outline',
      bgColor: '#F3E8FF',
      borderColor: '#8B5CF6',
      iconColor: '#8B5CF6',
      screen: 'ExpediteurDashboardScreen'
    },
    {
      id: 'chauffeur',
      title: 'Chauffeur',
      subtitle: 'Transport frigorifique',
      description: 'Gérez vos courses et optimisez vos trajets',
      icon: 'car-outline',
      bgColor: '#FEE2E2',
      borderColor: '#EF4444',
      iconColor: '#EF4444',
      screen: 'ChauffeurDashboardScreen'
    },
  ];

  const handleServicePress = (service) => {
    navigation.navigate(service.screen);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header avec gradient */}
      <LinearGradient
        colors={['#ffffff', '#f9fafb']}
        style={tw`px-6 py-6 border-b border-gray-200`}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-3xl font-bold text-gray-900`}>
              <Text style={tw`text-red-600`}>LINKO</Text>
            </Text>
            <Text style={tw`text-gray-600 text-sm mt-1`}>
              Plateforme de services frigorifiques
            </Text>
          </View>
          
          <TouchableOpacity style={tw`p-3 rounded-full bg-white shadow-sm`}>
            <Ionicons name="notifications-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      >
        {/* Message de bienvenue */}
        <View style={tw`px-6 py-4`}>
          <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-gray-100`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-2`}>
              👋 Bienvenue sur LINKO
            </Text>
            <Text style={tw`text-gray-600 text-sm leading-5`}>
              Choisissez votre service pour commencer votre expérience dans l'écosystème frigorifique
            </Text>
          </View>
        </View>

        {/* Services principaux - Style Yango avec icônes plus grandes */}
        <View style={tw`px-6 py-2`}>
          <Text style={tw`text-xl font-bold text-gray-900 mb-6`}>
            Nos Services
          </Text>
          
          <View style={tw`flex-row flex-wrap justify-between`}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                onPress={() => handleServicePress(service)}
                style={[
                  tw`rounded-3xl p-4 mb-4 shadow-lg border border-gray-200`,
                  {
                    backgroundColor: service.bgColor,
                    width: '48%',
                    height: 180
                  }
                ]}
                activeOpacity={0.8}
              >
                {/* Icône principale - Beaucoup plus grande comme Yango */}
                <View style={tw`mb-3 items-center justify-center flex-1`}>
                  <View style={[
                    tw`w-20 h-20 rounded-3xl items-center justify-center shadow-md`,
                    { backgroundColor: 'rgba(255,255,255,0.9)' }
                  ]}>
                    <Ionicons 
                      name={service.icon} 
                      size={40} 
                      color={service.iconColor} 
                    />
                  </View>
                </View>
                
                {/* Contenu - Plus compact */}
                <View style={tw`items-center`}>
                  <Text style={tw`text-gray-900 font-bold text-lg mb-1 text-center`}>
                    {service.title}
                  </Text>
                  
                  <Text style={tw`text-gray-600 text-xs text-center leading-4`}>
                    {service.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section informative */}
        <View style={tw`px-6 py-4`}>
          <View style={tw`bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6`}>
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tw`rounded-2xl p-6`}
            >
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white font-bold text-lg mb-2`}>
                    Nouveau sur LINKO ?
                  </Text>
                  <Text style={tw`text-white text-sm opacity-90 mb-4`}>
                    Découvrez comment optimiser vos besoins en réfrigération
                  </Text>
                  <TouchableOpacity style={tw`bg-white rounded-full px-4 py-2 self-start`}>
                    <Text style={tw`text-blue-600 font-semibold text-sm`}>
                      En savoir plus
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={tw`ml-4`}>
                  <Ionicons name="information-circle" size={56} color="white" />
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Statistiques rapides */}
        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>
            Statistiques en temps réel
          </Text>
          
          <View style={tw`flex-row justify-between`}>
            <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 mr-2`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Ionicons name="people" size={24} color="#10B981" />
                <Text style={tw`text-green-600 font-semibold text-sm ml-2`}>
                  Utilisateurs actifs
                </Text>
              </View>
              <Text style={tw`text-2xl font-bold text-gray-900`}>1,234</Text>
            </View>
            
            <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1 ml-2`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Ionicons name="trending-up" size={24} color="#3B82F6" />
                <Text style={tw`text-blue-600 font-semibold text-sm ml-2`}>
                  Transactions
                </Text>
              </View>
              <Text style={tw`text-2xl font-bold text-gray-900`}>567</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}