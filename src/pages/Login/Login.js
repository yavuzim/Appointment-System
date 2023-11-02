import './Login.css'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { birimSec } from '../../features/birimler/birimSlice'
import { login } from '../../features/yoneticiler/yoneticiSlice'
import { loginGoogle } from '../../features/kullanicilar/kullaniciSlice'

function Login() {

  const nagivate = useNavigate()
  const dispatch = useDispatch()

  const { secilenBirim, isLoading } = useSelector((state) => state.birimState)
  const { yonetici } = useSelector((state) => state.yoneticiState)

  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')

  const handleYoneticiGiris = (e) => {
    e.preventDefault()
    const veri = {
      email, parola
    }
    dispatch(login(veri))
  }

  const handleKullaniciGiris = (e) => {
    e.preventDefault()
    dispatch(loginGoogle())
  }

  useEffect(() => {
    const secilenbirimId = localStorage.getItem('secilenBirim')
    if (!secilenbirimId) {
      nagivate('/')
    }
    dispatch(birimSec(JSON.parse(secilenbirimId)))
  }, [])

  useEffect(() => {
    if (yonetici && secilenBirim) {
      if (yonetici.yetki === "admin") {
        localStorage.setItem('yonetici', JSON.stringify({ uid: yonetici.uid }))
        nagivate('/admin')
      } else if (yonetici.yetki === "moderator") {

        if (yonetici.yetkiliBirimId === secilenBirim.id) {
          localStorage.setItem('yonetici', JSON.stringify({ uid: yonetici.uid }))
          nagivate('/moderator')
        } else {
          console.log("Moderator Yetkisiz Giriş");
        }
      } else {
        console.log("Yetkisiz Giriş!");
      }
    }
  }, [yonetici])

  return (
    <div className='text-center'>
      <form className='form-signin'>
        <div className='alert alert-secondary'>
          <h1 className='h3 mb-2 font-weight-normal'>Randevu Alma Sistemi Girişi</h1>
          {isLoading ? (
            <BarLoader color='#98c98' width={400} />
          ) : (
            secilenBirim && (
              <p className='text-danger'>{secilenBirim.ad}</p>
            )
          )}
          <Link to="/">Anasayfa İçin Tıklayınız</Link>
        </div>
        <h3 className='mb-3'>Kullanıcı Girişi</h3>
        <button className='btn btn-dark' onClick={handleKullaniciGiris}>Google İle Giriş Yap</button>
        <p className='mt-5 mb-3 text-muted'>Randevu Almak İçin <FcGoogle size={'2em'} />Hesabınız İle Giriş Yapınız</p>
        <hr />
        <h3 className='mb-5'>Yönetici Girişi</h3>
        <br />
        <input type='email' id="email" name="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-Mail Adresinizi Giriniz...' />
        <br />
        <input type='password' id="password" name="password" className='form-control' value={parola} onChange={(e) => setParola(e.target.value)} placeholder='Şifrenizi Giriniz...' />
        <br />
        <button className='btn btn-outline-primary mr-5' onClick={handleYoneticiGiris}>Yönetici Giriş Yap</button>
      </form>
    </div>
  )
}

export default Login