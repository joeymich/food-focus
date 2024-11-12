import { SummariesApi, Summary } from "@/api/SummariesApi"
import { useEffect, useState } from "react"
import { Nutrition, NutritionLabel } from "../nutrition-label"
import { CircularProgressBar } from "../ui/circular-pogress-bar"
import { Button, buttonVariants } from '@/components/ui/button'
import { MacronutrientProgressBar } from "../ui/macronutirents-progressbar"
import {FoodLogAll, FoodLogApi } from "@/api/FoodLogApi"
import { formatNumber } from "@/utils/number"
import { BiChevronDown } from "react-icons/bi"
import { cn } from "@/utils"
import { toNormalCase } from "@/utils/string"
import { TbPencil } from 'react-icons/tb'
import { Link } from "react-router-dom"
import { DatePicker, DatePickerProps } from "antd"
import dayjs from "dayjs"
import { useParams } from "react-router-dom"

const dateFormat = 'MM-DD-YYYY';
const dateDBFormat = 'YYYY-MM-DD';

const DailyNutrition = ({ summary }: { summary: Summary }) => {
    return (
        <NutritionLabel food={summary as Nutrition} />
    )
}

const DailyStats = ({ summary }: { summary: Summary }) => {
    return (
        <>
            <div className='flex justify-center w-full'>
                <div className='max-w-sm'>
                    <CircularProgressBar numerator={summary.calories} denominator={2500} />
                </div>
            </div>
            <MacronutrientProgressBar carb={300} fat={80} protein={200} />
            <Link to="/create-goals" className="w-full"><Button className="w-full">Adjust Goals</Button></Link>
        </>
    )
}

const formatFoodName = (foodName: string): string => {
    foodName = toNormalCase(foodName);
    if (foodName.length > 60) {
        return foodName.slice(0, 59) + '...'
    }
    return foodName
}

type NutritionRowProps = {
    entry: FoodLogAll
}
const NutritionRow = ({ entry }: NutritionRowProps) => {
    const multiplier = entry.serving_count * entry.serving_size.ratio;
    const protein = (entry.serving_size.food.protein || 0) * multiplier;
    const carbs = (entry.serving_size.food.total_carbs || 0) * multiplier;
    const fat = (entry.serving_size.food.total_fat || 0) * multiplier;
    const calories = (entry.serving_size.food.calories || 0) * multiplier;
    return (
        <tr className='border-b text-sm group'>
            <td className='p-2 text-nowrap overflow-hidden'>{formatFoodName(entry.serving_size.food.name)}</td>
            <MacroCell value={protein} />
            <MacroCell value={carbs} />
            <MacroCell value={fat} />
            <CalorieCell value={calories} />
            <td>
                <Button
                    variant='ghost'
                    icon={<TbPencil className='size-4' />}
                    className='p-1 hidden group-hover:block'
                />
            </td>
        </tr>
    )
}

const DiaryHeaderCell = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    return (
        <th className={cn('p-2', className)}>{children}</th>
    )
}

const DiaryHeader = () => {
    return (
        <thead className='text-left'>
            <DiaryHeaderCell className='w-full'></DiaryHeaderCell>
            <DiaryHeaderCell className='text-right'>Protein</DiaryHeaderCell>
            <DiaryHeaderCell className='text-right'>Carbs</DiaryHeaderCell>
            <DiaryHeaderCell className='text-right'>Fat</DiaryHeaderCell>
            <DiaryHeaderCell className='text-right'>Calories</DiaryHeaderCell>
            <th></th>
        </thead>
    )
}

interface MealNutrition {
    protein: number;
    carb: number;
    fat: number;
    calories: number;
}

const MealRows = ({ foods, name }: { foods: FoodLogAll[], name: string }) => {
    const [show, setShow] = useState<boolean>(true)
    const handleClick = () => {
        setShow(prevShow => !prevShow)
    }
    const totals = foods.reduce<MealNutrition>(
        (acc, entry) => {
            const multiplier = entry.serving_count * entry.serving_size.ratio;

            acc.protein += (entry.serving_size.food.protein || 0) * multiplier;
            acc.carb += (entry.serving_size.food.total_carbs || 0) * multiplier;
            acc.fat += (entry.serving_size.food.total_fat || 0) * multiplier;
            acc.calories += (entry.serving_size.food.calories || 0) * multiplier;

            return acc;
        },
        { protein: 0, carb: 0, fat: 0, calories: 0 }
    )
    return (
        <>
            <tr className='font-semibold border-b hover:cursor-pointer' onClick={handleClick}>
                <td className='p-2'>{name}</td>
                <td className='p-2 text-right'>{formatNumber(totals.protein)}g</td>
                <td className='p-2 text-right'>{formatNumber(totals.carb)}g</td>
                <td className='p-2 text-right'>{formatNumber(totals.fat)}g</td>
                <td className='p-2 text-right'>{formatNumber(totals.calories)}</td>
                <td>
                    <div className='p-1'>
                        <BiChevronDown className={`${!show && 'rotate-180'} size-4`} />
                    </div>
                </td>
            </tr>
            {show &&
                foods.map((food) => (
                    <NutritionRow entry={food} key={food.id} />
                ))
            }
        </>
    )
}

const MacroCell = ({ value }: { value: number }) => {
    return (
        <td className='p-2 text-right'>
            {formatNumber(value)}g
        </td>
    )
}

const CalorieCell = ({ value }: { value: number }) => {
    return (
        <td className='p-2 text-right'>
            {formatNumber(value)}
        </td>
    )
}

const Diary = ({ summary, foods }: { summary: Summary, foods: FoodLogAll[] }) => {
    const totals = foods.reduce<MealNutrition>(
        (acc, entry) => {
            const multiplier = entry.serving_count * entry.serving_size.ratio;

            acc.protein += (entry.serving_size.food.protein || 0) * multiplier;
            acc.carb += (entry.serving_size.food.total_carbs || 0) * multiplier;
            acc.fat += (entry.serving_size.food.total_fat || 0) * multiplier;
            acc.calories += (entry.serving_size.food.calories || 0) * multiplier;

            return acc;
        },
        { protein: 0, carb: 0, fat: 0, calories: 0 }
    )
    return (
        <>
            <table className='w-full rounded-b-lg overflow-hidden'>
                <DiaryHeader />
                <tbody>
                    <MealRows
                        foods={foods.filter(food => food.meal === 'BREAKFAST')}
                        name='Breakfast'
                    />
                    <MealRows
                        foods={foods.filter(food => food.meal === 'LUNCH')}
                        name='Lunch'
                    />
                    <MealRows
                        foods={foods.filter(food => food.meal === 'DINNER')}
                        name='Dinner'
                    />
                    <MealRows
                        foods={foods.filter(food => food.meal === 'SNACKS')}
                        name='Snacks'
                    />
                </tbody>
                <tfoot className='font-semibold bg-secondary'>
                    <td className='p-2'>Total</td>
                    <MacroCell value={totals.protein} />
                    <MacroCell value={totals.carb} />
                    <MacroCell value={totals.fat} />
                    <CalorieCell value={totals.calories} />
                    <td></td>
                </tfoot>
            </table>
        </>
    )
}

export const Dashboard2 = () => {
    const [summary, setSummary] = useState<Summary>()
    const [foods, setFoods] = useState<FoodLogAll[]>([])
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [dateChanged, setDateChanged] = useState(false);
    const {chosenDate} = useParams();
    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        //Code for the date picker refrenced from https://ant.design/components/date-picker
        if (date != null) {
            setDate(date)
        }
    };
    const getSummary = async (date?: string) => {
        try {
            const summary = await SummariesApi.getFoodLogAll(date)
            setSummary(summary)
        } catch (e: any) {
            console.error(e)
        }
    }
    const getFoods = async (date?: string) => {
        try {
            const foods = await FoodLogApi.getFoodLogDate(date)
            setFoods(foods)
        } catch (e: any) {
            console.error(e)
        }
    }
    useEffect(() => {
        if(chosenDate != undefined && dateChanged == false) {
            getSummary(chosenDate)
            getFoods(chosenDate)
            setDate(dayjs(chosenDate))
            setDateChanged(true)
        } else {
            getSummary(date.format(dateDBFormat))
            getFoods(date.format(dateDBFormat))
        }
        
    }, [date])

    return (
        <>
            <div className='p-4 max-w-7xl mx-auto gap-y-4 flex flex-col'>
                <div className='flex space-x-4 items-center'>
                    <p className="font-bold text-xl">Select Date:</p>
                    {(chosenDate != undefined) ? (
                        <DatePicker
                            format="MM-DD-YYYY"
                            defaultValue={dayjs(dayjs(chosenDate).format(dateFormat), dateFormat)}
                            minDate={dayjs('02-03-2002', dateFormat)}
                            maxDate={dayjs(dayjs(), dateFormat)}
                            onChange={handleDateChange}
                        />
                    ): (
                        <DatePicker
                            format="MM-DD-YYYY"
                            defaultValue={dayjs(date, dateFormat)}
                            minDate={dayjs('02-03-2002', dateFormat)}
                            maxDate={dayjs(dayjs(), dateFormat)}
                            onChange={handleDateChange}
                         />
                     )}
                </div>
                <div className='flex gap-x-4 justify-between'>
                    <div className='flex flex-col gap-y-4 rounded-lg p-8 border flex-1'>
                        <h3 className='text-2xl font-semibold'>Daily Nutrition</h3>
                        {summary &&
                            <DailyNutrition summary={summary} />
                        }
                    </div>
                    <div className='flex flex-col gap-y-4 rounded-lg p-8 border flex-1'>
                        <h3 className='text-2xl font-semibold'>Daily Stats</h3>
                        {summary &&
                            <DailyStats summary={summary} />
                        }
                    </div>
                </div>
                <div className='p-4 rounded-lg border'>
                    <div className='flex justify-between'>
                        <h3 className='text-2xl font-semibold'>Food Diary</h3>
                        <Link to={'/dashboard/search/' + date.format(dateDBFormat)}
                            className={buttonVariants({ variant: 'default' })}
                        >
                            Add Food
                        </Link>
                    </div>
                    {summary &&
                        <Diary summary={summary} foods={foods} />
                    }
                </div>
            </div>
        </>
    )
}