import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from ''
import { toast } from 'react-toastify'

function Contact() {
    return (
        <div>
            Liên hệ
        </div>
    )
}

export default Contact
