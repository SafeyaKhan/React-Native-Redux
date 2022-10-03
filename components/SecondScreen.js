import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SecondScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
         <Text>SecondScreen</Text>
         <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.btnText}>Go First</Text>
            </TouchableOpacity>
    </SafeAreaView>
     
   
  )
}

export default SecondScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    button: {
        //width: 50,
        alignItems: "center",
        backgroundColor: "purple",
        padding: 10
    },
    btnText:{
        color:'white'
    }
})