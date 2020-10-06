import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles/Style';
import { View } from 'react-native';
import { Header, Icon, Input, CheckBox, ListItem, Button } from 'react-native-elements';
import IngredientInput from '../components/IngredientInput';

const RecipeInputScreen = (props) => {
  const [ingredientList, addIngredient] = useState([]);
  const [isVisible, setVisibility] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreperationTime] = useState(0);
  const [preperation, setPreperation] = useState('');
  const [amountPeople, setAmountPeople] = useState(1);
  const [pictureUrl, setPictureUrl] = useState('');

  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [lactose, setLactose] = useState(false);
  const [gluten, setGluten] = useState(false);

  const nameInputHandler = (enteredText) => {
    setName(enteredText);
  }
  const descriptionInputHandler = (enteredText) => {
    setDescription(enteredText);
  }
  const preperationTimeInputHandler = (enteredText) => {
    setDescription(enteredText);
  }
  const preperationInputHandler = (enteredText) => {
    setDescription(enteredText);
  }
  const amountPeopleInputHandler = (enteredText) => {
    setDescription(enteredText);
  }
  const pictureUrlInputHandler = (enteredText) => {
    setDescription(enteredText);
  }

  const addRecipe = () => {
    const newRecipe = {
      sName: name,
      iCookingTime: preparationTime,
      sDescription: description,
      iAmountPeople: amountPeople,
      sPreparation: preperation,
      byVegan: vegan ? 1 : 0,
      byVegetarian: vegetarian ? 1 : 0,
      byGluten: gluten ? 1 : 0,
      byLactose: lactose ? 1 : 0,
      sPic: pictureUrl,
      iCountryID: props.route.params.countryId,
      ingredients: ingredientList.map(i => ({ sName: i.name, iAmount: i.amount, iUnit: i.unit.id })),
    };
    addData(newRecipe);
  }

  async function addData(reqBody) {
    const response = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/addRecipe",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
    const responseData = await response.json();
  }

  const addIngredientToList = (name, amount, unit) => {
    addIngredient(ingredientList => [...ingredientList, { name, amount, unit }]);
    setVisibility(false);
  }

  const cancelIngredientToList = () => {
    setVisibility(false);
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
        centerComponent={{ text: 'New Recipe', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}

      />
      <View>
        <Input label="Name" onChangeText={nameInputHandler} />
        <Input label="Description" onChangeText={descriptionInputHandler} />
        <Input label="Preparation time" onChangeText={preperationTimeInputHandler} />
        <Input label="Preparation" onChangeText={preperationInputHandler} />
        <Input label="Amount of people" onChangeText={amountPeopleInputHandler} />
        <Input label="Picture url" onChangeText={pictureUrlInputHandler} />
        <CheckBox
          title='Vegetarian'
          checked={vegetarian}
          onPress={() => setVegetarian(!vegetarian)}
        />
        <CheckBox
          title='Vegan'
          checked={vegan}
          onPress={() => setVegan(!vegan)}
        />
        <CheckBox
          title='Contains Lactose'
          checked={lactose}
          onPress={() => setLactose(!lactose)}
        />
        <CheckBox
          title='Contains Gluten'
          checked={gluten}
          onPress={() => setGluten(!gluten)}
        />
        <Button
          title="Add ingredient"
          onPress={() => setVisibility(true)}
        />
        <IngredientInput visibility={isVisible} onAddIngredient={addIngredientToList} onCancelIngredient={cancelIngredientToList} />
        <View>
          {
            ingredientList.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.amount} {item.unit.name} {item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
        <Button
          title="Save recipe"
          onPress={addRecipe}
        />
      </View>
    </View>
  );
}

const RecipesStack = createStackNavigator();

function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipeInputScreen" component={RecipeInputScreen} options={{ headerShown: false }} />
    </RecipesStack.Navigator>
  );
}

export default RecipesStackScreen;