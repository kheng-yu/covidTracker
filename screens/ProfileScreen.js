import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';
import * as firebase from 'firebase';
import * as Location from 'expo-location';


const ProfileScreen = props => {

  const [userPic, setUserPic] = useState(null)
  const [username, setUsername] = useState(null)
  const [userData, setUserData] = useState(null)
  const user = auth.currentUser;
  const db = firebase.firestore();
  const docRef = db.collection('user info').doc(user.uid);

  const unsubscribe = props.navigation.addListener('focus', () => {
    docRef.get().then((doc) => {
      if (doc.exists) {
          setUserPic(doc.data().Img)
          setUsername(doc.data().name)
          // setUserData(doc.data())
          // console.log(userData)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          console.log(userData)
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    })
  });

  const GoToEditProfileHandler = () => {
    props.navigation.navigate('EditProfile')
  }

  const handleLogOut = () => {
    auth.signOut().then(() => {
      props.navigation.navigate('LogIn')
    }).catch(error => alert(error.message))
  }


  // Get user location history
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [getLocationPermit, setGetLocationPermit] = useState('');
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState([]);
  const date = new Date().toDateString()

  useEffect(() => {
    if (locationServiceEnabled === false) {
      CheckIfLocationEnabled();
    }
    if (getLocationPermit != 'granted') {
      GetPermissions();
    }
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    
    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetPermissions = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
    
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      } else {
        setGetLocationPermit(status)
      }
    
  }

  const GetCurrentLocation = async () => {

    console.log(date)
    console.log(locationServiceEnabled)
    console.log(getLocationPermit)

    if (getLocationPermit == 'granted') {
      let { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
      console.log(coords)
      
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });


        for (let item of response) {
          let address = `${item.name}, ${item.city}`;
          // let postCode = `${item.postalCode}`;
          const displayLocationName = {address, date}
          console.log(displayLocationName) 
          setDisplayCurrentAddress(displayCurrentAddress => [...displayCurrentAddress, displayLocationName])
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image 
            style={styles.userImg} 
            source={{uri: userPic != null ? userPic : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' }}
        />
        <Text style={styles.editProfile} onPress={GoToEditProfileHandler}>Edit Profile</Text>
        {username != null ? 
          <Text style={styles.username}>{username}</Text> : 
          <Text style={styles.username}>{user.uid}</Text>
        }
      </View>
    
      <View style={styles.row}>
        <Entypo name="email" size={20} color="#777777" />
        <Text style={{color: '#777777', marginLeft: 10}}>{user.email}</Text> 
      </View>

      <View style={styles.locationInfoSection}>
        <TouchableOpacity onPress={GetCurrentLocation}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Update Location History</Text>
        </ TouchableOpacity>
      </View>
       
      <View style={styles.ListContainer}> 
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={displayCurrentAddress}
          keyExtractor={(item) => displayCurrentAddress.indexOf(item)}
          renderItem = {({item}) => (
            <View style={styles.item}> 
              <Text style={styles.itemText}>{item.address}</Text>
              <Text style={styles.itemText}>{item.date}</Text>
            </View>
          )}
        />
      </View>
     
      <View style={styles.button}>
        <TouchableOpacity onPress={handleLogOut}>
            <Text style={styles.LogOutText}>Log Out</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfoSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImg: {
    marginTop: 15,
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  editProfile: {
    fontSize: 15,
    marginTop: 10,
    color: '#777777'
  },
  username:{
    fontSize: 22,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#094183'
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10
  },
  locationInfoSection: {
    height: 30,
    width: '90%',
    marginTop: 30,
    borderBottomWidth: 1.5,
    borderBottomColor: '#b8b4b4',
    alignItems: 'center'
  },
  ListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  item: {
    marginTop: 10,
    height: 70,
    width: 350,
    backgroundColor: '#094183',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 15,
    color: 'white'
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: '#094183',
    marginTop: 5,
    marginBottom: 5
  },
  LogOutText: {
    fontSize: 15,
    color: '#094183',
    fontWeight: 'bold'
  }
});

export default ProfileScreen;