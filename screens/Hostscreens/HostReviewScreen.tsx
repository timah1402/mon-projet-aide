import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function HostReviewScreen() {
  // Navigation removed

  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Fatou Ndiaye',
      listing: 'Chambre froide Port',
      date: '12 juin 2025',
      reviewed: false,
      comment: '',
      rating: 0,
    },
    {
      id: '2',
      name: 'Aliou Ba',
      listing: 'Espace Almadies',
      date: '5 juin 2025',
      reviewed: true,
      comment: 'Client ponctuel et respectueux.',
      rating: 5,
    },
  ]);

  const submitReview = (id) => {
    const updated = reviews.map(r =>
      r.id === id ? { ...r, reviewed: true } : r
    );
    setReviews(updated);
    Alert.alert('Merci', 'Votre avis a été enregistré.');
  };

  const handleRating = (id, value) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, rating: value } : r))
    );
  };

  const handleComment = (id, text) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, comment: text } : r))
    );
  };

  const renderStars = (current, id) => {
    return (
      <View style={tw`flex-row`}>
        {[1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity key={i} onPress={() => handleRating(id, i)}>
            <Ionicons
              name={i <= current ? 'star' : 'star-outline'}
              size={20}
              color="#fbbf24"
              style={tw`mr-1`}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={tw`bg-gray-100 rounded-xl shadow-md px-4 py-4 mb-4 mx-4`}>
      <View style={tw`flex-row justify-between mb-1`}>
        <Text style={tw`font-semibold text-base`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
      </View>
      <Text style={tw`text-sm text-gray-600 mb-2`}>🧊 {item.listing}</Text>

      {item.reviewed ? (
        <View>
          <View style={tw`flex-row items-center mb-1`}>
            {renderStars(item.rating, item.id)}
          </View>
          <Text style={tw`text-sm text-gray-700`}>{item.comment}</Text>
        </View>
      ) : (
        <View>
          <View style={tw`mb-2`}>
            {renderStars(item.rating, item.id)}
          </View>
          <TextInput
            placeholder="Écrivez votre avis..."
            multiline
            numberOfLines={3}
            value={item.comment}
            onChangeText={(text) => handleComment(item.id, text)}
            style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm`}
          />
          <TouchableOpacity
            onPress={() => submitReview(item.id)}
            disabled={item.rating === 0 || item.comment.trim() === ''}
            style={tw`bg-blue-600 px-4 py-2 rounded-full`}
          >
            <Text style={tw`text-white text-sm text-center font-semibold`}>Soumettre l'avis</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Avis des clients</Text>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`pt-4 pb-10`}
      />
    </SafeAreaView>
  );
}
