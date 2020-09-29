import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStackScreen from './screens/HomeScreen';
import ShoppingList from './screens/ShoppingList';
import Favorites from './screens/Favorites';
import { Icon } from 'react-native-elements';



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

            else if (route.name==='Favorites'){
              iconName = focused ? 'heart' : 'heart-o';
              
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} type='font-awesome'/>;

          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="ShoppingList" component={ShoppingList} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
