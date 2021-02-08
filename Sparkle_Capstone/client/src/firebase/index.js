import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWrDUX33rWBveZfqZh5R2xDeaweasr3Xo",
    authDomain: "sparklecapstone.firebaseapp.com",
    projectId: "sparklecapstone",
    storageBucket: "sparklecapstone.appspot.com",
    messagingSenderId: "673953814024",
    appId: "1:673953814024:web:fde97f0f4aba18a161e3bd"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };