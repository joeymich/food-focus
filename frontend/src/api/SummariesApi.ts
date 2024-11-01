import { createApi } from '.'

const api = createApi('')


export interface Summary {
    date: string,
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

export const SummariesApi = {

    getFoodLogAll: async (date?: string) => {
        const response = await api.get<Summary>('/summaries/total', {
            params: {
                date: date
            }})
        return response.data
    },
}
