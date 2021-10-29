
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from './firebase';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import MapScreen from './screens/MapScreen';

/***************************************** NOTIFICATIONS ********************************************************/

//Need to rewrite notifications JSX to handle when initial notifications are blank
var newNotifications = [
  {
      _id: 1,
      title: 'Mount hira', 
      date: '19/09/21',
      time: '8:10am-4:45pm',
      tier: 'Tier 1',
      type: 'Nearby',
      coords: {
          latitude: -37.8136,
          longitude: 144.9631
      }
  },
];

var newSites = [
  {
      _id: '1',
      title: 'Mount Hira College', 
      date: '19/09/21',
      time: '8:10am-4:45pm',
      tier: 'Tier 1',
      coords: {
          latitude: -37.8136,
          longitude: 144.9631
      }
  },
]

const BACKGROUND_FETCH_NOTIFICATION = 'background-fetch-notification';
const BACKGROUND_FETCH_SITES = 'background-fetch-sites';



async function registerBackgroundFetchAsyncNotifications() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_NOTIFICATION, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function registerBackgroundFetchAsyncSites() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_SITES, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

//For the actual notification that comes up at the top of the screen
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true
    };
  }
});


export default function App() {
  
  
  const [notifications, setNotifications] = useState(newNotifications);
  const [sites, setSites] = useState(newSites);
  
  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION, async () => {
    
    let resp = await axios.post('http://10.0.2.2:8080/api/getCloseSites', {latitude: -37.0519568, longitude: 146.0894272});
  
    if (resp.data) {
      for (let site of resp.data) {
        if (!notifications.some(notif => notif._id === site._id)){
          site.type = 'Nearby';
          setNotifications(notifications => [...notifications, site]);
        }
      }
    }
    console.log('notifications updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  TaskManager.defineTask(BACKGROUND_FETCH_SITES, async () => {
    console.log('up to axios get');
    let resp = await axios.get('http://10.0.2.2:8080/api/sites');
    const data = resp.data.slice(0,10);
    setSites(data);
    
    console.log('sites updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  useEffect(() => {
    //When app is closed
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    //When the app is open
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
  
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    }
  }, []);

  useEffect(() => {
    registerBackgroundFetchAsyncNotifications();
    registerBackgroundFetchAsyncSites();
    console.log('task registered');
  }, [])

/***************************************** NAVIGATIONS ********************************************************/


// LogInSignUp Navigator
const  LogInSignUpNavigator = createStackNavigator();
const LogInSignUpScreens = () => {
  return(
    <LogInSignUpNavigator.Navigator headerMode="none">
      <LogInSignUpNavigator.Screen name='Welcome' component={WelcomeScreen}/>
      <LogInSignUpNavigator.Screen name='LogIn' component={SignInScreen} />
      <LogInSignUpNavigator.Screen name='Profile' component={ProfileScreen} />
    </LogInSignUpNavigator.Navigator>
  )
}

// Profiles Navigator
const ProfileStack = createStackNavigator();
const ProfileStackScreens = () => {
  return(
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  )
}

// Notification Map Profile Navigator
const Tab = createBottomTabNavigator();
const BottomTabScreens = () => {
  return (
    <Tab.Navigator headerMode="none">
      <Tab.Screen name='Notification' children={() => <NotificationScreen notifs={notifications}/>} 
      options={{tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="bell" color='#094183' size={size} />
      ),}} />
      <Tab.Screen name='Map' children={() => <MapScreen sites={sites}/>}
      options={{tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="map-marker" color='#094183' size={size} />
      ),}} />
      <Tab.Screen name='Profiles' component={ProfileStackScreens}
      options={{tabBarIcon: ({ color, size }) => (
        <AntDesign name="user" size={size} color='#094183' />
      ),}} />
    </Tab.Navigator>
  )
}

 /***************************************** SHOW APP ********************************************************/

  
  const user = auth.currentUser;  
  return (
    <NavigationContainer>
       {user ? (
          <Tab.Navigator headerMode="none">
            <Tab.Screen name='Notification' children={() => <NotificationScreen notifs={notifications}/>} 
            options={{tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color='#094183' size={size} />
            ),}} />
            <Tab.Screen name='Map' children={() => <MapScreen sites={sites}/>}
            options={{tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map-marker" color='#094183' size={size} />
            ),}} />
            <Tab.Screen name='Profiles' component={ProfileStackScreens}
            options={{tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color='#094183' />
            ),}} />
          </Tab.Navigator>
       ) : (
        <LogInSignUpNavigator.Navigator headerMode="none">
            <LogInSignUpNavigator.Screen name='Welcome' component={WelcomeScreen}/>
            <LogInSignUpNavigator.Screen name='LogIn' component={SignInScreen} />
            <LogInSignUpNavigator.Screen name='Mainpages' component={BottomTabScreens} />
        </LogInSignUpNavigator.Navigator> 
       )}
    </NavigationContainer>
     
     
        

   

       
    
  );
}






