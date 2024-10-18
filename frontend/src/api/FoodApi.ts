import { createApi } from '.'

const api = createApi('')

export type FoodRequest = {
    foodId: string
}

export interface Foods {
    id: string | "",
    brand: string | "",
    name: string | "",
    calories: number | 0,
    total_fat: number | 0,
    saturated_fat: number | 0,
    polyunsaturated_fat: number | 0,
    monounsaturated_fat: number | 0,
    trans_fat: number | 0,
    sodium: number | 0,
    potassium: number | 0,
    total_carbs: number | 0,
    dietary_fiber: number | 0,
    sugars: number | 0,
    protein: number | 0,
    vitamin_a: number | 0,
    vitamin_c: number | 0,
    calcium: number | 0,
    iron: number | 0
}


export const FoodApi = {
    foodWithID: async (foodRequest: string) => {
        const response = await api.get<Foods[]>('/foods/' + foodRequest)
        return response.data
    },
    food: async () => {
        const response = await api.get<Foods[]>('/foods')
        return response.data
    },
}
