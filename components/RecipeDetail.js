import React, { useState, useEffect } from "react";
import { ListItem, Card,Icon  } from 'react-native-elements'
import {StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList} from 'react-native';




const RecipeDetail = () => {
    const [hasError, setErrors] = useState(false);
const [someError, setSomeErrors] = useState('');
const [recepie, setRecepie] = useState();
const [isLoading, setLoading] = useState(true);
async function fetchData() {
    let res = null;
    try {
      res = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getRecipe/1");
    }
    catch (error) {
      setErrors(true);
    }

    try {
      const responseData = await res.json();
      console.log(responseData);
      setRecepie(responseData);
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
  return (

    <View>
     <Card>
     <Card.Image source={{uri: recepie.sPic }} />
     <Card.Divider/>
     <View style={[{flexDirection:'row', alignItems:'center'}]}>
     <View style={[{flex:1,flexDirection:'row'}]}>
       <Text>{recepie.iAmountPeople}</Text>
       <Icon name="user" type="font-awesome-5"></Icon>
       <Text>     {recepie.iCookingTime}</Text>
       </View>
       <View style={[{flex:1,flexDirection:'row',justifyContent:'space-evenly',marginRight:-50}]}>
       <Icon name="shopping-cart" type="font-awesome-5"></Icon>
       <Icon name="heart" type="font-awesome-5"></Icon>
       </View>
       </View>
     <Text style={styles.subtitle}>Description:</Text>
       <Text>
        {recepie.sDescription}
      </Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      <FlatList      
        data={recepie.ingredients}         
        renderItem={({item})=>(
            <ListItem >
                <ListItem.Content>
        <Text>- {item.iAmount}{item.sUnit} {item.sName}</Text>
                </ListItem.Content>
            </ListItem>          
        )}
        keyExtractor={(item)=>item.iID}
      />    
      <Text style={styles.subtitle}>Preperation:</Text>
       <Text>
       {recepie.sPreparation}
      </Text>
     </Card>
    </View>
  );
}
const styles=StyleSheet.create({
  subtitle:{
     
      fontWeight: "bold",
  },
});




export default RecipeDetail;