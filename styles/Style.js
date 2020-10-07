import { StyleSheet } from 'react-native';

let purple = '#9919d4';
let red = 'red';
let darkred = 'darkred';
let white = "white";
let fontFamilyTitle = "sans-serif";
let fontfamilyText = "sans-serif";

const styles = StyleSheet.create({

  titletext: {
    fontSize: 33,
    fontFamily: fontFamilyTitle,
    color: white,
    padding: 10,
    fontWeight: "bold",
  },
  titletextsmall: {
    fontSize: 20,
    fontFamily: fontFamilyTitle,
    color: white,
    padding: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22
  },
  icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  iconView: {
    flex: 1, 
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'green',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  screenLayout: {
    maxHeight: '100%'
  },
  formStyle2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingTop: 20,
  },
  buttonView: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  fullScreen: {
    width: '100%'
  },
  button2: {
    width: '40%',
  },
  bold:{
    fontWeight: "bold"
  },
  recipeTitle:{
    fontWeight: "bold", 
    marginTop:5 
  },
  mbot:{
    marginBottom:5,
  }
});

export default styles;