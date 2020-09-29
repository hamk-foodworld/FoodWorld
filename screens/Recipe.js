import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import styles from '../styles/Style';


const Recipe = (props) => {
    return (
        <View>
            <Header
                leftComponent={<Icon
                    name="back"
                    type="entypo"
                    color="white"
                    onPress={() => props.navigation.goBack()}
                />}
                centerComponent={{ text: 'Recipe Name', style: styles.titletext }}
                containerStyle={{
                    backgroundColor: 'darkred',

                }}
            />



        </View>

    );
}




export default Recipe;