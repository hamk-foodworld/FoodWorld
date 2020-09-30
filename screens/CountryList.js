
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input  } from 'react-native-elements'
import {StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList} from 'react-native';
const App = () =>{
  const [fishList, addFish]=useState([]);
  const [filter, changefilter]=useState("");
  const [keyValue, incrementKey]=useState(1);

  
  const addFishToList=()=>{
    addFish(fishList=>[...fishList, {someKey:keyValue.toString(), fav:3,someValue:"Belgium", url:"https://cdn.iconscout.com/icon/free/png-64/belgium-flag-country-nation-union-empire-32911.png"}]); 
    addFish(fishList=>[...fishList, {someKey:(keyValue+1).toString(),fav:5, someValue:"Germany", url:"https://cdn.iconscout.com/icon/free/png-64/germany-flag-country-nation-union-empire-32989.png"}]);
    addFish(fishList=>[...fishList, {someKey:(keyValue+2).toString(),fav:6, someValue:"Finland", url:"https://cdn.iconscout.com/icon/free/png-64/finland-flag-country-nation-union-empire-32966.png"}]); 
    addFish(fishList=>[...fishList,  {someKey:(keyValue+3).toString(),fav:1, someValue:"Turkey", url:"https://cdn.iconscout.com/icon/free/png-64/turkey-flag-country-nation-union-empire-33109.png"}]);
    incrementKey(keyValue+4);
  }

  const searchContacts = (enteredText) => {
    
    changefilter(String(enteredText).toLowerCase());
  };

  return (

    <View style={styles.screen}>
      <View style={styles.formStyle}>
        <Input   placeholder='Country name'
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            onChangeText={searchContacts}
           />  
        <Button title="Add" onPress={addFishToList}/>
      </View>
      <ScrollView>
      <FlatList 
        keyExtractor={item=>item.someKey}
        data={fishList.filter(fish => String(String(fish.someValue).toLowerCase()).startsWith(filter))} 
        renderItem={itemData=>(
          <ListItem key={itemData.item.someKey} bottomDivider>
            <Avatar source={{uri: itemData.item.url}} />
            <ListItem.Content>
              <ListItem.Title>{itemData.item.someValue}</ListItem.Title>
              <ListItem.Subtitle>{itemData.item.fav}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create ({
  screen: {
    padding: 60,
  },
  formStyle: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:"center"
  },
  inputStyle: {
    borderWidth: 2, 
    borderColor: 'red', 
    padding: 10,
    width:'80%',
  },
  listItemStyle: {
    borderWidth: 1, 
    borderColor: 'blue', 
    padding: 5,
    backgroundColor:"#abc",
    marginVertical:5,
  },
});

export default App;