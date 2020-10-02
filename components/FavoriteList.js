import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import RecipeItem from './RecipeItem';

import { fetchAllFavorite } from '../sqlconnection/dbFavorite';

const FavoriteList = (props) => {
    const [recipeList, addRecipe] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            fetchFavoriteRecipes();
        }
    })

    async function fetchFavoriteRecipes() {
        try {
            const dbResult = await fetchAllFavorite();
            const recipeIDList = dbResult.rows._array.map(row => row.recipeID);
            getFavoriteRecipes(recipeIDList);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getFavoriteRecipes(reqBody) {
        const response = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getFavRecipe",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            });
        const responseData = await response.json();
        addRecipe(responseData);
    }

    return (
        <FlatList
            onpress
            keyExtractor={item => item.iRecipeID.toString()}
            data={recipeList}
            renderItem={itemData =>
                <RecipeItem
                    navigation={props.navigation}
                    id={itemData.item.iRecipeID}
                    title={itemData.item.sName}
                    rating={itemData.item.iRating}
                    cookingTime={itemData.item.iCookingTime}
                    pic={itemData.item.sPic}
                    vegan={itemData.item.byVegan == 0 ? false : true}
                    vegetarian={itemData.item.byVegetarian == 0 ? false : true}
                    gluten={itemData.item.byGluten == 0 ? false : true}
                    lactose={itemData.item.byLactose == 0 ? false : true}
                    favorite={true}
                />
            }
        />
    );
}

export default FavoriteList;