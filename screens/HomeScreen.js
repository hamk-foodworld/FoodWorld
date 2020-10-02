
import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Header, Icon,ListItem, Avatar,Input,Button, CheckBox  } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import RecipeListScreen from './RecipeListScreen';
import styles from '../styles/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = (props) => {
    const [filter, changefilter]=useState("");
    const [hasError, setErrors] = useState(false);
    const [someError, setSomeErrors] = useState('');
    const [country, setCountry] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
   async function fetchData() {
    let res = null;
    try {
      res = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getCountry");
    }
    catch (error) {
      setErrors(true);
    }

    try {
      const responseData = await res.json();
      setCountry(responseData);
    }
    catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
      console.log(someError);
    }
  }
  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
      fetchData();
    }
  });
  const searchContacts = (enteredText) => {
    
    changefilter(String(enteredText).toLowerCase());
  };
    return (
        <View style={{maxHeight: '100%'}}>
            <Header
                centerComponent={{ text: 'Countries', style: styles.titletext }}
                rightComponent={<Icon name="filter" type="font-awesome" color="white" onPress={() => props.navigation.goBack()}/>}
                containerStyle={{
                    backgroundColor: 'darkred',
                }}
            />
              
        <Input   placeholder='Country name'
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            onChangeText={searchContacts}
           />  
      <ScrollView >
      <FlatList      
        data={country.filter(country => String(String(country.sName).toLowerCase()).startsWith(filter))}     
        renderItem={({item})=>(
          <TouchableOpacity  onPress={() =>
            props.navigation.navigate('RecipeListScreen', { screen: 'RecipeListScreen', params: { countryId: item.iCountryID }})}>
          <ListItem key={item.iCountryID.toString()} bottomDivider>
            <Avatar source={{uri: item.sFlag}} />
            <ListItem.Content>
              <ListItem.Title>{item.sName}</ListItem.Title>              
              {/* <ListItem.Subtitle>{itemData.item.fav}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item)=>item.iCountryID.toString()}
      />
      </ScrollView>
      </View>
        
        
    );
}



const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="RecipeListScreen" component={RecipeListScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}




export default HomeStackScreen;