import { createApi } from '.'

const api = createApi('auth')

export type RegisterRequest = {
    email: string
    password: string
}

export type LoginRequest = {
    email: string
    password: string
}

export const AuthApi = {
    register: async (registerRequest: RegisterRequest) => {
        const response = await api.post('/register', registerRequest)
        return response.data
    },
    login: async (loginRequest: LoginRequest) => {
        const response = await api.post('/login', loginRequest)
        return response.data
    },
    logout: async () => {
        const response = await api.delete('/logout')
        return response.data
    },
    whoami: async () => {
        const response = await api.get('/whoami')
        return response.data
    },
}
