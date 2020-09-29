import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

import { Header } from 'react-native-elements';
import styles from '../styles/Style';

const ShoppingList = (props) => {
  return (
    <View>
      <Header
        centerComponent={{ text: 'ShoppingList', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />



    </View>
  );
}




export default ShoppingList;