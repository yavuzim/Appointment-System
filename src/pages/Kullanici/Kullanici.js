import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { kullaniciDoldur } from "../../features/kullanicilar/kullaniciSlice"
import { birimSec } from "../../features/birimler/birimSlice"

export default function Kullanici() {

    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const { kullanici } = useSelector((state) => state.kullaniciState)
    const { secilenBirim } = useSelector((state) => state.birimState)

    useEffect(() => {
        if (!kullanici) {
            nagivate('/login')
        }
    }, [kullanici])

    useEffect(() => {
        const secilenBirimId = localStorage.getItem('secilenBirim')
        if (!secilenBirimId) {
            nagivate('/')
        }
        if (!kullanici) {
            nagivate('/login')
        }
        dispatch(birimSec(JSON.parse(secilenBirimId)))
        dispatch(kullaniciDoldur())
    }, [])

    return (
        <div>
          <div>Merhaba, {kullanici.email}</div>
          <p>{secilenBirim.ad} için randevu alınız!</p>
        </div>
    )
}
