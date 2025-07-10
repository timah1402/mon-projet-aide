import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Attendre que le composant soit monté
    const timer = setTimeout(() => {
      setIsReady(true);
      router.replace('/login');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return null;
}