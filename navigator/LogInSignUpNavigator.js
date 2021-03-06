import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen'

const LogInSignUpNavigator = createStackNavigator(
    {   Welcome: WelcomeScreen,
        LogIn: LogInScreen,
        SignUp: SignUpScreen,
        Profile: ProfileScreen    
    },
    { defaultNavigationOptions: {
        headerShown: false
    }}
);

export default createAppContainer(LogInSignUpNavigator);
