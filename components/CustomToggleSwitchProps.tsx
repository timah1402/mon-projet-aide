// components/CustomToggleSwitch.tsx
import React from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface CustomToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  onColor?: string;
  offColor?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  showLabels?: boolean;
  onLabel?: string;
  offLabel?: string;
}

const CustomToggleSwitch: React.FC<CustomToggleSwitchProps> = ({
  isOn,
  onToggle,
  onColor = '#10B981', // Vert par défaut
  offColor = '#EF4444', // Rouge par défaut
  size = 'medium',
  disabled = false,
  showLabels = false,
  onLabel = 'ON',
  offLabel = 'OFF'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: tw`w-12 h-6`,
          circle: tw`w-5 h-5`,
          translateX: isOn ? 24 : 2
        };
      case 'large':
        return {
          container: tw`w-20 h-10`,
          circle: tw`w-8 h-8`,
          translateX: isOn ? 40 : 4
        };
      default: // medium
        return {
          container: tw`w-16 h-8`,
          circle: tw`w-6 h-6`,
          translateX: isOn ? 32 : 4
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = isOn ? onColor : offColor;

  return (
    <View style={tw`items-center`}>
      <TouchableOpacity
        onPress={disabled ? undefined : onToggle}
        activeOpacity={disabled ? 1 : 0.8}
        style={[
          sizeStyles.container,
          tw`rounded-full justify-center p-1`,
          {
            backgroundColor: disabled ? '#9CA3AF' : backgroundColor,
            opacity: disabled ? 0.5 : 1
          }
        ]}
      >
        <Animated.View
          style={[
            sizeStyles.circle,
            tw`bg-white rounded-full shadow-md`,
            {
              transform: [{ translateX: sizeStyles.translateX }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3
            }
          ]}
        />
      </TouchableOpacity>
      
      {showLabels && (
        <Text style={[
          tw`text-xs mt-1 font-medium`,
          { color: disabled ? '#9CA3AF' : backgroundColor }
        ]}>
          {isOn ? onLabel : offLabel}
        </Text>
      )}
    </View>
  );
};

export default CustomToggleSwitch;