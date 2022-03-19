import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
function PrivateRoute() {
    const { loggedIn, check }
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
