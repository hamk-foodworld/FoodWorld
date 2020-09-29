import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import styles from '../styles/Style';
import { Header} from 'react-native-elements';

const Favorites=(props)=>{
    return (
      <View>
      <Header

           centerComponent={{ text: 'Favorites', style: styles.titletext }}
           containerStyle={{
            backgroundColor: 'darkred',
            
          }}
           
       />
       

     
   </View>
      );
}



  
  export default Favorites;