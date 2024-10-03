import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'


export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
    const { user, isLoaded } = useAuth()
    const location = useLocation()

    if (!user && isLoaded) {
        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                replace
            />
        )
    }

    // we can add this later to force users to verify their email
    // if (!user?.email_verified && isLoaded) {
    //     return <p>verify email</p>
    // }

    return children
}   