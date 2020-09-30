import React, { useState } from 'react';

import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import style from '../styles/Style'

const RecipeItem = (props) => {
    const [favorite, setFavorite] = useState(false);
    
    return (
        <View>
            <Card>
                <Card.Title style={style.title}>{props.title}</Card.Title>
                <Card.Image source={props.pic} />
                <View style={style.icon}>
                    <Icon
                        solid
                        name='heart'
                        size={30}
                        color='#9919d4'
                        type='font-awesome-5'
                    />
                    <Text style={style.iconText}>{props.rating}</Text>
                    <Icon
                        name='clock'
                        size={30}
                        type='font-awesome-5'
                    />
                    <Text style={style.iconText}>{props.cookingTime}</Text>
                    <Icon
                        solid={favorite}
                        name='heart'
                        size={30}
                        color='red'
                        type='font-awesome-5'
                        onPress={() => setFavorite(!favorite)}
                    />
                </View>
                <View style={style.icon}>
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

export default RecipeItem;