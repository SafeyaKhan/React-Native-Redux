import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import SQLite from 'react-native-sqlite-storage'
import { Provider } from 'react-redux';
import { Store } from './redux/store';

const db = SQLite.openDatabase({ name: 'MainDB', location: 'default' }, () => {}, error => console.log(error))


const Stack = createStackNavigator();


const App = () => {
  return (
    <Provider store={Store}>
       <NavigationContainer>
      <Stack.Navigator
       initialRouteName='Login'
        screenOptions={{
          headerShown: false, headerTitleAlign:'center',headerStyle:{
            backgroundColor:'lavender'}, headerTintColor:'#fff',
            headerTitleStyle:{ fontSize:25,fontWeight:'bold'}
          }
        }>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Home" component={HomeComponent} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})