import { useEffect } from "react"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"

function Admin() {
    const { yonetici, isSuccess } = useSelector((state) => state.yoneticiState)
    const nagivate = useNavigate()

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
        <div>
            admin
        </div>
    )
}

export default Admin
