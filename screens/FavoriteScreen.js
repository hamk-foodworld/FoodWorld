import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import styles from '../styles/Style';
import { Header } from 'react-native-elements';
import FavoriteList from '../components/FavoriteList';
import { ScrollView } from 'react-native-gesture-handler';

const FavoriteScreen = (props) => {
  return (
    <View style={styles.screenLayout}>
      <Header
        centerComponent={{ text: 'Favorites', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
      />
      <FavoriteList />
    </View>
  );
}




export default FavoriteScreen;