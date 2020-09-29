import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../styles/Style';
import Recipe from './Recipe';

const Recipes = (props) => {
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
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
      <View><Button
        title="Go to Recipe Name"
        onPress={() => props.navigation.navigate('Recipe')}
      />
      </View>
    </View>
  );
}

const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />
      <RecipesStack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;