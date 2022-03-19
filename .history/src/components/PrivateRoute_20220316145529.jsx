import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../'
function PrivateRoute() {
    const loggedIn = false
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
