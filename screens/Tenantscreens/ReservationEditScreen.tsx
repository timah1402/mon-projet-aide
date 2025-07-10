import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
// Removed navigation import
import tw from 'tailwind-react-native-classnames';

export default function ReservationEditScreen() {
  // Navigation removed

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSave = () => {
    // Simuler la sauvegarde
    alert("Réservation modifiée !");
    router.back();
  };

  const handleCancel = () => {
    // Simuler l'annulation
    alert("Réservation annulée !");
    router.back();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b border-gray-200`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-bold`}>Modifier la réservation</Text>
      </View>

      {/* Date Pickers */}
      <View style={tw`p-4`}>
        <Text style={tw`text-sm mb-1 text-gray-600`}>Date de début</Text>
        <TouchableOpacity
          style={tw`bg-gray-100 px-4 py-3 rounded-lg mb-4`}
          onPress={() => setShowStartPicker(true)}
        >
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}

        <Text style={tw`text-sm mb-1 text-gray-600`}>Date de fin</Text>
        <TouchableOpacity
          style={tw`bg-gray-100 px-4 py-3 rounded-lg mb-4`}
          onPress={() => setShowEndPicker(true)}
        >
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        {/* Action buttons */}
        <TouchableOpacity onPress={handleSave} style={tw`bg-blue-600 py-3 rounded-lg mb-4`}>
          <Text style={tw`text-white text-center font-semibold`}>💾 Sauvegarder les modifications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={tw`bg-red-100 py-3 rounded-lg`}>
          <Text style={tw`text-red-600 text-center font-semibold`}>❌ Annuler la réservation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
