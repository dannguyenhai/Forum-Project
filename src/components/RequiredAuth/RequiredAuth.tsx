import { Navigate, Outlet } from 'react-router-dom'

export const RequiredAuth = () => {
  const getToken = localStorage.getItem('token')
  return getToken?  (
    <Outlet />
  ) : getToken? (
    <Navigate to="/LivingLab" />
  ) : (
    <Navigate to="/login"  replace={true} />
  )
}
