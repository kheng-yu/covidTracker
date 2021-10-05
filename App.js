
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapScreen from './screens/MapScreen';
import NotificationScreen from './screens/NotificationScreen';
import * as Notifications from "expo-notifications";

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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notifications" component={NotificationScreen}
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),}} />
        <Tab.Screen name="Map" component={MapScreen} 
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
