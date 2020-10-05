
import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList,CheckBox,map } from 'react-native';
import { Header, Icon,ListItem, Avatar,Input,Button  } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import RecipeListScreen from './RecipeListScreen';
import styles from '../styles/Style';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = (props) => {
    const [filter, changefilter]=useState("");
    const [hasError, setErrors] = useState(false);
    const [someError, setSomeErrors] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [country, setCountry] = useState([]);
    const [countryfilter, setCountryFilter] = useState([]);
    const [countryrecipe, setCountryrecipe] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function newFetch() {      
      try {
        let res = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getCountryRecipe");
        const responseData = await res.json();
        
        res = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getCountry");
        const responseCountry= await res.json();
        
        responseCountry.forEach(element => {
          let value = responseData.filter(item => item.iCountryID === element.iCountryID);
          if(value.length > 0 ){
            element.number = value[0].iNumber;
          }
          else{
            element.number = 0;
          }
          setCountry(responseCountry)
          
         
          
        });
      }
      catch (error) {
        setErrors(true);
      }
    }

    async function fetchData2() {
      let res = null;
      try {
        res = await fetch("https://able-groove-288106.appspot.com/rest/foodservice/getCountryRecipe");
      }
      catch (error) {
        setErrors(true);
      }
  
      try {
        const responseData = await res.json();
        setCountryrecipe(responseData);
      }
      catch (err) {
        setErrors(true);
        setSomeErrors("ERROR: " + hasError + " my error " + err);
        console.log(someError);
      }
    }
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
      newFetch();
    }
  });
  const searchContacts = (enteredText) => {
    
    changefilter(String(enteredText).toLowerCase());
  };
  {/* const filterList = () => {
    let i = 0;
    console.log(country)
      while(i < country.length){
        console.log("testing lfbzstsbfojfsbo");
        i+=1;
        countryrecipe.forEach(cr =>{
          if(c.iCountryID === cr.iCountryID){
              setCountryFilter(c);
              console.log(c);
          }
        });
      };
  };*/}

  
    return (
        <View style={{maxHeight: '100%'}}>
            <Header
                centerComponent={{ text: 'Countries', style: styles.titletext }}
                rightComponent={<Icon name="filter" type="font-awesome" color="white" onPress={() => setSelection(!isSelected)}/>}
                containerStyle={{
                    backgroundColor: 'darkred',
                }}
            />
              
        <Input   placeholder='Country name'
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            onChangeText={searchContacts}
           />  
      <ScrollView >
      {isSelected ?
      
       <FlatList      
       data={country.filter(country => String(String(country.sName).toLowerCase()).startsWith(filter)).filter(country => country.number > 0)}     
       renderItem={({item})=>(
         <TouchableOpacity  onPress={() =>
           props.navigation.navigate('RecipeListScreen', { screen: 'RecipeListScreen', params: { countryId: item.iCountryID }})}>
         <ListItem key={item.iCountryID.toString()} bottomDivider>
           <Avatar source={{uri: item.sFlag}} />
           <ListItem.Content>
             <ListItem.Title>{item.sName} </ListItem.Title>              
              <ListItem.Subtitle>{item.number}</ListItem.Subtitle> 
           </ListItem.Content>
         </ListItem>
         </TouchableOpacity>
           )}
           keyExtractor={(item2)=>item2.iCountryID.toString()}
         />
      : 
      <FlatList      
        data={country.filter(country => String(String(country.sName).toLowerCase()).startsWith(filter))}     
        renderItem={({item})=>(
          <TouchableOpacity  onPress={() =>
            props.navigation.navigate('RecipeListScreen', { screen: 'RecipeListScreen', params: { countryId: item.iCountryID }})}>
          <ListItem key={item.iCountryID.toString()} bottomDivider>
            <Avatar source={{uri: item.sFlag}} />
            <ListItem.Content>
              <ListItem.Title>{item.sName}</ListItem.Title>              
              <ListItem.Subtitle>{item.number}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item)=>item.iCountryID.toString()}
      />
    }
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