/*
* Componente para gestion de conexion a DB Firebase
* @Author: Erik Araujo
*/
import * as firebase from 'firebase';


// Initialize Firebase 1
  var config = {
    apiKey: "AIzaSyCNtb4ctBH7FHeCYvEOSoCsW2C_g7v5vng",
    authDomain: "appdomicilios-d2822.firebaseapp.com",
    databaseURL: "https://appdomicilios-d2822.firebaseio.com",
    projectId: "appdomicilios-d2822",
    storageBucket: "appdomicilios-d2822.appspot.com",
    messagingSenderId: "446957306131"
  };

  // Initialize Firebase 2
  /*
  var config_2 = {
    apiKey: "AIzaSyCNtb4ctBH7FHeCYvEOSoCsW2C_g7v5vng",
    authDomain: "appdomicilios-d2822.firebaseapp.com",
    databaseURL: "https://appdomicilios-d2822.firebaseio.com",
    projectId: "appdomicilios-d2822",
    storageBucket: "appdomicilios-d2822.appspot.com",
    messagingSenderId: "446957306131"
  };
  */
  firebase.initializeApp(config);

     
export default firebase;