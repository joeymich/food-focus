import { cn } from "@/utils"
import { formatNumber } from "@/utils/number"

export type Nutrition = {
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


export const calculateNutrition = (food: Nutrition, servingSizeRatio: number, servingCount: number): Nutrition => {
    return {
        calories: food.calories * servingSizeRatio * servingCount,
        total_fat: food.total_fat * servingSizeRatio * servingCount,
        saturated_fat: food.saturated_fat * servingSizeRatio * servingCount,
        polyunsaturated_fat: food.polyunsaturated_fat * servingSizeRatio * servingCount,
        monounsaturated_fat: food.monounsaturated_fat * servingSizeRatio * servingCount,
        trans_fat: food.trans_fat * servingSizeRatio * servingCount,
        sodium: food.sodium * servingSizeRatio * servingCount,
        potassium: food.potassium * servingSizeRatio * servingCount,
        total_carbs: food.total_carbs * servingSizeRatio * servingCount,
        dietary_fiber: food.dietary_fiber * servingSizeRatio * servingCount,
        sugars: food.sugars * servingSizeRatio * servingCount,
        added_sugars: food.added_sugars !== null ? food.added_sugars * servingSizeRatio * servingCount : null,
        protein: food.protein * servingSizeRatio * servingCount,
        vitamin_a: food.vitamin_a * servingSizeRatio * servingCount,
        vitamin_c: food.vitamin_c * servingSizeRatio * servingCount,
        calcium: food.calcium * servingSizeRatio * servingCount,
        iron: food.iron * servingSizeRatio * servingCount
    }
}


type NutritionRowType = {
    name: string,
    value: number | null,
    unit: string,
    className?: string,
}
const NutritionRow = ({ name, value, unit, className }: NutritionRowType) => {
    return (
        <div
            className={cn('flex items-center justify-between p-1', className)}
        >
            <p>{name}</p>
            <p>{formatNumber(value || 0)}{unit}</p>
        </div>
    )
}

type NutritionLabelProps = {
    food: Nutrition
}
export const NutritionLabel = ({ food }: NutritionLabelProps) => {
    return (
        <>
            <div className='bg-secondary rounded-lg p-4'>
                <NutritionRow name='Calories' value={food.calories} unit='' className='text-2xl font-bold' />
                <hr />
                <NutritionRow name='Total Fat' value={food.total_fat} unit='g' className='font-semibold' />
                <NutritionRow name='Saturated Fat' value={food.saturated_fat} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Polyunsaturated Fat' value={food.polyunsaturated_fat} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Monounsaturated Fat' value={food.monounsaturated_fat} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Trans Fat' value={food.trans_fat} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Cholesterol' value={food.total_fat} unit='mg' className='font-semibold' />
                <NutritionRow name='Potassium' value={food.potassium} unit='mg' className='font-semibold' />
                <NutritionRow name='Total Carbs' value={food.total_carbs} unit='g' className='font-semibold' />
                <NutritionRow name='Dietary Fiber' value={food.dietary_fiber} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Sugars' value={food.sugars} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Added Sugars' value={food.added_sugars} unit='g' className='pl-8 text-sm' />
                <NutritionRow name='Protein' value={food.protein} unit='g' className='font-semibold' />
                <hr />
                <NutritionRow name='Vitamin A' value={food.vitamin_a} unit='μg' className='font-semibold' />
                <NutritionRow name='Vitamin C' value={food.vitamin_c} unit='mg' className='font-semibold' />
                <NutritionRow name='Calcium' value={food.calcium} unit='mg' className='font-semibold' />
                <NutritionRow name='Iron' value={food.iron} unit='mg' className='font-semibold' />
            </div>
        </>
    )
}