// screens/CustomerFeaturesScreen.tsx
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function CustomerFeaturesScreen() {
  // Mapping des anciens noms vers les nouvelles routes
  const navigateToScreen = (screenName: string) => {
    switch (screenName) {
      case 'CustomerTransactionsScreen':
        router.push('/customer-transactions');
        break;
      case 'ListChatScreen':
        router.push('/list-chat');
        break;
      
      
      
      
      
      default:
        console.warn(`Route non trouvée pour: ${screenName}`);
    }
  };

  const features = [
    { label: "Mes transactions", icon: <FontAwesome5 name="receipt" size={20} color="black" />, screen: "CustomerTransactionsScreen" },
    { label: "Messages", icon: <Ionicons name="chatbubble-outline" size={20} color="black" />, screen: "ListChatScreen" },
    
   
   
   
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center px-4 py-3`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={tw`p-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Menu Client</Text>

        {features.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigateToScreen(item.screen)}
            style={tw`flex-row items-center bg-gray-100 p-4 rounded-lg mb-3`}
          >
            <View style={tw`mr-3`}>{item.icon}</View>
            <Text style={tw`text-base`}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}