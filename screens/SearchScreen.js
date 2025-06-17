import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

const listings = [
  {
    id: 1,
    title: 'Chambre froide proche du Port',
    location: 'Dakar, Sénégal',
    distance: '2.3 km',
    volume: '15 m³',
    temp: '2°C à 8°C',
    price: '15 000 CFA/jour',
    rating: 4.9,
    reviews: 23,
    host: 'Moussa Diagne',
    hostRating: 4.8,
    features: ['Accès 24/7', 'Surveillance', 'Étagères'],
    image: require('../assets/chambrefroide.jpg')
  },
  {
    id: 2,
    title: 'Espace réfrigéré Almadies',
    location: 'Almadies, Dakar',
    distance: '3.7 km',
    volume: '12 m³',
    temp: '0°C à 6°C',
    price: '12 000 CFA/jour',
    rating: 4.7,
    reviews: 18,
    host: 'Fatou Sall',
    hostRating: 4.6,
    features: ['Parking', 'Quai de déchargement'],
    image: require('../assets/chambrefroide.jpg')
  },
  {
    id: 3,
    title: 'Entrepôt frigorifique Pikine',
    location: 'Pikine, Dakar',
    distance: '5.1 km',
    volume: '25 m³',
    temp: '-5°C à 5°C',
    price: '18 000 CFA/jour',
    rating: 4.8,
    reviews: 31,
    host: 'Omar Ndiaye',
    hostRating: 4.9,
    features: ['Accès 24/7', 'Surveillance', 'Étagères', '+1 autres'],
    image: require('../assets/chambrefroide.jpg')
  },
];

export default function SearchScreen() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    volumeMin: '',
    volumeMax: '',
    priceMin: '',
    priceMax: '',
    tempMin: '',
    tempMax: '',
  });

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>      
      <ScrollView style={tw`px-4 pt-4 mb-16`}>
        <Text style={tw`text-xl font-bold mb-1`}>Trouvez votre espace frigorifique</Text>
        <Text style={tw`text-gray-600 mb-4`}>Découvrez des chambres froides près de chez vous</Text>

        {/* Recherche et Filtres */}
        <View style={tw`flex-row flex-wrap mb-4`}>
          <TextInput
            placeholder="Localisation"
            value={location}
            onChangeText={setLocation}
            style={tw`border border-gray-300 rounded-md px-4 py-2 mb-2 w-full`}
          />
          <View style={tw`flex-row justify-between w-full mb-2`}>
            <TextInput
              placeholder="Date de début"
              value={startDate}
              onChangeText={setStartDate}
              style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
            />
            <TextInput
              placeholder="Date de fin"
              value={endDate}
              onChangeText={setEndDate}
              style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
            />
          </View>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={tw`mb-4`}>
            <Text style={tw`text-blue-600`}>Filtres avancés {showFilters ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showFilters && (
            <View style={tw`w-full mb-4`}>
              <Text style={tw`text-sm font-semibold mb-2`}>Volume (m³)</Text>
              <View style={tw`flex-row justify-between mb-2`}>
                <TextInput
                  placeholder="Min"
                  keyboardType="numeric"
                  value={filters.volumeMin}
                  onChangeText={v => setFilters({ ...filters, volumeMin: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
                <TextInput
                  placeholder="Max"
                  keyboardType="numeric"
                  value={filters.volumeMax}
                  onChangeText={v => setFilters({ ...filters, volumeMax: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
              </View>
              <Text style={tw`text-sm font-semibold mb-2`}>Prix par jour (CFA)</Text>
              <View style={tw`flex-row justify-between mb-2`}>
                <TextInput
                  placeholder="Min"
                  keyboardType="numeric"
                  value={filters.priceMin}
                  onChangeText={v => setFilters({ ...filters, priceMin: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
                <TextInput
                  placeholder="Max"
                  keyboardType="numeric"
                  value={filters.priceMax}
                  onChangeText={v => setFilters({ ...filters, priceMax: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
              </View>
              <Text style={tw`text-sm font-semibold mb-2`}>Température (°C)</Text>
              <View style={tw`flex-row justify-between mb-2`}>
                <TextInput
                  placeholder="Min"
                  keyboardType="numeric"
                  value={filters.tempMin}
                  onChangeText={v => setFilters({ ...filters, tempMin: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
                <TextInput
                  placeholder="Max"
                  keyboardType="numeric"
                  value={filters.tempMax}
                  onChangeText={v => setFilters({ ...filters, tempMax: v })}
                  style={{ ...tw`border border-gray-300 rounded-md px-4 py-2`, width: '48%' }}
                />
              </View>
            </View>
          )}

          <TouchableOpacity style={tw`bg-blue-600 px-4 py-3 rounded-md w-full items-center`}>
            <Text style={tw`text-white font-semibold`}>🔍 Rechercher</Text>
          </TouchableOpacity>
        </View>

        {/* Résultats de recherche */}
        {listings.map((listing) => (
          <View key={listing.id} style={tw`bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden`}>
            <Image source={listing.image} style={tw`w-full h-40`} resizeMode="cover" />
            <View style={tw`p-4`}>
              <Text style={tw`text-sm text-gray-700 mb-1`}>{listing.price}</Text>
              <Text style={tw`text-lg font-bold`}>{listing.title}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>{listing.location} • {listing.distance}</Text>
              <Text style={tw`text-sm text-gray-600`}>{listing.volume} • {listing.temp}</Text>
              <View style={tw`flex-row flex-wrap mt-2`}>{listing.features.map((f, i) => (
                <Text key={i} style={tw`bg-gray-200 text-xs px-2 py-1 mr-2 mb-2 rounded-full`}>{f}</Text>
              ))}</View>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <View>
                  <Text style={tw`text-sm font-medium`}>{listing.host}</Text>
                  <Text style={tw`text-xs text-gray-500`}>⭐ {listing.hostRating}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={tw`text-blue-600 text-sm`}>Voir détails →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={tw`my-4 py-3 bg-gray-100 rounded-md items-center`}>
          <Text style={tw`text-sm text-gray-700`}>Charger plus de résultats</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* NAVBAR uniquement en bas */}
      <View style={tw`flex-row justify-around items-center h-16 bg-white border-t border-gray-200`}>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="grid" size={24} color="black" />
          <Text style={tw`text-xs`}>Tableau</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="add-circle" size={24} color="black" />
          <Text style={tw`text-xs`}>Annonce</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Ionicons name="analytics" size={24} color="black" />
          <Text style={tw`text-xs`}>IoT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
