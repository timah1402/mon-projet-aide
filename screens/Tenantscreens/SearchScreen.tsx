import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const listings = [
  {
    id: 1,
    title: 'Chambre froide proche du Port',
    location: 'Dakar, Sénégal',
    distance: '2.3 km',
    volume: '15 m³',
    temp: '2°C à 8°C',
    price: '15 000 CFA/jour',
    priceValue: 15000,
    rating: 4.9,
    reviews: 23,
    host: 'Moussa Diagne',
    hostRating: 4.8,
    type: 'individuel', // Nouveau champ
    features: ['Accès 24/7', 'Surveillance', 'Étagères'],
    image: require('../../assets/chambrefroide.jpg'),
    coordinates: { latitude: 14.6937, longitude: -17.4441 }
  },
  {
    id: 2,
    title: 'Espace réfrigéré Almadies',
    location: 'Almadies, Dakar',
    distance: '3.7 km',
    volume: '12 m³',
    temp: '0°C à 6°C',
    price: '12 000 CFA/jour/utilisateur',
    priceValue: 12000,
    rating: 4.7,
    reviews: 18,
    host: 'Fatou Sall',
    hostRating: 4.6,
    type: 'shared', // Location partagée
    features: ['Parking', 'Quai de déchargement', 'Compartiments sécurisés'],
    image: require('../../assets/chambrefroide.jpg'),
    coordinates: { latitude: 14.7392, longitude: -17.4932 }
  },
  {
    id: 3,
    title: 'Entrepôt frigorifique Pikine',
    location: 'Pikine, Dakar',
    distance: '5.1 km',
    volume: '25 m³',
    temp: '-5°C à 5°C',
    price: '18 000 CFA/jour',
    priceValue: 18000,
    rating: 4.8,
    reviews: 31,
    host: 'Omar Ndiaye',
    hostRating: 4.9,
    type: 'Individuelle', // Location unique
    features: ['Accès 24/7', 'Surveillance', 'Étagères', '+1 autres'],
    image: require('../../assets/chambrefroide.jpg'),
    coordinates: { latitude: 14.7645, longitude: -17.3993 }
  },
  {
    id: 4,
    title: 'Grande chambre froide industrielle',
    location: 'Zone Industrielle, Dakar',
    distance: '4.2 km',
    volume: '20 m³',
    temp: '0°C à 4°C',
    price: '8 500 CFA/jour/utilisateur',
    priceValue: 8500,
    rating: 4.6,
    reviews: 42,
    host: 'Mamadou Fall',
    hostRating: 4.9,
    type: 'shared', // Location partagée
    features: ['Accès 24/7', 'Surveillance', 'Compartiments verrouillables', 'Parking'],
    image: require('../../assets/chambrefroide.jpg'),
    coordinates: { latitude: 14.7167, longitude: -17.4200 }
  }
];

const locations = [
  'Dakar, Sénégal',
  'Almadies, Dakar',
  'Pikine, Dakar',
  'Guédiawaye, Dakar',
  'Rufisque, Dakar',
  'Parcelles Assainies, Dakar',
  'Yoff, Dakar',
  'Ouakam, Dakar'
];

// Région par défaut centrée sur Dakar
const defaultRegion = {
  latitude: 14.7167,
  longitude: -17.4677,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function SearchScreen() {
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'map'
  const [filteredListings, setFilteredListings] = useState(listings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [mapRegion, setMapRegion] = useState(defaultRegion);
  const [filters, setFilters] = useState({
    volumeMin: '',
    volumeMax: '',
    priceMin: '',
    priceMax: '',
    tempMin: '',
    tempMax: '',
    type: '', // Nouveau filtre pour le type de location
  });

  // Autocomplétion pour la localisation
  useEffect(() => {
    if (location.length > 1) {
      const suggestions = locations.filter(loc => 
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, [location]);

  // Filtrage complet des résultats
  useEffect(() => {
    let filtered = listings;

    // Filtre par localisation
    if (location) {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filtre par type de location
    if (filters.type) {
      filtered = filtered.filter(listing => listing.type === filters.type);
    }

    // Filtre par prix
    if (filters.priceMin) {
      filtered = filtered.filter(listing => listing.priceValue >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(listing => listing.priceValue <= parseInt(filters.priceMax));
    }

    // Filtre par volume
    if (filters.volumeMin) {
      filtered = filtered.filter(listing => {
        const volume = parseInt(listing.volume.replace(' m³', ''));
        return volume >= parseInt(filters.volumeMin);
      });
    }
    if (filters.volumeMax) {
      filtered = filtered.filter(listing => {
        const volume = parseInt(listing.volume.replace(' m³', ''));
        return volume <= parseInt(filters.volumeMax);
      });
    }

    // Filtre par température (on prend la température minimum de la plage)
    if (filters.tempMin) {
      filtered = filtered.filter(listing => {
        const tempMin = parseInt(listing.temp.split('°C')[0]);
        return tempMin >= parseInt(filters.tempMin);
      });
    }
    if (filters.tempMax) {
      filtered = filtered.filter(listing => {
        const tempMax = parseInt(listing.temp.split(' à ')[1]?.replace('°C', '') || listing.temp.split('°C')[0]);
        return tempMax <= parseInt(filters.tempMax);
      });
    }

    setFilteredListings(filtered);
  }, [location, filters]);

  const selectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationSuggestions(false);
  };

  const clearFilters = () => {
    setFilters({
      volumeMin: '',
      volumeMax: '',
      priceMin: '',
      priceMax: '',
      tempMin: '',
      tempMax: '',
      type: '',
    });
    setLocation('');
    setStartDate('');
    setEndDate('');
  };

  const onMarkerPress = (listing) => {
    setSelectedListing(listing);
    // Centrer la carte sur le marqueur sélectionné
    setMapRegion({
      latitude: listing.coordinates.latitude,
      longitude: listing.coordinates.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const getTypeBadge = (type) => {
    if (type === 'Individuelle') {
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        icon: 'person-outline',
        label: 'Location Individuelle'
      };
    } else {
      return {
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        icon: 'people-outline',
        label: 'Location partagée'
      };
    }
  };

  const renderListingCard = ({ item }) => {
    const typeBadge = getTypeBadge(item.type);
    
    return (
      <View style={tw`bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden`}>
        <Image source={item.image} style={tw`w-full h-40`} resizeMode="cover" />
        <View style={tw`p-4`}>
          <View style={tw`flex-row justify-between items-start mb-2`}>
            <Text style={tw`text-lg font-bold flex-1`}>{item.title}</Text>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={tw`text-sm text-gray-600 ml-1`}>{item.rating}</Text>
            </View>
          </View>
          
          {/* Badge type de location */}
          <View style={tw`flex-row mb-2`}>
            <View style={tw`${typeBadge.bgColor} px-2 py-1 rounded-full flex-row items-center`}>
              <Ionicons name={typeBadge.icon} size={12} color={typeBadge.textColor.includes('blue') ? '#1d4ed8' : '#ea580c'} style={tw`mr-1`} />
              <Text style={tw`${typeBadge.textColor} text-xs font-medium`}>{typeBadge.label}</Text>
            </View>
          </View>
          
          <Text style={tw`text-sm text-gray-600 mb-1`}>
            <Ionicons name="location-outline" size={14} color="#666" />
            {' '}{item.location} • {item.distance}
          </Text>
          
          <Text style={tw`text-sm text-gray-600 mb-2`}>
            <MaterialIcons name="kitchen" size={14} color="#666" />
            {' '}{item.volume} • {item.temp}
          </Text>

          <View style={tw`flex-row flex-wrap mb-3`}>
            {item.features.map((feature, index) => (
              <View key={index} style={tw`bg-blue-50 px-2 py-1 mr-2 mb-1 rounded-full`}>
                <Text style={tw`text-xs text-blue-600`}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-lg font-bold text-blue-600`}>{item.price}</Text>
              <Text style={tw`text-xs text-gray-500`}>
                Hôte: {item.host} ⭐ {item.hostRating}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push("/view-details")}
              style={tw`bg-blue-600 px-4 py-2 rounded-lg`}
            >
              <Text style={tw`text-white text-sm font-medium`}>Voir détails</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderMapView = () => (
    <View style={tw`flex-1`}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width, height: height * 0.6 }}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {filteredListings.map((listing) => (
          <Marker
            key={listing.id}
            coordinate={listing.coordinates}
            onPress={() => onMarkerPress(listing)}
          >
            <View style={tw`${listing.type === 'Individuelle' ? 'bg-blue-600' : 'bg-orange-600'} px-3 py-2 rounded-full shadow-lg flex-row items-center`}>
              <Ionicons 
                name={listing.type === 'Individuelle' ? 'person' : 'people'} 
                size={12} 
                color="white" 
                style={tw`mr-1`} 
              />
              <Text style={tw`text-white text-xs font-bold`}>
                {listing.priceValue.toLocaleString()} CFA
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Carte de détail du lieu sélectionné */}
      {selectedListing && (
        <View style={tw`absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4`}>
          <View style={tw`flex-row`}>
            <Image 
              source={selectedListing.image} 
              style={tw`w-20 h-20 rounded-lg mr-3`} 
              resizeMode="cover" 
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold mb-1`}>{selectedListing.title}</Text>
              
              {/* Badge type dans la carte popup */}
              <View style={tw`flex-row mb-1`}>
                {(() => {
                  const badge = getTypeBadge(selectedListing.type);
                  return (
                    <View style={tw`${badge.bgColor} px-2 py-0.5 rounded-full flex-row items-center`}>
                      <Ionicons name={badge.icon} size={10} color={badge.textColor.includes('blue') ? '#1d4ed8' : '#ea580c'} style={tw`mr-1`} />
                      <Text style={tw`${badge.textColor} text-xs`}>{badge.label}</Text>
                    </View>
                  );
                })()}
              </View>
              
              <Text style={tw`text-sm text-gray-600 mb-1`}>{selectedListing.location}</Text>
              <Text style={tw`text-sm text-gray-600 mb-2`}>
                {selectedListing.volume} • {selectedListing.temp}
              </Text>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-lg font-bold text-blue-600`}>{selectedListing.price}</Text>
                <TouchableOpacity 
                  onPress={() => router.push("/view-details")}
                  style={tw`bg-blue-600 px-3 py-1 rounded-lg`}
                >
                  <Text style={tw`text-white text-xs font-medium`}>Voir détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => setSelectedListing(null)}
            style={tw`absolute top-2 right-2`}
          >
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`px-4 pt-4 pb-2 bg-white shadow-sm`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={tw`flex-row`}>
            <TouchableOpacity 
              onPress={() => setViewMode('list')}
              style={[tw`p-2 rounded-lg mr-2`, viewMode === 'list' ? tw`bg-blue-600` : tw`bg-gray-200`]}
            >
              <Ionicons name="list" size={20} color={viewMode === 'list' ? 'white' : 'gray'} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setViewMode('map')}
              style={[tw`p-2 rounded-lg`, viewMode === 'map' ? tw`bg-blue-600` : tw`bg-gray-200`]}
            >
              <Ionicons name="map" size={20} color={viewMode === 'map' ? 'white' : 'gray'} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={tw`text-2xl font-bold mb-1`}>Chambres froides</Text>
        <Text style={tw`text-gray-600 mb-4`}>
          {filteredListings.length} résultat{filteredListings.length > 1 ? 's' : ''} • Vue {viewMode === 'list' ? 'liste' : 'carte'}
        </Text>

        {/* Barre de recherche rapide */}
        <View style={tw`relative mb-2`}>
          <TextInput
            placeholder="Rechercher une localisation..."
            value={location}
            onChangeText={setLocation}
            style={tw`border border-gray-300 rounded-lg px-4 py-3 pr-10 bg-gray-50`}
          />
          <Ionicons name="search" size={20} color="#666" style={tw`absolute right-3 top-3`} />
          
          {showLocationSuggestions && locationSuggestions.length > 0 && (
            <View style={tw`absolute top-12 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
              {locationSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectLocation(suggestion)}
                  style={tw`px-4 py-3 border-b border-gray-100`}
                >
                  <Text style={tw`text-gray-700`}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          onPress={() => setShowFilters(!showFilters)}
          style={tw`flex-row justify-center items-center py-2`}
        >
          <Ionicons name="options-outline" size={16} color="#2563eb" style={tw`mr-2`} />
          <Text style={tw`text-blue-600 font-medium`}>
            Filtres {showFilters ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filtres complets */}
      {showFilters && (
        <ScrollView style={tw`bg-white px-4 py-3 border-b border-gray-200 max-h-80`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-semibold`}>Filtres</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={tw`text-blue-600 font-medium`}>Effacer tout</Text>
            </TouchableOpacity>
          </View>

          {/* Type de location */}
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Type de location</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            <TouchableOpacity
              onPress={() => setFilters({ ...filters, type: filters.type === 'Individuellee' ? '' : 'Individuelle' })}
              style={tw`flex-row items-center justify-center px-4 py-3 rounded-lg border ${filters.type === 'unique' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'} flex-1 mr-2`}
            >
              <Ionicons 
                name="person-outline" 
                size={16} 
                color={filters.type === 'Individuelle' ? '#2563eb' : '#6b7280'} 
                style={tw`mr-2`} 
              />
              <Text style={tw`text-sm ${filters.type === 'Individuelle' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
               Individuelle
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setFilters({ ...filters, type: filters.type === 'shared' ? '' : 'shared' })}
              style={tw`flex-row items-center justify-center px-4 py-3 rounded-lg border ${filters.type === 'shared' ? 'border-orange-600 bg-orange-50' : 'border-gray-300 bg-white'} flex-1 ml-2`}
            >
              <Ionicons 
                name="people-outline" 
                size={16} 
                color={filters.type === 'shared' ? '#ea580c' : '#6b7280'} 
                style={tw`mr-2`} 
              />
              <Text style={tw`text-sm ${filters.type === 'shared' ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
                Partagée
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dates */}
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Dates</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            <TextInput
              placeholder="Date de début"
              value={startDate}
              onChangeText={setStartDate}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
            <TextInput
              placeholder="Date de fin"
              value={endDate}
              onChangeText={setEndDate}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
          </View>

          {/* Volume */}
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Volume (m³)</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={filters.volumeMin}
              onChangeText={v => setFilters({ ...filters, volumeMin: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={filters.volumeMax}
              onChangeText={v => setFilters({ ...filters, volumeMax: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
          </View>

          {/* Prix */}
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Prix par jour (CFA)</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={filters.priceMin}
              onChangeText={v => setFilters({ ...filters, priceMin: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={filters.priceMax}
              onChangeText={v => setFilters({ ...filters, priceMax: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
          </View>

          {/* Température */}
          <Text style={tw`text-sm font-semibold mb-2 text-gray-700`}>Température (°C)</Text>
          <View style={tw`flex-row justify-between mb-4`}>
            <TextInput
              placeholder="Min"
              keyboardType="numeric"
              value={filters.tempMin}
              onChangeText={v => setFilters({ ...filters, tempMin: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
            <TextInput
              placeholder="Max"
              keyboardType="numeric"
              value={filters.tempMax}
              onChangeText={v => setFilters({ ...filters, tempMax: v })}
              style={[tw`border border-gray-300 rounded-lg px-3 py-2 text-sm`, { width: '48%' }]}
            />
          </View>
        </ScrollView>
      )}

      {/* Contenu principal */}
      {viewMode === 'map' ? (
        renderMapView()
      ) : (
        <ScrollView style={tw`flex-1 px-4 pt-4`} showsVerticalScrollIndicator={false}>
          {filteredListings.length > 0 ? (
            <FlatList
              data={filteredListings}
              renderItem={renderListingCard}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={tw`bg-white rounded-xl p-8 items-center shadow-sm mt-4`}>
              <Ionicons name="search-outline" size={48} color="#ccc" style={tw`mb-4`} />
              <Text style={tw`text-lg font-semibold text-gray-600 mb-2`}>Aucun résultat trouvé</Text>
              <Text style={tw`text-sm text-gray-500 text-center mb-4`}>
                Essayez de modifier vos critères de recherche
              </Text>
              <TouchableOpacity onPress={clearFilters} style={tw`bg-blue-600 px-4 py-2 rounded-lg`}>
                <Text style={tw`text-white text-sm`}>Effacer les filtres</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}