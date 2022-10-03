import { StyleSheet, Text, View, TextInput, Alert, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from './CustomButton';
import SQLite from 'react-native-sqlite-storage'
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux';
import { setName, setEmail, getUsers } from '../redux/actions';

const db = SQLite.openDatabase({ name: 'MainDB', location: 'default' }, () => { }, error => console.log(error))


const HomeComponent = ({ navigation }) => {
    const { name, email, users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    useEffect(() => {
        getData();
        dispatch(getUsers())
    }, [])

    const getData = () => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT Name, Email FROM Users",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        const UserName = results.rows.item(0).Name;
                        const UserEmail = results.rows.item(0).Email;
                        dispatch(setName(UserName));
                        dispatch(setEmail(UserEmail));
                    }
                }
            )
        })
    }

    const updateData = async () => {
        if (name.length === 0) {
            Alert.alert("Please Enter your Name")
        } else {
            dispatch(setName(name))
           await db.transaction(tx => {
                tx.executeSql(
                    "UPDATE Users SET Name = ?", [name], () => Alert.alert("Successfully Updated"), error => console.log(error)
                )
            })
        }
    }
    const goback = () => {
        navigation.goBack();
    }
    return (

        <View style={styles.body}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => goback()}>
                <Icon name="left" size={20} />
                </TouchableOpacity>    
            </View>
            <View style={styles.innerbody}>
                <Text style={styles.text}>Welcome {name}</Text>
                <Text style={styles.text}>Your Email is {email}</Text>
                <TextInput style={styles.input} value={name} placeholder='Enter Name' onChangeText={value => dispatch(setName(value))}
                    autoCapitalize='none' clearButtonMode="always" />
                <CustomButton title="Update" pressFunction={updateData} />
               <FlatList 
                data={users}
                renderItem= {({item}) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subtitle}>{item.email}</Text>
                    </View>
                )} 
                keyExtractor= {item => item.id.toString()}
               />
            </View>
        </View>

    )
}

export default HomeComponent

const styles = StyleSheet.create({
    body: { flex: 1, backgroundColor: 'lavender' },
    innerbody: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    input: {
        width: '80%', borderColor: '#999999', borderWidth: 1, marginBottom: 10, padding: 10,
        fontSize: 14, borderRadius: 5
    },
    text: { fontSize: 20, fontWeight: 'bold', margin: 10 },
    btn: {
        marginTop: 5
    },
    icon: {
        backgroundColor: 'lavender',
        marginTop: 50,
        marginLeft: 20
    },
    item:{
        marginVertical:10, marginHorizontal:20, backgroundColor:'lightpink',padding:20,borderRadius:10
    },
    title:{
        fontSize: 20, margin:5
    },
    subtitle:{
        fontSize: 15, margin:5, color:'grey'
    }
})

