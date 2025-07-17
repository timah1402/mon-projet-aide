// screens/AddProductScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  Image, 
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AddProductScreen() {
  // États pour les informations du produit
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [prix, setPrix] = useState('');
  const [unite, setUnite] = useState('kg');
  const [stock, setStock] = useState('');
  const [stockMin, setStockMin] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [bio, setBio] = useState(false);
  const [tags, setTags] = useState([]);
  const [tempTag, setTempTag] = useState('');

  // États pour les promotions
  const [enPromotion, setEnPromotion] = useState(false);
  const [pourcentageReduction, setPourcentageReduction] = useState('');
  const [dateDebutPromo, setDateDebutPromo] = useState('');
  const [dateFinPromo, setDateFinPromo] = useState('');
  const [dureePromotion, setDureePromotion] = useState('7'); // en jours

  // Animation states
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Options disponibles
  const categories = [
    { name: 'Poissons', icon: '🐟', color: '#3B82F6' },
    { name: 'Fruits de mer', icon: '🦐', color: '#06B6D4' },
    { name: 'Légumes', icon: '🥬', color: '#10B981' },
    { name: 'Fruits', icon: '🍎', color: '#F59E0B' },
    { name: 'Viandes', icon: '🥩', color: '#EF4444' },
    { name: 'Produits laitiers', icon: '🥛', color: '#8B5CF6' },
    { name: 'Céréales', icon: '🌾', color: '#D97706' },
    { name: 'Épices', icon: '🌶️', color: '#DC2626' },
    { name: 'Autres', icon: '📦', color: '#6B7280' }
  ];
  
  const unites = [
    { value: 'kg', label: 'Kilogramme', icon: 'fitness' },
    { value: 'pièce', label: 'À l\'unité', icon: 'cube' },
    { value: 'litre', label: 'Litre', icon: 'water' },
    { value: 'paquet', label: 'Paquet', icon: 'bag' }
  ];

  // Durées de promotion prédéfinies
  const dureesPromotion = [
    { value: '1', label: '1 jour', icon: 'flash' },
    { value: '3', label: '3 jours', icon: 'time' },
    { value: '7', label: '1 semaine', icon: 'calendar' },
    { value: '14', label: '2 semaines', icon: 'calendar-outline' },
    { value: '30', label: '1 mois', icon: 'calendar-sharp' },
    { value: 'custom', label: 'Personnalisé', icon: 'settings' }
  ];

  // Fonction pour calculer le prix avec réduction
  const calculerPrixPromo = () => {
    if (!prix || !pourcentageReduction) return 0;
    const prixOriginal = parseFloat(prix);
    const reduction = parseFloat(pourcentageReduction);
    return prixOriginal - (prixOriginal * reduction / 100);
  };

  // Fonction pour calculer les dates de promotion
  const calculerDateFinPromo = () => {
    if (!dureePromotion || dureePromotion === 'custom') return;
    
    const dateDebut = new Date();
    const dateFin = new Date(dateDebut);
    dateFin.setDate(dateDebut.getDate() + parseInt(dureePromotion));
    
    setDateDebutPromo(dateDebut.toISOString().split('T')[0]);
    setDateFinPromo(dateFin.toISOString().split('T')[0]);
  };

  React.useEffect(() => {
    if (enPromotion && dureePromotion !== 'custom') {
      calculerDateFinPromo();
    }
  }, [enPromotion, dureePromotion]);

  // Fonction pour ajouter des photos
  const addPhoto = async () => {
    if (photos.length >= 5) {
      Alert.alert('Limite atteinte', 'Vous pouvez ajouter maximum 5 photos');
      return;
    }

    Alert.alert(
      'Ajouter une photo',
      'Choisissez une option',
      [
        { text: 'Prendre une photo', onPress: () => takePhoto() },
        { text: 'Choisir depuis la galerie', onPress: () => pickImage() },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const addTag = () => {
    if (tempTag.trim() && !tags.includes(tempTag.trim())) {
      setTags([...tags, tempTag.trim()]);
      setTempTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // Validation
    if (!nom || !description || !categorie || !prix || !stock || !localisation) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (photos.length === 0) {
      Alert.alert('Erreur', 'Veuillez ajouter au moins une photo du produit.');
      return;
    }

    if (isNaN(parseFloat(prix)) || parseFloat(prix) <= 0) {
      Alert.alert('Erreur', 'Le prix doit être un nombre valide.');
      return;
    }

    if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      Alert.alert('Erreur', 'Le stock doit être un nombre valide.');
      return;
    }

    // Validation des promotions
    if (enPromotion) {
      if (!pourcentageReduction || parseFloat(pourcentageReduction) <= 0 || parseFloat(pourcentageReduction) >= 100) {
        Alert.alert('Erreur', 'Le pourcentage de réduction doit être entre 1 et 99%.');
        return;
      }
      
      if (dureePromotion === 'custom' && (!dateDebutPromo || !dateFinPromo)) {
        Alert.alert('Erreur', 'Veuillez définir les dates de début et fin de promotion.');
        return;
      }
    }

    // Créer l'objet promotion si applicable
    const promotion = enPromotion ? {
      actif: true,
      pourcentageReduction: parseFloat(pourcentageReduction),
      dateDebut: dateDebutPromo,
      dateFin: dateFinPromo,
      prixOriginal: parseFloat(prix),
      prixPromo: calculerPrixPromo(),
      dateCreation: new Date().toISOString()
    } : null;

    // Créer l'objet produit
    const produit = {
      nom,
      description,
      categorie,
      prix: parseFloat(prix),
      unite,
      stock: parseInt(stock),
      stockMin: stockMin ? parseInt(stockMin) : 5,
      localisation,
      photos,
      bio,
      tags,
      promotion,
      dateCreation: new Date().toISOString(),
      vendeurId: 'current_user_id',
      statut: 'Disponible'
    };

    console.log('Produit à ajouter:', produit);

    Alert.alert(
      'Succès',
      enPromotion 
        ? `Votre produit a été ajouté avec une promotion de ${pourcentageReduction}% !`
        : 'Votre produit a été ajouté à la marketplace !',
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const CategoryCard = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`m-1 rounded-2xl border-2 overflow-hidden w-20`,
        isSelected 
          ? { borderColor: category.color, backgroundColor: `${category.color}15` }
          : tw`border-gray-200 bg-white`
      ]}
    >
      <View style={tw`py-3 px-2 items-center`}>
        <Text style={tw`text-2xl mb-1`}>{category.icon}</Text>
        <Text style={[
          tw`text-xs font-semibold text-center`,
          { color: isSelected ? category.color : '#374151' }
        ]}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const UniteCard = ({ unite, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`flex-1 mx-1 rounded-xl py-3 px-2 items-center border-2`,
        isSelected 
          ? tw`bg-green-500 border-green-500` 
          : tw`bg-white border-gray-200`
      ]}
    >
      <Ionicons 
        name={unite.icon} 
        size={20} 
        color={isSelected ? 'white' : '#6B7280'} 
      />
      <Text style={[
        tw`text-xs font-semibold mt-1 text-center`,
        { color: isSelected ? 'white' : '#374151' }
      ]}>
        {unite.value}
      </Text>
    </TouchableOpacity>
  );

  const DureePromoCard = ({ duree, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`mx-1 rounded-xl py-3 px-4 items-center border-2 min-w-20`,
        isSelected 
          ? tw`bg-yellow-500 border-yellow-500` 
          : tw`bg-white border-gray-200`
      ]}
    >
      <Ionicons 
        name={duree.icon} 
        size={16} 
        color={isSelected ? 'white' : '#6B7280'} 
      />
      <Text style={[
        tw`text-xs font-semibold mt-1 text-center`,
        { color: isSelected ? 'white' : '#374151' }
      ]}>
        {duree.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header avec dégradé */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={tw`pb-4`}
      >
        <View style={tw`flex-row items-center pt-4 px-4`}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={[tw`rounded-full p-2 mr-4`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl font-bold text-white`}>Nouveau produit</Text>
            <Text style={tw`text-green-100 text-sm`}>Ajoutez votre produit à la marketplace</Text>
          </View>
          <View style={[tw`rounded-full p-3`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="storefront" size={24} color="white" />
          </View>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[
          tw`flex-1`,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView 
          style={tw`flex-1`}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Photos avec design amélioré */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-4`}>
              <View style={tw`bg-blue-100 rounded-full p-2 mr-3`}>
                <Ionicons name="camera" size={20} color="#3B82F6" />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>Photos du produit</Text>
                <Text style={tw`text-gray-500 text-sm`}>Ajoutez jusqu'à 5 photos attrayantes</Text>
              </View>
              <View style={tw`bg-red-100 rounded-full py-1 px-3`}>
                <Text style={tw`text-red-600 text-xs font-semibold`}>Obligatoire</Text>
              </View>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
              {photos.map((photo, index) => (
                <View key={index} style={tw`mr-3 relative`}>
                  <Image 
                    source={{ uri: photo }} 
                    style={tw`w-28 h-28 rounded-xl`}
                    resizeMode="cover"
                  />
                  {index === 0 && (
                    <View style={tw`absolute top-1 left-1 bg-green-500 rounded-full py-1 px-2`}>
                      <Text style={tw`text-white text-xs font-bold`}>Principal</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => removePhoto(index)}
                    style={tw`absolute -top-2 -right-2 bg-red-500 rounded-full w-7 h-7 items-center justify-center shadow-lg`}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity
                onPress={addPhoto}
                style={tw`w-28 h-28 border-2 border-dashed border-green-300 rounded-xl items-center justify-center bg-green-50`}
              >
                <Ionicons name="add" size={28} color="#10B981" />
                <Text style={tw`text-xs text-green-600 font-semibold mt-1`}>Ajouter</Text>
              </TouchableOpacity>
            </ScrollView>
            
            <View style={tw`bg-gray-50 rounded-xl p-3`}>
              <Text style={tw`text-xs text-gray-600 text-center`}>
                📸 {photos.length}/5 photos • 💡 Conseil: utilisez un bon éclairage pour de meilleures ventes
              </Text>
            </View>
          </View>

          {/* Informations de base avec design amélioré */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={tw`bg-purple-100 rounded-full p-2 mr-3`}>
                <MaterialIcons name="info" size={20} color="#8B5CF6" />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800`}>Informations de base</Text>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-2 flex-row items-center`}>
                Nom du produit <Text style={tw`text-red-500`}>*</Text>
              </Text>
              <View style={tw`bg-gray-50 rounded-xl border-2 border-gray-100`}>
                <TextInput
                  placeholder="Ex: Thiof frais du jour, extra qualité"
                  value={nom}
                  onChangeText={setNom}
                  style={tw`py-4 px-4 text-gray-800 text-base`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                Description détaillée <Text style={tw`text-red-500`}>*</Text>
              </Text>
              <View style={tw`bg-gray-50 rounded-xl border-2 border-gray-100`}>
                <TextInput
                  placeholder="Décrivez votre produit: origine, qualité, fraîcheur, conseils de préparation..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  style={tw`py-4 px-4 text-gray-800 text-base h-28`}
                  placeholderTextColor="#9CA3AF"
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-3`}>
                Catégorie <Text style={tw`text-red-500`}>*</Text>
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={tw`flex-row`}>
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.name}
                      category={cat}
                      isSelected={categorie === cat.name}
                      onPress={() => setCategorie(cat.name)}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* Prix et stock avec design premium */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={tw`bg-yellow-100 rounded-full p-2 mr-3`}>
                <Ionicons name="pricetag" size={20} color="#F59E0B" />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800`}>Prix et disponibilité</Text>
            </View>
            
            <View style={tw`bg-green-50 rounded-xl p-4 mb-4`}>
              <View style={tw`flex-row items-center mb-3`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2 flex-1`}>
                  Prix unitaire <Text style={tw`text-red-500`}>*</Text>
                </Text>
                <Text style={tw`text-green-600 text-xs font-semibold`}>CFA</Text>
              </View>
              <View style={tw`bg-white rounded-xl border-2 border-white shadow-sm`}>
                <TextInput
                  placeholder="2500"
                  value={prix}
                  onChangeText={setPrix}
                  keyboardType="numeric"
                  style={tw`py-4 px-4 text-gray-800 text-lg font-semibold`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-3`}>
                Unité de vente <Text style={tw`text-red-500`}>*</Text>
              </Text>
              <View style={tw`flex-row`}>
                {unites.map((u) => (
                  <UniteCard
                    key={u.value}
                    unite={u}
                    isSelected={unite === u.value}
                    onPress={() => setUnite(u.value)}
                  />
                ))}
              </View>
            </View>

            <View style={tw`flex-row`}>
              <View style={tw`flex-1 mr-2`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                  Stock disponible <Text style={tw`text-red-500`}>*</Text>
                </Text>
                <View style={tw`bg-gray-50 rounded-xl border-2 border-gray-100`}>
                  <TextInput
                    placeholder="100"
                    value={stock}
                    onChangeText={setStock}
                    keyboardType="numeric"
                    style={tw`py-4 px-4 text-gray-800 text-base`}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
              
              <View style={tw`flex-1 ml-2`}>
                <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                  Stock minimum (alerte)
                </Text>
                <View style={tw`bg-gray-50 rounded-xl border-2 border-gray-100`}>
                  <TextInput
                    placeholder="5"
                    value={stockMin}
                    onChangeText={setStockMin}
                    keyboardType="numeric"
                    style={tw`py-4 px-4 text-gray-800 text-base`}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Section Promotions - NOUVEAU */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={tw`bg-yellow-100 rounded-full p-2 mr-3`}>
                <Ionicons name="flash" size={20} color="#F97316" />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800`}>Promotions</Text>
              <View style={tw`bg-yellow-100 rounded-full py-1 px-3 ml-2`}>
                <Text style={tw`text-yellow-600 text-xs font-semibold`}>🔥 Boost ventes</Text>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={() => setEnPromotion(!enPromotion)}
              style={tw`flex-row items-center py-4 px-4 bg-yellow-50 rounded-xl mb-4 border border-yellow-100`}
            >
              <View style={[
                tw`w-6 h-6 rounded-full mr-3 items-center justify-center`,
                enPromotion ? tw`bg-yellow-500` : tw`bg-gray-300`
              ]}>
                {enPromotion && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-800 font-semibold`}>Mettre ce produit en promotion</Text>
                <Text style={tw`text-gray-500 text-xs`}>Attirez plus de clients avec des prix réduits</Text>
              </View>
              <Text style={tw`text-2xl`}>🏷️</Text>
            </TouchableOpacity>

            {enPromotion && (
              <View style={tw`bg-yellow-50 rounded-xl p-4 border border-yellow-200`}>
                <View style={tw`flex-row mb-4`}>
                  <View style={tw`flex-1 mr-2`}>
                    <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                      Réduction (%) <Text style={tw`text-red-500`}>*</Text>
                    </Text>
                    <View style={tw`bg-white rounded-xl border-2 border-yellow-100`}>
                      <TextInput
                        placeholder="15"
                        value={pourcentageReduction}
                        onChangeText={setPourcentageReduction}
                        keyboardType="numeric"
                        style={tw`py-3 px-4 text-gray-800 text-base font-semibold`}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </View>
                  
                  <View style={tw`flex-1 ml-2 justify-end`}>
                    <View style={tw`bg-white rounded-xl border-2 border-yellow-100 py-3 px-4`}>
                      <Text style={tw`text-xs text-gray-500 mb-1`}>Prix promotionnel</Text>
                      <Text style={tw`text-lg font-bold text-yellow-600`}>
                        {prix && pourcentageReduction ? `${calculerPrixPromo().toFixed(0)} CFA` : '0 CFA'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={tw`mb-4`}>
                  <Text style={tw`text-gray-700 text-sm font-semibold mb-3`}>
                    Durée de la promotion
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={tw`flex-row`}>
                      {dureesPromotion.map((duree) => (
                        <DureePromoCard
                          key={duree.value}
                          duree={duree}
                          isSelected={dureePromotion === duree.value}
                          onPress={() => setDureePromotion(duree.value)}
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>

                {dureePromotion === 'custom' && (
                  <View style={tw`flex-row`}>
                    <View style={tw`flex-1 mr-2`}>
                      <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                        Date de début
                      </Text>
                      <View style={tw`bg-white rounded-xl border-2 border-yellow-100`}>
                        <TextInput
                          placeholder="2024-01-15"
                          value={dateDebutPromo}
                          onChangeText={setDateDebutPromo}
                          style={tw`py-3 px-4 text-gray-800 text-base`}
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>
                    
                    <View style={tw`flex-1 ml-2`}>
                      <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                        Date de fin
                      </Text>
                      <View style={tw`bg-white rounded-xl border-2 border-yellow-100`}>
                        <TextInput
                          placeholder="2024-01-22"
                          value={dateFinPromo}
                          onChangeText={setDateFinPromo}
                          style={tw`py-3 px-4 text-gray-800 text-base`}
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>
                  </View>
                )}

                {/* Aperçu de la promotion */}
                {prix && pourcentageReduction && (
                  <View style={tw`bg-white rounded-xl p-4 mt-4 border-2 border-yellow-200`}>
                    <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Aperçu de votre promotion :</Text>
                    <View style={tw`flex-row items-center justify-between`}>
                      <View>
                        <Text style={tw`text-xs text-gray-500`}>Prix original</Text>
                        <Text style={tw`text-lg text-gray-400 line-through`}>{prix} CFA</Text>
                      </View>
                      <View style={tw`bg-yellow-500 rounded-full py-1 px-3`}>
                        <Text style={tw`text-white text-xs font-bold`}>-{pourcentageReduction}%</Text>
                      </View>
                      <View>
                        <Text style={tw`text-xs text-gray-500`}>Prix promo</Text>
                        <Text style={tw`text-xl font-bold text-yellow-600`}>{calculerPrixPromo().toFixed(0)} CFA</Text>
                      </View>
                    </View>
                    <View style={tw`bg-yellow-50 rounded-lg p-3 mt-3`}>
                      <Text style={tw`text-xs text-yellow-700 text-center`}>
                        💰 Économie de {(parseFloat(prix) - calculerPrixPromo()).toFixed(0)} CFA par {unite}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Localisation avec icône de map */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-4`}>
              <View style={tw`bg-red-100 rounded-full p-2 mr-3`}>
                <Ionicons name="location" size={20} color="#EF4444" />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800`}>Localisation</Text>
            </View>
            
            <View>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-2`}>
                Où trouver ce produit ? <Text style={tw`text-red-500`}>*</Text>
              </Text>
              <View style={tw`bg-gray-50 rounded-xl border-2 border-gray-100`}>
                <TextInput
                  placeholder="Ex: Marché de Soumbédioune, Stand 15, Dakar"
                  value={localisation}
                  onChangeText={setLocalisation}
                  style={tw`py-4 px-4 text-gray-800 text-base`}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Options avancées avec toggle animé */}
          <View style={tw`bg-white mx-4 mt-4 rounded-2xl p-6 shadow-lg`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={tw`bg-green-100 rounded-full p-2 mr-3`}>
                <Ionicons name="settings" size={20} color="#10B981" />
              </View>
              <Text style={tw`text-lg font-bold text-gray-800`}>Options avancées</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => setBio(!bio)}
              style={tw`flex-row items-center py-4 px-4 bg-green-50 rounded-xl mb-4 border border-green-100`}
            >
              <View style={[
                tw`w-6 h-6 rounded-full mr-3 items-center justify-center`,
                bio ? tw`bg-green-500` : tw`bg-gray-300`
              ]}>
                {bio && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-gray-800 font-semibold`}>Produit biologique/naturel</Text>
                <Text style={tw`text-gray-500 text-xs`}>Certifié sans pesticides ou produits chimiques</Text>
              </View>
              <Text style={tw`text-2xl`}>🌱</Text>
            </TouchableOpacity>

            <View>
              <Text style={tw`text-gray-700 text-sm font-semibold mb-3`}>
                Mots-clés pour la recherche
              </Text>
              <View style={tw`flex-row items-center mb-3`}>
                <View style={tw`flex-1 bg-gray-50 rounded-xl border-2 border-gray-100 mr-2`}>
                  <TextInput
                    placeholder="frais, local, bio, artisanal..."
                    value={tempTag}
                    onChangeText={setTempTag}
                    style={tw`py-3 px-4 text-gray-800`}
                    placeholderTextColor="#9CA3AF"
                    onSubmitEditing={addTag}
                  />
                </View>
                <TouchableOpacity
                  onPress={addTag}
                  style={tw`bg-green-500 rounded-xl py-3 px-4 shadow-lg`}
                >
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <View style={tw`flex-row flex-wrap`}>
                {tags.map((tag, index) => (
                  <View key={index} style={tw`bg-green-100 rounded-full py-2 px-4 m-1 flex-row items-center border border-green-200`}>
                    <Text style={tw`text-green-700 text-sm font-semibold`}>#{tag}</Text>
                    <TouchableOpacity
                      onPress={() => removeTag(tag)}
                      style={tw`ml-2 bg-green-200 rounded-full w-5 h-5 items-center justify-center`}
                    >
                      <Ionicons name="close" size={12} color="#059669" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Bouton d'ajout avec design premium */}
          <View style={tw`mx-4 mt-6 mb-8`}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`shadow-xl`}
            >
              <LinearGradient
                colors={enPromotion 
                  ? ['#F59E0B', '#D97706', '#B45309'] 
                  : ['#10B981', '#059669', '#047857']
                }
                style={tw`py-5 rounded-2xl flex-row items-center justify-center`}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons 
                  name={enPromotion ? "flash" : "storefront"} 
                  size={24} 
                  color="white" 
                  style={tw`mr-3`} 
                />
                <Text style={tw`text-white text-center font-bold text-lg`}>
                  {enPromotion 
                    ? `Publier avec -${pourcentageReduction || '0'}% de promo` 
                    : 'Publier sur la marketplace'
                  }
                </Text>
                <Ionicons name="arrow-forward" size={24} color="white" style={tw`ml-3`} />
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Indicateurs de promotion */}
            {enPromotion && prix && pourcentageReduction && (
              <View style={tw`mt-4 bg-yellow-50 rounded-xl p-4 flex-row items-center border border-yellow-200`}>
                <Ionicons name="flash" size={20} color="#F59E0B" style={tw`mr-3`} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-yellow-700 text-sm font-semibold`}>
                    Promotion active : {pourcentageReduction}% de réduction
                  </Text>
                  <Text style={tw`text-yellow-600 text-xs`}>
                    Du {dateDebutPromo} au {dateFinPromo}
                  </Text>
                </View>
                <View style={tw`bg-yellow-500 rounded-full py-1 px-3`}>
                  <Text style={tw`text-white text-xs font-bold`}>PROMO</Text>
                </View>
              </View>
            )}
            
            <View style={tw`mt-4 bg-blue-50 rounded-xl p-4 flex-row items-center`}>
              <Ionicons name="information-circle" size={20} color="#3B82F6" style={tw`mr-3`} />
              <Text style={tw`text-blue-700 text-sm flex-1`}>
                {enPromotion 
                  ? 'Votre produit sera mis en avant dans la section "Promotions"'
                  : 'Votre produit sera visible immédiatement après publication'
                }
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}