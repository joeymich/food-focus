import axios from 'axios'

let BASE_URL = ''
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:8000'
} else {
    BASE_URL = 'http://localhost:8000'
}

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export const createApi = (apiUrl: string) => {
    return axios.create({
        ...api.defaults,
        baseURL: api.defaults.baseURL + '/' + apiUrl,
    })
}
