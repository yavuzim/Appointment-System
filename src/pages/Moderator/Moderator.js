import './Moderator.css'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { birimSec } from "../../features/birimler/birimSlice"
import { cikisYap } from '../../features/yoneticiler/yoneticiSlice'

import { getAuth, updatePassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Moderator() {

    const { yonetici, isSuccess } = useSelector((state) => state.yoneticiState)
    const { secilenBirim, isLoading } = useSelector((state) => state.birimState)
    const nagivate = useNavigate()
    const dispatch = useDispatch()

    const [yeniParola, setYeniParola] = useState('')
    const [yeniParolaTekrar, setYeniParolaTekrar] = useState('')

    const handleClick = () => {
        if (yeniParola === yeniParolaTekrar) {
            updatePassword(user, yeniParola).then(() => {
                toast.success("Parola Başarılı Bir Şekilde Değiştirildi.")
            }).catch((error) => {
                toast.error("Bir Hata Oluştu. Çıkış Yapıp Tekrar Giriniz.")
            })
        } else {

        }
    }

    const handleCikisYap = () => {
        dispatch(cikisYap())
        nagivate('/')
    }

    const auth = getAuth()
    const user = auth.currentUser

    useEffect(() => {

        const secilenbirimId = localStorage.getItem('secilenBirim')

        if (yonetici) {
            if (yonetici.yetki !== "moderator") {
                nagivate('/login')
            }
        } else {
            nagivate('/login')
        }

        if (!secilenbirimId) {
            nagivate('/login')
        }
        dispatch(birimSec(JSON.parse(secilenbirimId)))

    }, [isSuccess])

    return (
        <div className='moderator'>
            {  /*<div>Moderator</div>
            {secilenBirim && <p>{secilenBirim.ad}</p>}*/}

            <div className='alert alert-secondary' role='alert'>
                <span>{secilenBirim && <strong>{secilenBirim.ad}</strong>} için moderator paneline hoş geldiniz.</span>
                <div className='text-end'>
                    {yonetici && <span className='me-4'>Merhaba {yonetici.email}</span>}
                    <button className='btn btn-danger' onClick={handleCikisYap}>Çıkış</button>
                </div>
            </div>

            <div className='alert alert-primary' role='alert'>
                <h3>Parola Değiştir</h3>
                <div className='mt-3'>
                    <div className='row'>
                        <div className='col-6'>
                            <p>{yonetici.email}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor='parola' className='form-label'>Parolanız</label>
                            <input type='password' className='form-control' id='parola' name='parola' placeholder='Yeni Parolanızı Giriniz'
                                onChange={(e) => setYeniParola(e.target.value)} value={yeniParola} />
                        </div>
                        <div className='col-6'>
                            <label htmlFor='parolaKontrol' className='form-label'>Parola Tekrarı</label>
                            <input type='password' className='form-control' id='parolaKontrol' name='parolaKontrol' placeholder='Yeni Parola Tekrarınız'
                                onChange={(e) => setYeniParolaTekrar(e.target.value)} value={yeniParolaTekrar} />
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='text-center'>
                            <button className='btn btn-outline-primary btn-sum' onClick={handleClick}>Değiştir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}