import Firebase from "firebase/app";
//here we import firestore
import "firebase/firestore";
//here we import firebase auth
import "firebase/auth"
/*here we imported the seed value for seeding 
==> import { seedDatabase } from "../seed";*/

//here we define config for the app
const config = {
    apiKey: "AIzaSyC3TAMo5me_U9sKeil9-JBQSTnNd_f2UyQ",
    authDomain: "instagram-cloned-app.firebaseapp.com",
    projectId: "instagram-cloned-app",
    storageBucket: "instagram-cloned-app.appspot.com",
    messagingSenderId: "828131804526",
    appId: "1:828131804526:web:5995c0dc3279d7d1442d7f",
    measurementId: "G-HS0WDTVTB8"
}

//here we initialize the app
const firebase = Firebase.initializeApp(config);

const {FieldValue} = Firebase.firestore;

//here we called the seed value ==> seedDatabase(firebase);


console.log("firebase", firebase);

export { firebase, FieldValue}