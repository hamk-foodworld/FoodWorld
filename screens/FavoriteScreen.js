import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import styles from '../styles/Style';
import { Header } from 'react-native-elements';
import FavoriteList from '../components/FavoriteList';
import RecipeScreen from './RecipeScreen';
import RecipeInputScreen from './RecipeInputScreen';
import { createStackNavigator } from '@react-navigation/stack';

const FavoriteScreen = (props) => {
  return (
    <View style={styles.screenLayout}>
      <Header
        centerComponent={{ text: 'Favorites', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
      />
      <FavoriteList navigation={props.navigation} />
    </View>
  );
}

const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeScreen" component={RecipeScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;