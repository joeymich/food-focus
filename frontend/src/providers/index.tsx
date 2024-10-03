import { AuthProvider } from '@/context/AuthContext'

interface AppProviderProps {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <AuthProvider>
            <>{children}</>
        </AuthProvider>
    )
}
