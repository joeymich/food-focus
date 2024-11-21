import { FoodApi, Foods } from '@/api/FoodApi'
import { Input } from '@/components/ui/form/input'
import { Button, buttonVariants } from '@/components/ui/button'
import React, { useEffect, useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toNormalCase } from '@/utils/string'
import { ServingSize } from '@/api/ServingSizeApi'
import { FoodLogApi } from '@/api/FoodLogApi'
import { useParams } from 'react-router-dom'
import { calculateNutrition, NutritionLabel } from './nutrition-label'
import { Link } from 'react-router-dom'
import { cn } from '@/utils'
import dayjs from 'dayjs'

type MealSelectProps = {
    mealType: string,
    setMealType: React.Dispatch<React.SetStateAction<string>>,
}
const MealSelect = ({ mealType, setMealType }: MealSelectProps) => {
    return (
        <Select value={mealType} onValueChange={(value) => setMealType(value)}>
            <SelectTrigger className="w-44 bg-secondary">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='BREAKFAST'>Breakfast</SelectItem>
                <SelectItem value='LUNCH'>Lunch</SelectItem>
                <SelectItem value='DINNER'>Dinner</SelectItem>
                <SelectItem value='SNACKS'>Snack</SelectItem>
            </SelectContent>
        </Select>
    )
}

type ServingSizeSelectProps = {
    servingSizes: ServingSize[],
    servingSizeId: string,
    setServingSizeId: React.Dispatch<React.SetStateAction<string>>,
}
const ServingSizeSelect = ({ servingSizes, servingSizeId, setServingSizeId }: ServingSizeSelectProps) => {
    return (
        <Select value={servingSizeId} onValueChange={(value) => setServingSizeId(value)}>
            <SelectTrigger className='w-44 bg-secondary'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {servingSizes.map((servingSize) => (
                    <SelectItem
                        key={servingSize.id}
                        value={servingSize.id}
                    >
                        {servingSize.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

type ServingCountInputProps = {
    servingCount: number,
    setServingCount: React.Dispatch<React.SetStateAction<number>>,
}
const ServingCountInput = ({ servingCount, setServingCount }: ServingCountInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setServingCount(Number(e.target.value))
    }
    return (
        <Input
            className='bg-secondary w-full max-w-44'
            type="number"
            min={0}
            step='any'
            value={servingCount}
            onChange={handleChange}
        />
    )
}

type AddFoodDialogContentProps = {
    food: Foods,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    date: string
}
const AddFoodDialogContent = ({ food, setIsOpen, date }: AddFoodDialogContentProps) => {
    const [mealType, setMealType] = useState<string>('BREAKFAST')
    const [servingSizeId, setServingSizeId] = useState<string>('');
    const [servingCount, setServingCount] = useState<number>(1);
    const [servingSizes, setServingSizes] = useState<ServingSize[]>([])
    const formattedDate = date;//new Date().toISOString().split('T')[0];
    const getServingSizes = async () => {
        try {
            const servingSizes = await FoodApi.getServingSizes(food.id)
            if (servingSizes) {
                setServingSizeId(servingSizes[0].id)
            }
            setServingSizes(servingSizes)
        } catch (e: any) {
            console.error(e)
        }
    }
    useEffect(() => {
        getServingSizes()
    }, [])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const disabled = !mealType || !servingSizeId || !servingCount || isLoading;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await FoodLogApi.postFoodLog({
                serving_size_id: servingSizeId,
                serving_count: servingCount,
                date: formattedDate,
                meal: mealType,
            })
            setIsOpen(false)
        } catch (e: any) {
            console.error(e)
        }
        setIsLoading(false)
    }
    const servingSize = servingSizes.find(servingSize => servingSize.id === servingSizeId)
    const servingSizeRatio = servingSize ? servingSize.ratio : 1
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add {toNormalCase(food.name)}
                </DialogTitle>
                <DialogDescription>
                    {food.brand}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-y-4'>
                    <div className="flex space-x-8 items-center justify-between">
                        <p>Meal</p>
                        <MealSelect mealType={mealType} setMealType={setMealType} />
                    </div>
                    <div className='flex space-x-8 items-center justify-between'>
                        <p>Serving Size</p>
                        <ServingSizeSelect servingSizes={servingSizes} servingSizeId={servingSizeId} setServingSizeId={setServingSizeId} />
                    </div>
                    <div className='flex space-x-8 items-center justify-between'>
                        <p>Servings</p>
                        <ServingCountInput servingCount={servingCount} setServingCount={setServingCount} />
                    </div>
                    <NutritionLabel food={calculateNutrition(food, servingSizeRatio, servingCount)} />
                    <Button variant='default' type='submit' isLoading={isLoading} disabled={disabled}>Add to Diary</Button>
                </div>
            </form>
        </DialogContent>
    )

}


const FoodRow = ({ food }: { food: Foods }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {date} = useParams();
    useEffect(() => {
        console.log(date);
    })
    return (
        <div className='border rounded-lg p-4 flex items-center justify-between'>
            <div>
                <p className='font-semibold'>{toNormalCase(food.name)}</p>
                <p>{food.brand}</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant='default'>Add Food</Button>
                </DialogTrigger>
                {isOpen &&
                    <AddFoodDialogContent food={food} setIsOpen={setIsOpen} date={date ?? dayjs().format('YYYY-MM-DD')} />
                }
            </Dialog>
        </div>
    )
}

export const Search = () => {
    const [query, setQuery] = useState<string>('')
    const [foods, setFoods] = useState<Foods[]>([]);
    const [page, setPage] = useState<number>(1)
    const limit = 10
    const [isLoading, ] = useState<boolean>(false)
    const {date} = useParams();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1)
        setQuery(e.target.value)
    }
    const getFoods = async () => {
        try {
            const foods = await FoodApi.getAll(query, limit, page)
            setFoods((prevFoods => page === 1 ? foods : [...prevFoods, ...foods]))
        } catch (e: any) {
            console.error(e)
        }
    }
    const handleClick = async () => {
        setPage((prevPage) => prevPage + 1)
    }
    useEffect(() => {
        getFoods()
    }, [query, page])
    return (
        <div className='p-8 w-full max-w-5xl mx-auto gap-y-8 flex flex-col'>
            <div className='text-left'>
                <h1 className='text-2xl font-semibold'>Search</h1>
                <Link
                    to={'/dashboard/' + date}
                    className={cn(buttonVariants({ variant: 'link' }), 'w-fit px-0')}
                >
                    Back to Dashboard
                </Link>
            </div>
            <div className='flex items-center gap-x-8'>
                <Input
                    type='text'
                    value={query}
                    className='max-w-xs'
                    onChange={handleChange}
                />
                <Button>Search</Button>
            </div>
            <div className='flex flex-col gap-y-2'>
                {foods.map((food) => (
                    <FoodRow key={food.id + food.name} food={food} />
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <Button isLoading={isLoading} onClick={handleClick}>Load More</Button>
            </div>
        </div>
    )
}