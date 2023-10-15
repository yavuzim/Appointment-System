import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAR3rqFmmu3vFXsMQh7z6KZ-IYlQr8dbUE",
    authDomain: "react-redux-toolikt.firebaseapp.com",
    projectId: "react-redux-toolikt",
    storageBucket: "react-redux-toolikt.appspot.com",
    messagingSenderId: "176882548350",
    appId: "1:176882548350:web:8d0c7de76376dd9603e22f"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export{
    db
}