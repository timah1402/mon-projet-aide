import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-100 px-6`}>
      <Text style={tw`text-2xl font-bold mb-2`}>Connexion à Senfrais</Text>
      <Text style={tw`text-center text-gray-600 mb-6`}>
        Logistique de la chaîne du froid en Afrique de l’Ouest
      </Text>

      <TextInput
        placeholder="votremail@gmail.com"
        style={tw`bg-white rounded-md w-full py-3 px-4 mb-4`}
      />
      <TextInput
        placeholder="mot de passe"
        secureTextEntry
        style={tw`bg-white rounded-md w-full py-3 px-4 mb-4`}
      />

      <TouchableOpacity style={tw`bg-green-600 w-full py-3 rounded-md mb-4`}>
        <Text style={tw`text-white text-center font-semibold`}>Se connecter</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-between w-full`}>
        <TouchableOpacity>
          <Text style={tw`text-sm text-gray-600`}>mot de passe oublié</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={tw`text-sm text-gray-600`}>créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
