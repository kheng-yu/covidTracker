import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomButton  = props => {
    return (
        <View style={styles.customButtonContainer}>
            <TouchableOpacity 
                style={styles.customButton} 
                onPress={()=>props.onPress?.()}
            >
                <Text style={styles.customButtonText}>
                    {props.title + '  '} 
                    <AntDesign name="rightcircleo" size={18} color="#094183" />
                </Text>
            </TouchableOpacity>
        </View>
    )
};


const styles = StyleSheet.create({
    customButtonContainer: {
        padding: 20
    },
    customButton: {
        borderRadius: 60,
        width: 180,
        height: 50,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center'
    },
    customButtonText: {
        fontSize: 18,
        color: '#094183',
        fontWeight: 'bold'
    }
});

export default CustomButton;