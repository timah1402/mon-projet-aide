// components/NotificationBadge.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

interface NotificationBadgeProps {
  unreadCount?: number;
  onPress: () => void;
  iconSize?: number;
  iconColor?: string;
  badgeColor?: string;
  style?: ViewStyle;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  unreadCount = 0, 
  onPress, 
  iconSize = 24, 
  iconColor = "gray",
  badgeColor = "bg-red-500",
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[tw`relative`, style]} 
      onPress={onPress}
    >
      <Ionicons name="notifications-outline" size={iconSize} color={iconColor} />
      {unreadCount > 0 && (
        <View style={[tw`absolute -top-1 -right-1 ${badgeColor} rounded-full items-center justify-center`, { minWidth: 20, height: 20 }]}>
          <Text style={tw`text-white text-xs font-bold`}>
            {unreadCount > 9 ? '9+' : unreadCount.toString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NotificationBadge;