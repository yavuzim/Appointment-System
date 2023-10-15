import React from 'react'
import './Home.css'
function Home() {
    return (
        <div className='text-center paper'>
            <form className='text-center'>
                <div className='alert alert-primary text-center'>
                    <h1 className='h1 mb-2 font-weight-normal text-center'>RANDEVU SİSTEMİ</h1>
                </div>
                <div className='row'>
                    <div className='col mb-2 mt-4 pr-1'>
                        <p className='btn btn-primary'>Randevu Birimi 1</p>
                    </div>
                    <div className='col mb-2 mt-4 pr-1'>
                        <p className='btn btn-primary'>Randevu Birimi 2</p>
                    </div>
                    <div className='col mb-2 mt-4 pr-1'>
                        <p className='btn btn-primary'>Randevu Birimi 3</p>
                    </div>
                </div>
                <p className='mt-5 mb-3 text-muted'>&copy; Sia Teknoloji 2023</p>
            </form>
        </div>
    )
}

export default Home
