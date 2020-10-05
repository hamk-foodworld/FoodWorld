import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { addItem, fetchList, updateListpos, updateListneg, deleteFromList, deleteList } from '../sqlconnection/dbShop';


import { Header, ChekBox, CheckBox, Icon, Button } from 'react-native-elements';
import styles from '../styles/Style';
import ListItemInput from '../components/ListItemInput'
import { TouchableOpacity } from 'react-native-gesture-handler';



const ShoppingList = (props) => {
  
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setVisibility] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');

  if (isLoaded !== true) {

    readAllItems();
    setIsLoaded(true);

  }

  

  if(props.route.params.params !== undefined && props.route.params.params.recipe == "ok"){
    readAllItems();
    
    props.route.params.params.recipe = "no";
    console.log(props.route.params.params.recipe);
  }
  
  const addItemToList=()=>{

    readAllItems();
    setVisibility(false);
  }
  const cancelItemToList = () => {
    setVisibility(false);
  }




  //dtabase operations


  async function updatepos(id) {
    try {
      const dbResult = await updateListpos(id);
      console.log(dbResult);
    }
    catch (err) {
      console.log(err);
    }
    finally {

      readAllItems();
    }
  }
  async function updateneg(id) {
    try {
      const dbResult = await updateListneg(id);
      console.log(dbResult);
    }
    catch (err) {
      console.log(err);
    }
    finally {

      readAllItems();
    }
  }

  async function deleteItem(id) {
    try {

      const dbResult = await deleteFromList(id);
      console.log(dbResult);
    }
    catch (err) {
      console.log(err);
    }
    finally {

      readAllItems();
    }
  }
  async function deleteAll() {
    try {

      const dbResult = await deleteList();
      console.log(dbResult);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      readAllItems();
    }
  }
  async function readAllItems() {


    try {
      const dbResult = await fetchList(newItemName, newItemAmount, newItemUnit);
      setItemList(dbResult.rows._array);
      
      console.log(dbResult.rows._array);
      console.log(dbResult.rows._array.length);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      
    }
  }

  

  return (
    <View>
      <Header
        
        centerComponent={{ text: 'ShoppingList', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
        rightComponent={<Icon name="plus" type="font-awesome" color="white" onPress={() => setVisibility(true)} />}
      />
      <View style={styles.padding}>
        <FlatList
          keyExtractor={item => itemList.indexOf(item).toString()}
          data={itemList}
          renderItem={itemData => (
            <View style={styles.listItemStyle}>
              {itemData.item.checked === 1 ? <CheckBox title={<Text>{itemData.item.amount} {itemData.item.unit} {itemData.item.name}</Text>}
                onPress={() => updateneg(itemData.item.id)} onLongPress={() => deleteItem(itemData.item.id)} checked={true}> </CheckBox>
                : <CheckBox title={<Text>{itemData.item.amount} {itemData.item.unit} {itemData.item.name}</Text>}
                  onPress={() => updatepos(itemData.item.id)} onLongPress={() => deleteItem(itemData.item.id)} checked={false}> </CheckBox>}
            </View>
          )}
        />
      </View>
      <View>
        
        <ListItemInput visibility={isVisible} onAddItem={addItemToList} onCancelItem={cancelItemToList} />
        <View><Icon name="delete" type="material" size={40} onPress={deleteAll} /></View>
      </View>
    </View>
  );
}




export default ShoppingList;