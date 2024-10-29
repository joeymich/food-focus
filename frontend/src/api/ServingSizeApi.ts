import { createApi } from '.'

const api = createApi('')

export interface ServingSize {
    id: string | "",
    food_id: string | "",
    name: string | "",
    ratio: number | 0
}


export const ServingSizeApi = {
    getServingSizeWithID: async (servingID: string) => {
        const response = await api.get<ServingSize[]>('/serving-sizes/' + servingID)
        return response.data
    },
    getServingSizeAll: async () => {
        const response = await api.get<ServingSize[]>('/serving-sizes')
        return response.data
    },
}
