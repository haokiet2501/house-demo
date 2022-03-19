import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

function Profile() {
    const auth = getAuth()
    const [formData, setFormData] = useState(null)


    useEffect(() => {
        setUser(auth.currentUser)
    }, [])
    return user ? <h1>{user.displayName}</h1> : 'Not Logged Instead'
}

export default Profile
