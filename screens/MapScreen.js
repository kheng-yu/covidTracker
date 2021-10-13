import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Switch} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, DataTable } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
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


const MapScreen = props => {

    const sites = [
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
    ]
    
    const mapRegion = {
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };  

    const [currentMarker, setCurrentMarker] = useState(sites[0]);
    
    const handlePress = (site) => {
        console.log(currentMarker._id);
        setCurrentMarker(site);
    }

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

    // Background tracking
    const requestPermissions = async () => {
        await Location.requestForegroundPermissionsAsync();
        await Location.requestBackgroundPermissionsAsync();
    };

    const checkPermissions = async () => {
        const { statusForeground } = await Location.getForegroundPermissionsAsync();
        const { statusBackground } = await Location.getBackgroundPermissionsAsync();
        if (statusForeground === 'granted' && statusBackground === 'granted') {
            return true;
        }
        return false;
    };

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        if (isEnabled) {
            stopLocationTracking();
        } else {
            startLocationTracking();
        }
    }

    const startLocationTracking = async () => {
        if (!checkPermissions()) {
            requestPermissions();
        }
        if (checkPermissions()) {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000 * 60 * 10, // Every ten minutes
                distanceInterval: 0,
            });
            setIsEnabled(true);
        }
    };

    const stopLocationTracking = async () => {
        if (TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
            setIsEnabled(false);
        }
    };

    return (
        <View style={{flex: 1, flexDirection: 'column' }}>
            <Button title="Send Notification" onPress={triggerNotification} />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Enable background location</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

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