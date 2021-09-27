import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, DataTable } from 'react-native-paper';





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