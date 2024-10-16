import React from 'react'
import { Text, View, StyleSheet } from "react-native";


const Hello = ({ contStyle, textStyle }) => {
    return (
        <View style={contStyle}>
            <Text style={textStyle}>
                Sports Genius
            </Text>
        </View>
    )
}

export default Hello