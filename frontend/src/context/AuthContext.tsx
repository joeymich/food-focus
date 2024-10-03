import { createContext, useState, useEffect } from 'react'
import { AuthApi } from '@/api/AuthApi'

interface IAuthContext {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    refreshUser: () => Promise<void>
    isLoaded: boolean
    isLoggedIn: boolean
    isEmailVerified: boolean
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => { },
    refreshUser: async () => { },
    isLoaded: false,
    isLoggedIn: false,
    isEmailVerified: false,
})

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, _setUser] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const setUser = (user: any) => {
        _setUser(user)
        if (!user) {
            setIsLoggedIn(false)
            setIsEmailVerified(false)
        } else {
            setIsLoggedIn(true)
            setIsEmailVerified(user.email_verified)
        }
    }

    const refreshUser = async () => {
        try {
            const response = await AuthApi.whoami()
            setUser(response)
        } catch (e: any) {
            setUser(null)
            console.error(e)
        } finally {
            setIsLoaded(true)
        }
    }
    useEffect(() => {
        refreshUser()
    }, [])

    const getLoggedInStatus = () => {
        const storedData = localStorage.getItem('loggedin')
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            return parsedData
        }
        return false
    }
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getLoggedInStatus)
    useEffect(() => {
        localStorage.setItem('loggedin', JSON.stringify(isLoggedIn))
    }, [isLoggedIn])
    const getEmailVerifiedStatus = () => {
        const storedData = localStorage.getItem('emailverified')
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            return parsedData
        }
        return false
    }
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(
        getEmailVerifiedStatus
    )
    useEffect(() => {
        localStorage.setItem('emailverified', JSON.stringify(isEmailVerified))
    }, [isEmailVerified])

    // refetch user on window focus
    // if user leaves page and comes back, we check that they are still logged in
    useEffect(() => {
        const handleFocus = () => {
            refreshUser()
        }

        window.addEventListener('focus', handleFocus)

        return () => {
            window.removeEventListener('focus', handleFocus)
        }
    }, [])

    // refetch user on network reconnect
    useEffect(() => {
        const handleReconnect = () => {
            console.log('Network reconnected, refetching data...')
            refreshUser()
        }

        window.addEventListener('online', handleReconnect)

        return () => {
            window.removeEventListener('online', handleReconnect)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                refreshUser,
                isLoaded,
                isLoggedIn,
                isEmailVerified,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
