import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform ,View, Text, TextInput, Image, StyleSheet} from 'react-native';
import logo from '../../assets/logo.png';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native'
import { RectButton} from 'react-native-gesture-handler';

import styles from './login.ts';

export default function Login (){
    const {navigate} = useNavigation();
    const [user, setUser]= useState('');
    useEffect(()=>{
        AsyncStorage.getItem('tindev/loggedId').then(user => {
            if(user){
                navigate('Main',{loggedUserId:user});
            }
        })
    },[]);

    async function handleLogin(){
        try {
            const response = await api.post('/login',{ username: user });
            const { _id }=response.data; 
            await AsyncStorage.setItem('tindev/loggedId',_id);
            navigate('Main',{loggedUserId:_id });
        } catch (err) {
            alert('Dev não encontrado')
        }
    }
    
    return(
        <KeyboardAvoidingView
        behavior= "padding"
        enabled ={Platform.OS === 'ios'}
        style={styles.container}
        >
            <Image source={logo} />
            <TextInput
            autoCapitalize = "none"
            autoCorrect ={false}
            placeholder = 'digite seu nome'
            placeholderTextColor = "#999"
            style={styles.TextInput}
            value ={user}
            onChangeText={setUser}
            ></TextInput>

            <RectButton 
            onPress={handleLogin}
            style={styles.button}>
                <Text style={styles.TextButton}>Enviar</Text>
            </RectButton>
        </KeyboardAvoidingView>

    );
    }