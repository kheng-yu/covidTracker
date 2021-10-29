import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput} from 'react-native';
import { auth } from '../firebase';

const EditProfileScreen = props => {
  
  const GoBackHandler =() => {
    props.navigation.navigate('Profile')
  }
  
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <Text>EditProfile</Text>
     
      <Text onPress={GoBackHandler}>Go Back</Text>

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


});

export default EditProfileScreen;