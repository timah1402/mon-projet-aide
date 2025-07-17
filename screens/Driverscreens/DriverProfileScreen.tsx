// screens/DriverProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { router } from 'expo-router';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
}

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  deliveryLocation: string;
}

interface VehicleInfo {
  type: string;
  model: string;
  plate: string;
  specializations: string[];
}

const DriverProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'badges'>('reviews');

  // Données du profil chauffeur
  const driverProfile = {
    name: 'Ibrahim Ba',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    totalMissions: 247,
    responseTime: '2 min',
    completionRate: '95%',
    phone: '+221 77 123 45 67',
    email: 'ibrahim.ba@email.com',
    address: 'Almadies, Dakar',
    memberSince: 'Mars 2024',
    verified: true
  };

  const vehicleInfo: VehicleInfo = {
    type: 'Moto',
    model: 'Yamaha XTZ 125',
    plate: 'DK-1234-AB',
    specializations: ['Produits surgelés', 'Livraisons express', 'Produits fragiles']
  };

  const badges: Badge[] = [
    {
      id: '1',
      title: 'Chauffeur du mois',
      description: 'Mai 2025',
      icon: '🏆',
      color: '#F59E0B',
      earned: true
    },
    {
      id: '2',
      title: '100 livraisons',
      description: 'Atteint en avril 2025',
      icon: '💯',
      color: '#10B981',
      earned: true
    },
    {
      id: '3',
      title: 'Note parfaite',
      description: '50 avis 5 étoiles',
      icon: '⭐',
      color: '#F59E0B',
      earned: true
    },
    {
      id: '4',
      title: 'Ponctualité',
      description: '98% de livraisons à l\'heure',
      icon: '⏰',
      color: '#3B82F6',
      earned: true
    },
    {
      id: '5',
      title: 'Expert température',
      description: 'Aucune rupture de chaîne froide',
      icon: '🌡️',
      color: '#06B6D4',
      earned: false
    },
    {
      id: '6',
      title: 'Fidélité client',
      description: '20+ clients réguliers',
      icon: '❤️',
      color: '#EF4444',
      earned: false
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      clientName: 'Fatou Ndiaye',
      rating: 5,
      comment: 'Excellent chauffeur, très professionnel et ponctuel. Produits livrés en parfait état.',
      date: '22 juin 2025',
      deliveryLocation: 'Livraison Supermarché Auchan'
    },
    {
      id: '2',
      clientName: 'Amadou Seck',
      rating: 5,
      comment: 'Service impeccable ! Ibrahim est très respectueux et soigneux avec les produits.',
      date: '20 juin 2025',
      deliveryLocation: 'Livraison Restaurant Le Baobab'
    },
    {
      id: '3',
      clientName: 'Aïssatou Diallo',
      rating: 4,
      comment: 'Bonne livraison, chauffeur sympathique. Juste un petit retard mais bien géré.',
      date: '18 juin 2025',
      deliveryLocation: 'Livraison Pharmacie Dakar'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color={index < rating ? '#F59E0B' : '#D1D5DB'}
      />
    ));
  };

  const renderStatCard = (icon: string, value: string, label: string, color: string) => (
    <View style={tw`bg-white p-4 rounded-xl shadow-sm items-center flex-1 mx-1`}>
      <Text style={{ fontSize: 20, marginBottom: 4 }}>{icon}</Text>
      <Text style={[tw`text-lg font-bold`, { color }]}>{value}</Text>
      <Text style={tw`text-xs text-gray-600 text-center`}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between p-4 bg-white`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mon profil chauffeur</Text>
        <TouchableOpacity onPress={() => router.push('/edit-profile')}>
          <Ionicons name="settings-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Section profil principal */}
        <View style={tw`bg-white p-6 items-center`}>
          <View style={tw`relative mb-4`}>
            <Image
              source={{ uri: driverProfile.photo }}
              style={tw`w-24 h-24 rounded-full`}
            />
            {driverProfile.verified && (
              <View style={tw`absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1`}>
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
            )}
          </View>
          
          <Text style={tw`text-xl font-bold text-gray-800 mb-1`}>{driverProfile.name}</Text>
          <View style={tw`flex-row items-center mb-2`}>
            {renderStars(Math.floor(driverProfile.rating))}
            <Text style={tw`ml-2 text-sm text-gray-600`}>({driverProfile.rating})</Text>
          </View>
          <Text style={tw`text-sm text-gray-600 mb-4`}>{driverProfile.totalMissions} missions complétées</Text>

          <TouchableOpacity
            style={tw`bg-yellow-500 px-6 py-2 rounded-full`}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={tw`text-white font-medium`}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Statistiques */}
        <View style={tw`px-4 py-4`}>
          <View style={tw`flex-row justify-between`}>
            {renderStatCard('📊', driverProfile.totalMissions.toString(), 'Missions\ncomplétées', '#3B82F6')}
            {renderStatCard('⭐', driverProfile.rating.toString(), 'Note\nmoyenne', '#F59E0B')}
            {renderStatCard('⏱️', driverProfile.responseTime, 'Temps de\nréponse', '#10B981')}
            {renderStatCard('✅', driverProfile.completionRate, 'Taux\nd\'acceptation', '#8B5CF6')}
          </View>
        </View>

        {/* Informations de contact */}
        <View style={tw`bg-white mx-4 p-4 rounded-xl shadow-sm mb-4`}>
          <Text style={tw`text-base font-semibold mb-3`}>Informations de contact</Text>
          <View style={tw`space-y-2`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="call-outline" size={18} color="#6B7280" style={tw`mr-3`} />
              <Text style={tw`text-gray-700`}>{driverProfile.phone}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="mail-outline" size={18} color="#6B7280" style={tw`mr-3`} />
              <Text style={tw`text-gray-700`}>{driverProfile.email}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="location-outline" size={18} color="#6B7280" style={tw`mr-3`} />
              <Text style={tw`text-gray-700`}>{driverProfile.address}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" style={tw`mr-3`} />
              <Text style={tw`text-gray-700`}>Membre depuis {driverProfile.memberSince}</Text>
            </View>
          </View>
        </View>

        {/* Informations véhicule */}
        <View style={tw`bg-white mx-4 p-4 rounded-xl shadow-sm mb-4`}>
          <Text style={tw`text-base font-semibold mb-3`}>Informations véhicule</Text>
          <View style={tw`space-y-2`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Type:</Text>
              <Text style={tw`font-medium`}>{vehicleInfo.type}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Modèle:</Text>
              <Text style={tw`font-medium`}>{vehicleInfo.model}</Text>
            </View>
            <View style={tw`flex-row justify-between mb-3`}>
              <Text style={tw`text-gray-600`}>Plaque:</Text>
              <Text style={tw`font-medium`}>{vehicleInfo.plate}</Text>
            </View>
            
            <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>Spécialisations</Text>
            <View style={tw`flex-row flex-wrap`}>
              {vehicleInfo.specializations.map((spec, index) => (
                <View key={index} style={tw`bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2`}>
                  <Text style={tw`text-blue-700 text-xs`}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Onglets Récompenses & Avis */}
        <View style={tw`bg-white mx-4 rounded-xl shadow-sm mb-6`}>
          <View style={tw`flex-row border-b border-gray-200`}>
            <TouchableOpacity
              style={[
                tw`flex-1 py-3 items-center`,
                activeTab === 'badges' && tw`border-b-2 border-yellow-500`
              ]}
              onPress={() => setActiveTab('badges')}
            >
              <Text style={[
                tw`font-medium`,
                activeTab === 'badges' ? tw`text-yellow-500` : tw`text-gray-600`
              ]}>
                Récompenses & Badges
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`flex-1 py-3 items-center`,
                activeTab === 'reviews' && tw`border-b-2 border-yellow-500`
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[
                tw`font-medium`,
                activeTab === 'reviews' ? tw`text-yellow-500` : tw`text-gray-600`
              ]}>
                Avis récents
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`p-4`}>
            {activeTab === 'badges' ? (
              <View>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                  <Text style={tw`text-sm text-gray-600`}>
                    {badges.filter(b => b.earned).length} sur {badges.length} badges obtenus
                  </Text>
                  <TouchableOpacity>
                    <Text style={tw`text-yellow-500 text-sm`}>Voir tous les badges</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={tw`flex-row flex-wrap`}>
                  {badges.map((badge) => (
                    <View key={badge.id} style={tw`w-1/2 p-2`}>
                      <View style={[
                        tw`p-3 rounded-lg border-2`,
                        badge.earned ? tw`bg-white` : tw`bg-gray-50`,
                        { borderColor: badge.earned ? badge.color : '#E5E7EB' }
                      ]}>
                        <Text style={tw`text-2xl mb-2`}>{badge.icon}</Text>
                        <Text style={[
                          tw`font-semibold text-sm mb-1`,
                          { color: badge.earned ? badge.color : '#9CA3AF' }
                        ]}>
                          {badge.title}
                        </Text>
                        <Text style={tw`text-xs text-gray-600`}>
                          {badge.description}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                  <Text style={tw`text-sm text-gray-600`}>
                    Derniers avis clients
                  </Text>
                  <TouchableOpacity>
                    <Text style={tw`text-yellow-500 text-sm`}>Voir tous les avis</Text>
                  </TouchableOpacity>
                </View>

                {reviews.map((review) => (
                  <View key={review.id} style={tw`mb-4 p-3 bg-gray-50 rounded-lg`}>
                    <View style={tw`flex-row items-center mb-2`}>
                      <View style={tw`w-8 h-8 bg-yellow-500 rounded-full items-center justify-center mr-3`}>
                        <Text style={tw`text-white font-bold text-sm`}>
                          {review.clientName.charAt(0)}
                        </Text>
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`font-medium text-sm`}>{review.clientName}</Text>
                        <Text style={tw`text-xs text-gray-600`}>{review.date}</Text>
                      </View>
                      <View style={tw`flex-row`}>
                        {renderStars(review.rating)}
                      </View>
                    </View>
                    <Text style={tw`text-sm text-gray-700 mb-2`}>{review.comment}</Text>
                    <Text style={tw`text-xs text-blue-600`}>{review.deliveryLocation}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverProfileScreen;