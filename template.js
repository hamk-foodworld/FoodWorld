import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import styles from '../styles/Style';


const template=(props)=>{
    return (
        <View>
           <Header
  
                centerComponent={{ text: 'Template', style: styles.titletext }}
                rightComponent= {<Icon name="filter" type="font-awesome" color="white"/>}
                containerStyle={{
                    backgroundColor: 'darkred',
                    
                  }}
            />
            

          
        </View>
        
      );
}



  
  export default template;