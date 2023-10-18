import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBRS9Kj9ePfx_U4eOmlRlv6HDCabt8p2LA",
    authDomain: "sia-randevu-sistemi.firebaseapp.com",
    projectId: "sia-randevu-sistemi",
    storageBucket: "sia-randevu-sistemi.appspot.com",
    messagingSenderId: "882884986388",
    appId: "1:882884986388:web:c19e8740b59b6a54484901"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export {
    db
}