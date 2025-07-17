import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../context/UserContext';
import tw from 'tailwind-react-native-classnames';

export default function RoleSwitcher() {
  const { activeRole, setActiveRole } = useContext(UserContext);

  const roles = ['Hôte', 'Locataire', 'Expéditeur', 'Chauffeur','Vendeur'];

  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-sm mb-1 text-gray-700`}>Changer de rôle :</Text>
      <View style={tw`border rounded bg-white`}>
        <Picker
          selectedValue={activeRole}
          onValueChange={(role) => setActiveRole(role)}
        >
          {roles.map((role) => (
            <Picker.Item key={role} label={role} value={role} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
