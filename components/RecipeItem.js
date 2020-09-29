import React from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

const RecipeItem = (props) => {
    return (
        <View style={styles.listItemStyle}>
            <Text>Title: {props.title}</Text>
            <Image
                fadeDuration={5000}
                source={{ uri: props.pic }}
                style={styles.image} resizeMode='cover' />
            <Text>Hearts: {props.hearts}</Text>
            <Text>Cooking Time: {props.cookingTime}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    listItemStyle: {
        borderWidth: 1,
        borderColor: 'blue',
        padding: 5,
        backgroundColor: "#abc",
        marginVertical: 5,
    },
    image:{
      height:'100px',
      width:'100px'
    }
});

export default RecipeItem;