import './Kullanici.css'
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

    const bugun = new Date()
    const formatlanmisTarih = bugun.getDate() + "." + (bugun.getMonth() + 1) + "." + bugun.getFullYear()

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
        <div className='kullanici'>
            <div className='alert alert-secondary' role='alert'>
                {kullanici && <p>Merhaba, <strong>{kullanici.email}</strong></p>}
                {secilenBirim && <p><strong>{secilenBirim.ad}</strong> için randevu alınız.</p>}
            </div>
            <div className='alert alert-primary' role='alert'>
                <h3>Randevu Saatini Seçiniz</h3>
                <div className='mt-3'>
                    <p>{formatlanmisTarih} için randevu alınız</p>
                    <div className='row mt-4'>
                        <div className='col-6 container'>
                            <button className='btn btn-outline-dark btn-sm m-4' disabled>08:00</button>
                            <button className='btn btn-outline-dark btn-sm m-4'>08:00</button>
                            <button className='btn btn-outline-dark btn-sm m-4'>08:00</button>
                            <button className='btn btn-outline-dark btn-sm m-4'>08:00</button>
                            <button className='btn btn-outline-dark btn-sm m-4'>08:00</button>
                            <button className='btn btn-outline-dark btn-sm m-4'>08:00</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
