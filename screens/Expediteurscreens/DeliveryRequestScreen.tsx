import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Modal, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Configuration des véhicules avec capacités
const vehicleOptions = [
  { 
    label: 'Moto (petits colis)', 
    value: 'moto', 
    price: 2500, 
    dimensions: '40 x 30 x 30 cm',
    maxWeight: 15, // kg
    maxVolume: 0.036 // m³ (40*30*30 cm)
  },
  { 
    label: 'Tricycle (colis moyens)', 
    value: 'tricycle', 
    price: 4000, 
    dimensions: '80 x 60 x 60 cm',
    maxWeight: 100, // kg
    maxVolume: 0.288 // m³ (80*60*60 cm)
  },
  { 
    label: 'Camion (colis volumineux)', 
    value: 'camion', 
    price: 7000, 
    dimensions: '200 x 150 x 150 cm',
    maxWeight: 1000, // kg
    maxVolume: 4.5 // m³ (200*150*150 cm)
  }
];

// Liste des produits avec températures recommandées
const productOptions = [
  { 
    label: 'Poissons frais', 
    value: 'fish', 
    recommendedTemp: '0-4°C',
    tempValue: 2
  },
  { 
    label: 'Fruits et légumes', 
    value: 'fruits_vegetables', 
    recommendedTemp: '2-8°C',
    tempValue: 5
  },
  { 
    label: 'Produits laitiers', 
    value: 'dairy', 
    recommendedTemp: '0-4°C',
    tempValue: 2
  },
  { 
    label: 'Viande fraîche', 
    value: 'meat', 
    recommendedTemp: '0-4°C',
    tempValue: 2
  },
  { 
    label: 'Médicaments', 
    value: 'medicine', 
    recommendedTemp: '2-8°C',
    tempValue: 5
  },
  { 
    label: 'Produits surgelés', 
    value: 'frozen', 
    recommendedTemp: '-18 à -15°C',
    tempValue: -18
  },
  { 
    label: 'Produits secs', 
    value: 'dry_goods', 
    recommendedTemp: 'Température ambiante',
    tempValue: 25
  },
  { 
    label: 'Autres produits frais', 
    value: 'other_fresh', 
    recommendedTemp: '2-8°C',
    tempValue: 5
  }
];

export default function DeliveryRequestScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [vehicleType, setVehicleType] = useState(vehicleOptions[0]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [datetime, setDatetime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const distanceFee = 500;
  const total = vehicleType.price + distanceFee;

  // Vérifier la capacité du véhicule
  const checkVehicleCapacity = () => {
    const weightNum = parseFloat(weight) || 0;
    const volumeNum = parseFloat(volume) || 0;
    
    if (weightNum > vehicleType.maxWeight || volumeNum > vehicleType.maxVolume) {
      return false;
    }
    return true;
  };

  // Suggérer un véhicule approprié
  const suggestVehicle = () => {
    const weightNum = parseFloat(weight) || 0;
    const volumeNum = parseFloat(volume) || 0;
    
    for (let vehicle of vehicleOptions) {
      if (weightNum <= vehicle.maxWeight && volumeNum <= vehicle.maxVolume) {
        return vehicle;
      }
    }
    return vehicleOptions[vehicleOptions.length - 1]; // Plus gros véhicule par défaut
  };

  // Effet pour auto-suggestion de véhicule
  useEffect(() => {
    if (weight || volume) {
      const suggested = suggestVehicle();
      if (suggested.value !== vehicleType.value) {
        setVehicleType(suggested);
      }
    }
  }, [weight, volume]);

  // Sélection automatique de température selon le produit
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setTemperature(product.tempValue.toString());
    setShowProductModal(false);
  };

  const generateTimeSlots = () => {
    const now = new Date();
    const firstSlot = new Date(now.getTime() + 60 * 60 * 1000); // +1h

    firstSlot.setMinutes(Math.ceil(firstSlot.getMinutes() / 15) * 15);
    firstSlot.setSeconds(0);
    firstSlot.setMilliseconds(0);

    const slots = [];
    const slotCount = 12; // 12 créneaux = 3h de choix

    for (let i = 0; i < slotCount; i++) {
      const slot = new Date(firstSlot.getTime() + i * 15 * 60 * 1000);
      slots.push(slot);
    }

    return slots;
  };

  const handleConfirm = () => {
    if (!checkVehicleCapacity()) {
      Alert.alert(
        'Capacité dépassée',
        `Le véhicule sélectionné ne peut pas transporter cette charge.\nCapacité max: ${vehicleType.maxWeight}kg / ${vehicleType.maxVolume}m³\nVotre demande: ${weight}kg / ${volume}m³`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    router.push("/searching-driver");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`px-4 pt-4`}>
        {/* Bouton retour */}
        <TouchableOpacity onPress={() => router.back()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold mb-4`}>Nouvelle demande de livraison</Text>

        {/* Adresses */}
        <Text style={tw`text-sm font-semibold mb-1`}>Adresse de collecte</Text>
        <TextInput 
          value={pickup} 
          onChangeText={setPickup} 
          placeholder="Ex: Marché Kermel, Dakar" 
          style={tw`border border-gray-300 rounded-md px-4 py-2 mb-3`} 
        />

        <Text style={tw`text-sm font-semibold mb-1`}>Adresse de livraison</Text>
        <TextInput 
          value={dropoff} 
          onChangeText={setDropoff} 
          placeholder="Ex: Restaurant Le Baobab, Almadies" 
          style={tw`border border-gray-300 rounded-md px-4 py-2 mb-5`} 
        />

        {/* Type de produit */}
        <Text style={tw`text-lg font-semibold mb-2`}>Type de produit</Text>
        <TouchableOpacity
          onPress={() => setShowProductModal(true)}
          style={tw`border border-gray-300 rounded-md px-4 py-2 mb-3 flex-row items-center justify-between`}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`${selectedProduct ? 'text-black' : 'text-gray-400'}`}>
              {selectedProduct ? selectedProduct.label : 'Sélectionner un type de produit'}
            </Text>
            {selectedProduct && (
              <Text style={tw`text-xs text-gray-500 mt-1`}>
                Température recommandée: {selectedProduct.recommendedTemp}
              </Text>
            )}
          </View>
          <Ionicons name="chevron-down" size={18} />
        </TouchableOpacity>

        {/* Détails du colis */}
        <Text style={tw`text-lg font-semibold mb-2`}>Détails du colis</Text>
        <TextInput 
          value={description} 
          onChangeText={setDescription} 
          placeholder="Ex: 5 caisses de poissons frais" 
          style={tw`border border-gray-300 rounded-md px-4 py-2 mb-3`} 
          multiline 
        />

        {/* Poids et Volume */}
        <View style={tw`flex-row justify-between mb-3`}>
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Poids total (kg)</Text>
            <TextInput 
              value={weight} 
              onChangeText={setWeight} 
              placeholder="Ex: 20" 
              keyboardType="numeric" 
              style={tw`border border-gray-300 rounded-md px-4 py-2`} 
            />
          </View>

          <View style={tw`flex-1 ml-2`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Volume (m³)</Text>
            <TextInput 
              value={volume} 
              onChangeText={setVolume} 
              placeholder="Ex: 0.5" 
              keyboardType="numeric" 
              style={tw`border border-gray-300 rounded-md px-4 py-2`} 
            />
          </View>
        </View>

        {/* Type de véhicule */}
        <Text style={tw`text-sm font-semibold mb-1`}>Type de véhicule</Text>
        <TouchableOpacity
          onPress={() => setShowVehicleModal(true)}
          style={tw`border border-gray-300 rounded-md px-4 py-2 mb-4 flex-row items-center justify-between`}
        >
          <View style={tw`flex-1`}>
            <Text>{vehicleType.label}</Text>
            <Text style={tw`text-xs text-gray-500 mt-1`}>
              Capacité max: {vehicleType.maxWeight}kg / {vehicleType.maxVolume}m³
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} />
        </TouchableOpacity>

        {/* Alerte de capacité */}
        {(weight || volume) && !checkVehicleCapacity() && (
          <View style={tw`bg-red-50 p-3 rounded-lg mb-4 border border-red-200`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Ionicons name="warning" size={16} color="#DC2626" />
              <Text style={tw`text-red-600 font-semibold ml-2`}>Capacité dépassée</Text>
            </View>
            <Text style={tw`text-red-600 text-sm`}>
              Le véhicule sélectionné ne peut pas transporter cette charge.
            </Text>
            <Text style={tw`text-red-600 text-xs mt-1`}>
              Max: {vehicleType.maxWeight}kg / {vehicleType.maxVolume}m³
            </Text>
          </View>
        )}

        {/* Planification */}
        <Text style={tw`text-lg font-semibold mb-2`}>Planification</Text>
        <View style={tw`mb-4`}>
          <TouchableOpacity onPress={() => setIsScheduled(false)} style={tw`flex-row items-center mb-2`}>
            <Ionicons name={isScheduled ? 'radio-button-off' : 'radio-button-on'} size={18} color="blue" />
            <Text style={tw`ml-2`}>Livraison immédiate (dans les 30 minutes)</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsScheduled(true)} style={tw`flex-row items-center`}>
            <Ionicons name={!isScheduled ? 'radio-button-off' : 'radio-button-on'} size={18} color="blue" />
            <Text style={tw`ml-2`}>Programmer la livraison</Text>
          </TouchableOpacity>

          {isScheduled && (
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={tw`border border-gray-300 rounded-md px-4 py-2 mt-3`}
            >
              <Text>
                {datetime
                  ? datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Choisir une heure'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Estimation du prix */}
        <View style={tw`bg-blue-50 p-4 rounded-lg mb-4`}>
          <Text style={tw`font-semibold text-blue-800 mb-2`}>Estimation du prix</Text>
          <Text style={tw`text-sm`}>Frais de base: {vehicleType.price.toLocaleString()} CFA</Text>
          <Text style={tw`text-sm`}>Frais de distance: {distanceFee.toLocaleString()} CFA</Text>
          <Text style={tw`mt-2 font-bold`}>Total estimé: {total.toLocaleString()} CFA</Text>
        </View>

        {/* Actions */}
        <View style={tw`flex-row justify-between mb-10`}>
          <TouchableOpacity style={tw`px-4 py-3 bg-gray-200 rounded-md`}>
            <Text>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-4 py-3 bg-blue-600 rounded-md`}
            onPress={handleConfirm}
          >
            <Text style={tw`text-white font-semibold`}>Confirmer la demande</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal pour le choix de produit */}
      <Modal visible={showProductModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-40`}>
          <View style={tw`bg-white p-4 rounded-t-2xl max-h-96`}>
            <Text style={tw`text-lg font-semibold text-center mb-4`}>Choisir le type de produit</Text>
            <ScrollView>
              {productOptions.map((product, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleProductSelect(product)}
                  style={tw`py-3 border-b border-gray-200`}
                >
                  <Text style={tw`font-semibold`}>{product.label}</Text>
                  <Text style={tw`text-gray-500 text-xs mt-1`}>
                    Température: {product.recommendedTemp}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={() => setShowProductModal(false)} style={tw`py-3 mt-2`}>
              <Text style={tw`text-center text-red-500`}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal pour le choix de véhicule */}
      <Modal visible={showVehicleModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-40`}>
          <View style={tw`bg-white p-4 rounded-t-2xl`}>
            <Text style={tw`text-lg font-semibold text-center mb-4`}>Choisir le véhicule</Text>
            {vehicleOptions.map((opt, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setVehicleType(opt);
                  setShowVehicleModal(false);
                }}
                style={tw`py-3 border-b border-gray-200`}
              >
                <Text style={tw`font-semibold`}>{opt.label}</Text>
                <Text style={tw`text-gray-500 text-xs`}>Dimensions: {opt.dimensions}</Text>
                <Text style={tw`text-gray-500 text-xs`}>
                  Capacité max: {opt.maxWeight}kg / {opt.maxVolume}m³
                </Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setShowVehicleModal(false)} style={tw`py-3`}>
              <Text style={tw`text-center text-red-500`}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal pour le choix de créneau horaire */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-40`}>
          <View style={tw`bg-white p-4 rounded-t-2xl`}>
            <Text style={tw`text-lg font-semibold text-center mb-4`}>Choisir l'heure</Text>
            {generateTimeSlots().map((slot, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setDatetime(slot);
                  setShowDatePicker(false);
                }}
                style={tw`py-3 border-b border-gray-200`}
              >
                <Text style={tw`text-center`}>
                  {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setShowDatePicker(false)} style={tw`py-3`}>
              <Text style={tw`text-center text-red-500`}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}