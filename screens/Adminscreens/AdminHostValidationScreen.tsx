import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Alert, 
  Image, 
  Dimensions,
  StatusBar,
  Modal 
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AdminHostValidationScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [pendingListings, setPendingListings] = useState([
    {
      id: 1,
      title: 'Chambre froide Almadies',
      host: 'Moussa Diop',
      hostAvatar: 'https://ui-avatars.com/api/?name=Moussa+Diop&background=10b981&color=fff&size=100',
      address: 'Almadies, Dakar',
      volume: '20 m³',
      tempRange: '0-4°C',
      price: '15,000 FCFA/jour',
      description: 'Chambre froide moderne avec système de surveillance température 24h/7j. Parfait pour produits périssables.',
      features: ['Surveillance 24h/7j', 'Système d\'alarme', 'Accès sécurisé', 'Générateur de secours'],
      images: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565814636149-4c552a2fc8ba?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      ],
      submittedAt: '2024-08-18',
      rating: 4.8,
      completedBookings: 23
    },
    {
      id: 2,
      title: 'Espace réfrigéré Plateau',
      host: 'Fatou Sow',
      hostAvatar: 'https://ui-avatars.com/api/?name=Fatou+Sow&background=3b82f6&color=fff&size=100',
      address: 'Plateau, Dakar',
      volume: '15 m³',
      tempRange: '-2-3°C',
      price: '12,000 FCFA/jour',
      description: 'Espace de stockage réfrigéré idéal pour restaurants et commerces alimentaires.',
      features: ['Contrôle température précis', 'Éclairage LED', 'Sol antidérapant', 'Ventilation optimale'],
      images: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1595246140406-4a2bd4e655e3?w=400&h=300&fit=crop'
      ],
      submittedAt: '2024-08-19',
      rating: 4.6,
      completedBookings: 18
    },
    {
      id: 3,
      title: 'Congélateur industriel Yoff',
      host: 'Mamadou Ba',
      hostAvatar: 'https://ui-avatars.com/api/?name=Mamadou+Ba&background=ef4444&color=fff&size=100',
      address: 'Yoff, Dakar',
      volume: '35 m³',
      tempRange: '-18-25°C',
      price: '25,000 FCFA/jour',
      description: 'Grand congélateur industriel pour produits surgelés. Capacité importante avec système de refroidissement rapide.',
      features: ['Congélation rapide', 'Système de sauvegarde', 'Alarme température', 'Accès 24h/24', 'Chargement facile'],
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop'
      ],
      submittedAt: '2024-08-20',
      rating: 4.9,
      completedBookings: 31
    },
  ]);

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleDecision = (id, decision) => {
    const listing = pendingListings.find(item => item.id === id);
    Alert.alert(
      `${decision === 'validate' ? 'Valider' : 'Rejeter'} l'annonce`,
      `${decision === 'validate' ? 'Valider' : 'Rejeter'} "${listing.title}" de ${listing.host} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: decision === 'validate' ? 'Valider' : 'Rejeter',
          style: decision === 'validate' ? 'default' : 'destructive',
          onPress: () => {
            setPendingListings(pendingListings.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const renderImageGallery = (images) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(image)}
            style={tw`mr-3`}
          >
            <Image
              source={{ uri: image }}
              style={[
                tw`rounded-lg`,
                { width: width * 0.4, height: 120 }
              ]}
              resizeMode="cover"
            />
            {index === 0 && (
              <View style={tw`absolute top-2 left-2 bg-green-600 px-2 py-1 rounded`}>
                <Text style={tw`text-white text-xs font-semibold`}>Principal</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderFeatures = (features) => {
    return (
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Équipements :</Text>
        {features.map((feature, index) => (
          <View key={index} style={tw`flex-row items-center mb-1`}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={tw`text-sm text-gray-600 ml-2`}>{feature}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View style={tw`bg-white px-4 py-4 shadow-sm`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-gray-800`}>Validation des annonces</Text>
          <View style={tw`w-6`} />
        </View>
        <Text style={tw`text-sm text-gray-500 text-center mt-1`}>
          {pendingListings.length} annonce{pendingListings.length > 1 ? 's' : ''} en attente
        </Text>
      </View>

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        {pendingListings.length === 0 ? (
          <View style={tw`items-center justify-center mt-20`}>
            <View style={tw`bg-green-100 p-6 rounded-full mb-4`}>
              <Ionicons name="checkmark-circle" size={64} color="#10B981" />
            </View>
            <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>Tout est à jour !</Text>
            <Text style={tw`text-gray-600 text-center`}>Aucune annonce en attente de validation</Text>
          </View>
        ) : (
          pendingListings.map(listing => (
            <View key={listing.id} style={tw`bg-white mb-6 rounded-2xl shadow-sm overflow-hidden`}>
              {/* Host Info Header */}
              <View style={tw`p-4 bg-gray-50 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={{ uri: listing.hostAvatar }}
                    style={tw`w-10 h-10 rounded-full mr-3`}
                  />
                  <View>
                    <Text style={tw`font-semibold text-gray-800`}>{listing.host}</Text>
                    <Text style={tw`text-xs text-gray-500`}>
                      ⭐ {listing.rating} • {listing.completedBookings} réservations
                    </Text>
                  </View>
                </View>
                <View style={tw`bg-orange-100 px-3 py-1 rounded-full`}>
                  <Text style={tw`text-orange-600 text-xs font-semibold`}>En attente</Text>
                </View>
              </View>

              <View style={tw`p-4`}>
                {/* Title and Price */}
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <Text style={tw`text-lg font-bold text-gray-800 flex-1 mr-2`}>
                    {listing.title}
                  </Text>
                  <Text style={tw`text-lg font-bold text-green-600`}>{listing.price}</Text>
                </View>

                {/* Location and Details */}
                <View style={tw`flex-row flex-wrap mb-4`}>
                  <View style={tw`flex-row items-center mr-4 mb-2`}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={tw`text-sm text-gray-600 ml-1`}>{listing.address}</Text>
                  </View>
                  <View style={tw`flex-row items-center mr-4 mb-2`}>
                    <Ionicons name="cube-outline" size={16} color="#6B7280" />
                    <Text style={tw`text-sm text-gray-600 ml-1`}>{listing.volume}</Text>
                  </View>
                  <View style={tw`flex-row items-center mb-2`}>
                    <Ionicons name="thermometer-outline" size={16} color="#6B7280" />
                    <Text style={tw`text-sm text-gray-600 ml-1`}>{listing.tempRange}</Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={tw`text-gray-700 mb-4 leading-5`}>{listing.description}</Text>

                {/* Images Gallery */}
                {renderImageGallery(listing.images)}

                {/* Features */}
                {renderFeatures(listing.features)}

                {/* Submission Date */}
                <View style={tw`flex-row items-center mb-4`}>
                  <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                  <Text style={tw`text-sm text-gray-600 ml-2`}>
                    Soumis le {new Date(listing.submittedAt).toLocaleDateString('fr-FR')}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={tw`flex-row justify-between mt-4 pt-4 border-t border-gray-100`}>
                  <TouchableOpacity
                    onPress={() => handleDecision(listing.id, 'reject')}
                    style={tw`bg-red-50 border border-red-200 px-6 py-3 rounded-xl w-[48%] items-center`}
                  >
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="close-circle" size={18} color="#EF4444" />
                      <Text style={tw`text-red-600 font-semibold ml-2`}>Rejeter</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleDecision(listing.id, 'validate')}
                    style={tw`bg-green-600 px-6 py-3 rounded-xl w-[48%] items-center shadow-sm`}
                  >
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="checkmark-circle" size={18} color="white" />
                      <Text style={tw`text-white font-semibold ml-2`}>Valider</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        
        <View style={tw`h-6`} />
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-90 justify-center items-center`}>
          <TouchableOpacity
            style={tw`absolute top-12 right-4 z-10`}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: width - 40, height: width - 40 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}