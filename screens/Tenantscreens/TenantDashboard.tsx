// screens/TenantDashboard.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

// Import des composants réutilisables
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

interface Reservation {
  id: number;
  title: string;
  location: string;
  dates: string;
  host: string;
  price: string;
  status: 'Actif' | 'Terminé' | 'Confirmé';
  rating?: string;
}

const TenantDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);

  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut

  // Données utilisateur spécifiques au locataire
  const userInfo: UserInfo = {
    name: 'Aïssatou Diallo',
    email: 'aissatou.diallo@example.com',
    avatar: 'A',
    verified: true
  };

  // Notifications spécifiques au locataire
  const tenantNotifications: Notification[] = [
    {
      id: 1,
      title: 'Réservation confirmée',
      message: 'Votre réservation pour l\'espace Almadies est confirmée',
      time: 'Il y a 1 heure',
      type: 'booking',
      read: false
    },
    {
      id: 2,
      title: 'Rappel de paiement',
      message: 'Votre paiement de 12 000 CFA est dû demain',
      time: 'Il y a 3 heures',
      type: 'payment',
      read: false
    },
    {
      id: 3,
      title: 'Température optimale',
      message: 'La température de votre espace est stable (4.2°C)',
      time: 'Il y a 5 heures',
      type: 'alert',
      read: true
    },
    {
      id: 4,
      title: 'Nouvel espace disponible',
      message: 'Un espace correspond à vos critères de recherche',
      time: 'Il y a 1 jour',
      type: 'view',
      read: true
    }
  ];

  const unreadNotifications: number = tenantNotifications.filter(n => !n.read).length;

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
    
  ];

  const reservations: Reservation[] = [
    {
      id: 1,
      title: 'Espace réfrigéré Almadies',
      location: 'Almadies, Dakar',
      dates: '15/06/2024 - 18/06/2024',
      host: 'Fatou Sall',
      price: '48 000 CFA',
      status: 'Actif'
    },
    {
      id: 2,
      title: 'Espace réfrigéré Almadies',
      location: 'Almadies, Dakar',
      dates: '15/06/2024 - 18/06/2024',
      host: 'Fatou Sall',
      price: '48 000 CFA',
      status: 'Terminé',
      rating: '⭐ 5/5'
    },
    {
      id: 3,
      title: 'Espace réfrigéré Almadies',
      location: 'Almadies, Dakar',
      dates: '15/06/2024 - 18/06/2024',
      host: 'Fatou Sall',
      price: '48 000 CFA',
      status: 'Confirmé'
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
    }
  };

  const handleLogout = (): void => {
    setProfileModalVisible(false);
    console.log('Déconnexion locataire...');
    // router.replace("/login");
  };

  const handleNavigateToSetting = (settingKey: SettingKey): void => {
    setProfileModalVisible(false);
    console.log(`Navigation locataire vers: ${settingKey}`);
    // router.push(`/settings/${settingKey}`);
  };

  const handleMarkAllNotificationsRead = (): void => {
    console.log('Marquer toutes les notifications locataire comme lues');
    // Logique pour marquer les notifications comme lues
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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Actif': return 'text-green-600';
      case 'Terminé': return 'text-gray-600';
      case 'Confirmé': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* En-tête */}
      <View style={tw`flex-row justify-between items-center px-4 pt-4 pb-2 bg-white`}>
        <Text style={tw`text-xl font-bold`}>Senfrais</Text>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}
          >
            <Text style={tw`text-sm mr-1`}>Locataire</Text>
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

      {/* Modal déroulant pour changer de rôle */}
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

      <ScrollView style={tw`px-4 pt-4`}>
        <View style={tw`bg-green-700 rounded-xl p-4 mb-6`}>
          <Text style={tw`text-white text-lg font-semibold mb-1`}>Bienvenue, Aïssatou !</Text>
          <Text style={tw`text-white mb-4`}>Trouvez l'espace frigorifique parfait pour vos besoins</Text>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={tw`bg-white px-4 py-2 rounded-md items-center`}
          >
            <Text style={tw`text-green-700 font-semibold`}>🔍 Rechercher un espace</Text>
          </TouchableOpacity>
        </View>

        {/* Statistiques */}
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="calendar" size={20} color="green" />
            <Text style={tw`text-sm mt-2`}>1</Text>
            <Text style={tw`text-xs text-gray-500`}>Locations actives</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="location" size={20} color="blue" />
            <Text style={tw`text-sm mt-2`}>3</Text>
            <Text style={tw`text-xs text-gray-500`}>Réservations</Text>
          </View>
          <View style={tw`w-[30%] bg-gray-50 p-3 rounded-xl items-center`}>
            <Ionicons name="star" size={20} color="purple" />
            <Text style={tw`text-sm mt-2`}>180 000 CFA</Text>
            <Text style={tw`text-xs text-gray-500 text-center`}>Dépenses</Text>
          </View>
        </View>

        {/* Location actuelle */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Location en cours</Text>
          <View style={tw`bg-white p-4 rounded-xl shadow-sm`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Chambre froide proche du Port</Text>
            <Text style={tw`text-xs text-gray-500 mb-1`}>Dakar, Sénégal</Text>
            <Text style={tw`text-xs text-gray-500 mb-1`}>📅 20/06/2024 - 23/06/2024</Text>
            <Text style={tw`text-xs text-gray-500 mb-3`}>👤 Hôte: Moussa Diagne</Text>

            <View style={tw`flex-row justify-between mb-3`}>
              <View style={tw`bg-blue-50 px-4 py-2 rounded-lg w-[48%]`}>
                <Text style={tw`text-xs text-gray-500`}>🌡️ Température</Text>
                <Text style={tw`text-sm font-bold text-blue-700`}>4.2°C</Text>
                <Text style={tw`text-xs text-green-500`}>Optimal</Text>
              </View>
              <View style={tw`bg-green-50 px-4 py-2 rounded-lg w-[48%]`}>
                <Text style={tw`text-xs text-gray-500`}>💧 Humidité</Text>
                <Text style={tw`text-sm font-bold text-green-700`}>65%</Text>
                <Text style={tw`text-xs text-green-500`}>Normal</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={tw`bg-gray-100 py-2 rounded-md items-center`}
              onPress={() => router.push("/chat")}
            >
              <Text style={tw`text-sm text-gray-700`}>Contacter l'hôte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Réservations */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-base font-semibold mb-2`}>Mes réservations</Text>
          {reservations.map((reservation) => (
            <View key={reservation.id} style={tw`bg-white p-4 rounded-xl shadow-sm mb-3`}>
              <Text style={tw`text-sm font-semibold mb-1`}>{reservation.title}</Text>
              <Text style={tw`text-xs text-gray-500`}>{reservation.location}</Text>
              <Text style={tw`text-xs text-gray-500`}>📅 {reservation.dates}</Text>
              <Text style={tw`text-xs text-gray-500 mb-1`}>👤 Hôte: {reservation.host}</Text>
              <View style={tw`flex-row justify-between items-center`}>
                <View>
                  <Text style={tw`text-xs ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </Text>
                  {reservation.rating && (
                    <Text style={tw`text-yellow-500 text-xs`}>{reservation.rating}</Text>
                  )}
                </View>
                <Text style={tw`text-sm font-bold`}>{reservation.price}</Text>
              </View>
              <TouchableOpacity 
                style={tw`mt-1`}
                onPress={() => router.push("/chat")}
              >
                <Text style={tw`text-blue-600 text-xs text-right`}>Contacter l'hôte</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recherches récentes */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-base font-semibold mb-2`}>Recherches récentes</Text>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={tw`bg-white p-4 rounded-xl shadow-sm mb-2 flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-sm font-semibold`}>📍 Dakar, Sénégal</Text>
                <Text style={tw`text-xs text-gray-500`}>20 - 23 juin 2024 · 10-15 m³</Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/search")}>
                <Text style={tw`text-blue-600 text-sm`}>Rechercher à nouveau</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

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
              {tenantNotifications.map((notification) => (
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
                style={tw`p-4 bg-green-600 rounded-lg`}
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
                <View style={tw`w-24 h-24 bg-green-600 rounded-full items-center justify-center mb-4`}>
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

      {/* NAVBAR */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="blue" />
          <Text style={tw`text-xs text-blue-600`}>Tableau</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => router.push("/monitoring")}
        >
          <Ionicons name="analytics" size={24} color="gray" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => router.push("/tenant-features")}
        >
          <Ionicons name="menu" size={24} color="gray" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TenantDashboard;