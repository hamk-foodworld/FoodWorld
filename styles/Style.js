import { StyleSheet } from 'react-native';


let purple = '#9919d4';
let red = 'red';
let darkred = 'darkred';
let white = "white";
let fontFamilyTitle = "sans-serif";
let fontfamilyText = "sans-serif";
const styles = StyleSheet.create({

  /* icon: {
    width: 24,
    height: 24,
  }, */

  titletext: {
    fontSize: 35,
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
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: 'green',

  },

  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },


  padding: {

    maxHeight: '73%',

  },
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
  button2: {
    width: '40%',
  }


});

export default styles;