import { Navigate, Outlet } from 'react-router-dom'
type Props = {
  allowRoles?: Array<string | undefined>
}
export const RequiredAuth = ({ allowRoles = [] }: Props) => {
  const getToken = localStorage.getItem('token')
  return getToken?  (
    <Outlet />
  ) : getToken? (
    <Navigate to="/LivingLab" />
  ) : (
    <Navigate to="/login"  replace={true} />
  )
}
