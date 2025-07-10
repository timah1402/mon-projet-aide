import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'tailwind-react-native-classnames';
// Removed navigation import
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const vehicleOptions = [
  { label: 'Moto (petits colis)', value: 'moto', price: 2500, dimensions: '40 x 30 x 30 cm' },
  { label: 'Tricycle (colis moyens)', value: 'tricycle', price: 4000, dimensions: '80 x 60 x 60 cm' },
  // { label: 'Camion (colis volumineux)', value: 'camion', price: 7000, dimensions: '200 x 150 x 150 cm' }
];


export default function DeliveryRequestScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState('');
  const [vehicleType, setVehicleType] = useState(vehicleOptions[0]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [datetime, setDatetime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const distanceFee = 500;
  const total = vehicleType.price + distanceFee;
  // Navigation removed
  const generateTimeSlots = () => {
  const now = new Date();
  const firstSlot = new Date(now.getTime() + 60 * 60 * 1000); // +1h

  // arrondir le premier créneau au prochain multiple de 15 min
  firstSlot.setMinutes(Math.ceil(firstSlot.getMinutes() / 15) * 15);
  firstSlot.setSeconds(0);
  firstSlot.setMilliseconds(0);

  const slots = [];
  const slotCount = 12; // ex: 12 créneaux = 3h de choix

  for (let i = 0; i < slotCount; i++) {
    const slot = new Date(firstSlot.getTime() + i * 15 * 60 * 1000);
    slots.push(slot);
  }

  return slots;
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
        <TextInput value={pickup} onChangeText={setPickup} placeholder="Ex: Marché Kermel, Dakar" style={tw`border border-gray-300 rounded-md px-4 py-2 mb-3`} />

        <Text style={tw`text-sm font-semibold mb-1`}>Adresse de livraison</Text>
        <TextInput value={dropoff} onChangeText={setDropoff} placeholder="Ex: Restaurant Le Baobab, Almadies" style={tw`border border-gray-300 rounded-md px-4 py-2 mb-5`} />

        {/* Détails du colis */}
        <Text style={tw`text-lg font-semibold mb-2`}>Détails du colis</Text>
        <TextInput value={description} onChangeText={setDescription} placeholder="Ex: 5 caisses de poissons frais, 20kg total" style={tw`border border-gray-300 rounded-md px-4 py-2 mb-3`} multiline />

        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Température requise (°C)</Text>
            <TextInput value={temperature} onChangeText={setTemperature} placeholder="Ex: 4" keyboardType="numeric" style={tw`border border-gray-300 rounded-md px-4 py-2`} />
          </View>

          <View style={tw`flex-1 ml-2`}>
            <Text style={tw`text-sm font-semibold mb-1`}>Type de véhicule</Text>
            <TouchableOpacity
              onPress={() => setShowVehicleModal(true)}
              style={tw`border border-gray-300 rounded-md px-4 py-2 flex-row items-center justify-between`}
            >
              <Text>{vehicleType.label}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>
          </View>
        </View>

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
  onPress={() => router.push("/searching-driver")}
>
  <Text style={tw`text-white font-semibold`}>Confirmer la demande</Text>
</TouchableOpacity>

        </View>
      </ScrollView>

      {/* Modal pour le choix de véhicule */}
      <Modal visible={showVehicleModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black bg-opacity-40`}>
          <View style={tw`bg-white p-4 rounded-t-2xl`}>
           {vehicleOptions.map((opt, idx) => (
  <Pressable
    key={idx}
    onPress={() => {
      setVehicleType(opt);
      setShowVehicleModal(false);
    }}
    style={tw`py-3 border-b border-gray-200`}
  >
    <Text style={tw`text-center font-semibold`}>{opt.label}</Text>
    <Text style={tw`text-center text-gray-500 text-xs`}>Dimensions: {opt.dimensions}</Text>
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
