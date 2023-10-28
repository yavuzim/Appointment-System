import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cikisYap } from "../../features/yoneticiler/yoneticiSlice"
import './Admin.css'

function Admin() {
    const { yonetici, isSuccess } = useSelector((state) => state.yoneticiState)
    const nagivate = useNavigate()

    const dispatch = useDispatch()

    const handleCikis=()=>{
        dispatch(cikisYap())
        nagivate('/')
    }

    useEffect(() => {
        if (yonetici) {
            if (yonetici.yetki != "admin") {
                nagivate('/login')
            }
        } else {
            nagivate('/login')
        }
    }, [isSuccess])
    return (
        <div className="admin">
            <div className="alert alert-secondary" role="alert">
                <span>Admin Paneline Hoş Geldiniz</span>
                <div className="text-end">
                    {yonetici && <span className="me-4">Merhaba {yonetici.email}</span>}
                    <button className="btn btn-danger" onClick={handleCikis}>Çıkış Yap</button>
                </div>
            </div>
            <div className="alert alert-primary" role="alert">
                <h3>Yeni Moderatör Ekle</h3>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="email" className="form-label">Email Adresi : </label>
                            <input type="email" className="form-control" id="email" name="email"
                                placeholder="Yeni Eklenecek Moderatör Email Adresi" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="parola" className="form-label">Parolası : </label>
                            <input type="password" className="form-control" id="email" name="email"
                                placeholder="Yeni Eklenecek Moderatör Parolası" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="text-center">
                            <button className="btn btn-outline-primary btn-sm">EKLE</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-dark" role="alert">
                <h4>Birime Moderatör Yetkilisi Ata</h4>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-6">
                            <select className="form-select" aria-label="Default select example">
                                <option>Birim seçiniz</option>
                                <option value="1">Birim 1</option>
                                <option value="2">Birim 2</option>
                                <option value="3">Birim 3</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <select className="form-select" aria-label="Default select example">
                                <option>Moderatör seçiniz</option>
                                <option value="1">Moderatör 1</option>
                                <option value="2">Moderatör 2</option>
                                <option value="3">Moderatör 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="text-center">
                            <button className="btn btn-outline-dark btn-sm">YETKİLİ ATA</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
