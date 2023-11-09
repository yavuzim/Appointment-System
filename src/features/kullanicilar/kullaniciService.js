import { auth, db } from '../../firebase/config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where, serverTimestamp, arrayUnion, updateDoc, doc } from 'firebase/firestore'

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
    }
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

const pasifTarihEkle = async (birim, tarih, deger, text) => {
    const tarihRef = collection(db, "tarihler")
    const q = query(tarihRef, where("birim", "==", birim), where("tarih", "==", tarih))
    const docSnap = await getDocs(q)
    const saat = {
        deger,
        text,
        pasifMi: true
    }
    if (docSnap.empty) {
        await addDoc(tarihRef, {
            birim: birim,
            tarih: tarih,
            saatler: arrayUnion(saat)
        })
    } else {
        docSnap.forEach(async (belge) => {
            const belgeId = belge.id
            const belgeRef = doc(db, 'tarihler', belgeId)
            await updateDoc(belgeRef, {
                saatler: arrayUnion(saat)
            })
        })
    }
}

const randevuOlustur = async (veri) => {
    const colRef = collection(db, "randevular")
    try {
        console.log("1");
        await addDoc(colRef, {
            birimId: veri.birimId,
            birimAd: veri.birimAd,
            saatDeger: veri.saatDeger,
            saatText: veri.saatText,
            tarih: veri.tarih,
            email: veri.email,
            olusturulmaTarih: serverTimestamp(),
            durum: "Bekliyor",
            durumRenk: "secondary",
            mesaj: ''
        })
        console.log("2");
        await pasifTarihEkle(veri.birimId, veri.tarih, veri.saatDeger, veri.saatText)
        return `Randevunuz tarih : ${veri.tarih} saat : ${veri.saatText} olarak ${veri.birimAd} oluşturulmuştur.`
    } catch (error) {
        console.log("3");
        return `Bir hata oluştu ${error.mesaj}. Randevunuz eklenmedi.`
    }
}

const randevularGetir = async (veri) => {
    const colRef = collection(db, "randevular")
    const q = query(colRef, where("email", "==", veri))
    const docSnap = await getDocs(q)

    let dizi = []

    docSnap.docs.forEach(belge => {
        const randevuBelgesi = {
            id: belge.id,
            birimAd: belge.data().birimAd,
            durum: belge.data().durum,
            saat: belge.data().saatText,
            tarih: belge.data().tarih,
            durumRenk: belge.data().durumRenk,
            mesaj: belge.data().mesaj
        }
        dizi.push(randevuBelgesi)
    })
    return dizi
}

const kullaniciService = {
    googleLogin,
    kullaniciDoldur,
    saatleriFormatla,
    randevuOlustur,
    randevularGetir
}

export default kullaniciService