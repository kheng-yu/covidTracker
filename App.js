
import React, { useEffect, useState } from 'react';
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

//Need to rewrite notifications JSX to handle when initial notifications are blank
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

    let resp = axios.post('http://10.0.2.2:8080/api/users', {
        "id": "002",
        "name": "amy",
        "lat": lat,
        "lng": lng,
        "time": tms
    }).then(function (response) {
        console.log("location posted");
    }).catch(function (error) {
        console.log(error);
    });

  }
});

async function registerBackgroundFetchAsyncNotificationsNearby() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_NOTIFICATION_NEARBY, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function registerBackgroundFetchAsyncNotificationsMatch() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_NOTIFICATION_MATCH, {
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

function SettingsScreen() {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {

  const [notifications, setNotifications] = useState(newNotifications);
  const [sites, setSites] = useState(newSites);

  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION_NEARBY, async () => {
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

  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION_MATCH, async () => {
    //needs to be user's actual id
    let resp = await axios.get('http://10.0.2.2:8080/api/getExposureSitesByUserID/001');
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
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  TaskManager.defineTask(BACKGROUND_FETCH_SITES, async () => {
    let resp = await axios.get('http://10.0.2.2:8080/api/sites');
    
    setSites(resp.data);
    
    console.log('sites updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

useEffect(() => {
  (async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    if (!await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000*60*5, // Every 5 minutes
        distanceInterval: 100,
    });
    }
  })();
}, []);


//Shake to refresh
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
    registerBackgroundFetchAsyncNotificationsNearby();
    registerBackgroundFetchAsyncNotificationsMatch();
    registerBackgroundFetchAsyncSites();
    console.log('tasks registered');
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notifications" children={() => <NotificationScreen notifs={notifications}/>}
        options={{
          headerStyle: { 
            backgroundColor: "#094183",
          },
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={"#094183"} size={size} />
        ),}} />
        <Tab.Screen name="Map" children={() => <MapScreen sites={sites}/>}
        options={{
          headerStyle: { 
            backgroundColor: "#094183",
          },
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker" color={"#094183"} size={size} />
          ),}} />
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          headerStyle: { 
            backgroundColor: "#094183",
          },
          headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={"#094183"} size={size} />
        ),}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}











// Default setup
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello World!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
