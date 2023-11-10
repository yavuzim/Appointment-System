import { auth, db } from '../../firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, query, where, getDocs, doc, updateDoc, getDoc, orderBy, limit } from 'firebase/firestore'
import birimService from '../birimler/birimService'

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

const cikisYap = async () => {
    signOut(auth)
    localStorage.removeItem('yonetici')

    return null
}

const moderatorlerGetir = async () => {
    const yoneticilerRef = collection(db, 'yoneticiler')
    const q = query(yoneticilerRef, where("yetki", "==", "moderator"))

    const querySnap = await getDocs(q)

    let dizi = []

    querySnap.forEach(doc => {
        dizi.push({ ...doc.data(), id: doc.id })
    })
    return dizi
}

const birimeModeratorAta = async (did, bid) => {
    const docRef = doc(db, 'yoneticiler', did)
    const birimRef = doc(db, 'birimler', bid)

    let birimAd = ''
    let kullaniciEmail = ''
    try {
        await updateDoc(docRef, {
            yetkiliBirimId: bid
        })

        const docSnap = await getDoc(docRef)
        const birimSnap = await getDoc(birimRef)

        birimAd = birimSnap.data().ad
        kullaniciEmail = docSnap.data().email

        return `${birimAd} birimine ${kullaniciEmail} atanmıştır.`

    } catch (error) {
        return error
    }
}

const birimModeratorlerGetir = async () => {
    const birimler = await birimService.birimlerGetir()
    const moderatorler = await moderatorlerGetir()

    let dizi = []

    moderatorler.forEach(m => {
        birimler.forEach(b => {
            if (b.id == m.yetkiliBirimId) {
                dizi.push({ email: m.email, birimAd: b.ad })
            }
        })
    })
    return dizi
}

const son10birimRandevularGetir = async (birimId) => {
    try {
        const colRef = collection(db, "randevular")
        const q = query(colRef, where("birimId", "==", birimId), where("durum", "==", "Bekliyor"), orderBy("olusturulmaTarih", "desc"), limit(10))
        const docSnap = await getDocs(q)
        let dizi = []

        docSnap.docs.forEach(belge => {
            const veri = {
                belgeId: belge.id,
                email: belge.data().email,
                saatText: belge.data().saatText,
                tarih: belge.data().tarih
            }
            dizi.push(veri)
        })
        return dizi
    } catch (error) {
        throw Error(error.message)
    }
}

const yoneticiService = {
    login,
    yoneticiBilgilerGetir,
    cikisYap,
    moderatorlerGetir,
    birimeModeratorAta,
    birimModeratorlerGetir,
    son10birimRandevularGetir
}



export default yoneticiService