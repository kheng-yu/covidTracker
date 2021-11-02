import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, button} from 'react-native';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase';
import { auth } from '../firebase';


const cameraScreen = props =>  {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    

    snap = async () => {
        if (this.camera){
            let photo = await this.camera.takePictureAsync();
            console.log(photo);

            user.updateProfile({
                photoURL: photo.uri
            }).then(() => {
                console.log(photo.uri);
            }).catch((error) => {
                console.log(error.message)
            });  

            db.update({
                Img: photo.uri
            })
        }
    };


    const user = auth.currentUser;
    const db = firebase.firestore().collection("user info").doc(user.uid);


    
    return (
        <SafeAreaView style={styles.container}>

            <Camera style={styles.camera} 
                    type={type}
                    ref={ref => {this.camera = ref;}}
            >
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>
                </View>

                 <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.snap}> 
                        <Text style={styles.text}>Take a photo</Text>
                    </TouchableOpacity>     
                </View>

                <View style={styles.GoBackButton}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('EditProfile')}}>
                        <Text style={styles.GoBackText}>Go Back</Text>
                    </TouchableOpacity>  
                </View>

            </Camera>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: '100%',
        justifyContent: 'flex-end',
        alignItems:'center'
    },
    buttonContainer: {
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 15,
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    GoBackButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    GoBackText: {
        marginTop: 20,
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
});


export default cameraScreen
