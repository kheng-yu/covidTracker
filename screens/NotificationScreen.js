import { View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
 
const NotificationScreen = ({notifs}) => {

    const [notifications, setNotifications] = useState(notifs)

    const [selectedNotif, setSelectedNotif] = useState(notifs[0]);

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
            title: "New Notification",
            body: "Tap for more details"
          },
          trigger: {
            seconds: 1
          }
        });
      }

    useEffect( () => {
      setNotifications(notifs);
      if (notifs.length > notifications.length) {
        triggerNotification();
      }
    }, [notifs]);

    return(
        <View style={{flex: 1, flexDirection: 'column' }}>
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

            {notifications.slice(1).reverse().map((notif) => {
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