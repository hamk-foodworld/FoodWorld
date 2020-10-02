import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStackScreen from './screens/HomeScreen';
import ShoppingList from './screens/ShoppingList';
import FavoriteScreen from './screens/FavoriteScreen';
import { Icon } from 'react-native-elements'
import RecipeInput from './components/RecipeInput';


import { init } from './sqlconnection/dbFavorite';
import { init2 } from './sqlconnection/dbShop';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

init2()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });









const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'ShoppingList') {
              iconName = focused ? 'list-alt' : 'list-alt';
            }
            else if (route.name === 'FavoriteScreen') {
              iconName = focused ? 'heart' : 'heart-o';

            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="ShoppingList" component={ShoppingList} initialParams="t" id="5" />
        <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}