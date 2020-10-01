import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../styles/Style';
import RecipeScreen from './RecipeScreen';
import RecipeListScreen from './RecipeListScreen';
import RecipeInput from '../components/RecipeInput'





const RecipeInputScreen = (props) => {
  console.log(props.route.params.countryId);

  return (
    <View>
      <Header
        leftComponent={<Icon
          name="back"
          type="entypo"
          color="white"
          onPress={() => props.navigation.goBack()}
        />}
        centerComponent={{ text: 'New Recipe', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
      <View>
          <RecipeInput countryId={props.route.params.countryId} />
      </View>
      
    </View>
  );
}



const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipeInputScreen" component={RecipeInputScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;