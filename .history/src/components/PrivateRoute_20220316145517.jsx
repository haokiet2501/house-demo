import { Navigate, Outlet } from 'react-router-dom'
import 
function PrivateRoute() {
    const loggedIn = false
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
