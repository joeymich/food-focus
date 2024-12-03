import { Navbar } from "./Navbar"
import { Input } from './ui/form/input';
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { GoalApi, Goals } from "@/api/GoalApi";
import dayjs from "dayjs";

const dateDBFormat = 'YYYY-MM-DD';

export const CreateGoals = () => {
    const [calGoal, setCalGoal] = useState(2000);
    const [proteinGoal, setProteinGoal] = useState(50);
    const [fatsGoal, setFatsGoal] = useState(65);
    const [carbGoal, setCarbGoal] = useState(225);
    const [weight, setWeight] = useState(0);
    const [heightFeet, setHeightFeet] = useState(0);
    const [HeightInches, setHeightInches] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [lifestyle, setLifestyle] = useState("");
    const [calcCal, setCalcCal] = useState(0);
    const [calcProtein, setCalcProtein] = useState(0);
    const [calcFat, setCalcFat] = useState(0);
    const [calcCarbs, setCalcCarbs] = useState(0);
    const [open, setOpen] = useState(false);
    const [searchParams, _] = useSearchParams()
    const [goals, setGoals] = useState<Goals[]>([]);
    const navigate = useNavigate()
    const redirect = searchParams.get('redirect')

    const getGoals = async (date?: string) => {
        try {
            const goals = await GoalApi.getGoal(date)
            setGoals(goals)
        } catch (e: any) {
            console.error(e)
        }
    }

    useEffect(() => {
        getGoals(dayjs().format(dateDBFormat));
    }, [])

    const handleChangeCalGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCalGoal(Number(e.target.value));
    }

    const handleChangeProteinGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProteinGoal(Number(e.target.value));
    }

    const handleChangeFatsGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFatsGoal(Number(e.target.value));
    }

    const handleChangeCarbsGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarbGoal(Number(e.target.value));
    }

    const handleChangeweight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Number(e.target.value));
    }

    const handleChangeHeightFeet = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeightFeet(Number(e.target.value));
    }

    const handleChangeHeightInches = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeightInches(Number(e.target.value));
    }

    const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value));
    }

    const UpdateGoal = async (cal: number, protein: number, fat: number, carb: number, goal_end: string | null) => {
        if (goals.length != 0) {
            //If there is a goal that exits for this date, then update the end date
            try {
                const update = await GoalApi.patchGoal({
                    cal_goal: cal,
                    protein_goal: protein,
                    fat_goal: fat,
                    carb_goal: carb,
                    goal_start: goals[0].goal_start,
                    goal_end: goal_end
                },
                    goals[0].id)
                console.log(update)
            } catch (e: any) {
                console.error(e)
            }
        }
    }

    const SubmitGoal = async (cal: number, protein: number, fat: number, carb: number) => {
        try {
            await GoalApi.postGoal({
                cal_goal: cal,
                protein_goal: protein,
                fat_goal: fat,
                carb_goal: carb,
                goal_start: dayjs().format(dateDBFormat),
                goal_end: dayjs().add(12, 'month').format(dateDBFormat),
            })
        } catch (e: any) {
            console.error(e)
        }

    }

    const SetUpGoals = (cal: number, protein: number, fat: number, carb: number) => {
        /*
            If the goal existfor today's date (goals.lenght != 0) and the start_date is the same as today
                replace all old goal data with new date
                don't create a new goal
            else If the goal only exist for today's date
                change the goal_end date
                create a new goal
            else (the goal does not exist for today's date)
                only create a new goal
        */

        if (goals.length != 0 && goals[0].goal_start == dayjs().format(dateDBFormat)) {
            UpdateGoal(cal, protein, fat, carb, goals[0].goal_end)
        } else if (goals.length != 0) {
            UpdateGoal(goals[0].cal_goal, goals[0].protein_goal, goals[0].fat_goal, goals[0].carb_goal, dayjs().format(dateDBFormat))
            SubmitGoal(cal, protein, fat, carb)
        } else {
            SubmitGoal(cal, protein, fat, carb)
        }
    }

    const handleGoalForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Save goal information into the backend
        SetUpGoals(calGoal, proteinGoal, fatsGoal, carbGoal);
        navigate(redirect || '/dashboard')
    }



    const handleCalcForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Calorie formulas are from https://www.convertcalculator.com/templates/calorie-calculator/
        //Macronutrient calculation from https://www.healthline.com/nutrition/best-macronutrient-ratio#ideal-macro-ratio
        const calcW = (10 * (weight / 2.205));
        const calcH = (6.25 * ((heightFeet * 30.48) + (HeightInches * 2.54)));
        const calcA = (5 * age);
        let calc = calcW + calcH - calcA;
        if (gender === "female") {
            calc = calc - 161;
        } else {
            calc = calc + 5;
        }

        if (lifestyle === "sedentary") {
            calc = calc * 1.2;
        } else if (lifestyle === "lightly-active") {
            calc = calc * 1.375;
        } else if (lifestyle === "moderately-active") {
            calc = calc * 1.55;
        } else if (lifestyle === "very-active") {
            calc * 1.725;
        } else if (lifestyle === "extra-active") {
            calc = calc * 1.9;
        }

        setCalcCal(Math.round(calc));

        if (age <= 18) {
            setCalcProtein(Math.round(calc * 0.30 / 4));
        } else {
            setCalcProtein(Math.round(calc * .35 / 4));
        }

        setCalcFat(Math.round(calc * .35 / 9));
        setCalcCarbs(Math.round(calc * .30 / 4));

    }

    const handleYes = async () => {
        //save goal information into the backend
        SetUpGoals(calcCal, calcProtein, calcFat, calcCarbs)
        navigate(redirect || '/dashboard')
    }

    const handleNo = async () => {
        setOpen(false);
    }

    return (
        <>
            <div className="bg-background h-screen w-screen flex flex-col">
                <Navbar isAuth={true} />

                <div className="flex flex-1 justify-center items-center">
                    <div className="min-w-[800px] w-1/2 min-h-[550px] h-3/4  bg-white rounded-lg shadow-md flex items-center">
                        <div className="w-1/2 h-full flex flex-col justify-start items-center space-y-10">
                            <div className="w-full flex flex-col justify-center items-center text-center py-4">
                                <h1 className="font-bold text-4xl"> Set Goals </h1>
                                <h2 className="text-xl">Set Your Goals for Your Intake of <br /> Calories and Macronutrients</h2>
                            </div>
                            <form className="flex flex-col justify-center items-center space-y-4" onSubmit={handleGoalForm}>
                                <div className="space-y-10 w-min">
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[125px]"> Calorie Goal: </p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            defaultValue={calGoal}
                                            onChange={handleChangeCalGoal}
                                        />
                                        <p className="text-xl">Cals</p>
                                    </div>
                                    <div className="flex items-center  space-x-4">
                                        <p className="font-bold text-xl w-[125px]"> Protein Goal: </p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            defaultValue={50}
                                            onChange={handleChangeProteinGoal}
                                        />
                                        <p className="text-xl">grams</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[125px]"> Fats Goal: </p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            defaultValue={65}
                                            onChange={handleChangeFatsGoal}
                                        />
                                        <p className="text-xl">grams</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[125px]"> Carbs Goal: </p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            defaultValue={225}
                                            onChange={handleChangeCarbsGoal}
                                        />
                                        <p className="text-xl">grams</p>
                                    </div>
                                </div>

                                <Button className="w-1/3 text-black">Set Goals</Button>
                            </form>
                        </div>
                        <div className="bg-blue-100 w-1/2 h-full flex flex-col justify-start items-center space-y-4">
                            <div className="w-full flex flex-col justify-center items-center text-center py-4">
                                <h1 className="font-bold text-4xl"> Calculator </h1>
                                <h2 className="text-xl">Calculate Your Caloric and Macronutrient Intake Needs</h2>
                                <p>The maximum values needed will be caclueted</p>
                            </div>
                            <form className="flex flex-col justify-center items-center space-y-4" onSubmit={handleCalcForm}>
                                <div className="space-y-10 w-min">
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[90px]">Weight:</p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            onChange={handleChangeweight}
                                        />
                                        <p className="text-xl">lbs</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[90px]">Height:</p>
                                        <Input
                                            className='bg-gray-100 w-[70px]'
                                            type="number"
                                            min={0}
                                            max={10}
                                            onChange={handleChangeHeightFeet}
                                        />
                                        <p className="text-xl">ft</p>
                                        <Input
                                            className='bg-gray-100 w-[70px]'
                                            type="number"
                                            min={0}
                                            max={11}
                                            onChange={handleChangeHeightInches}
                                        />
                                        <p className="text-xl">in</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[90px]">Age:</p>
                                        <Input
                                            className='bg-gray-100 w-[100px]'
                                            type="number"
                                            min={1}
                                            onChange={handleChangeAge}
                                        />
                                        <p className="text-xl">years old</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[90px]">Gender:</p>
                                        <Select onValueChange={(value) => { setGender(value); }}>
                                            <SelectTrigger className="w-[170px] bg-gray-100">
                                                <SelectValue placeholder='Select Gender' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='male'>Male</SelectItem>
                                                <SelectItem value='female'>Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="font-bold text-xl w-[90px]">Lifestyle:</p>
                                        <Select onValueChange={(value) => { setLifestyle(value); }}>
                                            <SelectTrigger className="w-[170px] bg-gray-100">
                                                <SelectValue placeholder='Select Lifestyle' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='sedentary'>Sedentary</SelectItem>
                                                <SelectItem value='lightly-active'>Lightly Active</SelectItem>
                                                <SelectItem value='moderately-active'>Moderately Active</SelectItem>
                                                <SelectItem value='very-active'>Very Active</SelectItem>
                                                <SelectItem value='extra-active'>Extra Active</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger className="w-full flex justify-center items-center">
                                        {(weight == 0 || heightFeet < 0 || HeightInches < 0 || age == 0 || gender === "" || lifestyle == "") ?
                                            (
                                                <Button disabled className="w-1/3 bg-gray-300 text-black">Calculate</Button>
                                            ) : (
                                                <Button className="w-1/3  text-black">Calculate</Button>
                                            )}
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-3xl">Calulated Results</DialogTitle>
                                            <DialogDescription className="flex flex-col justify-center items-center space-y-4">
                                                <div className="text-black text-xl">
                                                    <p>Calories: {calcCal} kcals</p>
                                                    <div className="flex space-x-1">
                                                        <p>Protein: {calcProtein} grams</p>
                                                        {age >= 18 ? (<p>{("(30% of caloric intake)")}</p>) : (<p>{("(35% of caloric intake)")}</p>)}
                                                    </div>
                                                    <p>Total Fats: {calcFat} grams {"(35% of caloric intake)"}</p>
                                                    <p>Total Carbs: {calcCarbs} grams {"(30% of caloric intake)"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-black text-xl">Do you want to set these values as your goals?</p>
                                                    <div className="flex space-x-4 justify-center items-center">
                                                        <Button className="text-black" onClick={handleYes}> Yes </Button>
                                                        <Button className="text-black" onClick={handleNo}> No </Button>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}