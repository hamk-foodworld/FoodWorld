import React, { useState } from 'react';

import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import RecipeItem from './RecipeItem';

const RecipeList = (props) => {

    const [recipeList, addRecipe] = useState([]);

    const addRecipeToList = () => {
        addRecipe(recipeList => [...recipeList, {
            id: '1',
            title: 'Brownies',
            rating: '5',
            cookingTime: '10',
            pic: 'https://www.seriouseats.com/2018/03/20180413-brownie-mix-vicky-wasik-20-1500x1125.jpg'
        }, {
            id: '2',
            title: 'Pancakes',
            rating: '24',
            cookingTime: '52',
            pic: 'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg'
        }]);
    }

    return (
        <View style={styles.container}>
            <Button onPress={addRecipeToList} title="Add" />
            <FlatList
                keyExtractor={item => item.id}
                data={recipeList}
                renderItem={itemData =>
                    <RecipeItem
                        title={itemData.item.title}
                        rating={itemData.item.rating}
                        cookingTime={itemData.item.cookingTime}
                        pic={itemData.item.pic}
                        vegan={false}
                        vegetarian={false}
                        gluten={false}
                        lactose={false}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //width: '80%'
    },
});

export default RecipeList;