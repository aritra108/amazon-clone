import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBd34MazahcG8mCtb4jf6pLYMQm-wVS4_I",
    authDomain: "clone-ff04b.firebaseapp.com",
    projectId: "clone-ff04b",
    storageBucket: "clone-ff04b.appspot.com",
    messagingSenderId: "923803092933",
    appId: "1:923803092933:web:392cdd46274c527e4b2dac",
    measurementId: "G-FV3DCLGNZ0"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db , auth };