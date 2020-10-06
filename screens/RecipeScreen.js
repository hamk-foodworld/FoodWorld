import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, ListItem, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styles/Style';
import { addItem, fetchList, deleteFromListByName } from '../sqlconnection/dbShop';
import readAllItems from './ShoppingList';


const RecipeScreen = (props) => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [recepie, setRecepie] = useState({});
  const [ingredients, setingredients] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //const [localdb, setLocaldb] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');

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
      setRecepie(responseData);
      setingredients(responseData.ingredients);
    }
    catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
      console.log(someError);
    }
  }
  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
      fetchData();
    }
  });

  async function addToShopList() {
    try {
      const dbResult = await fetchList(newItemName, newItemAmount, newItemUnit);
      compare(dbResult.rows._array);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function compare(localdb) {
    let list = [];
    console.log("lolcaldb length" + localdb.length);
    if (localdb.length > 0) {

      for (let j = 0; j < recepie.ingredients.length; j++) {
        let duplicate = false;
        let value1 = 0;
        let unit = "";
        let name = "";
        let dupevalue1 = 0;
        let dupevalue2 = 0;
        let dupeunit = "";
        let dupename = "";

        for (let i = 0; i < localdb.length; i++) {

          if (recepie.ingredients[j].sName == localdb[i].name && recepie.ingredients[j].sAcronym == localdb[i].unit) {
            duplicate = true
            dupevalue1 = recepie.ingredients[j].iAmount;
            dupevalue2 = localdb[i].amount;
            dupename = localdb[i].name;
            dupeunit = localdb[i].unit;
          }
          else {
            value1 = recepie.ingredients[j].iAmount;
            name = recepie.ingredients[j].sName;
            unit = recepie.ingredients[j].sAcronym;
          }
        }

        if (duplicate !== true) {
          list.push({ "name": name, "amount": value1, "unit": unit })
        } else {
          let dupeamount = dupevalue2 + dupevalue1;
          const dbResult = await deleteFromListByName(dupename);
          list.push({ "name": dupename, "amount": dupeamount, "unit": dupeunit })
        }
      }

      list.forEach(element => {
        addItem(element.name, element.amount, element.unit);
      });

      props.navigation.navigate('ShoppingList', { screen: 'ShoppingList', params: { recipe: "ok" } });
    }
    else {
      recepie.ingredients.forEach(element => {
        const dbResult = addItem(element.sName, element.iAmount, element.sAcronym);
      });

      props.navigation.navigate('ShoppingList', { screen: 'ShoppingList', params: { recipe: "ok" } });
    }
  }


  return (
    <View style={{ maxHeight: "100%" }}>
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



          <FlatList
            ListHeaderComponent={
              <View>
                <Card.Image source={{ uri: recepie.sPic }} />
                <Card.Divider />
                <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                  <View style={[{ flex: 1, flexDirection: 'row' }]}>
                    <Text>{recepie.iAmountPeople}</Text>
                    <Icon name="user" type="font-awesome-5"></Icon>
                    <Text>     {recepie.iCookingTime} minutes</Text>
                  </View>
                  <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginRight: -80 }]}>
                    <Icon name="shopping-cart" type="font-awesome-5" onPress={() => addToShopList()}></Icon>
                  </View>
                </View>
                <Text style={{ fontWeight: "bold" }}>Description:</Text>
                <Text>
                  {recepie.sDescription}
                </Text>
                <Text style={{ fontWeight: "bold" }}>Ingredients:</Text>
              </View>
            }
            data={recepie.ingredients}
            renderItem={itemData =>
              <View>
                <Text>-{itemData.item.iAmount} {itemData.item.sAcronym} {itemData.item.sName}</Text>
              </View>
            }
            keyExtractor={(item) => item.iID.toString()}
            ListFooterComponent={
              <View>
                <Text style={{ fontWeight: "bold" }}>Preperation:</Text>
                <Text>
                  {recepie.sPreparation}
                </Text>
              </View>
            }
          />
        </Card>
      </View>
    </View>


  );
}



export default RecipeScreen;