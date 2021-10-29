import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignUpButton  = props => {
    return (
        <View style={styles.signUpButton}> 
            <TouchableOpacity onPress={()=>props.onPress?.()}>
                <Text style={styles.signUpButtonText}>{props.title}</Text>
            </TouchableOpacity>    
        </View>
    )
};

const styles = StyleSheet.create({
    signUpButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#094183'
    },
    signUpButtonText: {        
        fontSize: 19,
        color: '#094183',
        fontWeight: 'bold'
    },

});

export default SignUpButton;