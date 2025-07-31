import { router } from 'expo-router';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { UserContext } from '../context/UserContext';

export default function HomeScreen() {
  const { user } = useContext(UserContext);

  const services = [
    {
      id: 'hote',
      title: 'Hôte',
      subtitle: 'Gérez vos espaces',
      description: 'Gérez vos espaces frigorifiques et suivez vos performances',
      emoji: '🏢',
      iconColor: '#10B981',
      gradientColors: ['#F0FDF4', '#DCFCE7'],
      shadowColor: '#10B981',
      screen: 'HostDashboardScreen'
    },
    {
      id: 'locataire',
      title: 'Locataire',
      subtitle: 'Trouvez votre espace',
      description: 'Trouvez l\'espace frigorifique parfait pour vos besoins',
      emoji: '🔍',
      iconColor: '#10B981',
      gradientColors: ['#F0F9FF', '#E0F2FE'],
      shadowColor: '#0EA5E9',
      screen: 'TenantDashboard'
    },
    {
      id: 'expediteur',
      title: 'Expéditeur',
      subtitle: 'Livraisons réfrigérées',
      description: 'Gérez vos livraisons réfrigérées en toute simplicité',
      emoji: '📦',
      iconColor: '#10B981',
      gradientColors: ['#FDF4FF', '#FAE8FF'],
      shadowColor: '#A855F7',
      screen: 'ExpediteurDashboardScreen'
    },
    {
      id: 'chauffeur',
      title: 'Chauffeur',
      subtitle: 'Transport frigorifique',
      description: 'Gérez vos courses et optimisez vos trajets',
      emoji: '🚛',
      iconColor: '#10B981',
      gradientColors: ['#FEF2F2', '#FEE2E2'],
      shadowColor: '#EF4444',
      screen: 'ChauffeurDashboardScreen'
    },
    {
      id: 'vente_produits',
      title: 'Vendre',
      subtitle: 'Produits frais',
      description: 'Postez vos produits frais sur la marketplace',
      emoji: '🏪',
      iconColor: '#10B981',
      gradientColors: ['#FFFBEB', '#FEF3C7'],
      shadowColor: '#F59E0B',
      screen: 'SellProductsScreen'
    },
    {
      id: 'achat_produits',
      title: 'Acheter',
      subtitle: 'Produits frais',
      description: 'Découvrez et achetez des produits frais locaux',
      emoji: '🛒',
      iconColor: '#10B981',
      gradientColors: ['#F0FDFA', '#CCFBF1'],
      shadowColor: '#14B8A6',
      screen: 'BuyProductsScreen'
    }
  ];

  const handleServicePress = (service) => {
    router.push(service.screen);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header moderne */}
      <View style={tw`px-6 py-6 bg-white`}>
        <View style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3
        }}>
          <View style={tw`flex-row items-center`}>
            {/* Logo 3D avec emoji style Flaticon */}
            <View style={{
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8
            }}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={tw`w-16 h-16 rounded-full items-center justify-center mr-4`}
              >
                <View style={tw`w-14 h-14 bg-white bg-opacity-20 rounded-full items-center justify-center`}>
                  <Text style={tw`text-2xl`}>🧊</Text>
                </View>
              </LinearGradient>
            </View>
            
            <View>
              <Text style={tw`text-3xl font-bold text-gray-900`}>
                Senfrais
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Text style={tw`text-xl mr-2`}>📍</Text>
                <Text style={tw`text-gray-600 text-sm font-medium`}>
                  Dakar, Sénégal
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}
      >
        {/* Message d'accueil */}
        <View style={tw`px-6 py-6`}>
          <View style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6
          }}>
            <LinearGradient
              colors={['#ffffff', '#f8fafc']}
              style={tw`rounded-3xl p-6 border border-gray-100`}
            >
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-4xl mr-4`}>👋</Text>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xl font-bold text-gray-900 mb-2`}>
                    Bienvenue sur Senfrais
                  </Text>
                  <Text style={tw`text-gray-600 text-sm leading-5`}>
                    Votre plateforme de confiance pour la chaîne du froid
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Services avec emojis style Flaticon en 2 colonnes */}
        <View style={tw`px-6 py-2`}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-8`}>
            Nos Services
          </Text>
          
          <View style={tw`flex-row flex-wrap justify-between`}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                onPress={() => handleServicePress(service)}
                style={[tw`mb-6`, { width: '48%' }]}
                activeOpacity={0.8}
              >
                {/* Carte avec effet 3D */}
                <View style={{
                  shadowColor: service.shadowColor,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.15,
                  shadowRadius: 16,
                  elevation: 12
                }}>
                  <LinearGradient
                    colors={['#ffffff', '#fafafa']}
                    style={[tw`rounded-3xl p-5 border border-gray-100`, { height: 220 }]}
                  >
                    {/* Emoji grande taille style Flaticon */}
                    <View style={tw`items-center mb-4`}>
                      <View style={{
                        shadowColor: service.shadowColor,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.25,
                        shadowRadius: 12,
                        elevation: 10
                      }}>
                        <LinearGradient
                          colors={service.gradientColors}
                          style={tw`w-20 h-20 rounded-2xl items-center justify-center`}
                        >
                          <View style={tw`w-18 h-18 bg-white bg-opacity-60 rounded-xl items-center justify-center`}>
                            <Text style={tw`text-4xl`}>
                              {service.emoji}
                            </Text>
                          </View>
                        </LinearGradient>
                      </View>
                    </View>
                    
                    {/* Contenu centré avec meilleur espacement */}
                    <View style={tw`flex-1 items-center justify-center`}>
                      <Text style={[tw`text-gray-900 font-bold text-center mb-2`, { fontSize: 16 }]}>
                        {service.title}
                      </Text>
                      <Text style={[tw`text-green-600 font-semibold text-center mb-3`, { fontSize: 12 }]}>
                        {service.subtitle}
                      </Text>
                      <Text style={[tw`text-gray-500 text-center px-1`, { fontSize: 10, lineHeight: 14 }]}>
                        {service.description}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}