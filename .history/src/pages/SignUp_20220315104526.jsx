import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>

                <form>
                    <input 
                        type="textt" 
                        className="nameInput" 
                        placeholder='Tên'
                        id='name'
                        value={name}
                        onChange={onChange}
                    />

                    <input 
                        type="email" 
                        className="emailInput" 
                        placeholder='Tài Khoản'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />

                    <div className="passwordInputDiv">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            className='passwordInput'
                            placeholder='Mật Khẩu'
                            id='password'
                            value={password}
                            onChange={onChange}
                        />

                        <img 
                            src={visibilityIcon} 
                            alt="show password" 
                            className='showPassword'
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                    </div>

                    <Link to='/forgot-password'
                        className='forgotPasswordLink'
                    >
                        Quên Mật Khẩu?
                    </Link>

                    <div className="signUpBar">
                        <p className='signUpText'>Đăng Nhập</p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>

                {/* Google Oauth */}

                <Link to='/sign-up' className='registerLink'>
                    Đăng ký
                </Link>
            </div>
        </>
    )
}

export default SignUp
