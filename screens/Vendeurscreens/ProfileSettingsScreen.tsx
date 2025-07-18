// screens/ProfileSettingsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Image,
  Alert,
  Modal,
  Switch
} from 'react-native';
import { router } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  avatar: string;
  verified: boolean;
  businessName: string;
  businessDescription: string;
  businessCategory: string;
  taxNumber: string;
  bankAccount: string;
  notifications: {
    orders: boolean;
    promotions: boolean;
    newsletter: boolean;
    stockAlerts: boolean;
  };
}

const ProfileSettingsScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Mamadou Seck',
    email: 'mamadou@example.com',
    phone: '+221 77 123 45 67',
    address: 'Rue 10, Médina',
    city: 'Dakar',
    avatar: 'M',
    verified: true,
    businessName: 'Poissonnerie Mamadou',
    businessDescription: 'Vente de poissons frais et fruits de mer de qualité depuis 10 ans',
    businessCategory: 'Alimentation - Poissons et fruits de mer',
    taxNumber: 'SN123456789',
    bankAccount: 'CB 1234 5678 9012 3456',
    notifications: {
      orders: true,
      promotions: true,
      newsletter: false,
      stockAlerts: true,
    }
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    Alert.alert('Succès', 'Votre profil a été mis à jour avec succès!');
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirmation(false);
    Alert.alert(
      'Compte supprimé', 
      'Votre compte a été supprimé. Vous allez être déconnecté.',
      [{ text: 'OK', onPress: () => router.replace('/login') }]
    );
  };

  const updateNotificationSetting = (key: keyof UserProfile['notifications'], value: boolean) => {
    setTempProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const profileImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face'
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={tw`mr-3`}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold`}>Modifier le profil</Text>
        </View>
        
        {isEditing ? (
          <View style={tw`flex-row`}>
            <TouchableOpacity 
              onPress={handleCancel}
              style={tw`px-3 py-2 mr-2`}
            >
              <Text style={tw`text-gray-600 font-medium`}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave}
              style={tw`bg-green-600 px-4 py-2 rounded-md`}
            >
              <Text style={tw`text-white font-medium`}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={() => setIsEditing(true)}
            style={tw`bg-green-600 px-4 py-2 rounded-md`}
          >
            <Text style={tw`text-white font-medium`}>Modifier</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={tw`items-center py-6 border-b border-gray-100`}>
          <TouchableOpacity 
            onPress={() => isEditing && setShowImagePicker(true)}
            style={tw`relative`}
          >
            {tempProfile.avatar.startsWith('http') ? (
              <Image 
                source={{ uri: tempProfile.avatar }} 
                style={tw`w-24 h-24 rounded-full`}
              />
            ) : (
              <View style={tw`w-24 h-24 bg-green-500 rounded-full items-center justify-center`}>
                <Text style={tw`text-white text-3xl font-bold`}>{tempProfile.avatar}</Text>
              </View>
            )}
            
            {isEditing && (
              <View style={tw`absolute bottom-0 right-0 bg-green-600 rounded-full p-2`}>
                <Ionicons name="camera" size={16} color="white" />
              </View>
            )}
          </TouchableOpacity>
          
          {profile.verified && (
            <View style={tw`flex-row items-center mt-3`}>
              <Ionicons name="checkmark-circle" size={20} color="green" />
              <Text style={tw`text-green-600 font-medium ml-2`}>Vendeur vérifié</Text>
            </View>
          )}
        </View>

        {/* Personal Information */}
        <View style={tw`px-4 py-4`}>
          <Text style={tw`text-lg font-bold mb-4`}>Informations personnelles</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Nom complet</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.name}
                onChangeText={(text) => setTempProfile(prev => ({...prev, name: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Entrez votre nom"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.name}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Email</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.email}
                onChangeText={(text) => setTempProfile(prev => ({...prev, email: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Entrez votre email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.email}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Téléphone</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.phone}
                onChangeText={(text) => setTempProfile(prev => ({...prev, phone: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Entrez votre numéro"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.phone}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Adresse</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.address}
                onChangeText={(text) => setTempProfile(prev => ({...prev, address: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Entrez votre adresse"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.address}</Text>
            )}
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Ville</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.city}
                onChangeText={(text) => setTempProfile(prev => ({...prev, city: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Entrez votre ville"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.city}</Text>
            )}
          </View>
        </View>

        {/* Business Information */}
        <View style={tw`px-4 py-4 border-t border-gray-100`}>
          <Text style={tw`text-lg font-bold mb-4`}>Informations commerciales</Text>
          
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Nom de l'entreprise</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.businessName}
                onChangeText={(text) => setTempProfile(prev => ({...prev, businessName: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Nom de votre entreprise"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.businessName}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Description</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.businessDescription}
                onChangeText={(text) => setTempProfile(prev => ({...prev, businessDescription: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Décrivez votre activité"
                multiline
                numberOfLines={3}
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.businessDescription}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Catégorie</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.businessCategory}
                onChangeText={(text) => setTempProfile(prev => ({...prev, businessCategory: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Catégorie d'activité"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.businessCategory}</Text>
            )}
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Numéro fiscal</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.taxNumber}
                onChangeText={(text) => setTempProfile(prev => ({...prev, taxNumber: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Numéro d'identification fiscale"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.taxNumber}</Text>
            )}
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 font-medium mb-2`}>Compte bancaire</Text>
            {isEditing ? (
              <TextInput
                value={tempProfile.bankAccount}
                onChangeText={(text) => setTempProfile(prev => ({...prev, bankAccount: text}))}
                style={tw`border border-gray-300 rounded-lg px-3 py-3 text-base`}
                placeholder="Numéro de compte bancaire"
              />
            ) : (
              <Text style={tw`text-gray-900 text-base py-3`}>{profile.bankAccount}</Text>
            )}
          </View>
        </View>

        {/* Notification Settings */}
        <View style={tw`px-4 py-4 border-t border-gray-100`}>
          <Text style={tw`text-lg font-bold mb-4`}>Préférences de notification</Text>
          
          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between items-center py-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-900 font-medium`}>Nouvelles commandes</Text>
                <Text style={tw`text-gray-600 text-sm`}>Recevoir des notifications pour les nouvelles commandes</Text>
              </View>
              <Switch
                value={tempProfile.notifications.orders}
                onValueChange={(value) => updateNotificationSetting('orders', value)}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={tempProfile.notifications.orders ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>

          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between items-center py-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-900 font-medium`}>Promotions</Text>
                <Text style={tw`text-gray-600 text-sm`}>Recevoir des offres promotionnelles</Text>
              </View>
              <Switch
                value={tempProfile.notifications.promotions}
                onValueChange={(value) => updateNotificationSetting('promotions', value)}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={tempProfile.notifications.promotions ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>

          <View style={tw`mb-4`}>
            <View style={tw`flex-row justify-between items-center py-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-900 font-medium`}>Newsletter</Text>
                <Text style={tw`text-gray-600 text-sm`}>Recevoir la newsletter hebdomadaire</Text>
              </View>
              <Switch
                value={tempProfile.notifications.newsletter}
                onValueChange={(value) => updateNotificationSetting('newsletter', value)}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={tempProfile.notifications.newsletter ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>

          <View style={tw`mb-6`}>
            <View style={tw`flex-row justify-between items-center py-3`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-900 font-medium`}>Alertes de stock</Text>
                <Text style={tw`text-gray-600 text-sm`}>Être prévenu quand le stock est faible</Text>
              </View>
              <Switch
                value={tempProfile.notifications.stockAlerts}
                onValueChange={(value) => updateNotificationSetting('stockAlerts', value)}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={tempProfile.notifications.stockAlerts ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={tw`px-4 py-4 border-t border-gray-100 mb-8`}>
          <Text style={tw`text-lg font-bold mb-4 text-red-600`}>Zone dangereuse</Text>
          
          <TouchableOpacity 
            onPress={handleDeleteAccount}
            style={tw`border border-red-300 rounded-lg p-4 flex-row items-center`}
          >
            <MaterialIcons name="delete-forever" size={24} color="#DC2626" />
            <View style={tw`ml-3 flex-1`}>
              <Text style={tw`text-red-600 font-medium`}>Supprimer le compte</Text>
              <Text style={tw`text-red-500 text-sm`}>Cette action est irréversible</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-6 mx-4 w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Choisir une photo</Text>
            
            <View style={tw`flex-row flex-wrap justify-between mb-4`}>
              {profileImages.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setTempProfile(prev => ({...prev, avatar: imageUrl}));
                    setShowImagePicker(false);
                  }}
                  style={tw`w-16 h-16 rounded-full mb-3`}
                >
                  <Image source={{ uri: imageUrl }} style={tw`w-16 h-16 rounded-full`} />
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              onPress={() => setShowImagePicker(false)}
              style={tw`bg-gray-500 px-4 py-3 rounded-lg`}
            >
              <Text style={tw`text-white text-center font-medium`}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-6 mx-4 w-80`}>
            <MaterialIcons name="warning" size={48} color="#DC2626" style={tw`self-center mb-4`} />
            <Text style={tw`text-lg font-bold mb-4 text-center`}>Supprimer le compte</Text>
            <Text style={tw`text-gray-600 mb-6 text-center`}>
              Êtes-vous absolument sûr ? Cette action supprimera définitivement votre compte, 
              tous vos produits et toutes vos données. Cette action ne peut pas être annulée.
            </Text>
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity 
                onPress={() => setShowDeleteConfirmation(false)}
                style={tw`px-4 py-2 mr-3`}
              >
                <Text style={tw`text-gray-600 font-medium`}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={confirmDeleteAccount}
                style={tw`bg-red-600 px-4 py-2 rounded-md`}
              >
                <Text style={tw`text-white font-medium`}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileSettingsScreen;