// screens/DriverDashboard.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

// Import des composants réutilisables
import { 
  NotificationModal, 
  NotificationBadge,
  type Notification,
  type UserInfo,
  type SettingKey
} from '../../components';
// Import direct du CustomToggleSwitch et DriverProfileSettingsModal
import CustomToggleSwitch from '../../components/CustomToggleSwitchProps';
import DriverProfileSettingsModal from '../../components/DriverProfileSettingsModal';

interface Role {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface Step {
  label: string;
  checked: boolean;
}

interface Statistic {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const DriverDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [enLigne, setEnLigne] = useState<boolean>(true);

  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut

  // Données utilisateur spécifiques au chauffeur
  const userInfo: UserInfo = {
    name: 'Ousmane Sarr',
    email: 'ousmane.sarr@example.com',
    avatar: 'O',
    verified: true,
    rating: 4.8,
    totalMissions: 247
  };

  // Notifications spécifiques au chauffeur
  const driverNotifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle mission assignée',
      message: 'Livraison de produits surgelés vers Restaurant Le Baobab',
      time: 'Il y a 10 minutes',
      type: 'booking',
      read: false
    },
    {
      id: 2,
      title: 'Alerte température critique',
      message: 'Température élevée détectée: -1°C (seuil: -2°C)',
      time: 'Il y a 30 minutes',
      type: 'alert',
      read: false
    },
    {
      id: 3,
      title: 'Mission terminée',
      message: 'Livraison vers Supermarché Auchan complétée avec succès',
      time: 'Il y a 1 heure',
      type: 'booking',
      read: false
    },
    {
      id: 4,
      title: 'Paiement reçu',
      message: 'Paiement de 5 000 CFA pour votre dernière livraison',
      time: 'Il y a 2 heures',
      type: 'payment',
      read: true
    },
    {
      id: 5,
      title: 'Nouveau client évalué',
      message: 'Aïssatou Diallo vous a donné 5 étoiles',
      time: 'Il y a 3 heures',
      type: 'view',
      read: true
    }
  ];

  const unreadNotifications: number = driverNotifications.filter(n => !n.read).length;

  const [steps, setSteps] = useState<Step[]>([
    { label: 'Mission acceptée', checked: true },
    { label: 'En route vers le point de collecte', checked: false },
    { label: 'Scanner le QR code du colis', checked: false },
    { label: 'En route vers la destination', checked: false },
    { label: 'Prendre une photo et saisir le code OTP', checked: false },
  ]);

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
  ];

  const statistics: Statistic[] = [
    { label: 'Livraisons du jour', value: 3, icon: 'calendar-outline', color: '#0284C7' },
    { label: 'Alertes température', value: 1, icon: 'warning-outline', color: '#DC2626' },
    { label: "Gains aujourd'hui", value: "15 000 FCFA", icon: 'card-outline', color: '#0284C7' },
    { label: "Total gains", value: "340 000 FCFA", icon: 'wallet-outline', color: '#16A34A' },
  ];

  const toggleStep = (index: number): void => {
    setSteps((prev) => {
      const newSteps = [...prev];
      const firstUncheckedIndex = newSteps.findIndex(step => !step.checked);

      if (index === firstUncheckedIndex) {
        newSteps[index].checked = true;
      } else {
        Alert.alert("Ordre des étapes", "Vous devez suivre les étapes dans l'ordre.");
      }

      return newSteps;
    });
  };

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
    console.log('Déconnexion chauffeur...');
    // router.replace("/login");
  };

  const handleNavigateToSetting = (settingKey: SettingKey | string): void => {
    setProfileModalVisible(false);
    
    // Navigation spéciale pour le profil complet
    if (settingKey === 'personal-info') {
      router.push('/driver-profile');
      return;
    }
    
    // Navigation vers documents & validation
    if (settingKey === 'documents-validation') {
      router.push('/driver-documents');
      return;
    }
    
    console.log(`Navigation chauffeur vers: ${settingKey}`);
    // router.push(`/settings/${settingKey}`);
  };

  const handleMarkAllNotificationsRead = (): void => {
    console.log('Marquer toutes les notifications chauffeur comme lues');
    // Logique pour marquer les notifications comme lues
  };

  const toggleOnlineStatus = (): void => {
    setEnLigne(!enLigne);
    // Logique pour mettre à jour le statut en ligne/hors ligne
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
        {/* En-tête */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-xl font-bold`}>Senfrais</Text>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)} 
              style={tw`mr-4 bg-gray-200 px-2 py-1 rounded flex-row items-center`}
            >
              <Text style={tw`text-sm mr-1`}>Chauffeur</Text>
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

        {/* Section bienvenue */}
        <View style={tw`bg-yellow-500 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Ousmane !</Text>
          <Text style={tw`text-white`}>Suivez vos livraisons et températures en temps réel</Text>
          <View style={tw`flex-row items-center justify-end mt-4`}>
            <CustomToggleSwitch
              isOn={enLigne}
              onToggle={toggleOnlineStatus}
              onColor="#10B981"  // Vert pour en ligne
              offColor="#EF4444" // Rouge pour hors ligne
              size="large"
              showLabels={true}
              onLabel="EN LIGNE"
              offLabel="HORS LIGNE"
            />
          </View>
        </View>

        {/* Statistiques */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-semibold`}>Statistiques & Gains</Text>
            <TouchableOpacity onPress={() => router.push("/driver-earnings")}>
              <Text style={tw`text-yellow-500 text-sm`}>Voir historique</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {statistics.map((item, idx) => (
              <View key={idx} style={tw`w-1/2 p-2`}>
                <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                  <Text style={tw`text-lg font-bold mt-1`}>{item.value}</Text>
                  <Text style={tw`text-gray-600 text-sm text-center`}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Livraison assignée */}
        <Text style={tw`text-lg font-semibold mb-2`}>Ma livraison actuelle</Text>
        <View style={tw`bg-gray-100 p-4 rounded-md mb-4`}>
          <Text style={tw`text-sm text-gray-700 mb-1`}>🛻 Produits surgelés</Text>
          <Text style={tw`text-xs text-gray-600`}>Collecte: Marché Kermel, Dakar</Text>
          <Text style={tw`text-xs text-gray-600`}>Destination: Restaurant Le Baobab, Almadies</Text>
          <Text style={tw`text-xs text-gray-600`}>Client: Aïssatou Diallo</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <Text style={tw`text-xs text-gray-600`}>Température actuelle: </Text>
            <Text style={tw`text-xs font-semibold text-blue-600`}>-2°C</Text>
            <Ionicons name="thermometer" size={12} color="#2563EB" style={tw`ml-1`} />
          </View>

          <View style={tw`mt-4`}>
            <Text style={tw`text-xs text-gray-500 mb-2`}>Suivi de mission :</Text>
            {steps.map((step, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleStep(index)}
                disabled={step.checked}
                style={tw`flex-row items-center mb-2`}
              >
                <Ionicons
                  name={step.checked ? 'checkbox-outline' : 'square-outline'}
                  size={20}
                  color={step.checked ? '#16a34a' : '#9ca3af'}
                  style={tw`mr-2`}
                />
                <Text style={tw`text-sm ${step.checked ? 'text-green-600' : 'text-gray-700'}`}>
                  {step.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={tw`mt-4 bg-yellow-500 py-2 px-3 rounded-md self-start`}
            onPress={() => router.push("/tracking")}
          >
            <Text style={tw`text-white text-sm font-medium`}>Continuer la mission</Text>
          </TouchableOpacity>
        </View>

        {/* Activité récente */}
        <Text style={tw`text-lg font-semibold mb-2`}>Activité récente</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>
            ✅ Livraison complétée pour "Supermarché Auchan" (il y a 1h)
          </Text>
          <Text style={tw`text-sm mb-1`}>
            ⚠️ Alerte température détectée sur "Produits laitiers" (il y a 3h)
          </Text>
          <Text style={tw`text-sm`}>
            📦 Nouvelle mission assignée pour "Produits surgelés" (il y a 5h)
          </Text>
        </View>
        
        {/* Espacement pour le bottom navigation */}
        <View style={tw`h-4`} />
      </ScrollView>

      {/* Modal rôle */}
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
              {driverNotifications.map((notification) => (
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
                style={tw`p-4 bg-yellow-500 rounded-lg`}
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
                <View style={tw`w-24 h-24 bg-yellow-500 rounded-full items-center justify-center mb-4`}>
                  <Text style={tw`text-white text-3xl font-bold`}>{userInfo.avatar}</Text>
                </View>
                <Text style={tw`text-2xl font-semibold mb-1`}>{userInfo.name}</Text>
                <Text style={tw`text-gray-600 text-lg`}>{userInfo.email}</Text>
                
                {/* Informations spécifiques au chauffeur */}
                <View style={tw`flex-row items-center mt-2`}>
                  {userInfo.verified && (
                    <View style={tw`flex-row items-center mr-4`}>
                      <Ionicons name="checkmark-circle" size={20} color="green" />
                      <Text style={tw`text-green-600 text-base ml-2`}>Vérifié</Text>
                    </View>
                  )}
                  {userInfo.rating && (
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="star" size={20} color="#facc15" />
                      <Text style={tw`text-gray-700 text-base ml-1`}>{userInfo.rating}</Text>
                    </View>
                  )}
                </View>
                
                {userInfo.totalMissions && (
                  <Text style={tw`text-gray-500 text-sm mt-1`}>
                    {userInfo.totalMissions} missions complétées
                  </Text>
                )}
              </View>
              
              {/* Options du menu */}
              <View style={tw`mt-4`}>
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('personal-info')}
                >
                  <Ionicons name="person-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Profil complet</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('documents-validation')}
                >
                  <Ionicons name="document-text-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Documents & Validation</Text>
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

      {/* Bottom Nav */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => router.push("/tracking")}
        >
          <Ionicons name="navigate" size={24} color="#facc15" />
          <Text style={tw`text-xs text-yellow-500`}>Suivi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={tw`items-center`}
          onPress={() => router.push("/driver-features")}
        >
          <Ionicons name="menu-outline" size={24} color="black" />
          <Text style={tw`text-xs`}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DriverDashboard;