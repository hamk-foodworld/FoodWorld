import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchList, updateListpos, updateListneg, deleteFromList, deleteList } from '../sqlconnection/dbShop';
import { Header, CheckBox, Icon } from 'react-native-elements';
import styles from '../styles/Style';
import ListItemInput from '../components/ListItemInput'

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

  if (props.route.params.params !== undefined && props.route.params.params.recipe == "ok") {
    readAllItems();

    props.route.params.params.recipe = "no";
    console.log(props.route.params.params.recipe);
  }

  const addItemToList = () => {
    readAllItems();
    setVisibility(false);
  }

  const cancelItemToList = () => {
    setVisibility(false);
  }

  async function updatepos(id) {
    try {
      const dbResult = await updateListpos(id);
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
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.screenLayout}>
      <Header
        leftComponent={<Icon name="delete" type="material" size={30} color="white" onPress={deleteAll} />}
        centerComponent={{ text: 'ShoppingList', style: styles.titletext }}
        containerStyle={{
          backgroundColor: 'darkred',
        }}
        rightComponent={<Icon name="plus" type="font-awesome" color="white" onPress={() => setVisibility(true)} />}
      />
      
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
      
      <View>
        <ListItemInput visibility={isVisible} onAddItem={addItemToList} onCancelItem={cancelItemToList} />
        
      </View>
    </View>
  );
}

export default ShoppingList;