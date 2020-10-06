import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../styles/Style';
import { Header } from 'react-native-elements';
import RecipeScreen from './RecipeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import RecipeItem from '../components/RecipeItem';
import { fetchAllFavorite } from '../sqlconnection/dbFavorite';

const FavoriteScreen = (props) => {
  const [recipeList, addRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
      fetchFavoriteRecipes();
    }
  })

  const addToFavorite = () => {
    fetchFavoriteRecipes();
  }

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
    <View style={styles.screenLayout}>
      <Header
        centerComponent={{ text: 'Favorites', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
        rightComponent={<Icon name="repeat" type="font-awesome" color="white" onPress={() => fetchFavoriteRecipes()} />}
      />
      <FlatList
        onpress
        keyExtractor={item => item.iRecipeID.toString()}
        data={recipeList}
        renderItem={itemData =>
          <RecipeItem
            onAddFavorite={addToFavorite}
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
    </View>
  );
}

const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeScreen" component={RecipeScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}

export default RecipesStackScreen;