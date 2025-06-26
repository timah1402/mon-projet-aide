import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

export default function LeaveReviewScreen() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Remplace ici par envoi Firebase ou autre logique
    console.log('Avis soumis :', { rating, comment });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4`}>

        {/* Bouton retour */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-xl font-bold mb-4`}>Laisser un avis</Text>

        {/* Note par étoiles */}
        <Text style={tw`text-base font-semibold mb-2`}>Votre note</Text>
        <View style={tw`flex-row mb-4`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={30}
                color="#facc15"
                style={tw`mr-1`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Champ texte */}
        <Text style={tw`text-base font-semibold mb-2`}>Votre avis</Text>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="Décris ton expérience..."
          value={comment}
          onChangeText={setComment}
          style={tw`border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 mb-6`}
        />

        {/* Bouton */}
        <TouchableOpacity onPress={handleSubmit} style={tw`bg-blue-600 py-3 rounded-md items-center`}>
          <Text style={tw`text-white font-semibold`}>Envoyer l’avis</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
