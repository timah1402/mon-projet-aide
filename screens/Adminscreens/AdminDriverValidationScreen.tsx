import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Alert, 
  Image, 
  Dimensions,
  StatusBar,
  Modal,
  TextInput 
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AdminDriverValidationScreen() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'history'
  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [driverToReject, setDriverToReject] = useState(null);
  
  const [pendingDrivers, setPendingDrivers] = useState([
    {
      id: 1,
      name: 'Amadou Ba',
      phone: '+221 77 123 45 67',
      license: 'Permis B123456',
      idCard: 'CNI 123456789',
      vehicleType: 'Camion frigorifique',
      submittedAt: '2024-08-18',
      avatar: 'https://ui-avatars.com/api/?name=Amadou+Ba&background=10b981&color=fff&size=100',
      documents: {
        license: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
        vehicle: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop'
      },
      status: 'verified'
    },
    {
      id: 2,
      name: 'Mariama Diouf',
      phone: '+221 77 765 43 21',
      license: 'Permis C654321',
      idCard: 'CNI 987654321',
      vehicleType: 'Véhicule réfrigéré',
      submittedAt: '2024-08-19',
      avatar: 'https://ui-avatars.com/api/?name=Mariama+Diouf&background=3b82f6&color=fff&size=100',
      documents: {
        license: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        vehicle: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      },
      status: 'pending'
    },
    {
      id: 3,
      name: 'Ibrahima Fall',
      phone: '+221 78 987 65 43',
      license: 'Permis BC789012',
      idCard: 'CNI 456789123',
      vehicleType: 'Camion isotherme',
      submittedAt: '2024-08-20',
      avatar: 'https://ui-avatars.com/api/?name=Ibrahima+Fall&background=ef4444&color=fff&size=100',
      documents: {
        license: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
        idCard: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        vehicle: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop'
      },
      status: 'new'
    },
  ]);

  const [historyDrivers, setHistoryDrivers] = useState([
    {
      id: 101,
      name: 'Ousmane Seck',
      phone: '+221 77 555 12 34',
      license: 'Permis A987654',
      idCard: 'CNI 111222333',
      vehicleType: 'Fourgon réfrigéré',
      processedAt: '2024-08-15',
      processedBy: 'Admin Sarah',
      status: 'validated',
      avatar: 'https://ui-avatars.com/api/?name=Ousmane+Seck&background=059669&color=fff&size=100',
      rejectionReason: null
    },
    {
      id: 102,
      name: 'Aminata Ndiaye',
      phone: '+221 78 444 56 78',
      license: 'Permis B445566',
      idCard: 'CNI 444555666',
      vehicleType: 'Camion isotherme',
      processedAt: '2024-08-14',
      processedBy: 'Admin Karim',
      status: 'validated',
      avatar: 'https://ui-avatars.com/api/?name=Aminata+Ndiaye&background=7c3aed&color=fff&size=100',
      rejectionReason: null
    },
    {
      id: 103,
      name: 'Moussa Diallo',
      phone: '+221 77 888 99 00',
      license: 'Permis C778899',
      idCard: 'CNI 777888999',
      vehicleType: 'Véhicule réfrigéré',
      processedAt: '2024-08-12',
      processedBy: 'Admin Sarah',
      status: 'rejected',
      avatar: 'https://ui-avatars.com/api/?name=Moussa+Diallo&background=dc2626&color=fff&size=100',
      rejectionReason: 'Documents non conformes'
    },
    {
      id: 104,
      name: 'Fatima Kane',
      phone: '+221 78 111 22 33',
      license: 'Permis D112233',
      idCard: 'CNI 101112131',
      vehicleType: 'Camion frigorifique',
      processedAt: '2024-08-10',
      processedBy: 'Admin Karim',
      status: 'validated',
      avatar: 'https://ui-avatars.com/api/?name=Fatima+Kane&background=2563eb&color=fff&size=100',
      rejectionReason: null
    },
  ]);

  const handleDocumentPress = (documentUri) => {
    setSelectedDocument(documentUri);
    setModalVisible(true);
  };

  const handleDecision = (id, decision) => {
    const driver = pendingDrivers.find(driver => driver.id === id);
    
    if (decision === 'reject') {
      // Ouvrir la modal de motif de rejet
      setDriverToReject(driver);
      setRejectionModalVisible(true);
      return;
    }
    
    // Pour validation directe
    Alert.alert(
      'Valider le chauffeur',
      `Valider "${driver.name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Valider',
          style: 'default',
          onPress: () => processDecision(id, 'validate', null),
        },
      ]
    );
  };

  const processDecision = (id, decision, reason = null) => {
    const driver = pendingDrivers.find(driver => driver.id === id);
    
    // Ajouter à l'historique
    const newHistoryEntry = {
      ...driver,
      id: Date.now(), // Nouvel ID pour l'historique
      processedAt: new Date().toISOString().split('T')[0],
      processedBy: 'Admin Actuel',
      status: decision === 'validate' ? 'validated' : 'rejected',
      rejectionReason: reason
    };
    setHistoryDrivers(prev => [newHistoryEntry, ...prev]);
    
    // Retirer de la liste en attente
    setPendingDrivers(pendingDrivers.filter(driver => driver.id !== id));
  };

  const handleRejectWithReason = () => {
    if (!rejectionReason.trim()) {
      Alert.alert('Erreur', 'Veuillez spécifier un motif de rejet');
      return;
    }
    
    processDecision(driverToReject.id, 'reject', rejectionReason.trim());
    
    // Réinitialiser les états
    setRejectionModalVisible(false);
    setRejectionReason('');
    setDriverToReject(null);
  };

  const predefinedReasons = [
    'Documents non conformes',
    'Permis de conduire expiré',
    'CNI non valide',
    'Véhicule non adapté',
    'Informations incomplètes',
    'Documents de mauvaise qualité'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'new': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified': return 'Vérifié';
      case 'pending': return 'En attente';
      case 'new': return 'Nouveau';
      default: return 'Inconnu';
    }
  };

  const getHistoryStatusColor = (status) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getHistoryStatusText = (status) => {
    switch (status) {
      case 'validated': return 'Validé';
      case 'rejected': return 'Rejeté';
      default: return 'Inconnu';
    }
  };

  const getHistoryStatusIcon = (status) => {
    switch (status) {
      case 'validated': return 'checkmark-circle';
      case 'rejected': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const renderHistoryCard = (driver) => {
    return (
      <View key={driver.id} style={tw`bg-white mb-4 rounded-2xl shadow-sm overflow-hidden`}>
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: driver.avatar }}
                style={tw`w-10 h-10 rounded-full mr-3`}
              />
              <View>
                <Text style={tw`font-bold text-gray-800`}>{driver.name}</Text>
                <Text style={tw`text-sm text-gray-600`}>{driver.vehicleType}</Text>
              </View>
            </View>
            <View style={[tw`px-3 py-1 rounded-full flex-row items-center`, tw`${getHistoryStatusColor(driver.status)}`]}>
              <Ionicons 
                name={getHistoryStatusIcon(driver.status)} 
                size={14} 
                color={driver.status === 'validated' ? '#059669' : '#dc2626'} 
              />
              <Text style={tw`text-xs font-semibold ml-1`}>{getHistoryStatusText(driver.status)}</Text>
            </View>
          </View>

          <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Ionicons name="call-outline" size={14} color="#6B7280" />
              <Text style={tw`text-sm text-gray-700 ml-2`}>{driver.phone}</Text>
            </View>
            <View style={tw`flex-row items-center mb-1`}>
              <Ionicons name="card-outline" size={14} color="#6B7280" />
              <Text style={tw`text-sm text-gray-700 ml-2`}>Permis : {driver.license}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="id-card-outline" size={14} color="#6B7280" />
              <Text style={tw`text-sm text-gray-700 ml-2`}>CNI : {driver.idCard}</Text>
            </View>
          </View>

          {driver.rejectionReason && (
            <View style={tw`bg-red-50 p-3 rounded-lg mb-3`}>
              <Text style={tw`text-sm font-semibold text-red-800 mb-1`}>Motif de rejet :</Text>
              <Text style={tw`text-sm text-red-700`}>{driver.rejectionReason}</Text>
            </View>
          )}

          <View style={tw`flex-row items-center justify-between pt-3 border-t border-gray-100`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="calendar-outline" size={14} color="#6B7280" />
              <Text style={tw`text-xs text-gray-600 ml-1`}>
                {new Date(driver.processedAt).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="person-outline" size={14} color="#6B7280" />
              <Text style={tw`text-xs text-gray-600 ml-1`}>{driver.processedBy}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderDocuments = (documents) => {
    return (
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Documents fournis :</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => handleDocumentPress(documents.license)}
            style={tw`mr-3 items-center`}
          >
            <Image
              source={{ uri: documents.license }}
              style={tw`w-20 h-16 rounded-lg mb-1`}
              resizeMode="cover"
            />
            <Text style={tw`text-xs text-blue-600 font-medium`}>Permis</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleDocumentPress(documents.idCard)}
            style={tw`mr-3 items-center`}
          >
            <Image
              source={{ uri: documents.idCard }}
              style={tw`w-20 h-16 rounded-lg mb-1`}
              resizeMode="cover"
            />
            <Text style={tw`text-xs text-blue-600 font-medium`}>CNI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => handleDocumentPress(documents.vehicle)}
            style={tw`items-center`}
          >
            <Image
              source={{ uri: documents.vehicle }}
              style={tw`w-20 h-16 rounded-lg mb-1`}
              resizeMode="cover"
            />
            <Text style={tw`text-xs text-blue-600 font-medium`}>Véhicule</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View style={tw`bg-white px-4 py-4 shadow-sm`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-gray-800`}>Gestion des chauffeurs</Text>
          <View style={tw`w-6`} />
        </View>
        
        {/* Tabs */}
        <View style={tw`flex-row mt-4 bg-gray-100 rounded-lg p-1`}>
          <TouchableOpacity
            onPress={() => setActiveTab('pending')}
            style={[
              tw`flex-1 py-2 rounded-md`,
              activeTab === 'pending' ? tw`bg-white shadow-sm` : tw``
            ]}
          >
            <Text style={[
              tw`text-center font-semibold`,
              activeTab === 'pending' ? tw`text-gray-800` : tw`text-gray-500`
            ]}>
              En attente ({pendingDrivers.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            style={[
              tw`flex-1 py-2 rounded-md`,
              activeTab === 'history' ? tw`bg-white shadow-sm` : tw``
            ]}
          >
            <Text style={[
              tw`text-center font-semibold`,
              activeTab === 'history' ? tw`text-gray-800` : tw`text-gray-500`
            ]}>
              Historique ({historyDrivers.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-4`} showsVerticalScrollIndicator={false}>
        {activeTab === 'pending' ? (
          // Section En Attente
          pendingDrivers.length === 0 ? (
            <View style={tw`items-center justify-center mt-20`}>
              <View style={tw`bg-green-100 p-6 rounded-full mb-4`}>
                <Ionicons name="checkmark-circle" size={64} color="#10B981" />
              </View>
              <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>Tout est validé !</Text>
              <Text style={tw`text-gray-600 text-center`}>Aucun chauffeur en attente de validation</Text>
            </View>
          ) : (
            pendingDrivers.map(driver => (
              <View key={driver.id} style={tw`bg-white mb-6 rounded-2xl shadow-sm overflow-hidden`}>
                {/* Driver Header */}
                <View style={tw`p-4 bg-gray-50 flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <Image
                      source={{ uri: driver.avatar }}
                      style={tw`w-12 h-12 rounded-full mr-3`}
                    />
                    <View>
                      <Text style={tw`font-bold text-gray-800 text-lg`}>{driver.name}</Text>
                      <Text style={tw`text-sm text-gray-600`}>{driver.vehicleType}</Text>
                    </View>
                  </View>
                  <View style={[tw`px-3 py-1 rounded-full`, tw`${getStatusColor(driver.status)}`]}>
                    <Text style={tw`text-xs font-semibold`}>{getStatusText(driver.status)}</Text>
                  </View>
                </View>

                <View style={tw`p-4`}>
                  {/* Contact & Info */}
                  <View style={tw`mb-4`}>
                    <View style={tw`flex-row items-center mb-2`}>
                      <Ionicons name="call-outline" size={16} color="#6B7280" />
                      <Text style={tw`text-sm text-gray-700 ml-2`}>{driver.phone}</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="car-outline" size={16} color="#6B7280" />
                      <Text style={tw`text-sm text-gray-700 ml-2`}>{driver.vehicleType}</Text>
                    </View>
                  </View>

                  {/* Documents officiels */}
                  <View style={tw`bg-blue-50 p-3 rounded-xl mb-4`}>
                    <Text style={tw`text-sm font-semibold text-blue-800 mb-2`}>Documents officiels</Text>
                    <View style={tw`flex-row items-center mb-1`}>
                      <Ionicons name="card-outline" size={14} color="#2563EB" />
                      <Text style={tw`text-sm text-blue-700 ml-2`}>Permis : {driver.license}</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="id-card-outline" size={14} color="#2563EB" />
                      <Text style={tw`text-sm text-blue-700 ml-2`}>CNI : {driver.idCard}</Text>
                    </View>
                  </View>

                  {/* Documents Gallery */}
                  {renderDocuments(driver.documents)}

                  {/* Submission Date */}
                  <View style={tw`flex-row items-center mb-4`}>
                    <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                    <Text style={tw`text-sm text-gray-600 ml-2`}>
                      Candidature soumise le {new Date(driver.submittedAt).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={tw`flex-row justify-between mt-4 pt-4 border-t border-gray-100`}>
                    <TouchableOpacity
                      onPress={() => handleDecision(driver.id, 'reject')}
                      style={tw`bg-red-50 border border-red-200 px-6 py-3 rounded-xl w-[48%] items-center`}
                    >
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="close-circle" size={18} color="#EF4444" />
                        <Text style={tw`text-red-600 font-semibold ml-2`}>Rejeter</Text>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleDecision(driver.id, 'validate')}
                      style={tw`bg-green-600 px-6 py-3 rounded-xl w-[48%] items-center shadow-sm`}
                    >
                      <View style={tw`flex-row items-center`}>
                        <Ionicons name="checkmark-circle" size={18} color="white" />
                        <Text style={tw`text-white font-semibold ml-2`}>Valider</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )
        ) : (
          // Section Historique
          historyDrivers.length === 0 ? (
            <View style={tw`items-center justify-center mt-20`}>
              <View style={tw`bg-gray-100 p-6 rounded-full mb-4`}>
                <Ionicons name="time-outline" size={64} color="#6B7280" />
              </View>
              <Text style={tw`text-xl font-bold text-gray-800 mb-2`}>Aucun historique</Text>
              <Text style={tw`text-gray-600 text-center`}>Les demandes traitées apparaîtront ici</Text>
            </View>
          ) : (
            historyDrivers.map(driver => renderHistoryCard(driver))
          )
        )}
        
        <View style={tw`h-6`} />
      </ScrollView>

      {/* Document Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-90 justify-center items-center`}>
          <TouchableOpacity
            style={tw`absolute top-12 right-4 z-10`}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          
          {selectedDocument && (
            <Image
              source={{ uri: selectedDocument }}
              style={{ width: width - 40, height: width - 40 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      {/* Rejection Reason Modal */}
      <Modal
        visible={rejectionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRejectionModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center px-4`}>
          <View style={tw`bg-white rounded-2xl p-6 w-full max-w-md`}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>Motif de rejet</Text>
              <TouchableOpacity onPress={() => setRejectionModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {driverToReject && (
              <View style={tw`bg-gray-50 p-3 rounded-lg mb-4`}>
                <Text style={tw`text-sm font-semibold text-gray-700`}>Chauffeur : {driverToReject.name}</Text>
                <Text style={tw`text-sm text-gray-600`}>{driverToReject.vehicleType}</Text>
              </View>
            )}

            <Text style={tw`text-sm font-semibold text-gray-700 mb-3`}>Motifs prédéfinis :</Text>
            <ScrollView style={tw`max-h-32 mb-4`}>
              {predefinedReasons.map((reason, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setRejectionReason(reason)}
                  style={[
                    tw`p-3 mb-2 rounded-lg border`,
                    rejectionReason === reason 
                      ? tw`bg-red-50 border-red-200` 
                      : tw`bg-gray-50 border-gray-200`
                  ]}
                >
                  <Text style={[
                    tw`text-sm`,
                    rejectionReason === reason ? tw`text-red-700 font-semibold` : tw`text-gray-700`
                  ]}>
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Ou saisissez un motif personnalisé :</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-gray-700`}
              placeholder="Décrivez le motif de rejet..."
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                onPress={() => setRejectionModalVisible(false)}
                style={tw`bg-gray-100 px-6 py-3 rounded-xl w-[48%] items-center`}
              >
                <Text style={tw`text-gray-700 font-semibold`}>Annuler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleRejectWithReason}
                style={tw`bg-red-600 px-6 py-3 rounded-xl w-[48%] items-center`}
              >
                <Text style={tw`text-white font-semibold`}>Rejeter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}