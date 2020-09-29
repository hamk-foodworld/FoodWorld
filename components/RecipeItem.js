import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements'

const RecipeItem = (props) => {
    const [favorite, setFavorite] = useState(false);
    
    return (
        <View>
            <Card>
                <Card.Title style={styles.title}>{props.title}</Card.Title>
                <Card.Image source={props.pic} />
                <View style={styles.icon}>
                    <Icon
                        solid
                        name='heart'
                        size={30}
                        color='#9919d4'
                        type='font-awesome-5'
                    />
                    <Text style={styles.iconText}>{props.rating}</Text>
                    <Icon
                        name='clock'
                        size={30}
                        type='font-awesome-5'
                    />
                    <Text style={styles.iconText}>{props.cookingTime}</Text>
                    <Icon
                        solid={favorite}
                        name='heart'
                        size={30}
                        color='red'
                        type='font-awesome-5'
                        onPress={() => setFavorite(!favorite)}
                    />
                </View>
                <View style={styles.icon}>
                    <Icon
                        name='bread-slice'
                        size={30}
                        type='font-awesome-5'
                    />
                    <Icon
                        name='leaf'
                        size={30}
                        type='font-awesome-5'
                    />
                    <Icon
                        name='seedling'
                        size={30}
                        type='font-awesome-5'
                    />
                    <Icon
                        name='cheese'
                        size={30}
                        type='font-awesome-5'
                    />
                </View>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 22
    },
    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    iconText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        height: '100px',
        width: '100px'
    }
});

export default RecipeItem;