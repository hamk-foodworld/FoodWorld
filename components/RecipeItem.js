import React, { useState } from 'react';
import { addFavorite, deleteFavorite as deleteFavoriteLocale } from '../sqlconnection/dbFavorite';


import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import styles from '../styles/Style'


const RecipeItem = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);

    const nextPageHandler = () => {
        console.log(`navigating to following recipe id: ${props.id}`);
        props.navigation.navigate('RecipeScreen', { screen: 'RecipeScreen', params: { recipeId: props.id } });
    }

    const favoriteHandler = () => {
        let reqBody = { iRecipeID: props.id, bState: false };
        if (favorite) {
            console.log(`delete favorite recipe id: ${props.id}`)
            deleteFavoriteLocale(props.id);
        } else {
            console.log(`saving favorite recipe id: ${props.id}`);
            saveFavoriteLocale();
            reqBody.bState = true;
        }
        setFavorite(!favorite);
        updateHeart(reqBody);

        props.onAddFavorite();
    }

    async function updateHeart(reqBody) {
        const response = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/addRating",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            });
    }

    async function saveFavoriteLocale() {
        try {
            const dbResult = await addFavorite(props.id);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
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

    );
}

export default RecipeItem;