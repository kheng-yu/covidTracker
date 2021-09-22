import { Platform } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlaceNavigator = createStackNavigator({
    Place: PlaceDetailScreen,
    Map: MapScreen
} , {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        }, 
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}


);

export default createAppContainer(PlaceNavigator);