import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {init, addItem, fetchList, updateListpos, updateListneg, deleteFromList, deleteList} from '../database/Db';


import { Header, ChekBox, CheckBox, Icon, Button } from 'react-native-elements';
import styles from '../styles/Style';
import ListItemInput from '../components/ListItemInput'
import { TouchableOpacity } from 'react-native-gesture-handler';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

const ShoppingList = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setVisibility]=useState(false);
  const [itemList, setItemList] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');

  if(isLoaded !==true){
    readAllItems();
    setIsLoaded(true);

  }
  
  
  const addItemToList=()=>{
    readAllItems();
    setVisibility(false);
  }
  const cancelItemToList=()=>{
    setVisibility(false);
  }

  

  //dtabase operations
  

  async function updatepos(id){
    try{
      const dbResult = await updateListpos(id);
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      
      readAllItems();
    }
  }
  async function updateneg(id){
    try{
      const dbResult = await updateListneg(id);
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      
      readAllItems();
    }
  }

  async function deleteItem(id){
    try{
      
      const dbResult = await deleteFromList(id);
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      
      readAllItems();
    }
  }
  async function deleteAll(){
    try{
      
      const dbResult = await deleteList();
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      
      readAllItems();
    }
  }
  async function readAllItems() {


    try {
      const dbResult = await fetchList(newItemName, newItemAmount, newItemUnit);
      console.log("dbResult");

      //Take a look at the stucture of the dbResult printed below
      console.log(dbResult);
      //The structure tells that we have to use dbResult.rows._array
      setItemList(dbResult.rows._array);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      console.log("test");
    }
  }

  return (
    <View>
      <Header
        centerComponent={{ text: 'ShoppingList', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
      />
      

      
      
      
      <View style={styles.padding}>
        <FlatList
          // keyExtractor={item=>item.id.toString()}
          keyExtractor={item => itemList.indexOf(item).toString()}
          data={itemList}
          renderItem={itemData => (
            <View style={styles.listItemStyle}>
              
              {itemData.item.checked === 1 ? <CheckBox title={<Text>{itemData.item.name} {itemData.item.amount} {itemData.item.unit}</Text>} 
              onPress={()=> updateneg(itemData.item.id)} onLongPress={()=> deleteItem(itemData.item.id)} checked={true}> </CheckBox>
              
              : <CheckBox title={<Text>{itemData.item.name} {itemData.item.amount} {itemData.item.unit}</Text>} 
              onPress={()=> updatepos(itemData.item.id)} onLongPress={()=> deleteItem(itemData.item.id)} checked={false}> </CheckBox>}
              
              
              
              
            </View>
          )}
        />
        
        
      </View>
      
      <View>
      <Button title="Add new item" buttonStyle={styles.button} onPress={()=>setVisibility(true)} ></Button>
      <ListItemInput visibility={isVisible} onAddItem={addItemToList} onCancelItem={cancelItemToList}/>
      <View><Icon name="delete" type="material" size={40} onPress={deleteAll}/></View>
      </View>


    </View>
  );
}




export default ShoppingList;