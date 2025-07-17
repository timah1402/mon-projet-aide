// components/DriverProfileSettingsModal.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Switch, Dimensions } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height: screenHeight } = Dimensions.get('window');

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  verified?: boolean;
  rating?: number;
  totalMissions?: number;
}

export type SettingKey = 
  | 'personal-info' 
  | 'profile-photo' 
  | 'payment-info'
  | 'change-password'
  | '2fa'
  | 'biometric'
  | 'language'
  | 'dark-mode'
  | 'location'
  | 'help-center'
  | 'contact-support'
  | 'terms';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  key: SettingKey;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

interface DriverProfileSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  userInfo?: UserInfo;
  onLogout?: () => void;
  onNavigateToSetting?: (settingKey: SettingKey) => void;
}

const DriverProfileSettingsModal: React.FC<DriverProfileSettingsModalProps> = ({ 
  visible, 
  onClose, 
  userInfo = {
    name: 'Chauffeur',
    email: 'chauffeur@example.com',
    avatar: 'C',
    verified: true,
    rating: 4.8,
    totalMissions: 247
  },
  onLogout,
  onNavigateToSetting
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [temperatureAlerts, setTemperatureAlerts] = useState<boolean>(true);

  const menuItems: MenuSection[] = [
    {
      section: 'Profil',
      items: [
        { 
          icon: 'person-outline', 
          title: 'Informations personnelles', 
          subtitle: 'Nom, email, téléphone',
          key: 'personal-info'
        },
        { 
          icon: 'camera-outline', 
          title: 'Photo de profil', 
          subtitle: 'Changer votre photo',
          key: 'profile-photo'
        },
        { 
          icon: 'card-outline', 
          title: 'Informations de paiement', 
          subtitle: 'Comptes bancaires, cartes',
          key: 'payment-info'
        },
      ]
    },
    {
      section: 'Sécurité',
      items: [
        { 
          icon: 'lock-closed-outline', 
          title: 'Changer le mot de passe', 
          subtitle: 'Sécurisez votre compte',
          key: 'change-password'
        },
        { 
          icon: 'shield-checkmark-outline', 
          title: 'Authentification à deux facteurs', 
          subtitle: 'Activée',
          key: '2fa'
        },
        { 
          icon: 'finger-print-outline', 
          title: 'Biométrie', 
          subtitle: 'Empreinte digitale',
          key: 'biometric'
        },
      ]
    },
    {
      section: 'Préférences',
      items: [
        { 
          icon: 'language-outline', 
          title: 'Langue', 
          subtitle: 'Français',
          key: 'language'
        },
        { 
          icon: 'moon-outline', 
          title: 'Mode sombre', 
          subtitle: 'Désactivé',
          key: 'dark-mode'
        },
        { 
          icon: 'location-outline', 
          title: 'Localisation', 
          subtitle: 'Dakar, Sénégal',
          key: 'location'
        },
      ]
    }
  ];

  interface MenuItemComponentProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
    showArrow?: boolean;
  }

  const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 border-b border-gray-100`}
      onPress={onPress}
    >
      <View style={tw`mr-4`}>
        <Ionicons name={icon} size={22} color="#6B7280" />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-gray-800 font-medium`}>{title}</Text>
        <Text style={tw`text-gray-500 text-sm`}>{subtitle}</Text>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      )}
    </TouchableOpacity>
  );

  interface SwitchItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }

  const SwitchItem: React.FC<SwitchItemProps> = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onValueChange 
  }) => (
    <View style={tw`flex-row items-center p-4 border-b border-gray-100`}>
      <View style={tw`mr-4`}>
        <Ionicons name={icon} size={22} color="#6B7280" />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-gray-800 font-medium`}>{title}</Text>
        <Text style={tw`text-gray-500 text-sm`}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E7EB', true: '#EAB308' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  const handleMenuItemPress = (key: SettingKey): void => {
    if (onNavigateToSetting) {
      onNavigateToSetting(key);
    }
    console.log(`Navigate to ${key}`);
  };

  const handleLogout = (): void => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logout');
    }
  };

  const handleViewFullProfile = (): void => {
    onClose();
    // Navigation vers la page de profil complet du chauffeur
    router.push('/driver-profile');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={12}
        color={index < rating ? '#F59E0B' : '#D1D5DB'}
      />
    ));
  };

  if (!visible) return null;

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="slide" 
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[tw`flex-1`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <TouchableOpacity 
          style={tw`flex-1`} 
          onPress={onClose}
          activeOpacity={1}
        />
        
        <View style={[
          tw`bg-white rounded-t-3xl`,
          { 
            maxHeight: screenHeight * 0.8,
            minHeight: screenHeight * 0.6 
          }
        ]}>
          {/* Header fixe */}
          <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200 bg-white rounded-t-3xl`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>Paramètres du compte</Text>
            <TouchableOpacity onPress={onClose} style={tw`p-1`}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={tw`flex-1`}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* User Profile Section avec infos chauffeur */}
            <View style={tw`p-4 border-b border-gray-200 bg-yellow-50`}>
              <View style={tw`flex-row items-center mb-3`}>
                <View style={tw`w-16 h-16 bg-yellow-500 rounded-full items-center justify-center mr-4`}>
                  <Text style={tw`text-white text-xl font-bold`}>{userInfo.avatar}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-bold text-gray-800`}>{userInfo.name}</Text>
                  <Text style={tw`text-gray-600 text-sm`}>{userInfo.email}</Text>
                  {userInfo.verified && (
                    <Text style={tw`text-yellow-600 text-sm font-medium`}>Chauffeur vérifié ✓</Text>
                  )}
                  {userInfo.rating && (
                    <View style={tw`flex-row items-center mt-1`}>
                      {renderStars(Math.floor(userInfo.rating))}
                      <Text style={tw`ml-2 text-xs text-gray-600`}>
                        {userInfo.rating} • {userInfo.totalMissions} missions
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              
              {/* Bouton Voir profil complet */}
              <TouchableOpacity
                style={tw`bg-yellow-500 py-3 px-4 rounded-lg flex-row items-center justify-center`}
                onPress={handleViewFullProfile}
              >
                <Ionicons name="person-circle-outline" size={18} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-semibold`}>Voir mon profil complet</Text>
              </TouchableOpacity>
            </View>

            {/* Notifications Section */}
            <View style={tw`bg-white`}>
              <Text style={tw`text-gray-800 font-semibold p-4 pb-2 text-base`}>Notifications</Text>
              <SwitchItem
                icon="notifications-outline"
                title="Notifications push"
                subtitle="Recevoir des notifications sur votre appareil"
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
              <SwitchItem
                icon="mail-outline"
                title="Notifications par email"
                subtitle="Recevoir des emails pour les mises à jour importantes"
                value={emailNotifications}
                onValueChange={setEmailNotifications}
              />
              <SwitchItem
                icon="thermometer-outline"
                title="Alertes température"
                subtitle="Notifications en cas d'anomalie de température"
                value={temperatureAlerts}
                onValueChange={setTemperatureAlerts}
              />
            </View>

            {/* Menu Sections */}
            {menuItems.map((section, sectionIndex) => (
              <View key={sectionIndex} style={tw`bg-white mt-4`}>
                <Text style={tw`text-gray-800 font-semibold p-4 pb-2 text-base`}>
                  {section.section}
                </Text>
                {section.items.map((item, itemIndex) => (
                  <MenuItemComponent
                    key={itemIndex}
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPress={() => handleMenuItemPress(item.key)}
                  />
                ))}
              </View>
            ))}

            {/* Support Section */}
            <View style={tw`bg-white mt-4`}>
              <Text style={tw`text-gray-800 font-semibold p-4 pb-2 text-base`}>Support</Text>
              <MenuItemComponent
                icon="help-circle-outline"
                title="Centre d'aide"
                subtitle="FAQ et support"
                onPress={() => handleMenuItemPress('help-center')}
              />
              <MenuItemComponent
                icon="chatbubble-outline"
                title="Contacter le support"
                subtitle="Nous sommes là pour vous aider"
                onPress={() => handleMenuItemPress('contact-support')}
              />
              <MenuItemComponent
                icon="document-text-outline"
                title="Conditions d'utilisation"
                subtitle="Termes et conditions"
                onPress={() => handleMenuItemPress('terms')}
              />
            </View>

            {/* Logout Section */}
            <View style={tw`p-4 mt-4`}>
              <TouchableOpacity
                style={tw`bg-red-500 py-3 px-4 rounded-lg items-center shadow-sm`}
                onPress={handleLogout}
              >
                <Text style={tw`text-white font-semibold text-base`}>Se déconnecter</Text>
              </TouchableOpacity>
            </View>

            {/* Version Info */}
            <View style={tw`p-4 items-center pb-8`}>
              <Text style={tw`text-gray-400 text-sm`}>Version 1.0.0</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DriverProfileSettingsModal;