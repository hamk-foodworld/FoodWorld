import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Recipes from './Recipes';
import styles from '../styles/Style';


const HomeScreen = (props) => {
    return (
        <View>
            <Header
                centerComponent={{ text: 'Countries', style: styles.titletext }}
                rightComponent={<Icon name="filter" type="font-awesome" color="white" onPress={() => props.navigation.goBack()}/>}
                containerStyle={{
                    backgroundColor: 'darkred',
                }}
            />
            <View><Button buttonStyle={styles.button}
                title="Go to Recipes"
                onPress={() => props.navigation.navigate('Recipes')}
            /></View>
        </View>
    );
}


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}




export default HomeStackScreen;