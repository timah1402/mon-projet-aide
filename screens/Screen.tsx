import { router } from 'expo-router';
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";


function Screen({ children,  ...props }) {
  return (
    <SafeAreaView >
      <StatusBar  {...props} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
   
    flex: 1,
    marginBottom: 0,
  },
});

export default Screen;