import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Input, CheckBox, ListItem, Button, Icon } from 'react-native-elements';

import IngredientInput from './IngredientInput';

const RecipeInput = (props) => {

    const [ingredientList, addIngredient] = useState([]);
    const [isVisible, setVisibility] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preperationTime, setPreperationTime] = useState(0);
    const [preperation, setPreperation] = useState('');
    const [amountPeople, setAmountPeople] = useState(1);
    const [pictureUrl, setPictureUrl] = useState('');

    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [lactose, setLactose] = useState(false);
    const [gluten, setGluten] = useState(false);

    const nameInputHandler = (enteredText) => {
        setName(enteredText);
    }
    const descriptionInputHandler = (enteredText) => {
        setDescription(enteredText);
    }
    const preperationTimeInputHandler = (enteredText) => {
        setDescription(enteredText);
    }
    const preperationInputHandler = (enteredText) => {
        setDescription(enteredText);
    }
    const amountPeopleInputHandler = (enteredText) => {
        setDescription(enteredText);
    }
    const pictureUrlInputHandler = (enteredText) => {
        setDescription(enteredText);
    }

    const addRecipe = () => {
        const newRecipe = { name, description, preperationTime, preperation, amountPeople, pictureUrl,
            vegetarian, vegan, lactose, gluten, ingredients: ingredientList };
            
        console.log('possible post request body: ' + newRecipe);
        console.log(newRecipe);
    }

    const addIngredientToList = (name, amount, unit) => {
        addIngredient(ingredientList => [...ingredientList, { name, amount, unit }]);
        setVisibility(false);
    }

    const cancelIngredientToList = () => {
        setVisibility(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Input label="Name" onChangeText={nameInputHandler} />
            <Input label="Description" onChangeText={descriptionInputHandler} />
            <Input label="Preparation time" onChangeText={preperationTimeInputHandler} />
            <Input label="Preparation" onChangeText={preperationInputHandler} />
            <Input label="Amount of people" onChangeText={amountPeopleInputHandler} />
            <Input label="Picture url" onChangeText={pictureUrlInputHandler} />
            <CheckBox
                title='Vegetarian'
                checked={vegetarian}
                onPress={() => setVegetarian(!vegetarian)}
            />
            <CheckBox
                title='Vegan'
                checked={vegan}
                onPress={() => setVegan(!vegan)}
            />
            <CheckBox
                title='Contains Lactose'
                checked={lactose}
                onPress={() => setLactose(!lactose)}
            />
            <CheckBox
                title='Contains Gluten'
                checked={gluten}
                onPress={() => setGluten(!gluten)}
            />
            <Button
                title="Add ingredient"
                onPress={() => setVisibility(true)}
            />
            <IngredientInput visibility={isVisible} onAddIngredient={addIngredientToList} onCancelIngredient={cancelIngredientToList} />
            <View>
                {
                    ingredientList.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.amount} {item.unit} {item.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
            <Button
                title="Save recipe"
                onPress={addRecipe}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        //margin: 30,
    }
});

export default RecipeInput;