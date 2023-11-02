import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Kullanici() {

    const nagivate = useNavigate()
    const { kullanici } = useSelector((state) => state.kullaniciState)

    useEffect(()=>{
        if (!kullanici) {
            nagivate('/login')
        } 
    },[kullanici])

    return (
        <div>
            Kullanici
        </div>
    )
}
