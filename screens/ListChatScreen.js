import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function ListChatScreen() {
  const navigation = useNavigation();

  const conversations = [
    { id: '1', name: 'Aliou Diallo', lastMessage: 'Votre entrepôt est-il dispo ?', time: '10:24' },
    { id: '2', name: 'Fatou Ndiaye', lastMessage: 'Merci pour la réponse 🙏', time: '09:15' },
    { id: '3', name: 'Mohamed Sy', lastMessage: 'Est-ce que je peux visiter ?', time: 'Hier' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row items-center px-4 py-3 border-b border-gray-200 bg-gray-100`}
      onPress={() => navigation.navigate('ChatScreen', { userId: item.id })}
    >
      <View style={tw`w-12 h-12 rounded-full bg-gray-300 justify-center items-center mr-4`}>
        <Ionicons name="person" size={20} color="white" />
      </View>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-base font-semibold`}>{item.name}</Text>
          <Text style={tw`text-xs text-gray-500`}>{item.time}</Text>
        </View>
        <Text style={tw`text-sm text-gray-600`} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-gray-10 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Mes messages</Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pb-4`}
      />
    </SafeAreaView>
  );
}
