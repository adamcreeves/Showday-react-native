import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCOMS2W6DxkKD7QDrV8f5t0deLKBeF9bK0",
    authDomain: "showday-6df69.firebaseapp.com",
    projectId: "showday-6df69",
    storageBucket: "showday-6df69.appspot.com",
    messagingSenderId: "626677434568",
    appId: "1:626677434568:web:483734ced500f7c6e8fdfd",
    measurementId: "G-46W94TZ7E1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };