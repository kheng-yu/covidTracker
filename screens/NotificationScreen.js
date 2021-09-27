import { View, Text, StyleSheet, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { DataTable } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
 
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