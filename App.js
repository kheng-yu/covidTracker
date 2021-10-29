
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
    
    let resp = await axios.post('http://10.0.2.2:8080/api/getCloseSites', {latitude: -37.0519568, longitude: 146.0894272});
  
    if (resp.data) {
      if (sites[0].title === 'Loading...') {
        for(let site of resp.data) {
          site.type = 'Nearby';
        }
        setNotifications(resp.data);
      }
      else {
        for (let site of resp.data) {
          if (!notifications.some(notif => notif._id === site._id && notif.type === 'Nearby')){
            site.type = 'Nearby';
            setNotifications(notifications => [...notifications, site]);
          }
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
      if (sites[0].title === 'Loading...') {
        for(let site of resp.data) {
          site.type = 'Match';
        }
        setNotifications(resp.data);
      }
      else {
        for (let site of resp.data) {
          if (!notifications.some(notif => notif._id === site._id && notif.type === 'Match')){
            site.type = 'Match';
            setNotifications(notifications => [...notifications, site]);
          }
        }
      }
    }
    console.log('match notifications updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  TaskManager.defineTask(BACKGROUND_FETCH_SITES, async () => {
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
    registerBackgroundFetchAsyncNotificationsNearby();
    registerBackgroundFetchAsyncNotificationsMatch();
    registerBackgroundFetchAsyncSites();
    console.log('tasks registered');
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notifications" children={() => <NotificationScreen notifs={notifications}/>}
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),}} />
        <Tab.Screen name="Map" children={() => <MapScreen sites={sites}/>}
        options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={size} />
          ),}} />
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
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
