import { createApi } from '.'
import { Foods } from './FoodApi'
import { ServingSize } from './ServingSizeApi'

const api = createApi('')

export type FoodLogRequest = {
    serving_size_id: string,
    serving_count: number,
    date: string,
    meal: string
}

export type FoodLogPatchRequest = {
    serving_count: number,
    date: string,
    meal: string
}

export interface FLServingSize {
    name: string,
    ratio: 0,
    food: Foods
}

export interface FoodLog {
  id: string,
  serving_count: number,
  date: Date,
  meal: string
  serving_size: ServingSize
}

export interface FoodLogAll {
    id: string,
    serving_count: number,
    date: Date,
    meal: string,
    serving_size: FLServingSize
}

export const FoodLogApi = {
    getFoodLogWithID: async (foodLogID: string) => {
        const response = await api.get<FoodLog[]>('/food-logs/' + foodLogID)
        return response.data
    },
    getFoodLogDate: async (date?: string) => {
        const response = await api.get<FoodLogAll[]>('/food-logs', {
            params: {
                date: date
            }
        })
        return response.data
    },
    postFoodLog: async (foodLogRequest: FoodLogRequest) => {
        const response = await api.post('/food-logs', foodLogRequest)
        return response.data
    },
    deleteFoodLog: async (foodLogID: string) => {
        await api.delete('/food-logs/' + foodLogID)
    },
    patchFoodLog: async (foodLogID: string, foodLogPatchRequest: FoodLogPatchRequest) => {
        const response = await api.patch('/food-logs/' + foodLogID, foodLogPatchRequest)
        return response.data
    },
}
