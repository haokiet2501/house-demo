import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import {  }
function Profile() {
    const auth = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const navigate = useNavigate()

    const onLogout = () => {
        auth.signOut()
    }

    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className="pageHeader">
                    Hồ Sơ Cá Nhân
                </p>
                <button 
                    type='button' 
                    className="logOut" 
                    onClick={onLogout}
                >
                    Đăng xuất
                </button>
            </header>
        </div>
    )
}

export default Profile
