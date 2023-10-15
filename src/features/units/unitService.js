import db from '../../firebase/config'
import { collection, getDoc } from 'firebase/firestore'

const unitsGet = async () => {
    const unitsRef = collection(db, 'units')
    const docSnap = await getDoc(unitsRef)
    let unitArray = []
    docSnap.array.forEach(doc => {
        unitArray.push({ ...doc.data(), id: doc.id })
    });
    return unitArray
}

const unitService = {
    unitsGet
}
export default unitService