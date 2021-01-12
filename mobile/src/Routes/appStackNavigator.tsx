import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login'
import Main from '../pages/main'

const {Navigator, Screen } = createStackNavigator();

export default function  AppStack() {
    return(
        <NavigationContainer >
            <Navigator screenOptions={{headerShown:false}}>
                <Screen name='Login' component={Login}/> 
                <Screen name='Main' component={Main}/>   
            </Navigator>
        </NavigationContainer>
    )
}

