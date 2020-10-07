import React, { useState, useEffect } from 'react';
import { View, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Input, Button, Header, Icon } from 'react-native-elements';
import styles from '../styles/Style';

const IngredientInput = (props) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState(1);
    const [unitList, addUnit] = useState([]);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            fetchUnits();
        }
    })

    async function fetchUnits() {
        await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getUnit")
            .then(parameter => parameter.json())
            .then(anotherParameter => addUnit(anotherParameter));
    }

    const nameInputHandler = (enteredText) => {
        setName(enteredText);
    }

    const amountInputHandler = (enteredText) => {
        setAmount(enteredText);
    }

    const addIngredient = () => {
        var regExp = /([a-zA-Z])|,/g;
        if(name == "" || amount == 0 ){
            Alert.alert("Please enter a name and amount");
        }
        
        else if(regExp.test(amount)){
            Alert.alert("Please enter a number and use '.' as a delimiter");
        } 
        else {
            const unitName = unitList.filter(v => v.iID == unit)[0].sName;
            const unitObj = { id: unit, name: unitName }
            props.onAddIngredient(name, amount, unitObj);
            setName('');
            setAmount(0);
            setUnit(1);
        }

        
    }

    const cancelIngredient = () => {
        props.onCancelIngredient();
        setName('');
        setAmount(0);
        setUnit(1);
    }

    return (

        <Modal visible={props.visibility} animationType="slide">
            <Header
                leftComponent={<Icon
                    name="back"
                    type="entypo"
                    color="white"
                    onPress={cancelIngredient}
                />}
                centerComponent={{ text: 'Add Ingredient', style: styles.titletextsmall }}
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
                    selectedValue={unit}
                    style={styles.fullScreen}
                    onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                >
                    {
                        unitList.map((item, i) => (
                            <Picker.Item key={i} label={item.sName} value={item.iID} />
                        ))
                    }
                </Picker>

                <View style={styles.buttonView}>
                    <View style={styles.button2}>
                        <Button buttonStyle={{ backgroundColor: 'darkred' }} title="Cancel" onPress={cancelIngredient} />
                    </View>
                    <View style={styles.button2}>
                        <Button buttonStyle={{ backgroundColor: 'darkgreen' }} title="Add" onPress={addIngredient} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default IngredientInput;