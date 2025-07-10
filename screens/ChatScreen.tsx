import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
// Removed navigation import
const messages = [
  {
    id: 1,
    sender: 'Moussa Diagne',
    text: "Bonjour Aïssatou ! Merci pour votre réservation. L'accès à la chambre froide se fait par l'entrée latérale.",
    time: '10:30',
    fromUser: false
  },
  {
    id: 2,
    text: "Parfait ! À quelle heure puis-je venir déposer mes marchandises demain matin ?",
    time: '10:35',
    fromUser: true
  },
  {
    id: 3,
    sender: 'Moussa Diagne',
    text: "Vous pouvez venir dès 7h du matin. Je serai sur place pour vous accueillir et vous montrer l'espace.",
    time: '10:40',
    fromUser: false
  },
  {
    id: 4,
    text: "Excellent ! Une dernière question : y a-t-il des étagères disponibles pour organiser mes produits ?",
    time: '10:45',
    fromUser: true
  }
];

export default function ChatScreen() {
  const [input, setInput] = useState('');
  // Navigation removed

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 py-3 border-b border-gray-200 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
           {/* Bouton retour */}
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
          <View>
            <Text style={tw`font-semibold`}>Moussa Diagne</Text>
            <Text style={tw`text-xs text-green-600`}>● En ligne</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity style={tw`mx-2`}><Ionicons name="call-outline" size={20} color="gray" /></TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}><Ionicons name="videocam-outline" size={20} color="gray" /></TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}><Ionicons name="ellipsis-vertical" size={20} color="gray" /></TouchableOpacity>
        </View>
      </View>

      <View style={tw`bg-blue-100 px-4 py-2`}>
        <Text style={tw`text-sm font-medium text-blue-800`}>Conversation concernant: Chambre froide proche du Port</Text>
        <Text style={tw`text-xs text-blue-600`}>Dakar, Sénégal</Text>
      </View>

      <ScrollView contentContainerStyle={tw`px-4 py-2 flex-grow`}>
        <Text style={tw`text-center text-xs text-gray-500 my-2`}>20/06/2024</Text>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={
              msg.fromUser
                ? tw`self-end bg-blue-600 rounded-lg px-4 py-2 mb-2 max-w-[75%]`
                : tw`self-start bg-gray-200 rounded-lg px-4 py-2 mb-2 max-w-[75%]`
            }
          >
            {!msg.fromUser && <Text style={tw`text-xs text-gray-700 mb-1`}>{msg.sender}</Text>}
            <Text style={tw`${msg.fromUser ? 'text-white' : 'text-gray-800'} text-sm`}>{msg.text}</Text>
            <Text style={tw`${msg.fromUser ? 'text-white' : 'text-gray-500'} text-xs text-right mt-1`}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={tw`flex-row items-center border-t border-gray-200 px-4 py-2 bg-white`}>
        <TouchableOpacity style={tw`mr-2`}>
          <Ionicons name="mic-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Tapez votre message..."
          style={tw`flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm`}
        />
        <TouchableOpacity style={tw`ml-2`}>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
