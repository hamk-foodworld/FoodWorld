import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Input, CheckBox, ListItem, Icon } from 'react-native-elements';

const RecipeInput = (props) => {

    const [ingredientList, addIngredient] = useState([]);
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [lactose, setLactose] = useState(false);
    const [gluten, setGluten] = useState(false);

    const addIngredientToList = () => {
        //addIngredient([]);
    }

    const list = [
        {
            title: 'Appointments',
            icon: 'av-timer'
        },
        {
            title: 'Trips',
            icon: 'flight-takeoff'
        }
    ];

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

            <View>
                {
                    list.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 30,
    }
});

export default RecipeInput;