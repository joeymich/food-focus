import { createApi } from ".";
const api = createApi('');

export type GoalsRequest = {
    cal_goal: number,
    protein_goal: number,
    fat_goal: number,
    carb_goal: number,
    goal_start: string,
    goal_end: string | null
}

export interface Goals {
    id: string,    
    cal_goal: number,
    protein_goal: number,
    fat_goal: number,
    carb_goal: number,
    goal_start: string,
    goal_end: string | null
}

export const GoalApi = {
    postGoal: async (goalsRequest: GoalsRequest) => {
        const response = await api.post("/goals", goalsRequest)
        return response.data
    },
    patchGoal: async (goalsRequest: GoalsRequest, goal_id: string) => {
        const response = await api.patch("/goals/" + goal_id, goalsRequest)
        return response.data
    }
    ,
    getGoal: async (date? : string) => {
        const response = await api.get<Goals[]>("/goals",  {
            params: {
                date: date
            }
        })
        return response.data
    }
}