import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

const birimlerGetir = async () => {
    const birimlerRef = collection(db, 'birimler')

    const docSnap = await getDocs(birimlerRef)

    let birimDizisi = []

    docSnap.forEach(doc => {
        birimDizisi.push({ ...doc.data(), id: doc.id })
    })

    return birimDizisi

}

const birimService = {
    birimlerGetir
}

export default birimService