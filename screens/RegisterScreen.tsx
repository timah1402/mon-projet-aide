import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
// Removed navigation import
import { UserContext } from '../context/UserContext';
import { router } from 'expo-router';

export default function RegisterScreen() {
  // Navigation removed
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(null);
  
  // Champs spécifiques pour le chauffeur
  const [permisPhoto, setPermisPhoto] = useState(null);
  const [carteGrisePhoto, setCarteGrisePhoto] = useState(null);

  // Champs spécifiques pour le vendeur
  const [boutiquePhoto, setBoutiquePhoto] = useState(null);
  const [registreCommerce, setRegistreCommerce] = useState('');
  const [specialites, setSpecialites] = useState([]);
  const [localisationBoutique, setLocalisationBoutique] = useState('');

  const roles = ['Hôte', 'Locataire', 'Expéditeur', 'Chauffeur', 'Vendeur','client'];
  const { login } = useContext(UserContext);

  const specialitesOptions = ['Poissons', 'Fruits de mer', 'Légumes', 'Fruits', 'Viandes', 'Produits laitiers'];

  // Fonction pour sélectionner une image
  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'permis') {
        setPermisPhoto(result.assets[0].uri);
      } else if (type === 'carteGrise') {
        setCarteGrisePhoto(result.assets[0].uri);
      } else if (type === 'boutique') {
        setBoutiquePhoto(result.assets[0].uri);
      }
    }
  };

  // Fonction pour prendre une photo
  const takePhoto = async (type) => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'permis') {
        setPermisPhoto(result.assets[0].uri);
      } else if (type === 'carteGrise') {
        setCarteGrisePhoto(result.assets[0].uri);
      } else if (type === 'boutique') {
        setBoutiquePhoto(result.assets[0].uri);
      }
    }
  };

  // Fonction pour afficher les options d'image
  const showImageOptions = (type) => {
    Alert.alert(
      'Sélectionner une image',
      'Choisissez une option',
      [
        { text: 'Prendre une photo', onPress: () => takePhoto(type) },
        { text: 'Choisir depuis la galerie', onPress: () => pickImage(type) },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const handleRegister = () => {
    if (!name || !phone || !password || !confirmPassword || !role) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Validation spécifique pour le chauffeur
    if (role === 'Chauffeur' && (!permisPhoto || !carteGrisePhoto)) {
      Alert.alert('Erreur', 'Veuillez ajouter les photos du permis et de la carte grise.');
      return;
    }

    // Validation spécifique pour le vendeur
    if (role === 'Vendeur' && (!boutiquePhoto || !localisationBoutique || specialites.length === 0)) {
      Alert.alert('Erreur', 'Veuillez ajouter une photo de votre boutique, votre localisation et au moins une spécialité.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = { 
      name, 
      phone, 
      role,
      // Ajouter les informations du chauffeur si applicable
      ...(role === 'Chauffeur' && { 
        permisPhoto, 
        carteGrisePhoto 
      }),
      // Ajouter les informations du vendeur si applicable
      ...(role === 'Vendeur' && { 
        boutiquePhoto, 
        registreCommerce,
        specialites,
        localisationBoutique
      })
    };
    login(userData);

    switch (role) {
      case 'Hôte':
        router.replace('/host-dashboard');
        break;
      case 'Locataire':
        router.replace('/tenant-dashboard');
        break;
      case 'Expéditeur':
        router.replace('/expediteur-dashboard');
        break;
      case 'Chauffeur':
        router.replace('/chauffeur-dashboard');
        break;
      case 'Vendeur':
        router.replace('/vendeur-dashboard');
        break;
      case 'client':
        router.replace('/customer-dashboard');
        break;
      default:
        router.replace('/login');
    }
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
            Rejoignez notre communauté
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

          {/* Sélection du rôle */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-gray-700 text-sm font-semibold mb-3 ml-1`}>
              Sélectionnez votre rôle
            </Text>
            <View style={tw`flex-row flex-wrap`}>
              {roles.map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setRole(r)}
                  style={[
                    tw`py-3 px-6 m-1 rounded-full border-2 shadow-sm`,
                    role === r 
                      ? tw`bg-green-600 border-green-600` 
                      : tw`bg-white border-gray-300`,
                  ]}
                >
                  <Text style={tw`${role === r ? 'text-white' : 'text-gray-700'} text-sm font-semibold`}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Champs spécifiques pour le vendeur */}
          {role === 'Vendeur' && (
            <View style={tw`mb-6 bg-orange-50 rounded-xl p-4 border border-orange-200`}>
              <Text style={tw`text-orange-800 text-lg font-semibold mb-4 text-center`}>
                Informations du vendeur
              </Text>
              
              {/* Photo de la boutique */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
                  Photo de votre boutique/stand
                </Text>
                <TouchableOpacity
                  onPress={() => showImageOptions('boutique')}
                  style={tw`bg-white rounded-xl border-2 border-dashed border-gray-300 py-6 px-4 items-center justify-center`}
                >
                  {boutiquePhoto ? (
                    <View style={tw`items-center`}>
                      <Image 
                        source={{ uri: boutiquePhoto }} 
                        style={tw`w-32 h-24 rounded-lg mb-2`}
                        resizeMode="cover"
                      />
                      <Text style={tw`text-orange-600 text-sm font-semibold`}>
                        Photo ajoutée ✓
                      </Text>
                      <Text style={tw`text-gray-500 text-xs mt-1`}>
                        Appuyez pour modifier
                      </Text>
                    </View>
                  ) : (
                    <View style={tw`items-center`}>
                      <Ionicons name="storefront" size={32} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-sm mt-2`}>
                        Ajouter une photo de votre boutique
                      </Text>
                      <Text style={tw`text-gray-400 text-xs mt-1`}>
                        Appuyez pour prendre une photo ou sélectionner
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Localisation */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
                  Localisation de votre boutique
                </Text>
                <TextInput
                  placeholder="Ex: Marché de Soumbédioune, Dakar"
                  value={localisationBoutique}
                  onChangeText={setLocalisationBoutique}
                  style={tw`bg-white rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Registre de commerce (optionnel) */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
                  Numéro de registre de commerce (optionnel)
                </Text>
                <TextInput
                  placeholder="Entrez votre numéro de registre"
                  value={registreCommerce}
                  onChangeText={setRegistreCommerce}
                  style={tw`bg-white rounded-xl py-4 px-4 border border-gray-200 text-gray-800`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Spécialités */}
              <View style={tw`mb-0`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-3 ml-1`}>
                  Vos spécialités (choisissez au moins une)
                </Text>
                <View style={tw`flex-row flex-wrap`}>
                  {specialitesOptions.map((spec) => (
                    <TouchableOpacity
                      key={spec}
                      onPress={() => {
                        if (specialites.includes(spec)) {
                          setSpecialites(specialites.filter(s => s !== spec));
                        } else {
                          setSpecialites([...specialites, spec]);
                        }
                      }}
                      style={[
                        tw`py-2 px-4 m-1 rounded-full border-2 shadow-sm`,
                        specialites.includes(spec)
                          ? tw`bg-orange-600 border-orange-600` 
                          : tw`bg-white border-gray-300`,
                      ]}
                    >
                      <Text style={tw`${specialites.includes(spec) ? 'text-white' : 'text-gray-700'} text-xs font-semibold`}>
                        {spec}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Champs spécifiques pour le chauffeur */}
          {role === 'Chauffeur' && (
            <View style={tw`mb-6 bg-green-50 rounded-xl p-4 border border-green-200`}>
              <Text style={tw`text-green-800 text-lg font-semibold mb-4 text-center`}>
                Documents du chauffeur
              </Text>
              
              {/* Photo du permis */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
                  Photo du permis de conduire
                </Text>
                <TouchableOpacity
                  onPress={() => showImageOptions('permis')}
                  style={tw`bg-white rounded-xl border-2 border-dashed border-gray-300 py-6 px-4 items-center justify-center`}
                >
                  {permisPhoto ? (
                    <View style={tw`items-center`}>
                      <Image 
                        source={{ uri: permisPhoto }} 
                        style={tw`w-32 h-24 rounded-lg mb-2`}
                        resizeMode="cover"
                      />
                      <Text style={tw`text-green-600 text-sm font-semibold`}>
                        Permis ajouté ✓
                      </Text>
                      <Text style={tw`text-gray-500 text-xs mt-1`}>
                        Appuyez pour modifier
                      </Text>
                    </View>
                  ) : (
                    <View style={tw`items-center`}>
                      <Ionicons name="camera" size={32} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-sm mt-2`}>
                        Ajouter une photo du permis
                      </Text>
                      <Text style={tw`text-gray-400 text-xs mt-1`}>
                        Appuyez pour prendre une photo ou sélectionner
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Photo de la carte grise */}
              <View style={tw`mb-0`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 ml-1`}>
                  Photo de la carte grise
                </Text>
                <TouchableOpacity
                  onPress={() => showImageOptions('carteGrise')}
                  style={tw`bg-white rounded-xl border-2 border-dashed border-gray-300 py-6 px-4 items-center justify-center`}
                >
                  {carteGrisePhoto ? (
                    <View style={tw`items-center`}>
                      <Image 
                        source={{ uri: carteGrisePhoto }} 
                        style={tw`w-32 h-24 rounded-lg mb-2`}
                        resizeMode="cover"
                      />
                      <Text style={tw`text-green-600 text-sm font-semibold`}>
                        Carte grise ajoutée ✓
                      </Text>
                      <Text style={tw`text-gray-500 text-xs mt-1`}>
                        Appuyez pour modifier
                      </Text>
                    </View>
                  ) : (
                    <View style={tw`items-center`}>
                      <Ionicons name="document" size={32} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-sm mt-2`}>
                        Ajouter une photo de la carte grise
                      </Text>
                      <Text style={tw`text-gray-400 text-xs mt-1`}>
                        Appuyez pour prendre une photo ou sélectionner
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

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
            onPress={() => router.replace('/login')}
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