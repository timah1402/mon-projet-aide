// components/NotificationModal.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'alert' | 'payment' | 'view';
  read: boolean;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  notifications?: Notification[];
  onMarkAllRead?: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  visible, 
  onClose, 
  notifications = [],
  onMarkAllRead
}) => {
  const defaultNotifications: Notification[] = [
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
    },
    {
      id: 3,
      title: 'Paiement reçu',
      message: 'Paiement de 15 000 CFA reçu pour votre location',
      time: 'Il y a 1 jour',
      type: 'payment',
      read: true
    },
    {
      id: 4,
      title: 'Nouvelle vue',
      message: 'Votre annonce "Espace réfrigéré Almadies" a été vue 15 fois',
      time: 'Il y a 1 jour',
      type: 'view',
      read: true
    }
  ];

  const notificationsList = notifications.length > 0 ? notifications : defaultNotifications;

  const getIcon = (type: Notification['type']): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'booking': return 'calendar';
      case 'alert': return 'warning';
      case 'payment': return 'card';
      case 'view': return 'eye';
      default: return 'notifications';
    }
  };

  const getIconColor = (type: Notification['type']): string => {
    switch (type) {
      case 'booking': return '#3B82F6';
      case 'alert': return '#EF4444';
      case 'payment': return '#10B981';
      case 'view': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead();
    } else {
      console.log('Mark all notifications as read');
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={tw`flex-1 bg-black bg-opacity-50`}>
        <TouchableOpacity 
          style={tw`flex-1`} 
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={tw`bg-white rounded-t-3xl max-h-4/5`}>
          <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
            <Text style={tw`text-lg font-bold`}>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={tw`px-4 py-2`}>
            {notificationsList.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={tw`flex-row items-start p-3 mb-2 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <View style={tw`mr-3 mt-1`}>
                  <Ionicons
                    name={getIcon(notification.type)}
                    size={20}
                    color={getIconColor(notification.type)}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`font-semibold text-gray-800 mb-1`}>
                    {notification.title}
                  </Text>
                  <Text style={tw`text-gray-600 text-sm mb-1`}>
                    {notification.message}
                  </Text>
                  <Text style={tw`text-gray-400 text-xs`}>
                    {notification.time}
                  </Text>
                </View>
                {!notification.read && (
                  <View style={tw`w-2 h-2 bg-blue-500 rounded-full mt-2`} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={tw`p-4 border-t border-gray-200`}>
            <TouchableOpacity 
              style={tw`bg-blue-600 py-3 rounded-lg`}
              onPress={handleMarkAllRead}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Marquer toutes comme lues
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;