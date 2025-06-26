import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

export default function TenantDisputeScreen() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitDispute = () => {
    if (!description.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire le problème.');
      return;
    }

    Alert.alert('Litige envoyé', 'Nous avons bien reçu votre signalement.');
    setDescription('');
    setImage(null);
    navigation.goBack();
  };

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
        {/* Bloc principal */}
        <View style={tw`bg-gray-100 p-4 rounded-xl mb-6`}>
          <Text style={tw`text-sm text-gray-700 mb-2 font-semibold`}>Description du problème *</Text>
          <TextInput
            placeholder="Ex: température anormale, chambre sale..."
            multiline
            value={description}
            onChangeText={setDescription}
            style={tw`bg-white p-3 rounded-md h-28 text-sm`}
          />
        </View>

        {/* Bloc image */}
        <View style={tw`bg-gray-100 p-4 rounded-xl mb-6`}>
          <Text style={tw`text-sm text-gray-700 mb-2 font-semibold`}>Ajouter une photo (optionnel)</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={tw`bg-white border border-dashed border-gray-400 rounded-md p-5 items-center`}
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

        {/* Bouton d'envoi */}
        <TouchableOpacity
          onPress={submitDispute}
          style={tw`bg-red-600 py-3 rounded-xl flex-row justify-center items-center`}
        >
          <Ionicons name="warning-outline" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-base`}>Envoyer le signalement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
