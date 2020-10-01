import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../styles/Style';
import Recipe from './Recipe';
import RecipeItem from '../components/RecipeItem'





const Recipes = (props) => {

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
    <View>
      <Header
        leftComponent={<Icon
          name="back"
          type="entypo"
          color="white"
          onPress={() => props.navigation.goBack()}
        />}
        centerComponent={{ text: 'Recipes', style: styles.titletext }}
        rightComponent={<Icon name="plus" type="font-awesome" color="white" onPress={() => props.navigation.goBack()}/>}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
      <View>
      <Button buttonStyle={styles.button} onPress={addRecipeToList} title="Add" />
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
        <Button buttonStyle={styles.button}
        title="Go to Recipe Name"
        onPress={() => props.navigation.navigate('Recipe')}
      />
      </View>
      
    </View>
  );
}



const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (

    <RecipesStack.Navigator>
      <RecipesStack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />
      <RecipesStack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}


export default RecipesStackScreen;