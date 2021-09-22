import React from 'react';
import { View, Text, StyleSheet, Platform, ListViewComponent} from 'react-native';

import LocationPicker from '../components/LocationPicker';


const PlaceDetailScreen = props => {
    return (
        <View style={styles.screen}>
            <LocationPicker navigation={props.navigation}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default PlaceDetailScreen;