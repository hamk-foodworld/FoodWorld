import { HeaderStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Style';

const template = (props) => {
  return (
    <View>
      <HeaderStyleInterpolators
        centerComponent={{ text: 'Template', style: styles.titletext }}
        rightComponent={<Icon name="filter" type="font-awesome" color="white" />}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
      />
    </View>
  );
}

export default template;