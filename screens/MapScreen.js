import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar, DataTable } from 'react-native-paper';





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


    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            
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

            <View style={{flex: 0.25, padding: 25, backgroundColor: "#FFFFFF"}}>
                <Text style={{fontWeight: 'bold'}}>Selected Site</Text>
                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{flex:2.5}}>Site</DataTable.Title>
                            <DataTable.Title style={{flex:1.5}}>Exposure Period</DataTable.Title>
                            <DataTable.Title>Tier</DataTable.Title>
                        </DataTable.Header>

                            <DataTable.Row key={currentMarker._id}>
                                <DataTable.Cell style={{flex:2.5}}>{currentMarker.title}</DataTable.Cell>
                                <DataTable.Cell style={{flex:1.5}}>{currentMarker.date}</DataTable.Cell>
                                <DataTable.Cell><Text style={{fontWeight: "bold"}}>{currentMarker.tier}</Text></DataTable.Cell>
                            </DataTable.Row>

                    </DataTable>
                </View>
            </View>

            <View style={{flex: 0.4, padding: 25, backgroundColor: "#FFFFFF"}}>
                <Text style={{fontWeight: 'bold'}}>All Sites</Text>
                <ScrollView>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title style={{flex:2.5}}>Site</DataTable.Title>
                            <DataTable.Title style={{flex:1.5}}>Exposure Period</DataTable.Title>
                            <DataTable.Title>Tier</DataTable.Title>
                        </DataTable.Header>

                        {sites.map((site) => {
                            return(
                                <DataTable.Row key={site._id} onPress={() => handlePress(site)}>
                                    <DataTable.Cell style={{flex:2.5}}>{site.title}</DataTable.Cell>
                                    <DataTable.Cell style={{flex:1.5}}>{site.date}</DataTable.Cell>
                                    <DataTable.Cell><Text style={{fontWeight: "bold"}}>{site.tier}</Text></DataTable.Cell>
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