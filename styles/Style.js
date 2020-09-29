import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:40,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlecontainer:{
      flex:1,
      justifyContent:'flex-start',
      alignItems: 'center',
      borderBottomColor: 'black',
    borderBottomWidth: 1,
    },
    imageContainer:{
      flex:2,
      height:"50%",
      width:"50%",
      borderRadius:200,
      overflow:'hidden',
      borderWidth:3,
      borderColor:'red',
    },
    icon: {
      width: 24,
      height: 24,
    },
    image:{
        height:'100%',
        width:'100%'
    },
    titletext: {
        fontSize: 35,
        fontFamily: "sans-serif",
        color: 'white',
        
        padding: 10,
        fontWeight:"bold",

        


    }
  });
  
  export default styles;