import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useContext(UserContext);

  const handleRegister = () => {
    if (!name || !phone || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = { name, phone };
    login(userData);

    // Naviguer vers la page d'accueil après l'inscription
    navigation.navigate('HomeScreen');
  };

  return (
    <LinearGradient
      colors={['#10B981', '#059669', '#047857']}
      style={tw`flex-1`}
    >
      <ScrollView 
        contentContainerStyle={tw`flex-grow justify-center px-6 py-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec effet glassmorphism */}
        <View style={tw`bg-white bg-opacity-10 rounded-3xl p-6 mb-6 backdrop-blur-sm`}>
          <Text style={tw`text-3xl font-bold text-center text-white mb-2`}>
            Créer un compte
          </Text>
          <Text style={tw`text-center text-green-100 text-base`}>
            Rejoignez LINCO
          </Text>
        </View>

        {/* Formulaire avec carte glassmorphism */}
        <View style={tw`bg-white bg-opacity-90 rounded-3xl p-6 shadow-2xl`}>
          {/* Champs de saisie */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Nom complet
            </Text>
            <TextInput
              placeholder="Entrez votre nom complet"
              value={name}
              onChangeText={setName}
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Numéro de téléphone
            </Text>
            <TextInput
              placeholder="Entrez votre numéro"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Mot de passe
            </Text>
            <TextInput
              placeholder="Créez un mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Confirmer le mot de passe
            </Text>
            <TextInput
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity
            onPress={handleRegister}
            style={tw`bg-gradient-to-r from-green-600 to-green-700 py-4 rounded-xl shadow-lg mb-4`}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={tw`py-4 rounded-xl`}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                Créer mon compte
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Lien vers connexion */}
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={tw`py-2`}
          >
            <Text style={tw`text-sm text-center text-gray-600`}>
              Déjà un compte ? 
              <Text style={tw`text-green-600 font-semibold`}> Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Éléments décoratifs */}
        <View style={tw`absolute top-20 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full`} />
        <View style={tw`absolute bottom-32 left-8 w-16 h-16 bg-white bg-opacity-10 rounded-full`} />
        <View style={tw`absolute top-40 left-12 w-12 h-12 bg-white bg-opacity-5 rounded-full`} />
      </ScrollView>
    </LinearGradient>
  );
}