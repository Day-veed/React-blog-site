import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQJyR4BhqJJaXZ0pqmfpyD7tOVSjxneF8",
    authDomain: "proposal-c7556.firebaseapp.com",
    projectId: "proposal-c7556",
    storageBucket: "proposal-c7556.appspot.com",
    messagingSenderId: "471532859436",
    appId: "1:471532859436:web:1c5e18d5ab8754d2efe189"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage().ref();
const storage = getStorage(firebaseApp);
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export { db, auth, storage, timestamp, storageRef};