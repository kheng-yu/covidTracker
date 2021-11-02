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
        setMapRegion({
          latitude: notif.coords.latitude,
          longitude: notif.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
      })
    }

    const [mapRegion, setMapRegion] = useState({
      latitude: -37.8136,
      longitude: 144.9631,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
  });

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
            <Button style={{fontFamily: 'sans-serif'}}color="#012a58" title="Send Notification" onPress={triggerNotification} />
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
          <Text style={{fontWeight: 'bold'}}>Recent Notifications</Text>
          <DataTable>

            <DataTable.Header>
                <DataTable.Title style={{flex:1.5}}>Type</DataTable.Title>
                <DataTable.Title style={{flex:2.5}}>Site</DataTable.Title>
                <DataTable.Title style={{flex:2.5}}>Exposure Period</DataTable.Title>
                <DataTable.Title>Tier</DataTable.Title>
            </DataTable.Header>

            {notifications.map((notif) => {
                return(
                    <DataTable.Row key={notif._id} onPress={() => handlePress(notif)}>
                        <DataTable.Cell style={{flex:1.5}}>{notif.type}</DataTable.Cell>
                        <DataTable.Cell style={{flex:2.5}}>{notif.title}</DataTable.Cell>
                        <DataTable.Cell style={{flex:2.5}}>{notif.date}</DataTable.Cell>
                        <DataTable.Cell><Text style={{fontWeight: "bold"}}>{notif.tier}</Text></DataTable.Cell>
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
      paddingTop: 28,
      paddingHorizontal: 30,
      flex: 0.4,
      backgroundColor: "#FFFFFF"
    },
    map: {
        flex: 0.6,
 
    },
  });

export default NotificationScreen;