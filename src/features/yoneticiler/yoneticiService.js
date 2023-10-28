import { auth, db } from '../../firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore'

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

const yoneticiBilgilerGetir = async (uid) => {
    let yetki = "yok"
    let yetkiliBirimId = "yok"
    let email = ""
    const yoneticilerRef = collection(db, 'yoneticiler')
    const q = query(yoneticilerRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => {
        yetki = doc.data().yetki
        yetkiliBirimId = doc.data().yetkiliBirimId
        email = doc.data().email
    })
    return { uid, email, yetki, yetkiliBirimId }
}

const cikisYap = async ()=>{
    signOut(auth)
    localStorage.removeItem('yonetici')

    return null
}

const yoneticiService = {
    login,
    yoneticiBilgilerGetir,
    cikisYap
}

export default yoneticiService