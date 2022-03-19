import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const loggedIn = false
    return loggedIn ? <Outlet /> : <Navigate to={} />
}

export default PrivateRoute
