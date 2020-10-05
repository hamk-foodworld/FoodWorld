import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RecipeScreen from '../screens/RecipeScreen';
import RecipeItem from './RecipeItem';

import { fetchAllFavorite } from '../sqlconnection/dbFavorite';

const RecipeList = (props) => {

    const [recipeList, addRecipe] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            fetchRecipes();
        }
    })

    async function fetchRecipes() {
        const recipes = await fetch(`https://able-groove-288106.appspot.com/rest/foodservice/getCountryRecipe/${props.countryId}`)
            .then(parameter => parameter.json())
        const favoritesRecipes = await fetchFavoriteRecipes();
        const recipeIDList = favoritesRecipes.map(recipe => recipe.recipeID);

        recipes.forEach(r => {
            if (recipeIDList.includes(r.iRecipeID)) {
                r.favorite = true;
            } else {
                r.favorite = false;
            }
        });
        addRecipe(recipes);
    }

    async function fetchFavoriteRecipes() {
        try {
            const dbResult = await fetchAllFavorite();
            return dbResult.rows._array;
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <FlatList
            keyExtractor={item => item.iRecipeID.toString()}
            data={recipeList}
            renderItem={itemData =>
                <RecipeItem
                    onAddFavorite={() => console.log('adding favorite event')}
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
                    favorite={itemData.item.favorite}
                />
            }
        />
    );
}


export default RecipeList;