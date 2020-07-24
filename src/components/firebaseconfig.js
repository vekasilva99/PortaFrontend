import firebase from "firebase";
import "firebase/storage";

import PropTypes from 'prop-types'

/**
 * 
 */

var firebaseConfig = {
  apiKey: "AIzaSyCySL0izdrTBPFapugrRPEB32QrkV8d6S0",
  authDomain: "porta-hasta-tu-puerta.firebaseapp.com",
  databaseURL: "https://porta-hasta-tu-puerta.firebaseio.com",
  projectId: "porta-hasta-tu-puerta",
  storageBucket: "porta-hasta-tu-puerta.appspot.com",
  messagingSenderId: "112950608849",
  appId: "1:112950608849:web:4c7007ef9abe48a10596f0",
  measurementId: "G-7BHYEW6E41",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
