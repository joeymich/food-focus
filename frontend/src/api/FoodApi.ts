import { createApi } from '.'
import { ServingSize } from './ServingSizeApi'

const api = createApi('foods')

export type FoodRequest = {
    foodId: string
}

export interface Foods {
    id: string,
    brand: string,
    name: string,
    calories: number,
    total_fat: number,
    saturated_fat: number,
    polyunsaturated_fat: number,
    monounsaturated_fat: number,
    trans_fat: number,
    sodium: number,
    potassium: number,
    total_carbs: number,
    dietary_fiber: number,
    sugars: number,
    added_sugars: number | null,
    protein: number,
    vitamin_a: number,
    vitamin_c: number,
    calcium: number,
    iron: number 
}


export const FoodApi = {
    foodWithID: async (foodRequest: string) => {
        const response = await api.get<Foods[]>('/' + foodRequest)
        return response.data
    },
    getAll: async (query: string | null = null, limit: number | null = null, page: number | null = null) => {
        const response = await api.get<Foods[]>('', {
            params: {
                q: query,
                limit: limit,
                page: page,
            }
        })
        return response.data
    },
    getServingSizes: async (food_id: string) => {
        const response = await api.get<ServingSize[]>(`/serving-sizes/${food_id}`)
        return response.data
    }
}
