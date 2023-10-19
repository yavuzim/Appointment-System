import { db } from '../../firebase/config'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

const birimlerGetir = async () => {
    const birimlerRef = collection(db, 'birimler')

    const docSnap = await getDocs(birimlerRef)

    let birimDizisi = []

    docSnap.forEach(doc => {
        birimDizisi.push({ ...doc.data(), id: doc.id })
    })

    return birimDizisi

}

const secilenBirimGetir = async (id) => {
    const docRef = doc(db, 'birimler', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id }
    } else {
        return null
    }
}

const birimService = {
    birimlerGetir,
    secilenBirimGetir
}

export default birimService