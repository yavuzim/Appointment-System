import React from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { birimlerGetir } from '../../features/birimler/birimSlice'

export default function Home() {

    const dispatch = useDispatch()

    const { birimler } = useSelector((state) => state.birimState)

    useEffect(() => {
        dispatch(birimlerGetir())
    }, [])

    return (
        <div className='text-center paper'>
            <form className='text-center'>
                <div className='alert alert-primary text-center'>
                    <h1 className='h1 mb-2 font-weight-normal text-center'>RANDEVU SİSTEMİ</h1>
                </div>
                {birimler.length > 0 ? (
                    <div className='row'>
                        {birimler.map(birim => (
                            <div className='col mb-2 mt-4 pr-1' key={birim.id}>
                                <p className='btn btn-primary'>{birim.ad}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='row'>
                        <div className='col mb-2 mt-4 pr-1'>
                            <p className='alert alert-secondary text-center'>Henüz Birim Eklenmedi</p>
                        </div>
                    </div>
                )}
                <p className='mt-5 mb-3 text-muted'>&copy; Sia Teknoloji 2023</p>
            </form>
        </div>
    )
}

