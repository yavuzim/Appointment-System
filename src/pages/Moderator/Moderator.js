import './Moderator.css'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { birimSec } from "../../features/birimler/birimSlice"
import { cikisYap, durumGuncelle, son10birimRandevularGetir } from '../../features/yoneticiler/yoneticiSlice'

import { getAuth, updatePassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'

export default function Moderator() {

    const { yonetici, isSuccess, randvular } = useSelector((state) => state.yoneticiState)
    const { secilenBirim, isLoading } = useSelector((state) => state.birimState)
    const nagivate = useNavigate()
    const dispatch = useDispatch()

    const [yeniParola, setYeniParola] = useState('')
    const [yeniParolaTekrar, setYeniParolaTekrar] = useState('')

    const [modalIsOpan, setModalIsOpen] = useState(false)
    const [secilenRandevu, setSecilenRandevu] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#bde0fe'
        },
    };
    Modal.setAppElement('#root');

    const handleRandevuDuzenle = (randevu) => {
        setModalIsOpen(true)
        setSecilenRandevu(randevu)
        console.log(secilenRandevu);
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

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

    const randevuDurumDegistir = (randevuId, durum) => {
        const veri = {
            belgeId: randevuId,
            durum: durum,
            durumRenk: durum == "Kabul Edildi" ? "success" : "danger"
        }
        dispatch(durumGuncelle(veri))
        setModalIsOpen(false)
        toast.success("Randevu Durum Değiştirildi")
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
        dispatch(son10birimRandevularGetir(JSON.parse(secilenbirimId)))

    }, [isSuccess])

    return (
        <>
            <Modal isOpen={modalIsOpan} style={customStyles} onRequestClose={closeModal}>
                <div>
                    <p><strong>{secilenRandevu?.email}</strong> email adresine sahip kişi için.</p>
                    <p><strong>{secilenRandevu?.tarih}</strong> tarihi ve <strong>{secilenRandevu?.saatText}</strong></p>
                    <p>
                        Kabul Edebilir ya da İptal Edebilirsiniz
                    </p>
                    <p className='d-flex justify-content-center'>
                        <button className='btn btn-outline-danger btn-sm m-4'
                            onClick={() => randevuDurumDegistir(secilenRandevu?.belgeId, "Reddedildi")}>İptal Et</button>
                        <button className='btn btn-outline-success btn-sm m-4'
                            onClick={() => randevuDurumDegistir(secilenRandevu?.belgeId, "Kabul Edildi")}>Kabul Et</button>
                    </p>
                </div>
            </Modal>
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
                                <p>{yonetici?.email}</p>
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
                <div className='alert alert-secondary' role='alert'>
                    <h5>Bekleyen Randevular</h5>
                    <div className='mt-3'>
                        <div className='row mt-4'>
                            <ul className='list-group'>
                                {randvular && randvular.map(randevu => (
                                    <li className='list-group-item d-flex justify-content-between align-item-center' key={randevu.belgeId}
                                        onClick={() => handleRandevuDuzenle(randevu)}>
                                        {randevu.email}
                                        <span className='badge bg-primary rounded-pill'>
                                            {randevu.tarih} - {randevu.saatText}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}