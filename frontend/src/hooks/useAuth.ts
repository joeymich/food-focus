import { useNavigate } from 'react-router-dom'
import { AuthApi } from '@/api/AuthApi'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => {
    const {
        user,
        setUser,
        isLoaded,
        isLoggedIn,
        isEmailVerified,
        refreshUser,
    } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await AuthApi.logout()
            setUser(null)
            navigate('/login')
        } catch (e: any) {
            console.error(e)
        }
    }

    const login = (user: any) => {
        setUser(user)
    }

    return {
        logout,
        user,
        login,
        isLoaded,
        isLoggedIn,
        isEmailVerified,
        refreshUser,
    }
}
