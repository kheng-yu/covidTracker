import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
// import MapView, { Marker } from 'react-native-maps';

import ENV from '../env';

const MapPreview = props => {
    let imageUrl;
    
    if (props.location) {
        imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
    };
    

    return (
        // <TouchableOpacity 
        // onPress={props.onPress}
        <View
            onPress={props.onPress} 
            style={{...styles.mapView, ...props.style}} >
                { props.location ? 
                    (<Image style={styles.mapImage} source={{uri: imageUrl}} />
                    ) : (
                    props.children)
                }  
        </ View>     
        // </TouchableOpacity>
    )

};

const styles = StyleSheet.create({
    mapView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage:{
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;
