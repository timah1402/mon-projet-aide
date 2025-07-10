import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
// Removed navigation import

export default function TenantReviewScreen() {
  // Navigation removed

  // Réservations passées (non notées)
  const [reservations, setReservations] = useState([
    {
      id: 'res1',
      title: 'Chambre froide Pikine',
      host: 'Moussa Diagne',
      date: '10/06/2024 - 13/06/2024',
    },
    {
      id: 'res2',
      title: 'Espace Almadies',
      host: 'Fatou Sall',
      date: '01/06/2024 - 03/06/2024',
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitReview = () => {
    if (rating === 0) {
      Alert.alert('Note requise', 'Veuillez sélectionner une note.');
      return;
    }

    Alert.alert('Merci !', 'Votre avis a été enregistré.');

    setReservations((prev) =>
      prev.filter((res) => res.id !== selectedReservation.id)
    );
    setSelectedReservation(null);
    setRating(0);
    setComment('');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200 bg-white`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Laisser un avis</Text>
      </View>

      <ScrollView style={tw`p-4`}>
        {!selectedReservation ? (
          <>
            <Text style={tw`text-base font-semibold mb-4`}>
              Réservations passées
            </Text>
            {reservations.map((res) => (
              <View
                key={res.id}
                style={tw`bg-gray-100 rounded-xl p-4 mb-3 shadow-sm`}
              >
                <Text style={tw`text-base font-semibold mb-1`}>{res.title}</Text>
                <Text style={tw`text-sm text-gray-600 mb-1`}>
                  👤 {res.host}
                </Text>
                <Text style={tw`text-sm text-gray-600 mb-2`}>
                  📅 {res.date}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedReservation(res)}
                  style={tw`bg-blue-600 px-4 py-2 rounded-md items-center`}
                >
                  <Text style={tw`text-white font-medium`}>Donner un avis</Text>
                </TouchableOpacity>
              </View>
            ))}
            {reservations.length === 0 && (
              <Text style={tw`text-center text-gray-500 mt-10`}>
                🎉 Toutes vos réservations ont été notées !
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={tw`text-base font-semibold mb-2`}>
              Avis pour : {selectedReservation.title}
            </Text>
            <Text style={tw`text-sm text-gray-600 mb-4`}>
              {selectedReservation.date} – Hôte : {selectedReservation.host}
            </Text>

            <View style={tw`bg-gray-100 rounded-xl p-5 mb-5`}>
              <Text style={tw`text-base font-semibold text-gray-700 mb-2`}>
                Votre note
              </Text>
              <View style={tw`flex-row`}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => setRating(num)}
                    style={tw`mr-2`}
                  >
                    <Ionicons
                      name={num <= rating ? 'star' : 'star-outline'}
                      size={32}
                      color={num <= rating ? '#facc15' : 'gray'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={tw`bg-gray-100 rounded-xl p-5 mb-6`}>
              <Text style={tw`text-base font-semibold text-gray-700 mb-2`}>
                Commentaire (optionnel)
              </Text>
              <TextInput
                multiline
                value={comment}
                onChangeText={setComment}
                placeholder="Ex: chambre propre et bien refroidie"
                style={tw`bg-white p-3 rounded-md h-28 text-sm`}
              />
            </View>

            <TouchableOpacity
              onPress={submitReview}
              style={tw`bg-blue-600 py-3 rounded-xl flex-row justify-center items-center mb-4`}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="white"
                style={tw`mr-2`}
              />
              <Text style={tw`text-white font-semibold text-base`}>
                Envoyer l'avis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedReservation(null)}
              style={tw`items-center`}
            >
              <Text style={tw`text-sm text-gray-500 underline`}>
                ← Retour à la liste
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
