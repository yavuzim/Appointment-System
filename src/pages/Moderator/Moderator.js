import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { birimSec } from "../../features/birimler/birimSlice"

export default function Moderator() {

    const { yonetici, isSuccess } = useSelector((state) => state.yoneticiState)
    const { secilenBirim, isLoading } = useSelector((state) => state.birimState)
    const nagivate = useNavigate()
    const dispatch = useDispatch()

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

    }, [isSuccess])

    return (
        <>
            <div>
                Moderator
            </div>
            {secilenBirim && <p>{secilenBirim.ad}</p>}
        </>
    )
}
