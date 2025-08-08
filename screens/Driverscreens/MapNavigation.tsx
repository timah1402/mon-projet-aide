// screens/MapNavigation.tsx
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const { width, height } = Dimensions.get('window');

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface NavigationInfo {
  distance: string;
  duration: string;
  nextInstruction: string;
}

export default function MapNavigation() {
  const params = useLocalSearchParams();
  const { destination, type, missionId } = params;

  // Coordonnées de départ (position actuelle simulée)
  const startLocation: LocationCoords = { latitude: 14.6928, longitude: -17.4467 };
  
  // Coordonnées des destinations
  const getDestinationCoords = (destination: string): LocationCoords => {
    const destinations: { [key: string]: LocationCoords } = {
      'Marché Kermel, Dakar': { latitude: 14.6937, longitude: -17.4441 },
      'Restaurant Le Baobab, Almadies': { latitude: 14.7167, longitude: -17.5167 },
      'Ferme Bio Sénégal, Rufisque': { latitude: 14.7167, longitude: -17.2667 },
      'Supermarché Auchan, Plateau': { latitude: 14.6928, longitude: -17.4467 },
      'Entrepôt Central, Pikine': { latitude: 14.7500, longitude: -17.4000 },
      'Boutique Diarra, Médina': { latitude: 14.6800, longitude: -17.4500 }
    };
    
    return destinations[destination as string] || { latitude: 14.6937, longitude: -17.4441 };
  };

  const destinationCoords = getDestinationCoords(destination as string);
  
  const [driverLocation, setDriverLocation] = useState<LocationCoords>(startLocation);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [missionCompleted, setMissionCompleted] = useState<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [navigationInfo, setNavigationInfo] = useState<NavigationInfo>({
    distance: calculateDistance(startLocation, destinationCoords).toFixed(1) + ' km',
    duration: Math.round(calculateDistance(startLocation, destinationCoords) / 30 * 60) + ' min',
    nextInstruction: 'Appuyez sur "Démarrer" pour commencer la navigation'
  });

  // Calculer la distance entre deux points
  function calculateDistance(point1: LocationCoords, point2: LocationCoords): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(point1.latitude * Math.PI / 180) * 
              Math.cos(point2.latitude * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Instructions de navigation basées sur la progression
  const getNavigationInstruction = (progress: number): string => {
    if (progress < 0.1) return 'Continuez tout droit sur Avenue Bourguiba';
    if (progress < 0.3) return 'Dans 300m, tournez à droite sur Rue de la République';
    if (progress < 0.5) return 'Tournez à droite, puis continuez 800m';
    if (progress < 0.7) return 'Tournez à gauche sur Boulevard du Centenaire';
    if (progress < 0.9) return 'Continuez 200m, destination à droite';
    return 'Vous êtes arrivé à destination !';
  };

  // Simulation du mouvement du chauffeur
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        const latDiff = destinationCoords.latitude - prev.latitude;
        const lonDiff = destinationCoords.longitude - prev.longitude;
        const totalDistance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);

        // Si très proche de la destination (arrivé)
        if (totalDistance < 0.001) { // Seuil d'arrivée augmenté
          clearInterval(interval);
          setMissionCompleted(true);
          setIsNavigating(false);
          setCurrentSpeed(0);
          setSimulationProgress(1);
          
          setNavigationInfo({
            distance: '0 km',
            duration: '0 min',
            nextInstruction: '🎉 Mission terminée avec succès !'
          });

          setShowCompletionModal(true);
          return destinationCoords; // Position finale
        }

        // Calculer nouvelle position (se déplacer vers la destination)
        const moveStep = 0.0020; // Vitesse de déplacement augmentée (4x plus rapide)
        const newLat = prev.latitude + (latDiff / totalDistance) * moveStep;
        const newLon = prev.longitude + (lonDiff / totalDistance) * moveStep;

        // Calculer progression
        const startDistance = calculateDistance(startLocation, destinationCoords);
        const currentDistance = calculateDistance({ latitude: newLat, longitude: newLon }, destinationCoords);
        const progress = Math.min(1, (startDistance - currentDistance) / startDistance);
        
        setSimulationProgress(progress);

        // Simuler vitesse réaliste
        const speed = 25 + Math.random() * 20; // 25-45 km/h
        setCurrentSpeed(speed);

        // Mettre à jour les informations de navigation
        const remainingDistance = currentDistance;
        const remainingTime = Math.max(1, Math.round(remainingDistance / (speed / 60)));
        
        setNavigationInfo({
          distance: `${remainingDistance.toFixed(1)} km`,
          duration: `${remainingTime} min`,
          nextInstruction: getNavigationInstruction(progress)
        });

        return { latitude: newLat, longitude: newLon };
      });
    }, 600); // Mise à jour toutes les 600ms (plus rapide)

    return () => clearInterval(interval);
  }, [isNavigating, destinationCoords]);

  const startNavigation = (): void => {
    setIsNavigating(true);
    setMissionCompleted(false);
    setSimulationProgress(0);
  };

  const stopNavigation = (): void => {
    setIsNavigating(false);
    setCurrentSpeed(0);
  };

  const handleArrived = (): void => {
    setShowCompletionModal(false);
    
    Alert.alert(
      'Mission terminée ! 🎉',
      `Félicitations ! Vous avez terminé votre ${type === 'pickup' ? 'collecte' : 'livraison'} avec succès.`,
      [{ 
        text: 'Retour au dashboard', 
        onPress: () => {
          // Retourner au dashboard avec indication de mission terminée
          router.back();
        }
      }]
    );
  };

  const getTitle = (): string => {
    return type === 'pickup' ? 'Vers point de collecte' : 'Vers destination';
  };

  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    return type === 'pickup' ? 'cube-outline' : 'home-outline';
  };

  const getMapColor = (): string => {
    return type === 'pickup' ? '#0284c7' : '#ea580c';
  };

  // Points pour tracer la route
  const routeCoordinates = [
    startLocation,
    driverLocation,
    destinationCoords
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => {
          stopNavigation();
          router.back();
        }} style={tw`mr-3`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold`}>{getTitle()}</Text>
          <Text style={tw`text-sm text-gray-600`} numberOfLines={1}>
            {destination}
          </Text>
        </View>
        {missionCompleted ? (
          <Ionicons name="checkmark-circle" size={28} color="#10b981" />
        ) : (
          <Ionicons name={getIconName()} size={24} color="#facc15" />
        )}
      </View>

      {/* Informations de navigation */}
      <View style={tw`px-4 py-3 bg-gray-50 border-b border-gray-200`}>
        <View style={tw`flex-row items-center justify-between mb-2`}>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="time-outline" size={18} color="#666" style={tw`mr-2`} />
            <Text style={tw`text-base font-semibold`}>{navigationInfo.duration}</Text>
            <Text style={tw`text-sm text-gray-600 ml-2`}>({navigationInfo.distance})</Text>
          </View>
          {isNavigating && (
            <View style={tw`flex-row items-center`}>
              <Ionicons name="speedometer" size={16} color={getMapColor()} style={tw`mr-1`} />
              <Text style={tw`text-sm font-medium`}>{Math.round(currentSpeed)} km/h</Text>
            </View>
          )}
          {missionCompleted && (
            <View style={tw`flex-row items-center`}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" style={tw`mr-1`} />
              <Text style={tw`text-sm text-green-600 font-medium`}>Terminé</Text>
            </View>
          )}
        </View>

        <View style={[tw`p-3 rounded-lg`, missionCompleted ? tw`bg-green-100` : tw`bg-white`]}>
          <View style={tw`flex-row items-start`}>
            <Ionicons 
              name={missionCompleted ? "checkmark" : "navigate"} 
              size={16} 
              color={missionCompleted ? "#10b981" : "#666"} 
              style={tw`mr-2 mt-0.5`} 
            />
            <Text style={[tw`text-sm flex-1`, missionCompleted ? tw`text-green-700 font-semibold` : tw`text-gray-700`]}>
              {navigationInfo.nextInstruction}
            </Text>
          </View>
        </View>

        {/* Barre de progression */}
        {isNavigating && (
          <View style={tw`mt-3`}>
            <View style={tw`flex-row justify-between text-xs text-gray-500 mb-1`}>
              <Text style={tw`text-xs text-gray-500`}>Progression</Text>
              <Text style={tw`text-xs text-gray-500`}>{Math.round(simulationProgress * 100)}%</Text>
            </View>
            <View style={tw`w-full bg-gray-200 rounded-full h-2`}>
              <View 
                style={[
                  tw`h-2 rounded-full`,
                  { 
                    width: `${simulationProgress * 100}%`,
                    backgroundColor: getMapColor()
                  }
                ]} 
              />
            </View>
          </View>
        )}
      </View>

      {/* Carte */}
      <View style={{ width: '100%', height: height * 0.5 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: (startLocation.latitude + destinationCoords.latitude) / 2,
            longitude: (startLocation.longitude + destinationCoords.longitude) / 2,
            latitudeDelta: Math.abs(startLocation.latitude - destinationCoords.latitude) * 2 + 0.01,
            longitudeDelta: Math.abs(startLocation.longitude - destinationCoords.longitude) * 2 + 0.01,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          {/* Destination */}
          <Marker
            coordinate={destinationCoords}
            title={destination as string}
            description={type === 'pickup' ? 'Point de collecte' : 'Destination de livraison'}
            pinColor={missionCompleted ? "green" : (type === 'pickup' ? 'blue' : 'orange')}
          />
          
          {/* Position du chauffeur */}
          <Marker
            coordinate={driverLocation}
            title="Ma position"
            description="Chauffeur"
            pinColor="red"
          />

          {/* Ligne de trajet */}
          <Polyline
            coordinates={[driverLocation, destinationCoords]}
            strokeColor={getMapColor()}
            strokeWidth={3}
            strokePattern={[5, 5]}
          />
        </MapView>
      </View>

      {/* Bannière de mission terminée */}
      {missionCompleted && (
        <View style={tw`mx-4 my-2 bg-green-500 rounded-lg p-4`}>
          <View style={tw`flex-row items-center justify-center`}>
            <Ionicons name="trophy" size={24} color="white" style={tw`mr-3`} />
            <Text style={tw`text-white text-lg font-bold`}>Mission terminée ! 🎉</Text>
          </View>
        </View>
      )}

      {/* Boutons d'action */}
      <View style={tw`px-4 py-4 bg-white border-t border-gray-200`}>
        {!isNavigating && !missionCompleted && (
          <TouchableOpacity
            style={[
              tw`py-4 px-6 rounded-lg flex-row items-center justify-center`,
              { backgroundColor: getMapColor() }
            ]}
            onPress={startNavigation}
          >
            <Ionicons name="play" size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-semibold text-lg`}>Démarrer la navigation</Text>
          </TouchableOpacity>
        )}
        
        {isNavigating && (
          <TouchableOpacity
            style={tw`bg-red-500 py-4 px-6 rounded-lg flex-row items-center justify-center`}
            onPress={stopNavigation}
          >
            <Ionicons name="stop" size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-semibold text-lg`}>Arrêter la navigation</Text>
          </TouchableOpacity>
        )}
        
        {missionCompleted && (
          <TouchableOpacity
            style={tw`bg-green-500 py-4 px-6 rounded-lg flex-row items-center justify-center`}
            onPress={handleArrived}
          >
            <Ionicons name="checkmark-done" size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-semibold text-lg`}>Confirmer l'arrivée</Text>
          </TouchableOpacity>
        )}

        {/* Informations de mission */}
        <View style={tw`mt-3 flex-row justify-center`}>
          <Text style={tw`text-xs text-gray-500 text-center`}>
            Mission #{missionId} • {type === 'pickup' ? 'Collecte' : 'Livraison'}
            {missionCompleted && ' • ✅ Terminée'}
          </Text>
        </View>
      </View>

      {/* Modal de félicitations */}
      <Modal
        visible={showCompletionModal}
        transparent
        animationType="fade"
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-8 mx-8 items-center shadow-2xl`}>
            <Ionicons name="trophy" size={80} color="#fbbf24" style={tw`mb-4`} />
            <Text style={tw`text-2xl font-bold text-center mb-2`}>Félicitations ! 🎉</Text>
            <Text style={tw`text-center text-gray-600 mb-2`}>
              Mission terminée avec succès
            </Text>
            <Text style={tw`text-center text-gray-500 text-sm mb-6`}>
              Vous avez terminé votre {type === 'pickup' ? 'collecte' : 'livraison'}
            </Text>
            <TouchableOpacity
              style={tw`bg-green-500 py-3 px-8 rounded-lg`}
              onPress={handleArrived}
            >
              <Text style={tw`text-white font-semibold text-lg`}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}