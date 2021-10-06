import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import CustomButton from '../components/CustomButton';

const WelcomeScreen = props => {
    
    const GetStartHandler = () => {
        props.navigation.navigate('LogIn');
    }
    
    return (
         <View style = {styles.container}>
            <View style={styles.header}>
                <Image 
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode='cover'
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Stay Safe Everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <CustomButton 
                        title='Get Started !'
                        onPress={GetStartHandler}
                    />
                </View>
            </View>
        </View>
    )
};


const {height} = Dimensions.get('screen');
const height_logo = height * 0.28

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#e85865',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 45
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: 'white',
        marginTop: 5,
        fontSize: 35,
        fontWeight: 'bold' 
    },
    text: {
        color: 'black',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    }
});

export default WelcomeScreen;