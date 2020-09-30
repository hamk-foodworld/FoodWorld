import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';
import {addItem} from '../database/Db';

const ListItemInput = (props) => {


    const [newItemName, setNewItemName] = useState('');
    const [newItemAmount, setNewItemAmount] = useState('');
    const [newItemUnit, setNewItemUnit] = useState('');

    const nameInputHandler = (enteredText) => {
        setNewItemName(enteredText);
    }
    const amountInputHandler = (enteredText) => {
        setNewItemAmount(enteredText);
    }
    const unitInputHandler = (enteredText) => {
        setNewItemUnit(enteredText);
    }


    const addThisItem = () => {
        saveItem();
        props.onAddItem();
        
    }

    async function saveItem() {
        try {
        
          const dbResult = await addItem(newItemName, newItemAmount, newItemUnit);
          console.log(dbResult);
        }
        catch (err) {
          console.log(err);
        }
        finally {
          
          
        }
      }
    const cancelItem = () => {
        props.onCancelItem();
        // setFish('');
    }
    return (
        <Modal visible={props.visibility} animationType="slide">

            <View >

                <TextInput placeholder="name"
                    
                    onChangeText={nameInputHandler}
                />
                <TextInput placeholder="amount"
                    
                    onChangeText={amountInputHandler}
                />
                <TextInput placeholder="unit"
                    
                    onChangeText={unitInputHandler}
                />

                <View >
                    <View >
                        <Button color='red' title="Cancel" onPress={cancelItem} />
                    </View>
                    <View >
                        <Button color='green' title="Add" onPress={addThisItem} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}



export default ListItemInput;