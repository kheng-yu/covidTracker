import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button} from 'react-native';
import React, { useState } from 'react';
import { DataTable } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Received new locations', new Date(locations[0].timestamp));
    console.log("Longitude, latitude = " + locations[0].coords.latitude + ", " + locations[0].coords.longitude);
  }
});

const NotificationScreen = () => {

    const notifications = [
        {
            _id: 1,
            title: 'Mount Hira College', 
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
        }
    ]

    const [selectedNotif, setSelectedNotif] = useState(notifications[0]);

    const handlePress = (notif) => {
        setSelectedNotif(notif);
    }

    const mapRegion = {
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };  

    const triggerNotification = () => {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Exposure Site Nearby",
            body: "Tap for more details"
          },
          trigger: {
            seconds: 5
          }
        });
      }

      const requestPermissions = async () => {
        await Location.requestForegroundPermissionsAsync();
        const { status } = await Location.requestBackgroundPermissionsAsync();
        if (status === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 0,
          });
        }
      };

    return(
        <View style={{flex: 1, flexDirection: 'column' }}>
            <Button title="Send Notification" onPress={triggerNotification} />

              <TouchableOpacity onPress={requestPermissions}>
                <Text>Enable background location</Text>
              </TouchableOpacity>

            <MapView 
                style={styles.map}
                region={mapRegion}
                provider="google"
            > 
                <Marker 
                key={selectedNotif._id}
                coordinate={selectedNotif.coords}
                pinColor={'#096327'}
                />
            </MapView>
        <ScrollView style={styles.container}>
          <Text>Recent Notifications</Text>
          <DataTable>

            <DataTable.Header>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title>Site</DataTable.Title>
                <DataTable.Title>Exposure Period</DataTable.Title>
                <DataTable.Title>Tier</DataTable.Title>
            </DataTable.Header>

            {notifications.map((notif) => {
                return(
                    <DataTable.Row key={notif._id} onPress={() => handlePress(notif)}>
                        <DataTable.Cell>{notif.type}</DataTable.Cell>
                        <DataTable.Cell >{notif.title}</DataTable.Cell>
                        <DataTable.Cell>{notif.date}</DataTable.Cell>
                        <DataTable.Cell>{notif.tier}</DataTable.Cell>
                    </DataTable.Row>
                );
            })}
          </DataTable>
        </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      paddingHorizontal: 30,
      flex: 0.4

    },
    map: {
        flex: 0.6,
 
    },
  });

export default NotificationScreen;