import './Kullanici.css'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { kullaniciDoldur, tarihlerGetir } from "../../features/kullanicilar/kullaniciSlice"
import { birimSec } from "../../features/birimler/birimSlice"
import Modal from 'react-modal'

export default function Kullanici() {

    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const { kullanici, randevuSaatler } = useSelector((state) => state.kullaniciState)
    const { secilenBirim } = useSelector((state) => state.birimState)

    const bugun = new Date()
    const formatlanmisTarih = bugun.getDate() + "." + (bugun.getMonth() + 1) + "." + bugun.getFullYear()

    const [modalIsOpan, setModalIsOpen] = useState(false)
    const [secilenSaat, setSecilenSaat] = useState(null)

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

    const handleRandevuAyarla = (veri) => {
        setModalIsOpen(true)
        setSecilenSaat(veri.text)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

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
        dispatch(tarihlerGetir(JSON.parse(secilenBirimId)))
    }, [])

    return (
        <>
            <Modal isOpen={modalIsOpan} style={customStyles} onRequestClose={closeModal}>
                <div>
                    <p><strong>{secilenBirim?.ad}</strong> birimi için</p>
                    <p><strong>{formatlanmisTarih}</strong> tarihi ve <strong>{secilenSaat}</strong> saatine randevu alıyorsunuz</p>
                    <p>Onaylıyor musunuz?</p>
                    <p className='d-flex justify-content-center'>
                        <button className='btn btn-outline-danger btn-sm m-4' onClick={closeModal}>İptal Et</button>
                        <button className='btn btn-outline-success btn-sm m-4' onClick={closeModal}>Kabul Et</button>
                    </p>
                </div>
            </Modal>
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
                                {randevuSaatler?.map(veri => (
                                    <button key={veri.deger} className={`btn btn-outline-dark btn-sm m-4 ${veri.pasifMi === true ? 'disabled' : ''}`}
                                        onClick={() => handleRandevuAyarla(veri)} >{veri.text}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
