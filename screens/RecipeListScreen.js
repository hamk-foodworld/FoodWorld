import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { fetchAllFavorite } from '../sqlconnection/dbFavorite';
import styles from '../styles/Style';
import RecipeInputScreen from './RecipeInputScreen';
import RecipeScreen from './RecipeScreen';
import RecipeItem from '../components/RecipeItem';

const RecipeListScreen = (props) => {
  

  const [recipeList, addRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      if (isLoading) {
          setLoading(false);
          fetchRecipes();
      }
  })

  async function fetchRecipes() {
      const recipes = await fetch(`https://able-groove-288106.appspot.com/rest/foodservice/getCountryRecipe/${props.route.params.countryId}`)
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
    <View style={styles.screenLayout}>
      <Header
        leftComponent={<Icon
          name="back"
          type="entypo"
          color="white"
          onPress={() => props.navigation.goBack()}
        />}
        centerComponent={{ text: 'Recipes', style: styles.titletext }}
        rightComponent={<Icon name="plus" type="font-awesome" color="white" onPress={() => props.navigation.navigate('RecipeInputScreen', { screen: 'RecipeInputScreen', params: { countryId: props.route.params.countryId } })} />}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
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

    </View>
  );
}



const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipeListScreen" component={RecipeListScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeScreen" component={RecipeScreen} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeInputScreen" component={RecipeInputScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;