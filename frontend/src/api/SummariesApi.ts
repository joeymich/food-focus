import { createApi } from '.'

const api = createApi('')


export interface FoodLogAll {
    date: Date,
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


export const FoodLogApi = {

    getFoodLogAll: async () => {
        const response = await api.get<FoodLogAll[]>('/summaries/total')
        return response.data
    },
}
