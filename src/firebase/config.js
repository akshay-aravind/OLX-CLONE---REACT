import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDi2Lx5p_XTQENCKH7-JAs8CWU-K5USyxI",
    authDomain: "olx-clone-3da66.firebaseapp.com",
    projectId: "olx-clone-3da66",
    storageBucket: "olx-clone-3da66.appspot.com",
    messagingSenderId: "29732556888",
    appId: "1:29732556888:web:5ff229c82f491f3c88ba2d",
    measurementId: "G-PSGH2JFWJ1"
  };
 export default  firebase.initializeApp(firebaseConfig)