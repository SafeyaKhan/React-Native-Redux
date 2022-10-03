import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const FirstScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>FirstScreen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SecondScreen')}>
                <Text style={styles.btnText}>Go Second</Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default FirstScreen

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