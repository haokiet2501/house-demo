import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'

function Profile() {
    const auth = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className="pageHeader">
                    Hồ Sơ Cá Nhân
                </p>
                button:
            </header>
        </div>
    )
}

export default Profile
