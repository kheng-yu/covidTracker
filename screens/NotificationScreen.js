import { View, Text, StyleSheet, Dimensions} from 'react-native';
import React, { useState } from 'react';
import { DataTable } from 'react-native-paper';
 
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

    return(
        <View style={styles.container}>
          <DataTable>

            <DataTable.Header>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title>Site</DataTable.Title>
                <DataTable.Title>Exposure Period</DataTable.Title>
                <DataTable.Title>Tier</DataTable.Title>
            </DataTable.Header>

            {notifications.map((notif) => {
                return(
                    <DataTable.Row key={notif._id}>
                        <DataTable.Cell>{notif.type}</DataTable.Cell>
                        <DataTable.Cell >{notif.title}</DataTable.Cell>
                        <DataTable.Cell>{notif.date}</DataTable.Cell>
                        <DataTable.Cell>{notif.tier}</DataTable.Cell>
                    </DataTable.Row>
                );
            })}
          </DataTable>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      paddingHorizontal: 30,

    },
  });

export default NotificationScreen;