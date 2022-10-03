import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton';
import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import { setName, setEmail } from '../redux/actions';

const db = SQLite.openDatabase({ name: 'MainDB', location: 'default' }, () => {}, error => console.log(error))

const LoginComponent = ({ navigation }) => {
     const { name, email} = useSelector( state => state.userReducer);
     const dispatch = useDispatch();
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    useEffect(() => {
        createTable();
    },[])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT)",
            )
        })
    }

    const setData = async () => {
        if(name === '' || email === ''){
            alert('Please enter a name and email')
        } else {
            try{
                dispatch(setName(name))
                dispatch(setEmail(email))
                await db.transaction(async tx => {
                    await tx.executeSql("INSERT INTO Users (Name, Email) VALUES (?, ?)", [name, email])
                })
                navigation.navigate('Home');
            }
            catch (error) {
                console.log(error)
            } 
        }

    }

    return (
        <View style={styles.body}>
            <TextInput style={styles.input} value={name} placeholder= 'Enter Name' onChangeText={value => dispatch(setName(value))} autoCapitalize='none' 
            clearButtonMode="always"/>
            <TextInput style={styles.input} value={email} placeholder= 'Enter Email' onChangeText={value => dispatch(setEmail(value))} autoCapitalize='none'
            clearButtonMode="always"/>
            <CustomButton title="Login" pressFunction={setData} />
        </View>
    )
}

export default LoginComponent

const styles = StyleSheet.create({
    body:{ flex:1, alignItems:'center',justifyContent:'center',backgroundColor:'lavender'},
    input:{ width: '80%',borderColor:'#999999',borderWidth:1,marginBottom:10,padding:10,
    fontSize:14,borderRadius:5}
})