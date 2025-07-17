// screens/VendeurDashboardScreen.tsx
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

interface Produit {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  photo: string;
  stock: number;
  vendu: number;
  statut: 'Disponible' | 'Stock faible' | 'Rupture' | 'En attente';
  revenu: string;
  vendeurId: string;
  dateCreation: string;
  localisation: string;
}

const VendeurDashboardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('boutique'); // Nouvel état pour la page active
  
  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut
  
  // Données utilisateur typées
  const userInfo: UserInfo = {
    name: 'Mamadou Seck',
    email: 'mamadou@example.com',
    avatar: 'M',
    verified: true
  };

  // Notifications non lues
  const unreadNotifications: number = 3;

  // Notifications personnalisées pour le vendeur
  const customNotifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle commande',
      message: 'Commande de 50kg de poisson reçue de Fatou Diallo',
      time: 'Il y a 1 heure',
      type: 'order',
      read: false
    },
    {
      id: 2,
      title: 'Stock faible',
      message: 'Il ne reste que 5kg de crevettes en stock',
      time: 'Il y a 3 heures',
      type: 'alert',
      read: false
    },
    {
      id: 3,
      title: 'Paiement reçu',
      message: 'Paiement de 25 000 CFA confirmé pour votre commande',
      time: 'Il y a 5 heures',
      type: 'payment',
      read: false
    }
  ];

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
  ];

  const produits: Produit[] = [
    {
      id: 'prod_001',
      nom: 'Poisson frais (Thiof)',
      description: 'Thiof frais pêché du jour, excellent pour la cuisine sénégalaise traditionnelle',
      categorie: 'Poissons',
      prix: 2500,
      photo: 'https://example.com/thiof.jpg',
      stock: 150,
      vendu: 45,
      statut: 'Disponible',
      revenu: '112 500 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-10',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_002',
      nom: 'Crevettes roses',
      description: 'Crevettes roses fraîches de Casamance, idéales pour les plats de fête',
      categorie: 'Fruits de mer',
      prix: 8000,
      photo: 'https://example.com/crevettes.jpg',
      stock: 25,
      vendu: 18,
      statut: 'Stock faible',
      revenu: '144 000 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-08',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_003',
      nom: 'Légumes bio mélangés',
      description: 'Mélange de légumes biologiques cultivés localement sans pesticides',
      categorie: 'Légumes',
      prix: 1200,
      photo: 'https://example.com/legumes.jpg',
      stock: 80,
      vendu: 32,
      statut: 'Disponible',
      revenu: '38 400 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-12',
      localisation: 'Marché de Soumbédioune, Dakar'
    },
    {
      id: 'prod_004',
      nom: 'Fruits tropicaux',
      description: 'Assortiment de fruits tropicaux : mangues, papayes, ananas de saison',
      categorie: 'Fruits',
      prix: 1800,
      photo: 'https://example.com/fruits.jpg',
      stock: 0,
      vendu: 25,
      statut: 'Rupture',
      revenu: '45 000 CFA',
      vendeurId: 'vendeur_001',
      dateCreation: '2025-01-05',
      localisation: 'Marché de Soumbédioune, Dakar'
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

  const getStatutColor = (statut: string): string => {
    switch (statut) {
      case 'Disponible':
        return 'text-green-600';
      case 'Stock faible':
        return 'text-orange-600';
      case 'Rupture':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Nouvelle fonction pour gérer la navigation de la bottom navbar
  const handleNavigation = (page: string, route?: string): void => {
    setCurrentPage(page);
    if (route) {
      router.push(route);
    }
  };

  // Fonction pour obtenir la couleur de l'icône selon la page active
  const getIconColor = (page: string): string => {
    return currentPage === page ? '#10B981' : '#374151'; // Vert si actif, gris sinon
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
              <Text style={tw`text-sm mr-1`}>Vendeur</Text>
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
        <View style={tw`bg-green-600 rounded-xl p-5 mb-6`}>
          <Text style={tw`text-white text-xl font-bold mb-1`}>Bienvenue, Mamadou !</Text>
          <Text style={tw`text-white`}>Gérez votre boutique et suivez vos ventes en temps réel</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/add-product")}
          style={tw`bg-green-600 rounded-md py-3 px-4 mb-6`}
        >
          <Text style={tw`text-white text-center font-semibold`}>+ Ajouter un produit à la marketplace</Text>
        </TouchableOpacity>

        {/* Statistics Grid */}
        <View style={tw`flex-row flex-wrap justify-between mb-6`}>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <FontAwesome5 name="money-bill-wave" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>339 900 CFA</Text>
              <Text style={tw`text-gray-600 text-sm`}>Revenus totaux</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <MaterialIcons name="inventory" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>4</Text>
              <Text style={tw`text-gray-600 text-sm`}>Produits actifs</Text>
            </View>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <TouchableOpacity 
              onPress={() => handleNavigation('commandes', '/orders')}
              style={tw`bg-gray-100 p-4 rounded-md items-center`}
            >
              <Ionicons name="bag-handle-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>32</Text>
              <Text style={tw`text-gray-600 text-sm`}>Commandes</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`w-1/2 p-2`}>
            <View style={tw`bg-gray-100 p-4 rounded-md items-center`}>
              <Ionicons name="people-outline" size={20} color="black" />
              <Text style={tw`text-lg font-bold mt-1`}>18</Text>
              <Text style={tw`text-gray-600 text-sm`}>Clients fidèles</Text>
            </View>
          </View>
        </View>

        <Text style={tw`text-lg font-semibold mb-2`}>Mes produits</Text>

        {produits.map((produit, index) => (
          <View key={index} style={tw`bg-gray-100 rounded-md p-4 mb-3`}>
            <View style={tw`flex-row justify-between items-center mb-1`}>
              <Text style={tw`text-base font-semibold`}>{produit.nom}</Text>
              <Text style={tw`text-sm font-bold`}>{produit.revenu}</Text>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{produit.categorie} - {produit.prix.toLocaleString()} CFA/kg</Text>
            <View style={tw`flex-row justify-between items-center mt-2`}>
              <Text style={tw`text-sm text-gray-600`}>Stock: {produit.stock}kg | Vendu: {produit.vendu}kg</Text>
              <Text style={tw`text-xs font-semibold ${getStatutColor(produit.statut)}`}>
                {produit.statut}
              </Text>
            </View>
          </View>
        ))}

        <Text style={tw`text-lg font-semibold mt-6 mb-2`}>Commandes récentes</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <Text style={tw`text-sm mb-1`}>🛒 Nouvelle commande de Fatou Diallo - 50kg de poisson (il y a 1 heure)</Text>
          <Text style={tw`text-sm mb-1`}>💰 Paiement reçu de Ousmane Ba - 25 000 CFA (il y a 3 heures)</Text>
          <Text style={tw`text-sm mb-1`}>📦 Livraison effectuée chez Aïda Sow - 20kg de légumes (il y a 5 heures)</Text>
          <Text style={tw`text-sm`}>⚠️ Alerte stock: Crevettes en stock faible (5kg restants)</Text>
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
                <View style={tw`w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-4`}>
                  <Text style={tw`text-white text-3xl font-bold`}>{userInfo.avatar}</Text>
                </View>
                <Text style={tw`text-2xl font-semibold mb-1`}>{userInfo.name}</Text>
                <Text style={tw`text-gray-600 text-lg`}>{userInfo.email}</Text>
                {userInfo.verified && (
                  <View style={tw`flex-row items-center mt-2`}>
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                    <Text style={tw`text-green-600 text-base ml-2`}>Vendeur vérifié</Text>
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
                  onPress={() => handleNavigateToSetting('shop')}
                >
                  <Ionicons name="storefront-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Gérer ma boutique</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-2 border-b border-gray-100`}
                  onPress={() => handleNavigateToSetting('analytics')}
                >
                  <Ionicons name="analytics-outline" size={24} color="gray" style={tw`mr-4`} />
                  <Text style={tw`text-lg flex-1`}>Analyses de vente</Text>
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

      {/* Bottom Navbar avec états actifs */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity 
          style={tw`items-center`}
          onPress={() => handleNavigation('boutique')}
        >
          <Ionicons 
            name={currentPage === 'boutique' ? "storefront" : "storefront-outline"} 
            size={24} 
            color={getIconColor('boutique')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('boutique') }]}>Boutique</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => handleNavigation('commandes', '/orders')}
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
          onPress={() => handleNavigation('analyses', '/sales-analytics')}
        >
          <Ionicons 
            name={currentPage === 'analyses' ? "analytics" : "analytics-outline"} 
            size={24} 
            color={getIconColor('analyses')} 
          />
          <Text style={[tw`text-xs`, { color: getIconColor('analyses') }]}>Analyses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`items-center`} 
          onPress={() => handleNavigation('menu', '/vendeur-features')}
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

export default VendeurDashboardScreen;