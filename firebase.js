// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0jJxGmz8AeoASjYqUeUrX7yBOi8x3C34",
  authDomain: "covid-app-a03d8.firebaseapp.com",
  projectId: "covid-app-a03d8",
  storageBucket: "covid-app-a03d8.appspot.com",
  messagingSenderId: "791412335758",
  appId: "1:791412335758:web:225274a45297d9e43f15df",
  measurementId: "G-SDFEJ6WQNN"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };

