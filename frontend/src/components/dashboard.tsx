import { useEffect, useState } from 'react'
import { Navbar } from "./Navbar";
import { CircularProgressBar } from "./ui/circular-pogress-bar";
import { Button } from "./ui/button";
import { MacronutrientProgressBar } from './ui/macronutirents-progressbar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/form/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Check } from "lucide-react"
import { cn } from "@/utils/cn"
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { FoodApi, Foods } from '@/api/FoodApi';
import { ServingSizeApi, ServingSize } from '@/api/ServingSizeApi';
import { FoodLogApi, FoodLogAll, FoodLog, FLServingSize, FoodLogRequest } from '@/api/FoodLogApi';
import { BiError } from 'react-icons/bi';
import { SummariesApi, Summary } from '@/api/SummariesApi';
import { AddMealButton } from './add-meal';

const MacronutrientSection = (prop: {
	fat: number; protein: number; carb: number; satFat: number; polFat: number;
	monFat: number; traFat: number; sodium: number; potassium: number; fiber: number;
	sugar: number; vitA: number; vitC: number; calcium: number; iron: number
}) => {
	return (
		<div className='w-full space-y-4'>
			<MacronutrientProgressBar fat={prop.fat} carb={prop.carb} protein={prop.protein} />
			<ScrollArea className="h-60 w-full rounded-md border bg-gray-100">
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Saturated Fat</p>
					<p>{prop.satFat ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Polyunsaturaed Fat</p>
					<p>{prop.polFat ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Monounsaturated Fat</p>
					<p>{prop.monFat ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Trans Fat</p>
					<p>{prop.traFat ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Sodium</p>
					<p>{prop.sodium ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Potassium</p>
					<p>{prop.potassium ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Dietray Fiber</p>
					<p>{prop.fiber ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Sugars</p>
					<p>{prop.sugar ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Vitamin A</p>
					<p>{prop.vitA}mg</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Vitamin C</p>
					<p>{prop.vitC}mg</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between px-4'>
					<p>Total Calcium</p>
					<p>{prop.calcium ?? 0}g</p>
				</div>
				<Separator orientation="horizontal" />
				<div className='flex justify-between bg-gray-200 px-4'>
					<p>Total Iron</p>
					<p>{prop.iron ?? 0n}mg</p>
				</div>
				<Separator orientation="horizontal" />
			</ScrollArea>
		</div>
	)
};


const MealsSection = (prop: { allFoodData: Foods[], servingSizes: ServingSize[], daysData: FoodLogAll[], day: dayjs.Dayjs }) => {
	const [mealType, setMealType] = useState("");
	const [servingAmount, setServingAmount] = useState(1);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [mealID, setMealID] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('')

	const handleChangeServingAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setServingAmount(Number(e.target.value));
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const serving_size_id = prop.servingSizes.find((foodOptions) => foodOptions.food_id === mealID)?.id.toLowerCase() || ""
		const serving_count = servingAmount;
		const date = dayjs().format("YYYY-MM-DD");
		const meal = mealType.toUpperCase();
		if (meal === "") {
			setErrorMessage("Please fill out the empty field(s)");
		} else {
			setDialogOpen(false);
			setValue("");
			setMealID("");
			setMealType("");
			setErrorMessage("")
			try {
				const response = await FoodLogApi.postFoodLog({ serving_size_id: 'c75b4496-893f-4ad1-9819-184ab89a303e', serving_count, date, meal });
				window.location.reload();
			} catch (e) {
				console.log(e);
			}
		}
	}

	const breakfastData = prop.daysData.filter((val) => (val.meal === "BREAKFAST"));

	const lunchData = prop.daysData.filter((val) => (val.meal === "LUNCH"));

	const dinnerData = prop.daysData.filter((val) => (val.meal === "DINNER"));

	const snackData = prop.daysData.filter((val) => (val.meal === "SNACKS"));


	const ShowDataInRow = (prop: { id: string, meal: string; serving_count: number; serving_size: FLServingSize; }) => {
		const [tDialogOpen, setTDialogOPen] = useState(false);
		const handleRemoveFood = async () => {
			console.log("FOODLOG ID: " + prop.id);
			try {
				await FoodLogApi.deleteFoodLog(prop.id);
			} catch (e) {
				console.log(e);
			}
			setTDialogOPen(false);
		}

		return (
			<TableRow className="w-full">
				<TableCell>{prop.serving_size.food.name.toLowerCase()}</TableCell>
				<TableCell className="text-right">{(prop.serving_size.food.calories * prop.serving_count)}g</TableCell>
				<TableCell>
					<Dialog open={tDialogOpen} onOpenChange={setTDialogOPen}>
						<DialogTrigger className="w-[20px] border rounded">+</DialogTrigger>
						<DialogContent>
							<DialogTitle className='text-center'>More information on {prop.serving_size.food.name.toLowerCase()}</DialogTitle>
							<DialogDescription>
								<div className="space-y-4 flex-col justify-center items-center">
									<div className='flex justify-center space-x-4 font-bold'>
										<p>Meal Type: {prop.meal.toLowerCase()}</p>
										<p>Serving Size: {prop.serving_size.ratio} {prop.serving_size.name}</p>
										<p>Servings eaten: {prop.serving_count}</p>
									</div>
									<div className='flex justify-center'>
										<ScrollArea className="h-full w-[300px] rounded-md border bg-gray-100">
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Total Fat</p>
												<p>{prop.serving_size.food.total_fat ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Saturated Fat</p>
												<p>{prop.serving_size.food.saturated_fat ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Polyunsaturated Fat</p>
												<p>{prop.serving_size.food.polyunsaturated_fat ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Monounsaturated Fat</p>
												<p>{prop.serving_size.food.monounsaturated_fat ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Trans Fat</p>
												<p>{prop.serving_size.food.trans_fat ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Total Carbs:</p>
												<p>{prop.serving_size.food.total_carbs ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Sugars</p>
												<p>{prop.serving_size.food.sugars ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" />
											<div className='flex justify-between bg-gray-100 px-4'>
												<p className='indent-4'>Fibers</p>
												<p>{prop.serving_size.food.dietary_fiber ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Protein:</p>
												<p>{prop.serving_size.food.protein ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Sodium:</p>
												<p>{prop.serving_size.food.sodium ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Potassium:</p>
												<p>{prop.serving_size.food.potassium ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Calcium:</p>
												<p>{prop.serving_size.food.calcium ?? 0}g</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Iron:</p>
												<p>{prop.serving_size.food.iron ?? 0}mg</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Vitamin A:</p>
												<p>{prop.serving_size.food.vitamin_a ?? 0}mg</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
											<div className='flex justify-between bg-gray-200 px-4'>
												<p>Vitamin C:</p>
												<p>{prop.serving_size.food.vitamin_c ?? 0}mg</p>
											</div>
											<Separator orientation="horizontal" className="bg-gray-300" />
										</ScrollArea>
									</div>
									<div className='flex justify-center space-x-4 font-bold'>
										<Button className="text-defaultText bg-secondary font-bold text-sm" onClick={handleRemoveFood}>Remove Food</Button>
									</div>
								</div>
							</DialogDescription>
						</DialogContent>
					</Dialog>
				</TableCell>
			</TableRow>
		)
	}

	const DataDisplay = (prop: { mealType: string }) => {
		const mealType = prop.mealType;
		return (
			<div>
				<ScrollArea className="h-[275px] w-full rounded-md border p-4 bg-gray">
					<Table>
						<TableHeader>
							<TableRow >
								<TableHead className="font-bold">Food</TableHead>
								<TableHead className="text-right font-bold">Calories</TableHead>
							</TableRow>
						</TableHeader>
						{mealType === "breakfast" ? (
							<>
								{breakfastData.map((data, index) => (
									<ShowDataInRow key={index} {...data} />
								))}
							</>
						) : mealType === "lunch" ? (
							<>
								{lunchData.map((data, index) => (
									<ShowDataInRow key={index} {...data} />
								))}
							</>
						) : mealType === "dinner" ? (
							<>
								{dinnerData.map((data, index) => (
									<ShowDataInRow key={index} {...data} />
								))}
							</>
						) : mealType === "snacks" ? (
							<>
								{snackData.map((data, index) => (
									<ShowDataInRow key={index} {...data} />
								))}
							</>
						) : null}
					</Table>
				</ScrollArea>
			</div>
		)
	}

	return (
		<div className="w-full h-full flex-col">
			<Tabs defaultValue="breakfast" className='w-full'>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="breakfast">Breakfast</TabsTrigger>
					<TabsTrigger value="lunch">Lunch</TabsTrigger>
					<TabsTrigger value="dinner">Dinner</TabsTrigger>
					<TabsTrigger value="snacks">Snacks</TabsTrigger>
				</TabsList>
				<TabsContent value="breakfast">
					<DataDisplay mealType="breakfast" />
				</TabsContent>
				<TabsContent value="lunch">
					<DataDisplay mealType="lunch" />
				</TabsContent>
				<TabsContent value="dinner">
					<DataDisplay mealType="dinner" />
				</TabsContent>
				<TabsContent value="snacks">
					<DataDisplay mealType="snacks" />
				</TabsContent>
			</Tabs>
			<div className="flex justify-center py-4">
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger>
						{prop.day.format("MM-DD-YYYY") === dayjs().format("MM-DD-YYYY") ? (
							<Button className="text-defaultText bg-secondary font-bold text-sm">Add meal</Button>
						) : <Button disabled className="text-defaultText bg-gray-200 font-bold text-sm">Add meal</Button>}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className='text-center'>Add Meal</DialogTitle>
						</DialogHeader>
						<form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
							<div className="flex justify-center">
								<div className="space-y-4 justify-center items-center">
									<div className="flex space-x-8 items-center">
										<p>Select Meal Type</p>
										<Select onValueChange={(value) => { setMealType(value); }}>
											<SelectTrigger className="w-[170px] bg-gray-100">
												<SelectValue placeholder='Choose a Meal Type' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='BREAKFAST'>Breakfast</SelectItem>
												<SelectItem value='LUNCH'>Lunch</SelectItem>
												<SelectItem value='DINNER'>Dinner</SelectItem>
												<SelectItem value='SNACKS'>Snack</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='flex space-x-[10px] items-center'>
										<p>Amount of Servings</p>
										<Input
											className='bg-gray-100 w-[70px]'
											type="number"
											min={1}
											max={99}
											defaultValue={1}
											onChange={handleChangeServingAmount}
										/>
									</div>
									<div className='flex items-center space-x-[65px]'>
										<p>Select Meal</p>
										<div >
											{/* Code referenced from  https://ui.shadcn.com/docs/components/combobox*/}
											<Popover open={open} onOpenChange={setOpen}>
												<PopoverTrigger asChild >
													<Button
														variant="outline"
														role="combobox"
														aria-expanded={open}
														className="w-[200px] justify-between bg-gray-100 font-normal"
													>
														{value ? prop.allFoodData.find((foodOptions) => foodOptions.name === value)?.name.toLowerCase() : "Select Meal"}
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<Command>
														<CommandInput aria-placeholder="Search meals..." />
														<CommandList>
															<CommandEmpty>No Foods Found</CommandEmpty>
															<CommandGroup>
																{prop.allFoodData.map((foodOption) => (
																	<CommandItem
																		key={foodOption.id}
																		value={foodOption.name}
																		onSelect={(currentValue) => {
																			setValue(currentValue === value ? "" : currentValue)
																			setMealID(foodOption.id);
																			setOpen(false)
																		}}
																	>
																		<Check
																			className={cn(
																				"mr-2 h-4 w-4",
																				value === foodOption.name ? "opacity-100" : "opacity-0"
																			)}
																		/>
																		{foodOption.name.toLowerCase()}
																	</CommandItem>
																))}
															</CommandGroup>
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
										</div>
									</div>
									<div className='w-full flex justify-center'>
										{errorMessage && (
											<div className='flex items-center gap-x-2 rounded-lg bg-destructive/20 px-3 py-2 text-sm font-semibold text-destructive'>
												<BiError className='text-destructive' />
												<p>{errorMessage}</p>
											</div>
										)}
									</div>
									<div className='w-full flex justify-center'>
										<Button className="text-defaultText bg-secondary font-bold text-sm">Add</Button>
									</div>
								</div>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
};

export const Dashboard = () => {
	const [calGoal, setCalGoal] = useState(2500);
	const [proteinGoal, setProteinGoal] = useState(60);
	const [carbGoal, setCarbGoal] = useState(225);
	const [fatGoal, setFatGoal] = useState(78)
	const [allFoodData, setAllFoodData] = useState<Foods[]>([]);
	const [servingSizes, setServingSizes] = useState<ServingSize[]>([]);
	const [foodLogs, setFoodLogs] = useState<FoodLogAll[]>([]);
	const [summary, setSummary] = useState<Summary>({
		date: "",
		calories: 0,
		total_fat: 0,
		saturated_fat: 0,
		polyunsaturated_fat: 0,
		monounsaturated_fat: 0,
		trans_fat: 0,
		sodium: 0,
		potassium: 0,
		total_carbs: 0,
		dietary_fiber: 0,
		sugars: 0,
		protein: 0,
		vitamin_a: 0,
		vitamin_c: 0,
		calcium: 0,
		iron: 0
	});
	const [theDate, setTheDate] = useState<dayjs.Dayjs>(dayjs());
	const dateFormat = 'MM-DD-YYYY';
	const dateDBFormat = 'YYYY-MM-DD';

	const goalData = [
		{ calGoal: 2600, proteinGoal: 400, carbGoal: 200, fatGoal: 100, goalStart: "2024-10-01", goalEnd: "2024-10-10" },
		{ calGoal: 2300, proteinGoal: 400, carbGoal: 200, fatGoal: 100, goalStart: "2024-10-10", goalEnd: null },
	]

	function prepGoalInfo(day: dayjs.Dayjs) {
		const data = goalData.filter((data) => (dayjs(day).format(dateDBFormat) >= data.goalStart) && (data.goalEnd === null || dayjs(day).format(dateDBFormat) < data.goalEnd));
		if (data.length != 0) {
			setCalGoal(data[0].calGoal);
			setProteinGoal(data[0].proteinGoal);
			setCarbGoal(data[0].carbGoal);
			setFatGoal(data[0].fatGoal);
		} else {
			//The default values for the goals
			setCalGoal(2500);
			setProteinGoal(60);
			setCarbGoal(225);
			setFatGoal(78);
		}
	}

	function prepSummary(sum: Summary) {
		setSummary(
			{
				date: sum.date,
				calories: sum.calories ?? 0,
				total_fat: sum.total_fat ?? 0,
				saturated_fat: sum.saturated_fat ?? 0,
				polyunsaturated_fat: sum.polyunsaturated_fat ?? 0,
				monounsaturated_fat: sum.monounsaturated_fat ?? 0,
				trans_fat: sum.trans_fat ?? 0,
				sodium: sum.sodium ?? 0,
				potassium: sum.potassium ?? 0,
				total_carbs: sum.total_carbs ?? 0,
				dietary_fiber: sum.dietary_fiber ?? 0,
				sugars: sum.sugars ?? 0,
				protein: sum.protein ?? 0,
				vitamin_a: sum.vitamin_a ?? 0,
				vitamin_c: sum.vitamin_c ?? 0,
				calcium: sum.calcium ?? 0,
				iron: sum.iron ?? 0
			}
		)
	}

	const getSummary = async (date: string) => {
		try {
			const response = await SummariesApi.getFoodLogAll(date);
			if (response !== undefined) {
				prepSummary(response);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getFoodLogs = async (date: string) => {
		try {
			const response = await FoodLogApi.getFoodLogDate(date);
			setFoodLogs(response);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getFoodOptions = async () => {
			try {
				const response = await FoodApi.getAll();
				setAllFoodData(response);
			} catch (e) {
				console.log(e);
			}
		};

		const getServingSizes = async () => {
			try {
				const response = await ServingSizeApi.getServingSizeAll();
				setServingSizes(response);
			} catch (e) {
				console.log(e);
			}
		};

		const today = dayjs().format(dateDBFormat);
		getFoodOptions();
		// getServingSizes();
		getFoodLogs(today);
		getSummary(today);
		prepGoalInfo(dayjs());
	}, [])

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		//Code for the date picker refrenced from https://ant.design/components/date-picker
		if (date != null) {
			setTheDate(date)
			prepGoalInfo(date);
			getSummary(date.format(dateDBFormat));
			getFoodLogs(date.format(dateDBFormat));
		}
	};

	const handleCalorieGoal = () => {

	}


	return (
		<>
			<div className="bg-background h-screen w-screen flex:col justify-center items-start py-8 space-x-4 space-y-16">
				<div className='flex:col justify-center space-y-4'>

					<div className='w-full p-4 bg-secondary space-x-4 text-center'>
						<div className='w-full bg-secondary space-y-4 text-center'>
							<DatePicker
								format="MM-DD-YYYY"
								defaultValue={dayjs(dayjs(), dateFormat)}
								minDate={dayjs('02-03-2002', dateFormat)}
								maxDate={dayjs(dayjs(), dateFormat)}
								onChange={onChange}
							/>
							{(dayjs().isSame(theDate, 'day')) ? (
								<h1 className="text-4xl font-bold text-defaultText text-center"> Today's Progress </h1>
							) : (
								<h1 className="text-4xl font-bold text-defaultText text-center"> Progress on {theDate?.format(dateFormat)} </h1>
							)}
						</div>
					</div>
					<div className='flex justify-center space-x-4'>
						<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
							<h2 className="text-3xl font-bold text-defaultText text-center">Today's Total Calories</h2>
							{/*
								Current Numbers are place holders
								If the total calories are passed, then the bar and numbers will turn red
							*/}
							<CircularProgressBar numerator={summary.calories} denominator={calGoal} />

							<div className="flex gap-x-4">
								<Button className="text-defaultText bg-secondary font-bold text-sm" onClick={handleCalorieGoal}>Adjust Calorie Goal</Button>
							</div>
						</div>
						<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
							<h2 className="text-3xl font-bold text-defaultText text-center">Today's Nutrients</h2>
							<MacronutrientSection fat={summary.total_fat} carb={summary.total_carbs} protein={summary.protein} satFat={summary.saturated_fat} polFat={summary.polyunsaturated_fat} monFat={summary.monounsaturated_fat} traFat={summary.trans_fat}
								sodium={summary.sodium} potassium={summary.potassium} fiber={summary.dietary_fiber} sugar={summary.sugars} vitA={summary.vitamin_a} vitC={summary.vitamin_c} calcium={summary.calcium} iron={summary.iron} />
						</div>
						<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
							<h2 className="text-3xl font-bold text-defaultText text-center">Today's Meals</h2>
							<MealsSection allFoodData={allFoodData} servingSizes={servingSizes} daysData={foodLogs} day={theDate} />
						</div>
					</div>
					<AddMealButton />
				</div>
			</div>
		</>
	);
};
