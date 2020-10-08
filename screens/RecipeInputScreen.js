import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles/Style';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Header, Icon, Input, CheckBox, ListItem, Button } from 'react-native-elements';
import IngredientInput from '../components/IngredientInput';


const RecipeInputScreen = (props) => {
  const [ingredientList, addIngredient] = useState([]);
  const [isVisible, setVisibility] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreperationTime] = useState(0);
  const [preperation, setPreperation] = useState('');
  const [amountPeople, setAmountPeople] = useState(0);
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
    setPreperationTime(enteredText);
  }
  const preperationInputHandler = (enteredText) => {
    setPreperation(enteredText);
  }
  const amountPeopleInputHandler = (enteredText) => {
    setAmountPeople(enteredText);
  }
  const pictureUrlInputHandler = (enteredText) => {
    setPictureUrl(enteredText);
  }

  function  deleteIngredient(i){
    addIngredient(ingredientList=>{
      return ingredientList.filter((fish) =>ingredientList.indexOf(fish) !== i);
    });
  }

  const addRecipe = () => {
    var regExp = /([a-zA-Z])|,|\./g;
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
    if (newRecipe.ingredients.length == 0) {
      Alert.alert("Please add at least one ingredient");

    } else if(regExp.test(newRecipe.iCookingTime)) {
      Alert.alert("Please only add whole numbers in 'preparation time'");
    }
    else if(regExp.test(newRecipe.iAmountPeople)){
      Alert.alert("Please only add whole numbers in 'amount of people'");
    }
     else if (newRecipe.sName == "" || newRecipe.iCookingTime == 0 || newRecipe.sDescription == "" || newRecipe.iAmountPeople == 0 ||
      newRecipe.sPreparation == "" || newRecipe.sPic == "") {
      Alert.alert("Please fill in all the fields");

    } else {
      addData(newRecipe);
    }

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
    props.navigation.navigate('RecipeListScreen', { screen: 'RecipeListScreen', params: { countryId: props.route.params.countryId } });
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
      <ScrollView style={{ marginTop: 5 }}>
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
          containerStyle={{ alignItems: "center", marginTop: 5, marginBottom: 5 }}
          buttonStyle={{ width: "94%", backgroundColor: "green" }}
          onPress={() => setVisibility(true)}
        />
        <IngredientInput visibility={isVisible} onAddIngredient={addIngredientToList} onCancelIngredient={cancelIngredientToList} />
        <View>
          {
            ingredientList.map((item, i) => (
              <TouchableOpacity activeOpacity={0.8} key={i} onLongPress={()=> deleteIngredient(i)}>
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.amount} {item.unit.name} {item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              </TouchableOpacity>
            ))
          }
        </View>
        <Button
          containerStyle={{ alignItems: "center", marginBottom: 5 }}
          buttonStyle={{ width: "94%", backgroundColor: "darkgreen" }}
          title="Save recipe"
          onPress={addRecipe}
        />
      </ScrollView>
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