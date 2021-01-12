import {StyleSheet} from 'react-native';

 const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor:'#f5f5f5',
            justifyContent: 'space-between',
        },
        cardContainer:{
            flex:1,
            maxHeight:500,
            alignSelf:'stretch',
            justifyContent:'center',
               
        },
        
        card:{
            borderRadius:8,
            borderWidth:1,
            borderColor:'#ddd',
            overflow:'hidden',
            margin:30,
            position: 'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,       
        },
        avatar:{
          flex: 1,  
          width:'100%',
          height:'auto',  
        },
        footer:{
            backgroundColor: '#fff',
            paddingHorizontal:20,
            paddingVertical:15,
        },
        name:{
            color:'#333',
            fontWeight: 'bold',
            fontSize:16,
        },
        bio:{
            color:'#999',
            lineHeight:18,
            marginTop:5,
            fontSize: 14,
        },
        logo:{
            marginTop:50,
        },
        containerButton:{
            flexDirection:'row',
            marginBottom:30,
        },
        button:{
            height:50,
            width:50,
            borderRadius:25,
            marginHorizontal:20,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            elevation:2,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 2,
            shadowOffset:{
                width:0,
                height:2,
            }
        },
        empty:{
            fontSize:24,
            alignSelf: 'center',
            color: '#999',
        },
        matchContainer:{
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex:2000,
        },
        matchlogo:{
            height:60,
            resizeMode:'contain',
        },
        matchAvatar:{
            width:160,
            height:160,
            borderRadius:80,
            borderWidth:5,
            borderColor: '#fff',
            marginVertical:30,

        },
        matchName:{
            fontSize:26,
            fontWeight: 'bold',
            color: '#fff',

        },
        matchBio:{
            marginTop:10,
            paddingHorizontal:30,
            lineHeight:24,
            color:'rgba(255,255,255,0.8)',
            fontSize:16,
            textAlign:'center',
        },
        matchButton:{
            color:'rgba(255,255,255,0.8)',
            fontSize:16,
            marginTop:30,
            fontWeight:'bold',
            textAlign:'center',
            
        }

    });

    export default styles;