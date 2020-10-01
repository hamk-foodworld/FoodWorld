import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import RecipeItem from './RecipeItem';

const FavoriteList = (props) => {

    const [recipeList, addRecipe] = useState([]);

    useEffect(() => {
        fetchFavoriteRecipes();
    })

    async function fetchFavoriteRecipes() {
        // change following code to local database fetch
        await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getRecipe")
            .then(parameter => parameter.json())
            .then(anotherParameter => addRecipe(anotherParameter));
    }

    return (
        <View>
            <FlatList
                onpress
                keyExtractor={item => item.iRecipeID.toString()}
                data={recipeList}
                renderItem={itemData =>
                    <RecipeItem
                        id={itemData.item.iRecipeID}
                        title={itemData.item.sName}
                        rating={itemData.item.iRating}
                        cookingTime={itemData.item.iCookingTime}
                        pic={itemData.item.sPic}
                        vegan={itemData.item.byVegan == 0 ? false : true}
                        vegetarian={itemData.item.byVegetarian == 0 ? false : true}
                        gluten={itemData.item.byGluten == 0 ? false : true}
                        lactose={itemData.item.byLactose == 0 ? false : true}
                    />
                }
            />
        </View>
    );
}

export default FavoriteList;