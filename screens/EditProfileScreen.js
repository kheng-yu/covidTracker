import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, button} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';
import * as firebase from 'firebase';
import { Camera } from 'expo-camera';

const EditProfileScreen = props => {

  // Get user info
  const user = auth.currentUser;
  const db = firebase.firestore().collection("user info").doc(user.uid);
  
  // Helper functions for getting user input when updating
  const [userPic, setUserPic] = React.useState(null)
  const [data, setData] = React.useState({
    name: '',
    number: '',
    country: '',
    city: '',
  });

  const unsubscribe = props.navigation.addListener('focus', () => {
    db.get().then((doc) => {
        if (doc.exists) {
            setUserPic(doc.data().Img)
            console.log(userPic)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log(userPic)
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    })

  });


  const nameInputChange = (text) => {
    if (text.length > 0){
       setData({
        ...data,
        name: text
      })
    }
  }

  const phoneNumInputChange = (number) => {
    if (number.length > 0){
      setData({
        ...data,
        number: number
      })
    }
  }

  const countryInputChange = (text) => {
    if (text.length > 0){
      setData({
        ...data,
        country: text
      })
    }
  }

  const cityInputChange = (text) => {
    if (text.length > 0){
      setData({
        ...data,
        city: text
      })
    }
  }

  const updateHandlder = () => {
    db.update({
      name: data.name,
      phoneNum: data.number,
      country: data.country,
      city: data.city
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error(error.message);
    });

    alert('Successfully Updated!')
  }

  // Change Profile Pic
  const openCamera = () => {
    props.navigation.navigate('Camera')
  }


  // Navigate to previous profile page
  const GoBackHandler =() => {
    props.navigation.navigate('Profile')
  };

  
  // rendering UI
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image 
            style={styles.userImg} 
            source={{uri: userPic != null ? userPic : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' }}
        />
        <TouchableOpacity onPress={openCamera}>
          <Text style={styles.selectText}>Let's take a selfie!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.placeHolder}> 
        <AntDesign name="user" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(name)=> nameInputChange(name)}
        />
      </View>

      <View style={styles.placeHolder}> 
        <Feather name="phone-call" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Phone Number'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(number)=> phoneNumInputChange(number)}
        />
      </View>

      <View style={styles.placeHolder}> 
        <Entypo name="globe" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Country'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(country)=> countryInputChange(country)}
        />
      </View>

      <View style={styles.placeHolder}> 
        <MaterialCommunityIcons name="city-variant-outline" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='City'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(city)=> cityInputChange(city)}
        />
      </View>

      <View style={styles.updateButton}>
        <TouchableOpacity onPress={updateHandlder}>
            <Text style={styles.updateText}>Update Profile</Text>
        </TouchableOpacity> 
      </View>
      
      <View style={styles.goBackButton}>
        <TouchableOpacity onPress={GoBackHandler}>
            <Text style={styles.GoBackText}>Go Back</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  userImg: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 75,
  },
  selectText: {
    fontSize: 15,
    marginTop: 10,
    color: '#777777',
  },
  placeHolder: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
    marginBottom: 15
  },
  textInput:{
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    color: '#333333'
  },
  updateButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#094183',
    marginTop: 20,
    marginBottom: 5,
  },
  updateText: {
    fontSize: 20,
    color: '#094183',
    fontWeight: 'bold'
  },
  goBackButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5,
    // marginBottom: 5
  },
  GoBackText: {
    fontSize: 16,
    color: '#094183',
    fontWeight: 'bold'
  }
});

export default EditProfileScreen;