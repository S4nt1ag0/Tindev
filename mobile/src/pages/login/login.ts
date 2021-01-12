import {StyleSheet} from 'react-native';

 const styles = StyleSheet.create({
     container:{
            flex:1,
            backgroundColor:'#f5f5f5',
            justifyContent:'center',
            alignItems:'center',
            padding:30
        },
        TextInput: {
            height: 46,
            backgroundColor:'#fff',
            alignSelf: 'stretch',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#ddd',
            marginTop:20,
            paddingHorizontal:15,
            
        },
        button:{
            alignSelf: 'stretch',
            backgroundColor: '#df4723',
            height:46,
            marginTop:10,
            borderRadius:4,
            justifyContent:'center',
            alignItems:'center',
        },
        TextButton:{
            color:'#fff',
            fontWeight:'bold',
            fontSize:16,
        }
    });

    export default styles;