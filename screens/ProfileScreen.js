import React, { useState }from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';
import * as firebase from 'firebase';


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
          setUserData(doc.data())
          console.log(userData)
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

  const [DATA, setDATA] = useState([
    {
      location: 'Melbourne Central',
      date: '27 Oct, 2021',
      uid: 'asgfhhgfd'
    },
    {
      location: 'St Kilda',
      date: '22 Oct, 2021',
      uid: 'asgfhhgfd'
    },
    {
      location: 'Calton',
      date: '20 Oct, 2021',
      uid: 'asgfhhgfd'
    },
    {
      location: 'University of Melbourne',
      date: '18 Oct, 2021',
      uid: 'asgfhhgfd'
    },
    {
      location: 'QV',
      date: '16 Oct, 2021',
      uid: 'asgfhhgfd'
    },
  ])

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
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Location History</Text>
      </View>
       
      <View style={styles.ListContainer}> 
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={DATA}
          keyExtractor={(item) => item.location}
          renderItem = {({item}) => (
            <View style={styles.item}> 
              <Text style={styles.itemText}>{item.location}</Text>
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