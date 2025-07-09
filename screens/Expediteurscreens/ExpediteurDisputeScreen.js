import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function ExpediteurDisputeScreen() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const navigation = useNavigation();

  const deliveries = [
    { id: '1', label: 'Livraison Pikine → Almadies', driver: 'Ousmane Sarr', date: '25/06/2024' },
    { id: '2', label: 'Livraison Rufisque → VDN', driver: 'Aminata Fall', date: '20/06/2024' },
    { id: '3', label: 'Livraison Thiaroye → HLM', driver: '—', date: '18/06/2024' },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.cancelled) setImage(result.uri);
  };

  const submitDispute = () => {
    if (!selectedDelivery) {
      Alert.alert('Erreur', 'Veuillez sélectionner une livraison.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire le problème.');
      return;
    }
    Alert.alert('Signalement envoyé', `Votre problème pour "${selectedDelivery.label}" a été enregistré.`);
    setSelectedDelivery(null);
    setDescription('');
    setImage(null);
    navigation.goBack();
  };

  const renderDelivery = ({ item }) => (
    <TouchableOpacity
      style={[
        tw`bg-gray-100 rounded-xl p-4 mb-3`,
        selectedDelivery?.id === item.id && tw`border-2 border-blue-600`,
      ]}
      onPress={() => setSelectedDelivery(item)}
    >
      <Text style={tw`text-base font-semibold mb-1`}>{item.label}</Text>
      <Text style={tw`text-xs text-gray-600`}>Chauffeur: {item.driver}</Text>
      <Text style={tw`text-xs text-gray-600`}>Date: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200 bg-white`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Signaler un problème</Text>
      </View>

      <View style={tw`p-5`}>
        <Text style={tw`text-base font-semibold text-gray-700 mb-4`}>
          Sélectionnez la livraison concernée
        </Text>

        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id}
          renderItem={renderDelivery}
          contentContainerStyle={tw`pb-4`}
        />

        {selectedDelivery ? (
          <>
            <View style={tw`bg-gray-100 p-4 rounded-xl mb-6`}>
              <Text style={tw`text-base font-semibold text-gray-700 mb-2`}>
                Description du problème *
              </Text>
              <TextInput
                placeholder="Ex: température non respectée, retard..."
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
            Sélectionnez une livraison pour remplir le formulaire.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
