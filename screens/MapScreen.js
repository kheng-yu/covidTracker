import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const MapScreen = props => {
    
    const mapRegion = {
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };    


    return (
        <MapView 
            style={styles.map}
            region={mapRegion}
            provider="google"
        >
            <Marker 
                coordinate={{
                    latitude: -37.8136,
                    longitude: 144.9631
                }} 
                pinColor={'#096327'}    
            >
            </Marker>

            <Marker 
                coordinate={{
                    latitude: -37.81236,
                    longitude: 144.9831
                }} 
                pinColor={'#0c30cc'}
            > 
            </Marker>

            <Marker 
                coordinate={{
                    latitude: -37.80236,
                    longitude: 144.9531
                }} > 
            </Marker>

        </MapView>
    );

};

const styles = StyleSheet.create({
   map: {
       flex: 1,
       width: Dimensions.get('window').width,
       height: Dimensions.get('window').height,

   }
});

export default MapScreen;