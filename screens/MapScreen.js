import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Switch} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, DataTable } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { DeviceMotion } from 'expo-sensors';
import axios from 'axios';

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
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

  }
});

const MapScreen = ({ sites }) => {

    const mapRegion = {
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };  

    const [currentMarker, setCurrentMarker] = useState(sites[0]);
    
    const handlePress = (site) => {
        setCurrentMarker(site);
    }

    // Background tracking
    async function requestPermissions() {
        try {
            await Location.requestForegroundPermissionsAsync();
            await Location.requestBackgroundPermissionsAsync();
        } catch (e) {
            console.log(e);
        }
    };

    async function checkPermissions() {
        try {
            statusForeground = await Location.getForegroundPermissionsAsync();
            statusBackground = await Location.getBackgroundPermissionsAsync();
            const granted = await statusForeground.status === "granted" && await statusBackground.status === "granted";
            return granted;
        } catch (e) {
            console.log(e);
        }
        return false;
    };

    (async () => {
        if (await checkPermissions() == false) {
            await requestPermissions();
        }
        if (await checkPermissions() == true) {
            try {
                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000 * 60 * 10, // Every ten minutes
                    distanceInterval: 0,
                });
            } catch (e) {
                console.error(e);
            }
        }
    })()

    DeviceMotion.setUpdateInterval(1000);
    DeviceMotion.addListener((deviceMotionData) => {
        if (deviceMotionData.rotationRate.alpha +
            deviceMotionData.rotationRate.beta +
            deviceMotionData.rotationRate.gamma >= 60) {
                console.log("Shaking?" + new Date());
                axios.get("http://10.0.2.2:8080/api/sites").then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log("Error" + error);
                });
            }
    });


    return (
        <View style={{flex: 1, flexDirection: 'column' }}>

            <MapView 
                style={styles.map}
                region={mapRegion}
                provider="google"
            >
                {sites.map((site) => {
    
                    return(
                    <Marker 
                        key={site._id + currentMarker._id}
                        coordinate={site.coords}
                        pinColor={site._id === currentMarker._id ? 'tomato' : 'green'}
                        onPress={() => handlePress(site)}
                    >
                    </Marker>

                    )
                })}
            </MapView>

            <View style={{flex: 0.25}}>
                <Text>Selected Site</Text>
                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Site</DataTable.Title>
                            <DataTable.Title>Exposure Period</DataTable.Title>
                            <DataTable.Title>Tier</DataTable.Title>
                        </DataTable.Header>

                            <DataTable.Row key={currentMarker._id}>
                                <DataTable.Cell >{currentMarker.title}</DataTable.Cell>
                                <DataTable.Cell>{currentMarker.date}</DataTable.Cell>
                                <DataTable.Cell>{currentMarker.tier}</DataTable.Cell>
                            </DataTable.Row>

                    </DataTable>
                </View>
            </View>

            <View style={{flex: 0.4}}>
                <Text>All Sites</Text>
                <ScrollView>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title>Site</DataTable.Title>
                            <DataTable.Title>Exposure Period</DataTable.Title>
                            <DataTable.Title>Tier</DataTable.Title>
                        </DataTable.Header>

                        {sites.map((site) => {
                            return(
                                <DataTable.Row key={site._id} onPress={() => handlePress(site)}>
                                    <DataTable.Cell >{site.title}</DataTable.Cell>
                                    <DataTable.Cell>{site.date}</DataTable.Cell>
                                    <DataTable.Cell>{site.tier}</DataTable.Cell>
                                </DataTable.Row>
                            );
                        })}
                    </DataTable>
                </ScrollView>
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
   map: {
       flex: 0.4,

   },

});

export default MapScreen;