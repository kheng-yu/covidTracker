
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

  TaskManager.defineTask(BACKGROUND_FETCH_NOTIFICATION, async () => {
    //API call resp = axios.get(BASE_URL + 'getNotifications', username);
    setNotifications([
      {
          _id: 1,
          title: 'test', 
          date: '19/09/21',
          time: '8:10am-4:45pm',
          tier: 'Tier 1',
          type: 'Nearby',
          coords: {
              latitude: -37.8136,
              longitude: 144.9631
          }
      },
      {
          _id: 2,
          title: 'Kmart Wangaratta', 
          date: '25/09/21',
          time: '10:10am-2:45pm',
          tier: 'Tier 2',
          type: 'Match',
          coords: {
              latitude: -37.81236,
              longitude: 144.9831
          }
      },
      {
        _id: 3,
        title: 'Kmart Wangaratta', 
        date: '25/09/21',
        time: '10:10am-2:45pm',
        tier: 'Tier 2',
        type: 'Match',
        coords: {
            latitude: -37.81236,
            longitude: 144.9831
        }
    },
    ]);
    console.log('notifications updated');
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  TaskManager.defineTask(BACKGROUND_FETCH_SITES, async () => {
    //API call resp = axios.get(BASE_URL + 'getSites');
    setSites([
      {
          _id: '1',
          title: 'test', 
          date: '19/09/21',
          time: '8:10am-4:45pm',
          tier: 'Tier 1',
          coords: {
              latitude: -37.8136,
              longitude: 144.9631
          }
      },
      {
          _id: '2',
          title: 'Kmart Wangaratta', 
          date: '25/09/21',
          time: '10:10am-2:45pm',
          tier: 'Tier 2',
          coords: {
              latitude: -37.81236,
              longitude: 144.9831
          }
      },
      {
          _id: '3',
          title: 'Tyres R Us', 
          date: '30/07/21',
          time: '7:10am-3:00pm',
          tier: 'Tier 2',
          coords: {
              latitude: -37.8129,
              longitude: 144.9
          }
      },
      {
          _id: '4',
          title: 'Tyres R Us', 
          date: '30/07/21',
          time: '7:10am-3:00pm',
          tier: 'Tier 2',
          coords: {
              latitude: -37.8529,
              longitude: 144.97
          }
      },
      {
          _id: '5',
          title: 'Tyres R Us', 
          date: '30/07/21',
          time: '7:10am-3:00pm',
          tier: 'Tier 2',
          coords: {
              latitude: -37.8529,
              longitude: 144.93
          }
      }
  ]);
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
