import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';





const MapScreen = props => {

    const sites = [
        {
            _id: 1,
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
            _id: 2,
            title: 'Kmart Wangaratta', 
            date: '25/09/21',
            time: '10:10am-2:45pm',
            tier: 'Tier 2',
            coords: {
                latitude: -37.81236,
                longitude: 144.9831
            }
        }
    ]
    
    const mapRegion = {
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };  

    const [currentMarker, setCurrentMarker] = useState({title: '', date: '', time: ''});
    
    const handlePress = (site) => {
        setCurrentMarker({title: site.title, date: site.date, time: site.time});
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
                        key={site._id}
                        coordinate={site.coords}
                        pinColor={'#096327'}
                        onPress={() => handlePress(site)}
                    >
                    </Marker>

                    )
                })}
            </MapView>
            <View style={styles.details}>
                <View>
                <Text>{currentMarker.title}</Text>
                </View>
                <View>
                <Text>{currentMarker.date}</Text>
                </View>
                <View>
                <Text>{currentMarker.time}</Text>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
   map: {
       flex: 0.5,

   },
   details: {
    justifyContent: 'space-around',
    flex: 0.5, 
    flexDirection: 'row'
   }
});

export default MapScreen;