import { auth, db } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'

const login = async (email, parola) => {
    const userResponse = await signInWithEmailAndPassword(auth, email, parola)
    let yetki = "yok"
    let yetkiliBirimId = "yok"
    if (userResponse.user) {
        const yoneticiRef = collection(db, 'yoneticiler')
        const q = query(yoneticiRef, where("uid", "==", userResponse.user.uid))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach(doc => {
            yetki = doc.data().yetki
            yetkiliBirimId = doc.data().yetkiliBirimId
        })
    }
    return { uid: userResponse.user.uid, email: userResponse.user.email, yetki, yetkiliBirimId }
}

const yoneticiService = {
    login
}

export default yoneticiService