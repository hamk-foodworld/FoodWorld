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

    const addIngredientToList = (name, amount, unit) => {
        addIngredient(ingredientList => [...ingredientList, { name, amount, unit }]);
        setVisibility(false);
    }

    const cancelIngredientToList = () => {
        setVisibility(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Input label="Name" />
            <Input label="Description" />
            <Input label="Preparation time" />
            <Input label="Preparation" />
            <Input label="Amount of people" />
            <Input label="Picture url" />
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
                onPress={() => console.log('saving...')}
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