import { createApi } from '.'

const api = createApi('')

export type FoodRequest = {
    foodId: string
}

export interface Foods {
    id: string,
    brand: string,
    name: string,
    calories: 0,
    total_fat: 0,
    saturated_fat: 0,
    polyunsaturated_fat: 0,
    monounsaturated_fat: 0,
    trans_fat: 0,
    sodium: 0,
    potassium: 0,
    total_carbs: 0,
    dietary_fiber: 0,
    sugars: 0,
    protein: 0,
    vitamin_a: 0,
    vitamin_c: 0,
    calcium: 0,
    iron: 0
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
