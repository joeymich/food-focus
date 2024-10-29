import { createApi } from '.'

const api = createApi('')

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
    protein: number,
    vitamin_a: number,
    vitamin_c: number,
    calcium: number,
    iron: number 
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
