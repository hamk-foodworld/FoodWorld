import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../styles/Style';
import RecipeScreen from './RecipeScreen';
import RecipeList from '../components/RecipeList'
import RecipeInputScreen from './RecipeInputScreen';





const RecipeListScreen = (props) => {

  useEffect(() => {
    //console.log(props.route.params.itemId);
  });

  return (
    <View>
      <Header
        leftComponent={<Icon
          name="back"
          type="entypo"
          color="white"
          onPress={() => props.navigation.goBack()}
        />}
        centerComponent={{ text: 'Recipes', style: styles.titletext }}
        rightComponent={<Icon name="plus" type="font-awesome" color="white" onPress={() => props.navigation.navigate('RecipeInputScreen')} />}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
      <View>
        <Button buttonStyle={styles.button}
          title="Go to one Recipe"
          onPress={() => props.navigation.navigate('RecipeScreen')}
        />
        <RecipeList />
      </View>

    </View>
  );
}



const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipeListScreen" component={RecipeListScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeScreen" component={RecipeScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeInputScreen" component={RecipeInputScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;