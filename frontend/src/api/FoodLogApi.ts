import { createApi } from '.'
import { Foods } from './FoodApi'

const api = createApi('')

export type FoodLogRequest = {
    serving_size_id: string,
    serving_count: number,
    date: Date,
    meal: string
}

export type FoodLogPatchRequest = {
    serving_count: number,
    date: Date,
    meal: string
}

export interface FLServingSize {
    name: string,
    ratio: 0,
    food: Foods[]
}

export interface FoodLog {
  serving_size_id: string,
  serving_count: number,
  date: Date,
  meal: string
}

export interface FoodLogAll {
    serving_size_id: string,
    serving_count: number,
    date: Date,
    meal: string,
    serving_size: FLServingSize[]
}


export const FoodLogApi = {
    getFoodLogWithID: async (foodLogID: string) => {
        const response = await api.get<FoodLog[]>('/food-logs/' + foodLogID)
        return response.data
    },
    getFoodLogAll: async () => {
        const response = await api.get<FoodLogAll[]>('/food-logs')
        return response.data
    },
    postFoodLog: async (foodLogRequest: FoodLogRequest) => {
        const response = await api.post<FoodLog[]>('/food-logs', foodLogRequest)
        return response.data
    },
    deleteFoodLog: async (foodLogID: string) => {
        const response = await api.delete<FoodLog[]>('/food-logs/' + foodLogID)
        return response.data
    },
    patchFoodLog: async (foodLogID: string, foodLogPatchRequest: FoodLogPatchRequest) => {
        const response = await api.patch<FoodLog[]>('/food-logs/' + foodLogID, foodLogPatchRequest)
        return response.data
    },
}
