import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/form/input'
import { FoodApi } from '@/api/FoodApi'

export const AddMealButton = () => {
    const [query, setQuery] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const [foods, setFoods] = useState<any[]>([])
    const getFoods = async () => {
        if (query.length === 0) {
            setFoods([])
            return
        }
        try {
            const foods = await FoodApi.getAll(query);
            console.log(foods)
            setFoods(foods)
        } catch (e: any) {
            console.error(e)
        }
    }
    useEffect(() => {
        getFoods()
    }, [query])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getFoods()
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='default'>Add meal</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Add a Meal</DialogTitle>
                        <DialogDescription>description</DialogDescription>
                    </DialogHeader>
                    <p>content here</p>
                    <form onSubmit={handleSubmit}>
                        <label>Search</label>
                        <Input type='text' value={query} onChange={handleChange} />
                    </form>
                    <div className='flex flex-col gap-y-2'>
                        {foods.map((food) => (
                            <div key={food.id}>
                                {food.name}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}