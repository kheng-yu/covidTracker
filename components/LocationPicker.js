import React, { useState }from 'react';
import {
    View, 
    Button, 
    Text, 
    ActivityIndicator, 
    Alert, 
    StyleSheet} from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false);

    const [pickedLocation, setPickedLocation] = useState ();

    // user permission for location acquiring
    const verifyPermissions =  async () =>{
        const result = await Location.requestForegroundPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app',
                [{ text: 'Okay'}]
            );
            return false;
        }
        return true;
    };
    
    // get user location after permission
    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });       
        } catch (err) {
            Alert.alert(
                'Could not fetch location!', 
                'Please try again or pick a location on the map.',
                [{text: 'Okay'}])
        }
        setIsFetching(false);
    }; 
    

    // Button Navigation
    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };


    // stuff showing on screen
    return (
        <View style ={styles.locationPicker}>
            
            <MapPreview 
                style={styles.mapPreview} 
                location={pickedLocation} 
                onPress={pickOnMapHandler}
            >
                    { isFetching ? ( 
                        <ActivityIndicator size='large' color={Colors.primary}/> 
                    ) : (
                        <Text> No location chosen yet! </Text> 
                    )}
            </MapPreview>
            
         
            <Button 
                title="Get User Location" 
                color={Colors.primary} 
                onPress={getLocationHandler} />
    
            <View>
                <Text></Text>
            </View>

        
            < Button 
                title="Click on Map" 
                color={Colors.primary} 
                onPress={pickOnMapHandler} />


        </View>
    )
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: 200,
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    // actions: {
    //     flexDirection: 'column',
    //     justifyContent: 'space-around',
    //     width: '100%'
    // }
});

export default LocationPicker;