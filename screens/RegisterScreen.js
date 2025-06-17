import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);

  const roles = ['Hôte', 'Locataire', 'Expéditeur', 'Chauffeur'];
  const { login } = useContext(UserContext);
  const handleRegister = () => {
    if (!name || !email || !password || !role) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    const userData = { name, email, role };
    login(userData);
    // TODO: envoyer les infos vers le backend ou les stocker
    console.log({ name, email, password, role });
    navigation.navigate('Login');
  };

  return (
    <View style={tw`flex-1 justify-center bg-green-50 px-6`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>Créer un compte</Text>

      <TextInput
        placeholder="Nom complet"
        value={name}
        onChangeText={setName}
        style={tw`bg-white rounded-md py-3 px-4 mb-3`}
      />
      <TextInput
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={tw`bg-white rounded-md py-3 px-4 mb-3`}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`bg-white rounded-md py-3 px-4 mb-3`}
      />

      <Text style={tw`text-sm font-semibold mb-2`}>Sélectionnez votre rôle :</Text>
      <View style={tw`flex-row flex-wrap mb-4`}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRole(r)}
            style={[
              tw`py-2 px-4 m-1 rounded-full border`,
              role === r ? tw`bg-green-600 border-green-600` : tw`bg-white border-gray-300`,
            ]}
          >
            <Text style={tw`${role === r ? 'text-white' : 'text-gray-800'} text-sm font-semibold`}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={tw`bg-green-600 py-3 rounded-md`}
      >
        <Text style={tw`text-white text-center font-semibold`}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={tw`mt-4`}
      >
        <Text style={tw`text-sm text-center text-gray-600`}>
          Déjà un compte ? Se connecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}
