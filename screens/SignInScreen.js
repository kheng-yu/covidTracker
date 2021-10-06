import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Platform, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SignInButton from '../components/SignInButton';
import SignUpButton from '../components/SignUpButton';


const SignInScreen = props => {

    // helper functions
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const emailInputChange = ( text ) => {
        if (text.length != 0) {
            setData({
                ...data,
                email: text,
                check_textInputChange: true
            })
        }
        else {
            setData({
                ...data,
                email: text,
                check_textInputChange: false
            })
        }
    };

    const passwordInputChange = ( value ) => {
        setData({
            ...data,
            password: value
        })
    };

    const updateSecureTextEntry = () => {
        setData ({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    };

    const GoToSignUpHandler = () => {
        props.navigation.navigate('SignUp');
    }

    // screen shown
    return (
        <View style = {styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome !</Text>
            </View>

            {/* footer */}
            < View style={styles.footer} >
                
                {/* email user input */}
                <Text style={styles.footerText}>Email</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons name="email-edit-outline" size={24} color="#e85865" />
                    <TextInput
                        placeholder='Enter Your Email'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(email)=> emailInputChange(email)}
                    />
                    { data.check_textInputChange ? 
                    <Feather name="check-circle" size={24} color="green" />
                    : null }
                </View>
                {/* password user input */}
                <Text style={styles.footerText}>Password</Text>
                <View style={styles.action}>
                    <Feather name="key" size={24} color="#e85865" />  
                    <TextInput
                        placeholder='Enter Your Password'
                        style={styles.textInput}
                        autoCapitalize='none'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(password)=>passwordInputChange(password)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                        <Feather name="eye-off" size={24} color="grey" />
                        :
                        <Feather name="eye" size={24} color="grey" /> }
                    </TouchableOpacity>
                </View>

                {/* sign in button */}
                <View style={styles.button}>
                    <SignInButton
                        title='Sign In'
                        onPress={()=> alert('Clicked')}
                    />
                </View>

                 {/* sign up button */}
                 <View style={styles.button}>
                    <SignUpButton
                        title='Sign Up'
                        onPress={GoToSignUpHandler}
                    />
                </View>
            </View>
        </View>
    )
};

// style settings
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e85865',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 35
    },
    headerText: {
        color:'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    footerText: {
        fontSize: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10,
        marginBottom: 35
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 16
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    }
})

export default SignInScreen