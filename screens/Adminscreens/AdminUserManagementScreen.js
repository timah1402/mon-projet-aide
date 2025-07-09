import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminUserManagementScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    phone: '',
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Aïssatou Sow', role: 'Locataire', phone: '+221 77 123 4567' },
    { id: 2, name: 'Moussa Diop', role: 'Hôte', phone: '+221 70 987 6543' },
    { id: 3, name: 'Fatou Sall', role: 'Expéditeur', phone: '+221 76 112 3344' },
    { id: 4, name: 'Mamadou Ndiaye', role: 'Chauffeur', phone: '+221 78 223 3344' },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search)
  );

  const handleSuspend = (id) => {
    Alert.alert(
      'Suspendre l’utilisateur',
      'Voulez-vous vraiment suspendre ce compte ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          onPress: () => {
            setUsers(users.filter(u => u.id !== id));
          },
        },
      ]
    );
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name.trim() || !newAdmin.phone.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    setUsers([
      ...users,
      { id: Date.now(), name: newAdmin.name, role: 'Admin', phone: newAdmin.phone },
    ]);
    Alert.alert('Succès', `Le compte admin ${newAdmin.name} a été créé.`);
    setNewAdmin({ name: '', phone: '' });
    setShowForm(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`px-4 pt-6`}
        contentContainerStyle={{ paddingBottom: 20 }} // permet au scroll de s'adapter même quand formulaire affiché
      >
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold mb-4 text-green-700 text-center`}>Gestion des utilisateurs</Text>

        {/* Barre de recherche */}
        <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-6`}>
          <Ionicons name="search-outline" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Rechercher par nom, rôle, téléphone..."
            value={search}
            onChangeText={setSearch}
            style={tw`flex-1 text-sm`}
          />
        </View>

        {/* Liste des utilisateurs */}
        {filteredUsers.length === 0 ? (
          <Text style={tw`text-gray-500 text-center mt-10`}>Aucun utilisateur trouvé</Text>
        ) : (
          filteredUsers.map(user => (
            <View key={user.id} style={tw`bg-white p-5 mb-4 rounded-xl shadow`}>
              <Text style={tw`text-lg font-bold mb-1 text-gray-800`}>{user.name}</Text>
              <Text style={tw`text-sm text-gray-600 mb-1`}>🎭 Rôle : {user.role}</Text>
              <Text style={tw`text-sm text-gray-600 mb-4`}>📞 Téléphone : {user.phone}</Text>

              <TouchableOpacity
                onPress={() => handleSuspend(user.id)}
                style={tw`bg-red-600 px-4 py-2 rounded-md items-center`}
              >
                <Ionicons name="ban-outline" size={20} color="white" style={tw`mr-1`} />
                <Text style={tw`text-white font-semibold`}>Suspendre</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Bouton pour afficher/masquer le formulaire */}
        <TouchableOpacity
          onPress={() => setShowForm(!showForm)}
          style={tw`bg-green-700 py-4 rounded-md items-center mt-8 mb-4 flex-row justify-center`}
        >
          <Ionicons name="person-add-outline" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-semibold text-base`}>
            {showForm ? 'Annuler' : 'Ajouter un nouveau compte admin'}
          </Text>
        </TouchableOpacity>

        {/* Formulaire */}
        {showForm && (
          <View style={tw`bg-gray-50 p-4 rounded-xl shadow mb-12`}>
            <Text style={tw`text-lg font-bold mb-4 text-gray-800`}>Créer un compte admin</Text>

            <TextInput
              placeholder="Nom complet"
              value={newAdmin.name}
              onChangeText={(value) => setNewAdmin({ name: value, phone: newAdmin.phone })}
              style={tw`border border-gray-300 rounded-md px-4 py-3 mb-4`}
            />

            <TextInput
              placeholder="Numéro de téléphone"
              value={newAdmin.phone}
              keyboardType="phone-pad"
              onChangeText={(value) => setNewAdmin({ name: newAdmin.name, phone: value })}
              style={tw`border border-gray-300 rounded-md px-4 py-3 mb-4`}
            />

            <View style={tw`bg-green-100 rounded-md p-3 mb-4`}>
              <Text style={tw`text-sm`}>Rôle : <Text style={tw`font-bold text-green-700`}>Admin</Text></Text>
            </View>

            <TouchableOpacity
              onPress={handleAddAdmin}
              style={tw`bg-green-600 py-3 rounded-md items-center`}
            >
              <Ionicons name="checkmark-outline" size={20} color="white" style={tw`mr-1`} />
              <Text style={tw`text-white font-semibold text-base`}>Créer le compte admin</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
