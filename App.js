import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapScreen from './screens/MapScreen';
import NotificationScreen from './screens/NotificationScreen';
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import { DeviceMotion } from 'expo-sensors';
import * as Location from 'expo-location';



import { createStackNavigator } from '@react-navigation/stack';
import { Feather, AntDesign } from '@expo/vector-icons';


import { auth } from './firebase';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CameraScreen from './screens/camera';




/***************************************** FUNCTIONS ********************************************************/

//Initial default notification and site.
var newNotifications = [
  {
      _id: 1,
      title: 'Loading...', 
      date: 'Loading...',
      time: 'Loading...',
      tier: 'Loading...',
      type: 'Loading...',
      coords: {
          latitude: -37.8136,
          longitude: 144.9631
      }
  },
];

var newSites = [
  {
      _id: '1',
      title: 'Loading...', 
      date: 'Loading...',
      time: 'Loading...',
      tier: 'Loading...',
      coords: {
          latitude: -37.8136,
          longitude: 144.9631
      }
  },
]

const BACKGROUND_FETCH_NOTIFICATION_NEARBY = 'background-fetch-notification-nearby';
const BACKGROUND_FETCH_NOTIFICATION_MATCH = 'background-fetch-notification-match';
const BACKGROUND_FETCH_SITES = 'background-fetch-sites';
const LOCATION_TASK_NAME = 'background-location-task';


//Define what happens when the phone's gps location is sensed
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let lng = locations[0].coords.longitude;
    let tms = new Date(locations[0].timestamp)

    console.log('Received new locations', tms);
    console.log("Longitude, latitude = " + lat + ", " + lng);

    console.log(user);
    //Sen location to API
    try {
      let resp = axios.post('http://10.0.2.2:8080/api/users', {
        "id": auth.currentUser.uid,
        "name": auth.currentUser.name,
        "lat": lat,
        "lng": lng,
        "time": tms
    }).then(function (response) {
        console.log("location posted");
    }).catch(function (error) {
        console.log(error);
    });
    } catch (e) {
      console.log("user not logged in");
    }

  }
});

//The following three functions register the background fetches for 1 minute intervals
async function registerBackgroundFetchAsyncNotificationsNearby() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_NOTIFICATION_NEARBY, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: true, // android only,
    startOnBoot: true, // android only
  });
}

async function registerBackgroundFetchAsyncNotificationsMatch() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_NOTIFICATION_MATCH, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: true, // android only,
    startOnBoot: true, // android only
  });
}

async function registerBackgroundFetchAsyncSites() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_SITES, {

    minimumInterval: 1, // 15 minutes
    stopOnTerminate: true, // android only,
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


/***************************************** SHOW APP ********************************************************/
export default function App() {

  const [notifications, setNotifications] = useState(newNotifications);
  const [sites, setSites] = useState(newSites);

  //Every minute, this function is called, asking the API if any exposure sites are nearby to current GPS location
  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION_NEARBY, async () => {
    console.log("nearby fetch started");
    let location = await Location.getCurrentPositionAsync({});
    let resp = await axios.post('http://10.0.2.2:8080/api/getCloseSites', {
      latitude: location.coords.latitude, 
      longitude: location.coords.longitude});
    console.log(location.coords);
  
    if (resp.data) {
  
      for (let site of resp.data) {
        if (!notifications.some(notif => notif._id === site._id && notif.type === 'Nearby')){
          site.type = 'Nearby';
          setNotifications(notifications => [...notifications, site]);
        }
      }
    }
    console.log('nearby notifications updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  //Every minute this function is called, checking if any exposure sites overlap with the user's location history
  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION_MATCH, async () => {
    //needs to be user's actual id

    try {
      let resp = await axios.get('http://10.0.2.2:8080/api/getExposureSitesByUserID/' + auth.currentUser.uid);
      console.log(resp.data);
      if (resp.data) {
        for (let site of resp.data) {
          if (!notifications.some(notif => notif._id === site._id && notif.type === 'Match')){
            site.type = 'Match';
            setNotifications(notifications => [...notifications, site]);
          }
        }
      }
      console.log('match notifications updated');
    } catch (e) {
      console.log("user not logged in");
    }
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  //Every minute, we ask the API for the latest version of exposure sites
  TaskManager.defineTask(BACKGROUND_FETCH_SITES, async () => {
    let resp = await axios.get('http://10.0.2.2:8080/api/sites');
    
    setSites(resp.data);
    
    console.log('sites updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  //On startup, begin sensing phone's GPS location every 5 minutes
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      if (!await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000*60, // Every minute
          distanceInterval: 100,
      });
      }
    })();
  }, []);


  //Shake to refresh exposure site list
  DeviceMotion.setUpdateInterval(1000);
    DeviceMotion.addListener(async (deviceMotionData) => {
        if (deviceMotionData.rotationRate.alpha +
            deviceMotionData.rotationRate.beta +
            deviceMotionData.rotationRate.gamma >= 40) {
                console.log("Shaking?" + new Date());
                await axios.get("http://10.0.2.2:8080/api/sites").then(function (response) {
                    setSites(response.data)
                    console.log("Sites updated due to shake refresh");
                }).catch(function (error) {
                    console.log("Error" + error);
                });
            }
    });

  //Set up for phone's notifications
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

  //Register all the background tasks
  useEffect(() => {
    (async () => {
      await registerBackgroundFetchAsyncNotificationsNearby();
      await registerBackgroundFetchAsyncNotificationsMatch();
      await registerBackgroundFetchAsyncSites();
      console.log('tasks registered');
      let status = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_NOTIFICATION_NEARBY);
      console.log(status);

    })();
    
  }, [])

  const triggerNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New Notification",
        body: "Tap for more details"
      },
      trigger: {
        seconds: 1
      }
    });
  }

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
    else {
      triggerNotification();
    }
  }, [notifications]);
  
   

  /***************************************** NAVIGATIONS ********************************************************/

  // LogInSignUp Navigator
  const LogInSignUpNavigator = createStackNavigator();
  const userExistsNavigator = createStackNavigator();
  
  // Profiles Navigator
  const ProfileStack = createStackNavigator();
  const ProfileStackScreens = () => {
    return(
      <ProfileStack.Navigator headerMode="none">
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
        <ProfileStack.Screen name="Camera" component={CameraScreen} />
      </ProfileStack.Navigator>
    )
  }

  // Notification Map Profile Navigator
  const Tab = createBottomTabNavigator();
  const BottomTabScreens = () => {
    return (
      <Tab.Navigator headerMode="none">
        <Tab.Screen name='Notification' children={() => <NotificationScreen notifs={notifications}/>} 
        options={{
        headerStyle: { 
          backgroundColor: "#094183",
        },
        headerTintColor: '#FFFFFF',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color='#094183' size={size} />
        ),}} />
        <Tab.Screen name='Map' children={() => <MapScreen newSites={sites}/>}
        options={{
        headerStyle: { 
          backgroundColor: "#094183",
        },
        headerTintColor: '#FFFFFF',  
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="map-marker" color='#094183' size={size} />
        ),}} />
        <Tab.Screen name='Profiles' component={ProfileStackScreens}
        options={{
        headerStyle: { 
          backgroundColor: "#094183",
        },
        headerTintColor: '#FFFFFF',
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color='#094183' />
        ),}} />
      </Tab.Navigator>
    )
  }

  /***************************************** NAVIGATIONS END********************************************************/

  return (
    <NavigationContainer>
       {auth.currentUser ? (
        <userExistsNavigator.Navigator headerMode="none">
          <userExistsNavigator.Screen name='Mainpages' component={BottomTabScreens}/>
          <userExistsNavigator.Screen name='LogIn' component={SignInScreen}/>
        </userExistsNavigator.Navigator>
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





