// screens/HostDashboardScreen.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Import des composants réutilisables avec types
import { 
  NotificationModal, 
  ProfileSettingsModal, 
  NotificationBadge,
  type Notification,
  type UserInfo,
  type SettingKey
} from '../../components';

interface Role {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface Annonce {
  title: string;
  location: string;
  price: string;
  reservations: number;
  occupancy: string;
  status: string;
  revenu: string;
}

const HostDashboardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  
  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut
  
  // Données utilisateur typées
  const userInfo: UserInfo = {
    name: 'Aïssatou Diop',
    email: 'aissatou@example.com',
    avatar: 'A',
    verified: true
  };

  // Notifications non lues
  const unreadNotifications: number = 2;

  // Statistiques des réservations (total inclut acceptées, en attente et rejetées)
  const reservationsAcceptees: number = 18;
  const reservationsEnAttente: number = 4;
  const reservationsRejetees: number = 2;
  const totalReservations: number = reservationsAcceptees + reservationsEnAttente + reservationsRejetees;

  // Notifications personnalisées pour ce dashboard
  const customNotifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle réservation',
      message: 'Votre chambre froide proche du Port a été réservée',
      time: 'Il y a 2 heures',
      type: 'booking',
      read: false
    },
    {
      id: 2,
      title: 'Alerte température',
      message: 'Température élevée détectée dans l\'espace Pikine (7°C)',
      time: 'Il y a 6 heures',
      type: 'alert',
      read: false
    }
  ];

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
    { label: 'Client', icon: 'bag-outline' },
  ];

  const annonces: Annonce[] = [
    {
      title: 'Chambre froide proche du Port',
      location: 'Dakar, Sénégal',
      price: '15 000 CFA/jour',
      reservations: 8,
      occupancy: '90%',
      status: 'Actif',
      revenu: '120 000 CFA'
    },
    {
      title: 'Espace réfrigéré Almadies',
      location: 'Almadies, Dakar',
      price: '12 000 CFA/jour',
      reservations: 12,
      occupancy: '75%',
      status: 'Actif',
      revenu: '144 000 CFA'
    },
    {
      title: 'Entrepôt frigorifique Pikine',
      location: 'Pikine, Dakar',
      price: '18 000 CFA/jour',
      reservations: 4,
      occupancy: '60%',
      status: 'En attente',
      revenu: '72 000 CFA'
    }
  ];

  const handleRoleNavigation = (role: string): void => {
    setModalVisible(false);
    switch (role) {
      case 'Hôte':
        router.replace("/host-dashboard");
        break;
      case 'Locataire':
        router.replace("/tenant-dashboard");
        break;
      case 'Expéditeur':
        router.replace("/expediteur-dashboard");
        break;
      case 'Chauffeur':
        router.replace("/chauffeur-dashboard");
        break;
      case 'Vendeur':
        router.replace("/vendeur-dashboard");
        break;
      case 'Client':
        router.replace("/customer-dashboard");
        break;  
    }
  };

  const handleLogout = (): void => {
    setProfileModalVisible(false);
    console.log('Déconnexion...');
    // router.replace("/login");
  };

  const handleNavigateToSetting = (settingKey: SettingKey): void => {
    setProfileModalVisible(false);
    console.log(`Navigation vers: ${settingKey}`);
    // Exemple: router.push(`/settings/${settingKey}`);
  };

  const handleMarkAllNotificationsRead = (): void => {
    console.log('Marquer toutes les notifications comme lues');
    // Logique pour marquer toutes les notifications comme lues
  };

  // Fonctions pour ouvrir/fermer les modals avec animation
  const openNotificationModal = (): void => {
    setNotificationModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeNotificationModal = (): void => {
    Animated.timing(slideAnim, {
      toValue: -1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setNotificationModalVisible(false);
    });
  };

  const openProfileModal = (): void => {
    setProfileModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeProfileModal = (): void => {
    Animated.timing(slideAnim, {
      toValue: -1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setProfileModalVisible(false);
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4`}>
        {/* Header with role switch, notification, and profile */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)} 
              style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}
            >
              <Text style={tw`text-sm mr-1`}>Hôte</Text>
              <Ionicons name="chevron-down" size={16} color="gray" />
            </TouchableOpacity>
            
            {/* Composant NotificationBadge réutilisable */}
            <NotificationBadge
              unreadCount={unreadNotifications}
              onPress={openNotificationModal}
              style={tw`mr-3`}
            />
            
            <TouchableOpacity onPress={openProfileModal}>
              <Ionicons name="person-circle" size={32} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Section with background */}
        <View style={tw`bg-blue-600 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Aïssatou !</Text>
          <Text style={tw`text-white`}>Gérez vos espaces frigorifiques et suivez vos performances</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/create-listing")}
          style={tw`bg-blue-600 rounded-md py-3 px-4 mb-6`}
        >
          <Text style={tw`text-white text-center font-semibold`}>+ Créer une nouvelle annonce</Text>
        </TouchableOpacity>

        {/* Statistics Grid */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <FontAwesome5 name="money-bill-wave" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>850 000 CFA</Text>
              <Text style={tw`text-gray-600 text-sm`}>Revenus totaux</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="albums-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>3</Text>
              <Text style={tw`text-gray-600 text-sm`}>Annonces actives</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="calendar-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>24</Text>
              <Text style={tw`text-gray-600 text-sm`}>Réservations</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="checkmark-circle-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>{reservationsAcceptees}/{totalReservations}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Acceptées</Text>
            </View>
          </View>
        </View>

        <Text style={tw`text-lg font-semibold mb-2`}>Mes annonces</Text>

        {annonces.map((annonce, index) => (
          <View key={index} style={tw`bg-gray-100 rounded-md p-4 mb-3`}>
            <View style={tw`flex-row justify-between items-center mb-1`}>
              <Text style={tw`text-base font-semibold`}>{annonce.title}</Text>
              <Text style={tw`text-sm`}>{annonce.revenu}</Text>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{annonce.location} - {annonce.price}</Text>
            <Text style={tw`text-sm text-gray-600`}>{annonce.reservations} réservations - {annonce.occupancy} d'occupation</Text>
            <Text style={tw`text-xs mt-1 ${annonce.status === 'Actif' ? 'text-green-600' : 'text-yellow-600'}`}>
              {annonce.status}
            </Text>
          </View>
        ))}

        <Text style={tw`text-lg font-semibold mt-6 mb-2`}>Activité récente</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>✅ Nouvelle réservation pour "Chambre froide proche du Port" (il y a 2 heures)</Text>
          <Text style={tw`text-sm mb-1`}>👁️ Votre annonce "Espace réfrigéré Almadies" a été vue 15 fois (il y a 4 heures)</Text>
          <Text style={tw`text-sm`}>⚠️ Alerte température pour l'espace Pikine (7°C détecté, il y a 6 heures)</Text>
        </View>
      </ScrollView>

      {/* Role Selection Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-30`}
          onPress={() => setModalVisible(false)}
        >
          <View style={tw`bg-white rounded-lg p-4 w-3/4`}>
            {roles.map((role, i) => (
              <TouchableOpacity
                key={i}
                style={tw`flex-row items-center py-2`}
                onPress={() => handleRoleNavigation(role.label)}
              >
                <Ionicons name={role.icon} size={20} color="gray" style={tw`mr-2`} />
                <Text>{role.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de notification plein écran qui glisse du haut vers le bas */}
      <Modal
        visible={notificationModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeNotificationModal}
      >
        <Animated.View 
          style={[
            tw`flex-1 bg-white`,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <SafeAreaView style={tw`flex-1`}>
            <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
              <Text style={tw`text-xl font-bold`}>Notifications</Text>
              <TouchableOpacity onPress={closeNotificationModal}>
                <Ionicons name="close" size={28} color="gray" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={tw`flex-1 px-4`}>
              {customNotifications.map((notification) => (
                <View key={notification.id} style={tw`border-b border-gray-200 py-4`}>
                  <View style={tw`flex-row justify-between items-start`}>
                    <View style={tw`flex-1`}>
                      <Text style={tw`font-semibold text-lg`}>{notification.title}</Text>
                      <Text style={tw`text-gray-600 text-base mt-2`}>{notification.message}</Text>
                      <Text style={tw`text-gray-400 text-sm mt-2`}>{notification.time}</Text>
                    </View>
                    {!notification.read && (
                      <View style={tw`w-3 h-3 bg-blue-500 rounded-full ml-3 mt-1`} />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <View style={tw`p-4 border-t border-gray-200`}>
              <TouchableOpacity
                style={tw`p-4 bg-blue-500 rounded-lg`}
                onPress={handleMarkAllNotificationsRead}
              >
                <Text style={tw`text-white text-center font-semibold text-lg`}>Marquer tout comme lu</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>

      {/* Modal de profil plein écran qui glisse du haut vers le bas */}
      <Modal
        visible={profileModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeProfileModal}
      >
        <Animated.View 
          style={[
            tw`flex-1 bg-white`,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <SafeAreaView style={tw`flex-1`}>
            <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
              <Text style={tw`text-xl font-bold`}>Profil</Text>
              <TouchableOpacity onPress={closeProfileModal}>
                <Ionicons name="close" size={28} color="gray" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={tw`flex-1 px-4 pt-6`}>
              {/* Informations utilisateur */}
              <View style={tw`items-center mb-8`}>
                <View style={tw`w-24 h-24 bg-blue-500 rounded-full items-center justify-center mb-4`}>
                  <Text style={tw`text-white text-3xl font-bold`}>{userInfo.avatar}</Text>
                </View>
                <Text style={tw`text-2xl font-semibold mb-1`}>{userInfo.name}</Text>
                <Text style={tw`text-gray-600 text-lg`}>{userInfo.email}</Text>
                {userInfo.verified && (
                  <View style={tw`flex-row items-center mt-2`}>
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                    <Text style={tw`text-green-600 text-base ml-2`}>Compte vérifié</Text>
                  </View>
                )}
              </View>
              
              {/* Options du menu */}
              <View style={tw`mt-4`}>
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('profile')}
                >
                  <Ionicons name="person-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Modifier le profil</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('settings')}
                >
                  <Ionicons name="settings-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Paramètres</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('help')}
                >
                  <Ionicons name="help-circle-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Aide et support</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 mt-6`}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={24} color="red" style={tw`mr-4`} />
                  <Text style={tw`text-lg text-red-600`}>Déconnexion</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </Modal>

      {/* Bottom Navbar */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`items-center`} onPress={() => router.push("/monitoring")}>
          <Ionicons name="analytics" size={24} color="black" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`items-center`} onPress={() => router.push("/host-features")}>
          <Ionicons name="ellipsis-horizontal-circle" size={24} color="black" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HostDashboardScreen;