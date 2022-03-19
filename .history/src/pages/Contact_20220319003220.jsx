import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
    const [message, setMessage] = useState()

    return (
        <div>
            Liên hệ
        </div>
    )
}

export default Contact
