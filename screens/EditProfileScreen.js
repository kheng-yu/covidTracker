import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';

const EditProfileScreen = props => {
  
  const GoBackHandler =() => {
    props.navigation.navigate('Profile')
  }
  
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <Image 
            style={styles.userImg} 
            source={require('../assets/avatar.png')}
        />
        <Text style={styles.selectText}>Select Avator</Text>
      </View>

      <View style={styles.placeHolder}> 
        <AntDesign name="user" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Username'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.placeHolder}> 
        <MaterialCommunityIcons name="email-edit-outline" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Change my email'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.placeHolder}> 
        <Feather name="key" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Change my password'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.placeHolder}> 
        <Entypo name="globe" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='Country'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.placeHolder}> 
        <MaterialCommunityIcons name="city" size={24} color="#094183" />
        <TextInput
          style={styles.textInput}
          placeholder='City'
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.updateButton}>
        <TouchableOpacity onPress={()=>{}}>
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
    marginBottom: 40
  },
  userImg: {
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
    marginTop: 50,
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
    marginBottom: 20
  },
  GoBackText: {
    fontSize: 16,
    color: '#094183',
    fontWeight: 'bold'
  }


});

export default EditProfileScreen;