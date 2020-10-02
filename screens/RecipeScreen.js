import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, ListItem, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/Style';
import { init, addItem } from '../sqlconnection/dbShop';
import readAllItems from './ShoppingList';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

const RecipeScreen = (props) => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [recepie, setRecepie] = useState({});
  const [ingredients, setingredients] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    const recipeId = props.route.params.params.recipeId;

    let res = null;
    try {
      res = await fetch(`https://able-groove-288106.appspot.com/rest/foodservice/getRecipe/${recipeId}`);
    }
    catch (error) {
      setErrors(true);
    }

    try {
      const responseData = await res.json();
      //console.log(responseData);
      setRecepie(responseData);
      setingredients(responseData.ingredients);
      

      //console.log("test")
      //console.log()

    }
    catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
      console.log(someError);
    }
    finally {
      console.log("test")
    }
  }
  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
      fetchData();
    }
  });


  const addToShopList = () => {
    console.log(recepie.ingredients);
    recepie.ingredients.forEach(element => {
      const dbResult = addItem(element.sName, element.iAmount, element.sUnit);
      
    });
   
    props.navigation.navigate('ShoppingList', { screen: 'ShoppingList', params: { recipe: "ok" }});
    



  }


  return (

    <View>
      <ScrollView>
        <Header
          leftComponent={<Icon
            name="back"
            type="entypo"
            color="white"
            onPress={() => props.navigation.goBack()}
          />}
          centerComponent={{ text: recepie.sName, style: styles.titletext }}
          containerStyle={{
            backgroundColor: 'darkred',

          }}
        />
        <View>

          <Card>
            <Card.Image source={{ uri: recepie.sPic }} />
            <Card.Divider />
            <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
              <View style={[{ flex: 1, flexDirection: 'row' }]}>
                <Text>{recepie.iAmountPeople}</Text>
                <Icon name="user" type="font-awesome-5"></Icon>
                <Text>     {recepie.iCookingTime} minutes</Text>
              </View>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginRight: -50 }]}>
                <Icon name="shopping-cart" type="font-awesome-5" onPress={() => addToShopList()}></Icon>
                <Icon name="heart" type="font-awesome-5"></Icon>
              </View>
            </View>
            <Text style={{ fontWeight: "bold" }}>Description:</Text>
            <Text>
              {recepie.sDescription}
            </Text>
            <Text style={{ fontWeight: "bold" }}>Ingredients:</Text>


            <FlatList
              data={recepie.ingredients}
              renderItem={itemData =>
                <View>
                  <Text>-{itemData.item.iAmount} {itemData.item.sUnit} {itemData.item.sName}</Text>
                </View>
              }
              keyExtractor={(item) => item.iID.toString()}
            />

            <Text style={{ fontWeight: "bold" }}>Preperation:</Text>
            <Text>
              {recepie.sPreparation}
            </Text>
          </Card>

        </View>
      </ScrollView>
    </View>


  );
}



export default RecipeScreen;