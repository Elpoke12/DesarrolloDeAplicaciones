import firebase from 'firebase/app';
import 'firebase/database';

const config={
    apiKey: "AIzaSyDysu46J7tGOrjx_zytCd5lmyW0KDE5v6s",
    authDomain: "examenu3-5ea16.firebaseapp.com",
    projectId: "examenu3-5ea16",
    storageBucket: "examenu3-5ea16.appspot.com",
    messagingSenderId: "327837438538",
    appId: "1:327837438538:web:2fe5e527d62fd38d884cb3",
    measurementId: "G-R1S50916NJ"
}

const fb = !firebase.apps.lenght ? firebase.initializeApp(config):firebase.app()

export default fb;