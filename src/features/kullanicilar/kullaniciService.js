import { auth, db } from '../../firebase/config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

const veriSetleri = [
    {
        text: "08:00",
        deger: 8,
        pasifMi: false
    },
    {
        text: "09:00",
        deger: 9,
        pasifMi: false
    },
    {
        text: "10:00",
        deger: 10,
        pasifMi: false
    },
    {
        text: "11:00",
        deger: 11,
        pasifMi: false
    },
    {
        text: "12:00",
        deger: 12,
        pasifMi: false
    },
    {
        text: "13:00",
        deger: 13,
        pasifMi: false
    },
    {
        text: "14:00",
        deger: 14,
        pasifMi: false
    },
    {
        text: "15:00",
        deger: 15,
        pasifMi: false
    },
    {
        text: "16:00",
        deger: 16,
        pasifMi: false
    },
    {
        text: "17:00",
        deger: 17,
        pasifMi: false
    },
    {
        text: "18:00",
        deger: 18,
        pasifMi: false
    },
]

const googleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth, provider)
        localStorage.setItem('kullanici', JSON.stringify(result.user))
        return result.user
    } catch (error) {
        throw Error(error.message)
    }
}

const kullaniciDoldur = () => {
    return JSON.parse(localStorage.getItem('kullanici'))
}

const saatleriFormatla = async (veri) => {
    const pasifTarihlerRef = collection(db, "tarihler")
    const bugun = new Date()
    const formatlanmisTarih = bugun.getDate() + "." + (bugun.getMonth() + 1) + "." + bugun.getFullYear()

    let q = query(pasifTarihlerRef, where("tarih", "==", formatlanmisTarih))
    q = query(q, where("birim", "==", veri))

    const snaps = await getDocs(q)
    let veriSetler = veriSetleri

    if (!snaps.empty) {
        snaps.forEach(doc => {
            doc.data().saatler.map(saat => {
                veriSetler = veriSetler.filter(function (veri) {
                    if (veri.deger !== saat.deger) {
                        return veri
                    }
                })
                veriSetler.push(saat)
            })
        })
        veriSetler.sort(function (a, b) {
            return a.deger - b.deger
        })
    }
    return veriSetler
}

const kullaniciService = {
    googleLogin,
    kullaniciDoldur
}

export default kullaniciService