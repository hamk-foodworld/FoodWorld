import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RecipeInput from './components/RecipeInput';
import RecipeList from './components/RecipeList';

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
