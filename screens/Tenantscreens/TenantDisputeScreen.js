import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function TenantDisputeScreen() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigation = useNavigation();

  const reservations = [
    { id: '1', title: 'Chambre Pikine', date: '10/06/2024 - 13/06/2024', host: 'Moussa Diagne' },
    { id: '2', title: 'Espace Almadies', date: '01/06/2024 - 03/06/2024', host: 'Fatou Sall' },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.cancelled) setImage(result.uri);
  };

  const submitDispute = () => {
    if (!selectedReservation) {
      Alert.alert('Erreur', 'Veuillez sélectionner une réservation.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire le problème.');
      return;
    }
    Alert.alert('Litige envoyé', `Votre signalement pour "${selectedReservation.title}" a été enregistré.`);
    setSelectedReservation(null);
    setDescription('');
    setImage(null);
    navigation.goBack();
  };

  const renderReservation = ({ item }) => (
    <TouchableOpacity
      style={[
        tw`bg-gray-100 rounded-xl p-4 mb-3`,
        selectedReservation?.id === item.id && tw`border-2 border-blue-600`,
      ]}
      onPress={() => setSelectedReservation(item)}
    >
      <Text style={tw`text-base font-semibold mb-1`}>{item.title}</Text>
      <Text style={tw`text-xs text-gray-600`}>Dates: {item.date}</Text>
      <Text style={tw`text-xs text-gray-600`}>Hôte: {item.host}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200 bg-white`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Signaler un litige</Text>
      </View>

      <View style={tw`p-5`}>
        <Text style={tw`text-base font-semibold text-gray-700 mb-4`}>
          Sélectionnez la réservation concernée
        </Text>

        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={renderReservation}
          contentContainerStyle={tw`pb-4`}
        />

        {selectedReservation ? (
          <>
            <View style={tw`bg-gray-100 p-4 rounded-xl mb-6`}>
              <Text style={tw`text-base font-semibold text-gray-700 mb-2`}>
                Description du problème *
              </Text>
              <TextInput
                placeholder="Ex: température non respectée, chambre sale..."
                multiline
                value={description}
                onChangeText={setDescription}
                style={tw`bg-white p-3 rounded-md h-28 text-sm`}
              />
            </View>

            <View style={tw`bg-gray-100 p-4 rounded-xl mb-6`}>
              <Text style={tw`text-base font-semibold text-gray-700 mb-2`}>
                Ajouter une photo (optionnel)
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                style={tw`bg-white border border-dashed border-gray-400 p-5 rounded-md items-center`}
              >
                {image ? (
                  <Image source={{ uri: image }} style={tw`w-48 h-48 rounded-md`} />
                ) : (
                  <>
                    <Ionicons name="image-outline" size={36} color="gray" />
                    <Text style={tw`text-gray-500 mt-2`}>Choisir une image</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={submitDispute}
              style={tw`bg-red-600 py-3 rounded-xl flex-row justify-center items-center`}
            >
              <Ionicons name="warning-outline" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white font-semibold text-base`}>Envoyer le signalement</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={tw`text-gray-500 text-sm text-center mt-8`}>
            Sélectionnez une réservation pour remplir le formulaire.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
