import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignInButton  = props => {
    return (
        <View style={styles.signInButton}> 
            <TouchableOpacity onPress={()=>props.onPress?.()}>
                <Text style={styles.signInButtonText}>{props.title}</Text>
            </TouchableOpacity>    
        </View>
    )
};

const styles = StyleSheet.create({
    signInButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#094183',
        borderRadius: 10
    },
    signInButtonText: {        
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

});

export default SignInButton;