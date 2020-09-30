import React, { useState } from 'react';
import { addFavorite } from '../sqlconnection/dbFavorite';

import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements'

const RecipeItem = (props) => {
    const [favorite, setFavorite] = useState(false);

    const nextPageHandler = () => {
        console.log(`navigating to following recipe id: ${props.id}`);
    }

    const favoriteHandler = () => {
        if (favorite) {
            // unfavorite -> update database

        } else {
            // favorite -> save as a new entry in database
            console.log('saving favorite...');
            saveFavorite();

        }
        setFavorite(!favorite)
    }

    async function saveFavorite() {
        try {
            const dbResult = await addFavorite(props.id);
            console.log(dbResult);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={nextPageHandler}>
                <Card>
                    <Card.Title style={styles.title}>{props.title}</Card.Title>
                    <Card.Image source={{ uri: props.pic }} />
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
                            onPress={favoriteHandler}
                        />
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            name='bread-slice'
                            size={30}
                            type='font-awesome-5'
                            color={props.gluten ? 'black' : 'lightgrey'}
                        />
                        <Icon
                            name='leaf'
                            size={30}
                            type='font-awesome-5'
                            color={props.vegetarian ? 'black' : 'lightgrey'}
                        />
                        <Icon
                            name='seedling'
                            size={30}
                            type='font-awesome-5'
                            color={props.vegan ? 'black' : 'lightgrey'}
                        />
                        <Icon
                            name='cheese'
                            size={30}
                            type='font-awesome-5'
                            color={props.lactose ? 'black' : 'lightgrey'}
                        />
                    </View>
                </Card>
            </TouchableWithoutFeedback>
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