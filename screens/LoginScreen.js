import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useContext(UserContext);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (phone === '0000' && password === 'admin123') {
      const adminData = { name: 'Admin', phone, role: 'Admin' };
      login(adminData);
      navigation.navigate('AdminDashboardScreen');
      return;
    }

    Alert.alert('Erreur', 'Identifiants invalides.');
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
        {/* Header avec logo et titre */}
        <View style={tw`items-center mb-10`}>
          {/* Logo simulé avec cercle */}
          <View style={tw`w-24 h-24 bg-white bg-opacity-20 rounded-full items-center justify-center mb-6`}>
            <View style={tw`w-16 h-16 bg-white rounded-full items-center justify-center`}>
              <Text style={tw`text-green-600 text-2xl font-bold`}>SF</Text>
            </View>
          </View>
          
          <Text style={tw`text-4xl font-bold text-white text-center mb-3`}>
            Senfrais
          </Text>
          <Text style={tw`text-center text-green-100 text-lg px-4 leading-6`}>
            Logistique de la chaîne du froid en Afrique de l'Ouest
          </Text>
        </View>

        {/* Carte de connexion */}
        <View style={tw`bg-white bg-opacity-95 rounded-3xl p-8 shadow-2xl mx-2`}>
          <Text style={tw`text-2xl font-bold text-gray-800 text-center mb-6`}>
            Connexion
          </Text>

          {/* Champ téléphone */}
          <View style={tw`mb-5`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Numéro de téléphone
            </Text>
            <TextInput
              placeholder="Entrez votre numéro"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800 text-lg`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Champ mot de passe */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
              Mot de passe
            </Text>
            <TextInput
              placeholder="Entrez votre mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={tw`bg-gray-50 rounded-xl py-4 px-4 border border-gray-200 text-gray-800 text-lg`}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Bouton de connexion */}
          <TouchableOpacity
            onPress={handleLogin}
            style={tw`mb-6 shadow-lg`}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={tw`py-4 rounded-xl`}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Se connecter
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Liens utiles */}
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity style={tw`py-2`}>
              <Text style={tw`text-green-600 font-semibold text-base`}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('RegisterScreen')}
              style={tw`py-2`}
            >
              <Text style={tw`text-green-600 font-semibold text-base`}>
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section informative */}
        <View style={tw`bg-white bg-opacity-10 rounded-2xl p-6 mt-8 mx-2`}>
          <Text style={tw`text-white text-center font-semibold text-base mb-2`}>
            🧊 Chaîne du froid sécurisée
          </Text>
          <Text style={tw`text-green-100 text-center text-sm`}>
            Transport et stockage de produits frais dans toute l'Afrique de l'Ouest
          </Text>
        </View>

        {/* Éléments décoratifs */}
        <View style={tw`absolute top-16 right-8 w-20 h-20 bg-white bg-opacity-10 rounded-full`} />
        <View style={tw`absolute bottom-20 left-6 w-16 h-16 bg-white bg-opacity-10 rounded-full`} />
        <View style={tw`absolute top-32 left-10 w-12 h-12 bg-white bg-opacity-5 rounded-full`} />
        <View style={tw`absolute bottom-40 right-12 w-14 h-14 bg-white bg-opacity-5 rounded-full`} />
      </ScrollView>
    </LinearGradient>
  );
}