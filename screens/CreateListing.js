import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function CreateListingScreen() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    address: '',
    title: '',
    volume: '',
    tempMin: '',
    tempMax: '',
    goods: [],
    description: '',
    equipments: [],
    rules: '',
    photos: [],
    price: '',
  });

  const goodsOptions = [
    'Fruits et légumes', 'Produits laitiers', 'Viandes et poissons', 'Produits surgelés',
    'Boissons', 'Produits pharmaceutiques', 'Fleurs', 'Autres'
  ];

  const equipmentOptions = [
    { label: 'Accès 24/7', icon: 'time-outline' },
    { label: 'Surveillance', icon: 'shield-outline' },
    { label: 'Quai de déchargement', icon: 'bus-outline' },
    { label: 'Étagères', icon: 'albums-outline' },
    { label: 'Parking', icon: 'car-outline' },
  ];

  const toggleSelection = (list, item) =>
    list.includes(item) ? list.filter(i => i !== item) : [...list, item];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-2`}>Où se trouve votre chambre froide ?</Text>
            <Text style={tw`text-gray-600 mb-4`}>Indiquez l'adresse exacte pour que les locataires puissent vous trouver facilement</Text>
            <TextInput
              placeholder="Ex: 123 Rue de la République, Dakar, Sénégal"
              value={form.address}
              onChangeText={value => setForm({ ...form, address: value })}
              style={tw`border border-gray-300 rounded-md px-4 py-3 mb-2`}
            />
            <Text style={tw`text-xs text-gray-500 mb-4`}>Votre adresse exacte ne sera visible qu'après réservation confirmée</Text>
            <View style={tw`bg-gray-200 rounded-md h-40 justify-center items-center`}>
              <Ionicons name="map-outline" size={32} color="gray" />
              <Text style={tw`text-gray-600 mt-2`}>Aperçu de la carte</Text>
              <Text style={tw`text-xs text-gray-400`}>La position sera affichée ici</Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-4`}>Décrivez votre chambre froide</Text>
            <TextInput placeholder="Titre de l'annonce" value={form.title} onChangeText={value => setForm({ ...form, title: value })} style={tw`border px-4 py-3 rounded-md mb-4`} />
            <View style={tw`flex-row justify-between mb-4`}>
              <TextInput placeholder="Volume (m³)" keyboardType="numeric" value={form.volume} onChangeText={value => setForm({ ...form, volume: value })} style={tw`border px-4 py-3 rounded-md w-[30%]`} />
              <TextInput placeholder="Temp. Min (°C)" keyboardType="numeric" value={form.tempMin} onChangeText={value => setForm({ ...form, tempMin: value })} style={tw`border px-4 py-3 rounded-md w-[30%]`} />
              <TextInput placeholder="Temp. Max (°C)" keyboardType="numeric" value={form.tempMax} onChangeText={value => setForm({ ...form, tempMax: value })} style={tw`border px-4 py-3 rounded-md w-[30%]`} />
            </View>
            <Text style={tw`mb-2`}>Types de marchandises autorisés</Text>
            <View style={tw`flex-row flex-wrap mb-4`}>
              {goodsOptions.map((g, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setForm({ ...form, goods: toggleSelection(form.goods, g) })}
                  style={tw`${form.goods.includes(g) ? 'bg-blue-600' : 'bg-gray-200'} px-3 py-2 rounded-full m-1`}
                >
                  <Text style={tw`${form.goods.includes(g) ? 'text-white' : 'text-black'} text-sm`}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput placeholder="Description détaillée" value={form.description} onChangeText={value => setForm({ ...form, description: value })} multiline numberOfLines={4} style={tw`border px-4 py-3 rounded-md`} />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-4`}>Quels équipements proposez-vous ?</Text>
            <View style={tw`flex-row flex-wrap mb-4`}>
              {equipmentOptions.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setForm({ ...form, equipments: toggleSelection(form.equipments, e.label) })}
                  style={tw`${form.equipments.includes(e.label) ? 'bg-blue-600' : 'bg-gray-200'} px-3 py-2 rounded-full m-1 flex-row items-center`}
                >
                  <Ionicons name={e.icon} size={16} color={form.equipments.includes(e.label) ? 'white' : 'black'} style={tw`mr-1`} />
                  <Text style={tw`${form.equipments.includes(e.label) ? 'text-white' : 'text-black'} text-sm`}>{e.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput placeholder="Règles d'utilisation (facultatif)" value={form.rules} onChangeText={value => setForm({ ...form, rules: value })} multiline numberOfLines={3} style={tw`border px-4 py-3 rounded-md`} />
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-4`}>Ajoutez des photos de votre espace</Text>
            <View style={tw`bg-gray-200 h-40 rounded-md justify-center items-center mb-4`}>
              <Ionicons name="cloud-upload-outline" size={40} color="gray" />
              <Text style={tw`text-gray-600 mt-2`}>Téléchargez vos photos</Text>
              <Text style={tw`text-xs text-gray-400`}>Cliquez ici pour parcourir</Text>
            </View>
            <View style={tw`bg-blue-100 p-3 rounded-md`}>
              <Text style={tw`text-sm mb-1 font-semibold`}>Conseils pour de bonnes photos :</Text>
              <Text style={tw`text-xs`}>• Montrez l'entrée et l'intérieur de votre chambre froide</Text>
              <Text style={tw`text-xs`}>• Utilisez une bonne luminosité</Text>
              <Text style={tw`text-xs`}>• Téléchargez au moins 5 photos</Text>
              <Text style={tw`text-xs`}>• Mettez en valeur vos équipements</Text>
            </View>
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-4`}>Fixez votre prix</Text>
            <TextInput
              placeholder="Prix par jour en CFA"
              value={form.price}
              keyboardType="numeric"
              onChangeText={value => setForm({ ...form, price: value })}
              style={tw`border px-4 py-3 rounded-md mb-4`}
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={tw`text-xl font-bold mb-4`}>Validez votre annonce</Text>
            <Text style={tw`text-gray-700`}>Vérifiez que toutes les informations sont correctes avant de publier.</Text>
          </View>
        );
      default:
        return <Text>Étape inconnue</Text>;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Créer une annonce</Text>
        <View style={tw`h-2 bg-gray-200 rounded-full mb-6`}>
          <View style={[tw`bg-blue-600 h-2 rounded-full`, { width: `${(step / 6) * 100}%` }]} />
        </View>

        {renderStepContent()}

        <View style={tw`flex-row justify-between mt-4 mb-12`}>
          <TouchableOpacity
            disabled={step === 1}
            onPress={() => setStep(step - 1)}
            style={tw`bg-gray-300 px-4 py-2 rounded-md ${step === 1 ? 'opacity-50' : ''}`}
          >
            <Text style={tw`text-gray-800`}>Précédent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStep(step === 6 ? 1 : step + 1)}
            style={tw`bg-blue-600 px-4 py-2 rounded-md`}
          >
            <Text style={tw`text-white`}>{step === 6 ? 'Terminer' : 'Suivant'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
