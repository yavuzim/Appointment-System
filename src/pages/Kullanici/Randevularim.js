import "./Randevularim.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { birimSec } from "../../features/birimler/birimSlice"
import { kullaniciDoldur, randevularGetir } from "../../features/kullanicilar/kullaniciSlice"
import { motion } from 'framer-motion'


function Randevularim() {
    const nagivate = useNavigate()
    const dispatch = useDispatch()

    const { kullanici, kisiRandevular } = useSelector((state) => state.kullaniciState)
    const { secilenBirim } = useSelector((state) => state.birimState)

    useEffect(() => {
        const secilenBirimId = localStorage.getItem('secilenBirim')
        const kullanici = localStorage.getItem('kullanici')


        if (!secilenBirimId) {
            nagivate('/')
        }
        if (!kullanici) {
            nagivate('/login')
        }

        dispatch(birimSec(JSON.parse(secilenBirimId)))
        dispatch(kullaniciDoldur())
        dispatch(randevularGetir(JSON.parse(kullanici).email))

    }, [])

    useEffect(() => {
        const kullanici = localStorage.getItem('kullanici')

        if (!kisiRandevular) {
            dispatch(randevularGetir(JSON.parse(kullanici).email))
        }
    }, [])

    const handleYonlen = () => { nagivate('/kullanici') }

    return (
        <div className="randevu">
            <motion.div className='alert alert-secondary' role='alert' initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
                {kullanici && <p>Merhaba, <strong>{kullanici.email}</strong></p>}
                <button className="btn btn-primary" onClick={handleYonlen}> {secilenBirim && <p><strong>{secilenBirim.ad}</strong> için randevu alınız.</p>}</button>
            </motion.div>
            <div className="alert alert-light" role="alert">
                <h3>Randevularınız</h3>
                <div className="mt-3">
                    <div className="row mt-4">
                        {kisiRandevular && kisiRandevular.map(veri => (
                            <div className="col-4 container" key={veri.id}>
                                <div className={`alert alert-${veri.durumRenk}`} role="alert">
                                    <p>{veri.birimAd}</p>
                                    <p>{veri.tarih} - {veri.saat}</p>
                                    <p>Durum : {veri.durum}</p>
                                    {veri.mesaj =='' ? <p></p> : <p>Mesaj : {veri.mesaj}</p>}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Randevularim
