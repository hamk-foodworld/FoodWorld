import React, { useState } from 'react';
import { View, Modal, Alert} from 'react-native';
import { addItem } from '../sqlconnection/dbShop';
import { Header, Icon, Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import styles from '../styles/Style';

const ListItemInput = (props) => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemAmount, setNewItemAmount] = useState('');
    const [newItemUnit, setNewItemUnit] = useState('');
    const [selectedValue, setSelectedValue] = useState("");

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
        var regExp = /([a-zA-Z])|,/g;
        if(newItemName == "" || newItemAmount == "" ){
            Alert.alert("Please enter a name and amount");
        }
        
        else if(regExp.test(newItemAmount)){
            Alert.alert("Please enter a number and use '.' as a delimiter");
        } 
        else {
        saveItem();
        setNewItemAmount("");
        setNewItemName("");
        setSelectedValue("");
        props.onAddItem();
        }
    }

    async function saveItem() {
        try {
            const dbResult = await addItem(newItemName, newItemAmount, selectedValue);
        }
        catch (err) {
            console.log(err);
        }
    }

    const cancelItem = () => {
        props.onCancelItem();
    }

    return (
        <Modal visible={props.visibility} animationType="slide">
            <Header
                leftComponent={<Icon
                    name="back"
                    type="entypo"
                    color="white"
                    onPress={cancelItem}
                />}
                centerComponent={{ text: 'Add Item', style: styles.titletext }}
                containerStyle={{
                    backgroundColor: 'darkred',
                    paddingTop: 0,
                    maxHeight: 55
                }}
            />
            <View style={styles.formStyle2}>
                <Input label="Name" onChangeText={nameInputHandler} />
                <Input label="Amount" onChangeText={amountInputHandler} />
                <Picker
                    selectedValue={selectedValue}
                    style={styles.fullScreen}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="none" value="" />
                    <Picker.Item label="gram" value="g" />
                    <Picker.Item label="kilogram" value="kg" />
                    <Picker.Item label="milliliter" value="ml" />
                    <Picker.Item label="liter" value="l" />
                    <Picker.Item label="tabelspoon" value="tbs" />
                    <Picker.Item label="teaspoon" value="tsp" />
                    <Picker.Item label="pounds" value="lb" />
                    <Picker.Item label="ounce" value="oz" />
                    <Picker.Item label="handful" value="handful" />
                    <Picker.Item label="cup" value="cup" />
                    <Picker.Item label="pinch" value="pinch" />
                    <Picker.Item label="slices" value="slices" />
                </Picker>

                <View style={styles.buttonView}>
                    <View style={styles.button2}>
                        <Button buttonStyle={{ backgroundColor: 'darkred' }} title="Cancel" onPress={cancelItem} />
                    </View>
                    <View style={styles.button2}>
                        <Button buttonStyle={{ backgroundColor: 'darkgreen' }} title="Add" onPress={addThisItem} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ListItemInput;