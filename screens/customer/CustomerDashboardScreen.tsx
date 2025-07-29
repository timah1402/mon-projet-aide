// screens/CustomerDashboardScreen.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

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

interface Commande {
  id: string;
  vendeurNom: string;
  produits: string[];
  montantTotal: number;
  statut: 'En préparation' | 'Prête' | 'En livraison' | 'Livrée' | 'Annulée';
  dateCommande: string;
  dateLivraison?: string;
  modeLivraison: 'Retrait' | 'Livraison';
}

interface ProduitFavori {
  id: string;
  nom: string;
  vendeur: string;
  prix: number;
  photo: string;
  disponible: boolean;
}

const CustomerDashboardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('accueil');
  
  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000));
  
  // Données utilisateur typées
  const userInfo: UserInfo = {
    name: 'Aminata Diop',
    email: 'aminata@example.com',
    avatar: 'A',
    verified: true
  };

  // Notifications non lues
  const unreadNotifications: number = 2;

  // Notifications personnalisées pour le customer
  const customNotifications: Notification[] = [
    {
      id: 1,
      title: 'Commande prête',
      message: 'Votre commande de poisson chez Mamadou est prête pour le retrait',
      time: 'Il y a 30 minutes',
      type: 'order',
      read: false
    },
    {
      id: 2,
      title: 'Nouvelle offre',
      message: 'Crevettes fraîches à prix réduit chez votre vendeur favori',
      time: 'Il y a 2 heures',
      type: 'promotion',
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

  const commandesRecentes: Commande[] = [
    {
      id: 'cmd_001',
      vendeurNom: 'Mamadou Seck',
      produits: ['Poisson frais (2kg)', 'Crevettes (1kg)'],
      montantTotal: 13000,
      statut: 'Prête',
      dateCommande: '2025-01-20',
      modeLivraison: 'Retrait'
    },
    {
      id: 'cmd_002',
      vendeurNom: 'Fatou Ba',
      produits: ['Légumes bio (3kg)', 'Fruits tropicaux (2kg)'],
      montantTotal: 7200,
      statut: 'En livraison',
      dateCommande: '2025-01-19',
      dateLivraison: '2025-01-20',
      modeLivraison: 'Livraison'
    },
    {
      id: 'cmd_003',
      vendeurNom: 'Ousmane Diallo',
      produits: ['Mangues (5kg)'],
      montantTotal: 4500,
      statut: 'Livrée',
      dateCommande: '2025-01-18',
      dateLivraison: '2025-01-18',
      modeLivraison: 'Livraison'
    }
  ];

  const produitsFavoris: ProduitFavori[] = [
    {
      id: 'fav_001',
      nom: 'Poisson frais (Thiof)',
      vendeur: 'Mamadou Seck',
      prix: 2500,
      photo: 'https://example.com/thiof.jpg',
      disponible: true
    },
    {
      id: 'fav_002',
      nom: 'Légumes bio mélangés',
      vendeur: 'Fatou Ba',
      prix: 1200,
      photo: 'https://example.com/legumes.jpg',
      disponible: true
    },
    {
      id: 'fav_003',
      nom: 'Crevettes roses',
      vendeur: 'Mamadou Seck',
      prix: 8000,
      photo: 'https://example.com/crevettes.jpg',
      disponible: false
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
    
    switch (settingKey) {
      case 'profile':
        router.push('/profile-settings');
        break;
      case 'orders':
        router.push('/customer-orders');
        break;
      case 'favorites':
        router.push('/customer-favorites');
        break;
      case 'addresses':
        router.push('/customer-addresses');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'help':
        router.push('/help-support');
        break;
      default:
        router.push(`/settings/${settingKey}`);
    }
  };

  const handleMarkAllNotificationsRead = (): void => {
    console.log('Marquer toutes les notifications comme lues');
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

  const getStatutColor = (statut: string): string => {
    switch (statut) {
      case 'Livrée':
        return 'text-green-600';
      case 'En préparation':
        return 'text-orange-600';
      case 'Prête':
        return 'text-blue-600';
      case 'En livraison':
        return 'text-purple-600';
      case 'Annulée':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Fonction pour gérer la navigation de la bottom navbar
  const handleNavigation = (page: string, route?: string): void => {
    setCurrentPage(page);
    if (route) {
      router.push(route);
    }
  };

  // Fonction pour obtenir la couleur de l'icône selon la page active
  const getIconColor = (page: string): string => {
    return currentPage === page ? '#10B981' : '#374151';
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
              <Text style={tw`text-sm mr-1`}>Client</Text>
              <Ionicons name="chevron-down" size={16} color="gray" />
            </TouchableOpacity>
            
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

        {/* Welcome Section - Style similaire au vendeur dashboard */}
        <View style={tw`bg-green-600 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Aminata !</Text>
          <Text style={tw`text-white`}>Découvrez les meilleurs produits frais près de chez vous</Text>
        </View>

        {/* Bouton principal - Style similaire au vendeur dashboard */}
        <TouchableOpacity
          onPress={() => router.push("/marketplace")}
          style={tw`bg-green-600 rounded-md py-3 px-4 mb-6`}
        >
          <Text style={tw`text-white text-center font-semibold`}>🛒 Explorer la marketplace</Text>
        </TouchableOpacity>

        {/* Statistics Grid - Style identique au vendeur dashboard */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <FontAwesome5 name="shopping-cart" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>12</Text>
              <Text style={tw`text-gray-600 text-sm`}>Commandes totales</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <MaterialIcons name="favorite" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>3</Text>
              <Text style={tw`text-gray-600 text-sm`}>Produits favoris</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <TouchableOpacity 
              onPress={() => handleNavigation('commandes', '/customer-orders')}
              style={tw`bg-gray-100 p-4 rounded-md items-center`}
            >
              <FontAwesome5 name="coins" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>24.7k CFA</Text>
              <Text style={tw`text-gray-600 text-sm`}>Total dépensé</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="people-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>5</Text>
              <Text style={tw`text-gray-600 text-sm`}>Vendeurs favoris</Text>
            </View>
          </View>
        </View>

        {/* Mes produits favoris - Style similaire au vendeur dashboard */}
        <Text style={tw`text-lg font-semibold mb-2`}>Mes produits favoris</Text>

        {produitsFavoris.map((produit, index) => (
          <TouchableOpacity 
            key={index} 
            style={tw`bg-gray-100 rounded-md p-4 mb-3`}
            onPress={() => router.push(`/product-details/${produit.id}`)}
          >
            <View style={tw`flex-row justify-between items-center mb-1`}>
              <Text style={tw`text-base font-semibold`}>{produit.nom}</Text>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="heart" size={16} color="#ef4444" style={tw`mr-1`} />
                <Text style={tw`text-sm font-bold`}>{produit.prix.toLocaleString()} CFA/kg</Text>
              </View>
            </View>
            <Text style={tw`text-sm text-gray-600`}>Chez {produit.vendeur}</Text>
            <View style={tw`flex-row justify-between items-center mt-2`}>
              <Text style={tw`text-sm text-gray-600`}>Produit favori</Text>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-2 h-2 rounded-full mr-1 ${
                  produit.disponible ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <Text style={tw`text-xs font-semibold ${
                  produit.disponible ? 'text-green-600' : 'text-red-600'
                }`}>
                  {produit.disponible ? 'Disponible' : 'Rupture'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Commandes récentes - Style similaire au vendeur dashboard */}
        <Text style={tw`text-lg font-semibold mt-6 mb-2`}>Commandes récentes</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>🛒 Commande prête chez Mamadou Seck - 13 000 CFA (il y a 1 heure)</Text>
          <Text style={tw`text-sm mb-1`}>🚚 Commande en livraison de Fatou Ba - 7 200 CFA (il y a 3 heures)</Text>
          <Text style={tw`text-sm mb-1`}>✅ Commande livrée d'Ousmane Diallo - 4 500 CFA (il y a 1 jour)</Text>
          <Text style={tw`text-sm`}>🎯 Nouvelle offre disponible chez vos vendeurs favoris</Text>
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

      {/* Modal de notification */}
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
                      <View style={tw`w-3 h-3 bg-green-500 rounded-full ml-3 mt-1`} />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <View style={tw`p-4 border-t border-gray-200`}>
              <TouchableOpacity
                style={tw`p-4 bg-green-500 rounded-lg`}
                onPress={handleMarkAllNotificationsRead}
              >
                <Text style={tw`text-white text-center font-semibold text-lg`}>Marquer tout comme lu</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>

      {/* Modal de profil */}
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
                <View style={tw`w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-4`}>
                  <Text style={tw`text-white text-3xl font-bold`}>{userInfo.avatar}</Text>
                </View>
                <Text style={tw`text-2xl font-semibold mb-1`}>{userInfo.name}</Text>
                <Text style={tw`text-gray-600 text-lg`}>{userInfo.email}</Text>
                {userInfo.verified && (
                  <View style={tw`flex-row items-center mt-2`}>
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                    <Text style={tw`text-green-600 text-base ml-2`}>Client vérifié</Text>
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
                  onPress={() => handleNavigateToSetting('orders')}
                >
                  <Ionicons name="bag-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Mes commandes</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('favorites')}
                >
                  <Ionicons name="heart-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Mes favoris</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('addresses')}
                >
                  <Ionicons name="location-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Mes adresses</Text>
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
        <TouchableOpacity 
          style={tw`items-center`}
          onPress={() => handleNavigation('accueil')}
        >
          <Ionicons 
            name={currentPage === 'accueil' ? "home" : "home-outline"} 
            size={24} 
            color={getIconColor('accueil')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('accueil') }]}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => handleNavigation('marketplace', '/marketplace')}
        >
          <Ionicons 
            name={currentPage === 'marketplace' ? "storefront" : "storefront-outline"} 
            size={24} 
            color={getIconColor('marketplace')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('marketplace') }]}>Market</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => handleNavigation('commandes', '/customer-orders')}
        >
          <Ionicons 
            name={currentPage === 'commandes' ? "bag-handle" : "bag-handle-outline"} 
            size={24} 
            color={getIconColor('commandes')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('commandes') }]}>Commandes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => handleNavigation('menu', '/customer-features')}
        >
          <Ionicons 
            name="ellipsis-horizontal-circle" 
            size={24} 
            color={getIconColor('menu')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('menu') }]}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomerDashboardScreen;