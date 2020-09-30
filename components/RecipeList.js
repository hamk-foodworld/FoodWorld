import React, { useState } from 'react';

import { View, FlatList, Button } from 'react-native';
import RecipeItem from './RecipeItem';

const RecipeList = (props) => {

    const [recipeList, addRecipe] = useState([]);

    async function fetchRecipe() {
        await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getRecipe")
            .then(parameter => parameter.json())
            .then(anotherParameter => addRecipe(anotherParameter));
    }

    return (
        <View>
            <Button onPress={() => fetchRecipe()} title="Load" />
            <FlatList
                keyExtractor={item => item.iRecipeID.toString()}
                data={recipeList}
                renderItem={itemData =>
                    <RecipeItem
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

export default RecipeList;