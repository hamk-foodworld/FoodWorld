import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { Input, CheckBox, ListItem, Icon } from 'react-native-elements';

const IngredientInput = (props) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState("g");

    const nameInputHandler = (enteredText) => {
        setName(enteredText);
    }

    const amountInputHandler = (enteredText) => {
        setAmount(enteredText);
    }

    const addIngredient = () => {
        props.onAddIngredient(name, amount, unit);
        setName('');
        setAmount(0);
        setUnit('g');
    }

    const cancelIngredient = () => {
        props.onCancelIngredient();
        setName('');
        setAmount(0);
        setUnit('g');
    }

    return (
        <Modal visible={props.visibility} animationType="slide">
            <View style={styles.formStyle}>
                <Input label="Name" onChangeText={nameInputHandler} />
                <Input label="Amount" onChangeText={amountInputHandler} />

                <Picker
                    selectedValue={unit}
                    style={styles.fullScreen}
                    onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
                >
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="kg" value="kg" />
                </Picker>

                <View style={styles.buttonView}>
                    <View style={styles.button}>
                        <Button color='red' title="Cancel" onPress={cancelIngredient} />
                    </View>
                    <View style={styles.button}>
                        <Button color='green' title="Add" onPress={addIngredient} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    formStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonView: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    fullScreen: {
        width: '100%'
    },
    button: {
        width: '40%',
    }
});

export default IngredientInput;