import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
   <TouchableOpacity 
   onPress={props.pressFunction}
   hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
   style={styles.buttonStyle}
   >
     <Text style={styles.buttonText}>{props.title}</Text>
   </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonStyle: { width: 100, height: 50, backgroundColor: 'darkblue', 
    borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    buttonText: { fontSize: 14,fontWeight:'bold', color: '#fff' },
})