import './Login.css'
import { FcGoogle } from 'react-icons/fc'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BarLoader from 'react-spinners/BarLoader'
import { birimSec } from '../../features/birimler/birimSlice'

function Login() {

  const nagivate = useNavigate()
  const dispatch = useDispatch()

  const { secilenBirim, isLoading } = useSelector((state) => state.birimState)

  useEffect(() => {
    const secilenbirimId = localStorage.getItem('secilenBirim')
    if (!secilenbirimId) {
      nagivate('/')
    }
    dispatch(birimSec(JSON.parse(secilenbirimId)))
  }, [])

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
        <button className='btn btn-dark'>Google İle Giriş Yap</button>
        <p className='mt-5 mb-3 text-muted'>Randevu Almak İçin <FcGoogle size={'2em'} />Hesabınız İle Giriş Yapınız</p>
        <hr />
        <h3 className='mb-5'>Yönetici Girişi</h3>
        <br />
        <input type='email' id="email" name="email" className='form-control' placeholder='E-Mail Adresinizi Giriniz...' />
        <br />
        <input type='password' id="password" name="password" className='form-control' placeholder='Şifrenizi Giriniz...' />
        <br />
        <button className='btn btn-outline-primary mr-5'>Yönetici Giriş Yap</button>
      </form>
    </div>
  )
}

export default Login
