// screens/ExpediteurDashboard.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal, Animated } from 'react-native';
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

interface Statistic {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface Delivery {
  id: number;
  status: 'En transit' | 'Livré' | 'En attente';
  product: string;
  from: string;
  to: string;
  driver: string;
  price: string;
  arrival?: string;
  color: string;
}

const ExpediteurDashboardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);

  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut

  // Données utilisateur spécifiques à l'expéditeur
  const userInfo: UserInfo = {
    name: 'Aïssatou Ba',
    email: 'aissatou.ba@example.com',
    avatar: 'A',
    verified: true
  };

  // Notifications spécifiques à l'expéditeur
  const expediteurNotifications: Notification[] = [
    {
      id: 1,
      title: 'Livraison en cours',
      message: 'Votre colis arrive au Restaurant Le Baobab dans 15 minutes',
      time: 'Il y a 5 minutes',
      type: 'booking',
      read: false
    },
    {
      id: 2,
      title: 'Alerte température',
      message: 'Température optimale maintenue (-2°C) pendant le transport',
      time: 'Il y a 30 minutes',
      type: 'alert',
      read: false
    },
    {
      id: 3,
      title: 'Livraison terminée',
      message: 'Votre livraison vers Supermarché Auchan a été complétée',
      time: 'Il y a 2 heures',
      type: 'booking',
      read: true
    },
    {
      id: 4,
      title: 'Nouveau chauffeur disponible',
      message: 'Mamadou Diop est maintenant disponible pour vos livraisons',
      time: 'Il y a 4 heures',
      type: 'view',
      read: true
    },
    {
      id: 5,
      title: 'Paiement effectué',
      message: 'Paiement de 12 000 CFA pour votre dernière livraison',
      time: 'Il y a 1 jour',
      type: 'payment',
      read: true
    }
  ];

  const unreadNotifications: number = expediteurNotifications.filter(n => !n.read).length;

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
    { label: 'Client', icon: 'bag-outline' },
  ];

  const statistics: Statistic[] = [
    { label: 'En cours', value: 1, icon: 'car-outline', color: '#9333EA' },
    { label: 'Livrées', value: 1, icon: 'checkmark-circle-outline', color: '#16A34A' },
    { label: 'En attente', value: 1, icon: 'time-outline', color: '#CA8A04' },
    { label: 'Total dépensé', value: '27 000 CFA', icon: 'cube-outline', color: '#2563EB' },
  ];

  const deliveries: Delivery[] = [
    {
      id: 1,
      status: 'En transit',
      product: 'Produits surgelés',
      from: 'Marché Kermel, Dakar',
      to: 'Restaurant Le Baobab, Almadies',
      driver: 'Ousmane Sarr',
      price: '8 500 CFA',
      arrival: '14:30',
      color: '#9333EA'
    },
    {
      id: 2,
      status: 'Livré',
      product: 'Produits laitiers',
      from: 'Usine Laitière, Rufisque',
      to: 'Supermarché Auchan, VDN',
      driver: 'Aminata Fall',
      price: '12 000 CFA',
      arrival: '11:45',
      color: '#16A34A'
    },
    {
      id: 3,
      status: 'En attente',
      product: 'Fruits et légumes',
      from: 'Entrepôt Fruits, Thiaroye',
      to: 'Marché HLM, Dakar',
      driver: '—',
      price: '6 500 CFA',
      arrival: '',
      color: '#CA8A04'
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
    console.log('Déconnexion expéditeur...');
    // router.replace("/login");
  };

  const handleNavigateToSetting = (settingKey: SettingKey): void => {
    setProfileModalVisible(false);
    console.log(`Navigation expéditeur vers: ${settingKey}`);
    // router.push(`/settings/${settingKey}`);
  };

  const handleMarkAllNotificationsRead = (): void => {
    console.log('Marquer toutes les notifications expéditeur comme lues');
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

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4`}>
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)} 
              style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}
            >
              <Text style={tw`text-sm mr-1`}>Expéditeur</Text>
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

        {/* Vue bleu/vert de bienvenue */}
        <View style={[tw`rounded-xl p-5 mb-6`, { backgroundColor: '#2563EB' }]}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Aïssatou !</Text>
          <Text style={tw`text-white`}>Gérez vos livraisons réfrigérées en toute simplicité</Text>
          <TouchableOpacity
            style={tw`bg-white mt-4 px-4 py-2 rounded-md self-start`}
            onPress={() => router.push("/delivery-request")}
          >
            <Text style={{ color: '#2563EB', fontWeight: '600' }}>+ Nouvelle livraison</Text>
          </TouchableOpacity>
        </View>

        {/* Statistiques */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          {statistics.map((item, idx) => (
            <View key={idx} style={tw`w-1/2 p-2`}>
              <View style={tw`bg-gray-100 p-4 rounded-md`}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={tw`text-lg font-bold mt-2`}>{item.value}</Text>
                <Text style={tw`text-gray-600 text-sm`}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Livraison en cours */}
        <Text style={tw`text-lg font-semibold mb-2`}>Livraison en cours</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-4`}>
          <View style={tw`mb-2`}>
            <Text style={tw`font-semibold text-sm`}>📍 Collecte</Text>
            <Text style={tw`text-gray-600`}>Marché Kermel, Dakar</Text>
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`font-semibold text-sm`}>📦 Livraison</Text>
            <Text style={tw`text-gray-600`}>Restaurant Le Baobab, Almadies</Text>
            <Text style={{ color: '#2563EB', fontSize: 12, marginTop: 4 }}>
              Arrivée estimée: 14:30
            </Text>
          </View>
          <View style={tw`bg-blue-50 p-3 rounded-md mt-2`}>
            <Text style={{ fontSize: 12, color: '#2563EB' }}>Température</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1E3A8A' }}>-2°C</Text>
            <Text style={{ fontSize: 12, color: '#16A34A' }}>Optimal</Text>
          </View>
          <Text style={tw`text-xs text-gray-600 mt-2`}>Chauffeur: Ousmane Sarr</Text>
          <TouchableOpacity
            style={tw`bg-blue-600 py-2 rounded-md items-center mt-3`}
            onPress={() => router.push("/tracking")}
          >
            <Text style={tw`text-white font-medium`}>Suivi en temps réel</Text>
          </TouchableOpacity>
        </View>

        {/* Mes livraisons */}
        <Text style={tw`text-lg font-semibold mb-2`}>Mes livraisons</Text>
        {deliveries.map((item) => (
          <View key={item.id} style={tw`bg-gray-100 rounded-md p-4 mb-3`}>
            <Text style={tw`text-sm mb-1`}>
              <Text style={{ color: item.color }}>{item.status}</Text> • {item.product}
            </Text>
            <Text style={tw`text-xs text-gray-600`}>De: {item.from}</Text>
            <Text style={tw`text-xs text-gray-600`}>Vers: {item.to}</Text>
            <Text style={tw`text-xs text-gray-600`}>Chauffeur: {item.driver}</Text>
            <View style={tw`flex-row justify-between mt-2`}>
              <Text style={tw`font-bold`}>{item.price}</Text>
              {item.arrival ? (
                <Text style={{ color: '#2563EB', fontSize: 12 }}>
                  Arrivée: {item.arrival}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
        
        {/* Espacement pour le bottom navigation */}
        <View style={tw`h-4`} />
      </ScrollView>

      {/* Modal pour changer de rôle */}
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
              {expediteurNotifications.map((notification) => (
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
                style={[tw`p-4 rounded-lg`, { backgroundColor: '#2563EB' }]}
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
                <View style={[tw`w-24 h-24 rounded-full items-center justify-center mb-4`, { backgroundColor: '#2563EB' }]}>
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

      {/* Barre de navigation inférieure */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => router.push("/delivery-request")}
        >
          <Ionicons name="add-circle" size={24} color="black" />
          <Text style={{ fontSize: 12, color: 'black' }}>Livraison</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => router.push("/expediteur-features")}
        >
          <Ionicons name="menu" size={24} color="gray" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExpediteurDashboardScreen;