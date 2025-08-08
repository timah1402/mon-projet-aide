// screens/DriverDashboard.tsx
import { router } from 'expo-router';
import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

// Types pour éviter les erreurs d'import
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'alert' | 'payment' | 'view';
  read: boolean;
  missionId?: string;
}

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalMissions: number;
}

type SettingKey = 'personal-info' | 'documents-validation' | 'settings' | 'help';

// Composant NotificationBadge simple
const NotificationBadge: React.FC<{
  unreadCount: number;
  onPress: () => void;
  style?: any;
}> = ({ unreadCount, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={tw`relative`}>
      <Ionicons name="notifications-outline" size={28} color="gray" />
      {unreadCount > 0 && (
        <View style={tw`absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center`}>
          <Text style={tw`text-white text-xs font-bold`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// Composant CustomToggleSwitch - Bouton reste dans le container
// Composant CustomToggleSwitch - À remplacer dans votre fichier
const CustomToggleSwitch: React.FC<{
  isOn: boolean;
  onToggle: () => void;
  onColor: string;
  offColor: string;
  size: string;
  showLabels: boolean;
  onLabel: string;
  offLabel: string;
}> = ({ isOn, onToggle, onColor, offColor, showLabels, onLabel, offLabel }) => {
  const [toggleAnim] = useState(new Animated.Value(isOn ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  return (
    <TouchableOpacity onPress={onToggle} style={tw`flex-row items-center`}>
      <View
        style={[
          tw`w-16 h-8 rounded-full relative justify-center`,
          { backgroundColor: isOn ? onColor : offColor }
        ]}
      >
        <Animated.View
          style={[
            tw`w-6 h-6 rounded-full bg-white shadow-lg absolute`,
            {
              left: toggleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 38],
              }),
            }
          ]}
        />
      </View>
      {showLabels && (
        <Text style={tw`text-white text-sm font-bold ml-3`}>
          {isOn ? onLabel : offLabel}
        </Text>
      )}
    </TouchableOpacity>
  );
};

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

interface Mission {
  id: string;
  type: 'surgelés' | 'frais' | 'sec';
  description: string;
  collectPoint: string;
  destination: string;
  client: string;
  temperature?: string;
  price: number;
  distance: string;
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  urgency: 'normal' | 'urgent';
}

const DriverDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState<boolean>(false);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [enLigne, setEnLigne] = useState<boolean>(true);
  const [missionAcceptModalVisible, setMissionAcceptModalVisible] = useState<boolean>(false);

  // Animation pour les modals
  const [slideAnim] = useState(new Animated.Value(-1000)); // Commence hors écran en haut
  const [missionNotificationAnim] = useState(new Animated.Value(0));

  // État des missions
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      type: 'surgelés',
      description: 'Produits surgelés',
      collectPoint: 'Marché Kermel, Dakar',
      destination: 'Restaurant Le Baobab, Almadies',
      client: 'Aïssatou Diallo',
      temperature: '-2°C',
      price: 5000,
      distance: '12 km',
      estimatedTime: '45 min',
      status: 'accepted',
      urgency: 'normal'
    },
    {
      id: '2',
      type: 'frais',
      description: 'Produits laitiers',
      collectPoint: 'Ferme Bio Sénégal, Rufisque',
      destination: 'Supermarché Auchan, Plateau',
      client: 'Mamadou Fall',
      temperature: '4°C',
      price: 7500,
      distance: '18 km',
      estimatedTime: '60 min',
      status: 'pending',
      urgency: 'urgent'
    },
    {
      id: '3',
      type: 'sec',
      description: 'Produits secs',
      collectPoint: 'Entrepôt Central, Pikine',
      destination: 'Boutique Diarra, Médina',
      client: 'Fatou Sow',
      price: 3500,
      distance: '8 km',
      estimatedTime: '30 min',
      status: 'pending',
      urgency: 'normal'
    }
  ]);

  // Mission courante (la première acceptée ou en cours)
  const currentMission = missions.find(m => m.status === 'accepted' || m.status === 'in_progress');
  
  // Prochaine mission disponible (première en attente)
  const nextAvailableMission = missions.find(m => m.status === 'pending');

  // Données utilisateur spécifiques au chauffeur
  const userInfo: UserInfo = {
    name: 'Ousmane Sarr',
    email: 'ousmane.sarr@example.com',
    avatar: 'O',
    verified: true,
    rating: 4.8,
    totalMissions: 247
  };

  // Notifications avec missions en attente
  const [driverNotifications, setDriverNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Nouvelle mission assignée - URGENT',
      message: 'Livraison de produits laitiers vers Supermarché Auchan - 7 500 FCFA',
      time: 'Il y a 2 minutes',
      type: 'booking',
      read: false,
      missionId: '2'
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
    }
  ]);

  const unreadNotifications: number = driverNotifications.filter(n => !n.read).length;

  const [currentStep, setCurrentStep] = useState<'accepted' | 'going_to_pickup' | 'arrived_pickup' | 'going_to_destination' | 'arrived_destination' | 'completed'>('accepted');

  const roles: Role[] = [
    { label: 'Hôte', icon: 'home-outline' },
    { label: 'Locataire', icon: 'person-outline' },
    { label: 'Expéditeur', icon: 'cube-outline' },
    { label: 'Chauffeur', icon: 'car-outline' },
    { label: 'Vendeur', icon: 'storefront-outline' },
    { label: 'Client', icon: 'bag-outline' },
  ];

  const statistics: Statistic[] = [
    { label: 'Livraisons du jour', value: 3, icon: 'calendar-outline', color: '#0284C7' },
    { label: 'Alertes température', value: 1, icon: 'warning-outline', color: '#DC2626' },
    { label: "Gains aujourd'hui", value: "15 000 FCFA", icon: 'card-outline', color: '#0284C7' },
    { label: "Total gains", value: "340 000 FCFA", icon: 'wallet-outline', color: '#16A34A' },
  ];

  // Fonction pour accepter une mission
  const acceptMission = (missionId: string): void => {
    setMissions(prevMissions => 
      prevMissions.map(mission => 
        mission.id === missionId 
          ? { ...mission, status: 'accepted' as const }
          : mission
      )
    );

    // Supprimer la notification correspondante
    setDriverNotifications(prev => 
      prev.filter(notif => notif.missionId !== missionId)
    );
    
    // Réinitialiser à l'étape d'acceptation
    setCurrentStep('accepted');

    // Animation de succès
    Animated.sequence([
      Animated.timing(missionNotificationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(missionNotificationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();

    Alert.alert(
      "Mission acceptée ✅",
      "Vous pouvez maintenant commencer la livraison",
      [{ text: "OK" }]
    );
  };

  // Fonction pour rejeter une mission
  const rejectMission = (missionId: string): void => {
    Alert.alert(
      "Rejeter la mission",
      "Êtes-vous sûr de vouloir rejeter cette mission ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Rejeter", 
          style: "destructive",
          onPress: () => {
            setMissions(prevMissions => 
              prevMissions.filter(mission => mission.id !== missionId)
            );
            setDriverNotifications(prev => 
              prev.filter(notif => notif.missionId !== missionId)
            );
          }
        }
      ]
    );
  };

  // Fonction pour terminer la mission courante
  const completeMission = (): void => {
    if (currentMission) {
      setMissions(prevMissions => 
        prevMissions.map(mission => 
          mission.id === currentMission.id
            ? { ...mission, status: 'completed' as const }
            : mission
        )
      );
      
      // Réinitialiser l'étape courante pour la prochaine mission
      setCurrentStep('accepted');

      // Afficher une notification de succès
      Alert.alert(
        "🎉 Mission terminée !",
        `Félicitations ! Vous avez gagné ${currentMission.price} FCFA.\nUne nouvelle mission sera bientôt disponible.`,
        [{ text: "Parfait !" }]
      );

      // Mettre à jour les statistiques
      // Ici vous pourriez faire un appel API pour mettre à jour les gains, etc.
    }
  };

  // Fonction pour gérer les étapes de la mission
  const handleMissionStep = (step: string): void => {
    switch (step) {
      case 'go_to_pickup':
        setCurrentStep('going_to_pickup');
        // Navigation vers la map avec destination = point de collecte
        router.push({
          pathname: "/map-navigation",
          params: {
            destination: currentMission?.collectPoint,
            type: 'pickup',
            missionId: currentMission?.id
          }
        });
        break;
        
      case 'arrived_pickup':
        setCurrentStep('arrived_pickup');
        Alert.alert(
          "Arrivé au point de collecte",
          "Récupérez le colis et cliquez sur 'En route vers destination'",
          [{ text: "OK" }]
        );
        break;
        
      case 'go_to_destination':
        setCurrentStep('going_to_destination');
        // Navigation vers la map avec destination = point de livraison
        router.push({
          pathname: "/map-navigation",
          params: {
            destination: currentMission?.destination,
            type: 'delivery',
            missionId: currentMission?.id
          }
        });
        break;
        
      case 'arrived_destination':
        setCurrentStep('arrived_destination');
        Alert.alert(
          "Arrivé à destination",
          "Livrez le colis au client et terminez la mission",
          [{ text: "OK" }]
        );
        break;
        
      case 'complete_mission':
        completeMission();
        break;
    }
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
      case 'Client':
        router.replace("/customer-dashboard");
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
    
    if (settingKey === 'personal-info') {
      router.push('/driver-profile');
      return;
    }
    
    if (settingKey === 'documents-validation') {
      router.push('/driver-documents');
      return;
    }
    
    console.log(`Navigation chauffeur vers: ${settingKey}`);
  };

  const handleMarkAllNotificationsRead = (): void => {
    setDriverNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const toggleOnlineStatus = (): void => {
    setEnLigne(!enLigne);
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

  // Rendu de la carte de mission
  const renderMissionCard = (mission: Mission, isNext: boolean = false) => {
    const getTypeIcon = (type: string) => {
      switch(type) {
        case 'surgelés': return '❄️';
        case 'frais': return '🥛';
        case 'sec': return '📦';
        default: return '📦';
      }
    };

    return (
      <View style={tw`bg-gray-100 p-4 rounded-md mb-4`}>
        <View style={tw`flex-row justify-between items-start mb-2`}>
          <Text style={tw`text-sm text-gray-700 mb-1`}>
            {getTypeIcon(mission.type)} {mission.description}
          </Text>
          {mission.urgency === 'urgent' && (
            <View style={tw`bg-red-500 px-2 py-1 rounded`}>
              <Text style={tw`text-white text-xs font-bold`}>URGENT</Text>
            </View>
          )}
        </View>
        
        <Text style={tw`text-xs text-gray-600`}>Collecte: {mission.collectPoint}</Text>
        <Text style={tw`text-xs text-gray-600`}>Destination: {mission.destination}</Text>
        <Text style={tw`text-xs text-gray-600`}>Client: {mission.client}</Text>
        
        <View style={tw`flex-row justify-between items-center mt-2`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-xs text-green-600 font-semibold`}>{mission.price} FCFA</Text>
            <Text style={tw`text-xs text-gray-500 ml-2`}>{mission.distance} • {mission.estimatedTime}</Text>
          </View>
          {mission.temperature && (
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xs text-blue-600 font-semibold`}>{mission.temperature}</Text>
              <Ionicons name="thermometer" size={12} color="#2563EB" style={tw`ml-1`} />
            </View>
          )}
        </View>

        {isNext ? (
          <View style={tw`flex-row mt-4 space-x-2`}>
            <TouchableOpacity
              style={tw`flex-1 bg-red-500 py-2 px-3 rounded-md`}
              onPress={() => rejectMission(mission.id)}
            >
              <Text style={tw`text-white text-sm font-medium text-center`}>Rejeter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-green-500 py-2 px-3 rounded-md`}
              onPress={() => acceptMission(mission.id)}
            >
              <Text style={tw`text-white text-sm font-medium text-center`}>Accepter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Flux de mission avec navigation */}
            <View style={tw`mt-4`}>
              <Text style={tw`text-xs text-gray-500 mb-3`}>Étapes de la mission :</Text>
              
              {/* Étape 1: Mission acceptée */}
              <View style={tw`flex-row items-center mb-3 p-3 bg-green-50 rounded-lg`}>
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" style={tw`mr-3`} />
                <Text style={tw`text-sm text-green-600 font-medium flex-1`}>Mission acceptée</Text>
              </View>

              {/* Étape 2: En route vers collecte */}
              {currentStep === 'accepted' && (
                <TouchableOpacity
                  style={tw`flex-row items-center mb-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200`}
                  onPress={() => handleMissionStep('go_to_pickup')}
                >
                  <Ionicons name="navigate-circle-outline" size={20} color="#0284c7" style={tw`mr-3`} />
                  <Text style={tw`text-sm text-blue-600 font-medium flex-1`}>
                    En route vers le point de collecte
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#0284c7" />
                </TouchableOpacity>
              )}

              {currentStep === 'going_to_pickup' && (
                <View style={tw`flex-row items-center mb-3 p-3 bg-blue-100 rounded-lg`}>
                  <Ionicons name="car" size={20} color="#0284c7" style={tw`mr-3`} />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm text-blue-600 font-medium`}>En route vers collecte...</Text>
                    <TouchableOpacity
                      style={tw`mt-2 bg-blue-500 py-2 px-4 rounded-md self-start`}
                      onPress={() => handleMissionStep('arrived_pickup')}
                    >
                      <Text style={tw`text-white text-xs font-medium`}>Je suis arrivé</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {(currentStep === 'arrived_pickup' || currentStep === 'going_to_destination' || currentStep === 'arrived_destination') && (
                <View style={tw`flex-row items-center mb-3 p-3 bg-green-50 rounded-lg`}>
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" style={tw`mr-3`} />
                  <Text style={tw`text-sm text-green-600 font-medium flex-1`}>Arrivé au point de collecte</Text>
                </View>
              )}

              {/* Étape 3: En route vers destination */}
              {currentStep === 'arrived_pickup' && (
                <TouchableOpacity
                  style={tw`flex-row items-center mb-3 p-3 bg-orange-50 rounded-lg border-2 border-orange-200`}
                  onPress={() => handleMissionStep('go_to_destination')}
                >
                  <Ionicons name="navigate-circle-outline" size={20} color="#ea580c" style={tw`mr-3`} />
                  <Text style={tw`text-sm text-orange-600 font-medium flex-1`}>
                    En route vers la destination
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#ea580c" />
                </TouchableOpacity>
              )}

              {currentStep === 'going_to_destination' && (
                <View style={tw`flex-row items-center mb-3 p-3 bg-orange-100 rounded-lg`}>
                  <Ionicons name="car" size={20} color="#ea580c" style={tw`mr-3`} />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm text-orange-600 font-medium`}>En route vers destination...</Text>
                    <TouchableOpacity
                      style={tw`mt-2 bg-orange-500 py-2 px-4 rounded-md self-start`}
                      onPress={() => handleMissionStep('arrived_destination')}
                    >
                      <Text style={tw`text-white text-xs font-medium`}>Je suis arrivé</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {currentStep === 'arrived_destination' && (
                <View style={tw`flex-row items-center mb-3 p-3 bg-green-50 rounded-lg`}>
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" style={tw`mr-3`} />
                  <Text style={tw`text-sm text-green-600 font-medium flex-1`}>Arrivé à destination</Text>
                </View>
              )}

              {/* Bouton de finalisation */}
              {currentStep === 'arrived_destination' && (
                <TouchableOpacity
                  style={tw`mt-4 bg-green-500 py-3 px-4 rounded-lg flex-row items-center justify-center`}
                  onPress={() => handleMissionStep('complete_mission')}
                >
                  <Ionicons name="checkmark-done" size={20} color="white" style={tw`mr-2`} />
                  <Text style={tw`text-white text-sm font-medium`}>Terminer la mission</Text>
                </TouchableOpacity>
              )}

              {/* Bouton générique pour continuer */}
              {(currentStep === 'accepted' || currentStep === 'arrived_pickup') && (
                <TouchableOpacity
                  style={tw`mt-4 bg-yellow-500 py-2 px-3 rounded-md self-start`}
                  onPress={() => router.push("/tracking")}
                >
                  <Text style={tw`text-white text-sm font-medium`}>Voir sur la carte</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    );
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

        {/* Mission courante */}
        {currentMission && (
          <>
            <Text style={tw`text-lg font-semibold mb-2`}>Ma livraison actuelle</Text>
            {renderMissionCard(currentMission)}
          </>
        )}

        {/* Prochaine mission disponible */}
        {nextAvailableMission && !currentMission && (
          <>
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`text-lg font-semibold`}>Nouvelle mission disponible</Text>
              {nextAvailableMission.urgency === 'urgent' && (
                <View style={tw`ml-2 bg-red-100 px-2 py-1 rounded`}>
                  <Text style={tw`text-red-600 text-xs font-bold`}>URGENT</Text>
                </View>
              )}
            </View>
            {renderMissionCard(nextAvailableMission, true)}
          </>
        )}

        {/* Message si aucune mission */}
        {!currentMission && !nextAvailableMission && (
          <View style={tw`bg-green-100 p-6 rounded-xl mb-4`}>
            <View style={tw`items-center`}>
              <Ionicons name="checkmark-circle" size={48} color="#10b981" style={tw`mb-3`} />
              <Text style={tw`text-green-800 text-center text-lg font-semibold mb-1`}>
                Excellente journée !
              </Text>
              <Text style={tw`text-green-600 text-center`}>
                Toutes vos missions ont été complétées avec succès
              </Text>
              <Text style={tw`text-green-500 text-center text-sm mt-2`}>
                Restez en ligne pour recevoir de nouvelles missions
              </Text>
            </View>
          </View>
        )}

        {/* Activité récente avec missions terminées */}
        <Text style={tw`text-lg font-semibold mb-2`}>Activité récente</Text>
        <View style={tw`bg-gray-100 rounded-md p-4 mb-8`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" style={tw`mr-2`} />
            <Text style={tw`text-sm text-green-700 font-medium`}>
              Mission terminée: "Restaurant Le Baobab" (+5 000 FCFA)
            </Text>
          </View>
          <Text style={tw`text-xs text-gray-500 mb-3 ml-6`}>Il y a 15 minutes</Text>
          
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" style={tw`mr-2`} />
            <Text style={tw`text-sm text-green-700 font-medium`}>
              Mission terminée: "Supermarché Auchan" (+3 500 FCFA)
            </Text>
          </View>
          <Text style={tw`text-xs text-gray-500 mb-3 ml-6`}>Il y a 1 heure</Text>
          
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons name="warning" size={16} color="#f59e0b" style={tw`mr-2`} />
            <Text style={tw`text-sm text-orange-600`}>
              Alerte température sur "Produits laitiers" (résolu)
            </Text>
          </View>
          <Text style={tw`text-xs text-gray-500 ml-6`}>Il y a 3 heures</Text>
        </View>
        
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

      {/* Modal de notification amélioré avec boutons d'action */}
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
              {driverNotifications.map((notification) => {
                const relatedMission = missions.find(m => m.id === notification.missionId);
                
                return (
                  <View key={notification.id} style={tw`border-b border-gray-200 py-4`}>
                    <View style={tw`flex-row justify-between items-start`}>
                      <View style={tw`flex-1`}>
                        <Text style={tw`font-semibold text-lg`}>{notification.title}</Text>
                        <Text style={tw`text-gray-600 text-base mt-2`}>{notification.message}</Text>
                        <Text style={tw`text-gray-400 text-sm mt-2`}>{notification.time}</Text>
                        
                        {/* Boutons d'action pour les notifications de mission */}
                        {relatedMission && relatedMission.status === 'pending' && (
                          <View style={tw`flex-row mt-3 space-x-2`}>
                            <TouchableOpacity
                              style={tw`bg-red-500 py-2 px-4 rounded-md`}
                              onPress={() => {
                                rejectMission(relatedMission.id);
                                closeNotificationModal();
                              }}
                            >
                              <Text style={tw`text-white text-sm font-medium`}>Rejeter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={tw`bg-green-500 py-2 px-4 rounded-md`}
                              onPress={() => {
                                acceptMission(relatedMission.id);
                                closeNotificationModal();
                              }}
                            >
                              <Text style={tw`text-white text-sm font-medium`}>Accepter</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                      {!notification.read && (
                        <View style={tw`w-3 h-3 bg-blue-500 rounded-full ml-3 mt-1`} />
                      )}
                    </View>
                  </View>
                );
              })}
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

      {/* Modal de profil (identique à l'original) */}
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

      {/* Animation de succès pour l'acceptation de mission */}
      <Animated.View
        style={[
          tw`absolute top-20 left-4 right-4 bg-green-500 p-4 rounded-lg`,
          {
            opacity: missionNotificationAnim,
            transform: [
              {
                translateY: missionNotificationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
        pointerEvents="none"
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={tw`text-white font-semibold ml-2`}>Mission acceptée avec succès !</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DriverDashboard;