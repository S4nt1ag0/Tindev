import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import itsamatch from '../../assets/itsamatch.png';
import io from 'socket.io-client';

import {SafeAreaView, View, Text,Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton} from 'react-native-gesture-handler';

import styles from './main.ts';


export default function Main ( {route}) {
    const {navigate} = useNavigation();
    const loggedUserId = route.params?.loggedUserId;
    const[users,setUsers] = useState([]);
    const[matchDev,setMatchDev] = useState(null);

    async function handleLike(){
        const [user, ...rest] = users;
        await api.post('/like',{ 
            targetUserId: user._id,
	        loggedUserId
        });
        setUsers(rest);
        }
    async function handleDislike(){
        const [user, ...rest] = users;
        await api.post('/dislike',{ 
            targetUserId: user._id,
	        loggedUserId
        });
        setUsers(rest);
        }
     
    useEffect (() =>{
        async function loaduser(){
            const response = await api.post('/loadUsers',{
                loggedUserId
            })
            setUsers(response.data);
        }
        loaduser();
     },[loggedUserId]);

    useEffect(()=>{
        const socket = io('http://192.168.0.104:3335',{
            query:{user:loggedUserId}
        });

        socket.on('match', dev =>{
            setMatchDev(dev);
        });
    },[loggedUserId]);

     async function handleLogout() {
        await AsyncStorage.clear();
        navigate('Login');
     }

    return (
        <SafeAreaView style={styles.container}>
            <RectButton onPress={handleLogout} >
            <Image 
            style={styles.logo}
            source={logo} />
            </RectButton>
            


            <View style={styles.cardContainer}>
                { users.length === 0
                 ? <Text style={styles.empty}> acabou :( </Text>
                    : (
                    users.map((user,index) => (
                <>
                <View  key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                    <Image style={styles.avatar} source={{uri:user.avatar}}/>
                    <View style={styles.footer}>
                        <Text style={styles.name}>
                        {user.name}
                        </Text>
                        <Text style={styles.bio} numberOfLines={3}>
                        {user.bio}
                        </Text>
                    </View>
                </View>
                
                </>
                    ))
                )}
            </View>
            
              {users.length >0 && (
                   <View style={styles.containerButton}>
                   <RectButton style={styles.button} onPress={handleDislike}>
                       <Image source={dislike}></Image>
                   </RectButton>
                   <RectButton style={styles.button} onPress={handleLike}>
                       <Image source={like}></Image>
                   </RectButton>
               </View>
              )}  
              {matchDev && (
                <View style={styles.matchContainer}>
                    <Image style={styles.matchlogo} source={itsamatch} alt="it's a match" />
                    <Image style={styles.matchAvatar} source={{uri:matchDev.avatar}}/>
                    <Text style={styles.matchName}>{matchDev.name}</Text> 
                    <Text style={styles.matchBio} >{matchDev.bio}</Text>
                    <RectButton style={styles.matchButton} onPress={() => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>FECHAR</Text>
                    </RectButton>
                </View>
              )}        
            
        </SafeAreaView>
    );}
   