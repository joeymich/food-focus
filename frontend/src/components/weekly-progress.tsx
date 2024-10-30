import { Navbar } from "./ui/Navbar";
import { ProgressBar } from "./ui/progress-bar";
import { Button } from "./ui/button";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {SetStateAction, useEffect, useState} from 'react'
import { MacronutrientProgressBar } from "./ui/macronutirents-progressbar";
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CartesianGrid, Line, LineChart, XAxis,  Bar, BarChart  } from "recharts"
import {ChartConfig,  ChartContainer, ChartTooltip, ChartTooltipContent,  } from "./ui/chart";
import { Test } from "./ui/test";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card";
import { Summary, SummariesApi } from "@/api/SummariesApi";

const  HistoryProgress = (prop: {date: string, calories: number; totalCalories: number; dateActual : string}) => {
    //Code referenced from https://www.youtube.com/watch?v=PraIL031lno&ab_channel=StudytonightwithAbhishek
    return (
        <div className="w-full">
        <div className="flex justify-between"> 
            <h3 className="font-bold" >{prop.date}: {prop.dateActual}</h3>
            <span className="font-bold">{prop.calories}/{prop.totalCalories} cals</span>
        </div>
        <ProgressBar numerator={prop.calories} denominator={prop.totalCalories}/>
        </div>
    )
    };

const MacronutrientSection = (prop: {fat: number; protein: number; carb: number; satFat: number; polFat: number;
                                monFat: number; traFat: number; sodium: number; potassium: number; fiber:number;
                                sugar: number; vitA: number; vitC: number; calcium: number; iron: number})=> {
  return (
  <div className='w-full space-y-4'>
    <MacronutrientProgressBar fat={prop.fat} carb={prop.carb} protein={prop.protein}/>  
    <ScrollArea className="max-h-65 w-full rounded-md border bg-gray-100">
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Saturated Fat</p>
      <p>{prop.satFat}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'> 
      <p>Average Polyunsaturaed Fat</p>
      <p>{prop.polFat}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Monounsaturated Fat</p>
      <p>{prop.monFat}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'>
      <p>Average Trans Fat</p>
      <p>{prop.traFat}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Sodium</p>
      <p>{prop.sodium}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'>
      <p>Average Potassium</p>
      <p>{prop.potassium}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Dietray Fiber</p>
      <p>{prop.fiber}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'>
      <p>Average Sugars</p>
      <p>{prop.sugar}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Vitamin A</p>
      <p>{prop.vitA}mg</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'>
      <p>Average Vitamin C</p>
      <p>{prop.vitC}mg</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between px-4'>
      <p>Average Calcium</p>
      <p>{prop.calcium}g</p>
      </div>
      <Separator orientation="horizontal" />
      <div className='flex justify-between bg-gray-200 px-4'>
      <p>Average Iron</p>
      <p>{prop.iron}mg</p>
      </div>
      <Separator orientation="horizontal" />
    </ScrollArea>
  </div>
)               
};  

type ChartLayout = {
  day: string,
  carbs: number,
  protein: number, 
  fat: number,
}

export const WeeklyProgress = () => {
    const[totalCal, setTotalCal] = useState(0.0);
    const[calGoal, setCalGoal] = useState(0.0);
    const[fat, setFat] = useState(0.0);
    const[protein, setProtein] = useState(0.0);
    const[carb, setCarb] = useState(0.0);
    const[satFat, setSatFat] = useState(0.0);
    const[polFat, setPolFat] = useState(0.0);
    const[monFat, setMonFat] = useState(0.0);
    const[traFat, setTraFat] = useState(0.0);
    const[sodium, setSodium] = useState(0.0);
    const[potassium, setPotassium] = useState(0.0);
    const[fiber, setFiber] = useState(0.0);
    const[sugar, setSugar] = useState(0.0);
    const[vitA, setVitA] = useState(0.0);
    const[vitC, setVitC] = useState(0.0);
    const[calcium, setCalcium] = useState(0.0);
    const[iron, setIron] = useState(0.0);
    const[theDate, setTheDate] = useState<dayjs.Dayjs>(dayjs().add(-6, "days"));
    const[chartData, setChartData] = useState<ChartLayout[]>([
      { day: "Wed", carbs: 186, protein: 80, fat: 120},
      { day: "Thur", carbs: 305, protein: 200, fat: 130},
      { day: "March", carbs: 237,protein: 120, fat: 231},
      { day: "April", carbs: 73, protein: 190, fat: 321},
      { day: "May", carbs: 209, protein: 130, fat: 212},
      { day: "June", carbs: 214, protein: 140, fat: 103},
    ])
    const[day1, setDay1] = useState<Summary>();
    const[day2, setDay2] = useState<Summary>();
    const[day3, setDay3] = useState<Summary>();
    const[day4, setDay4] = useState<Summary>();
    const[day5, setDay5] = useState<Summary>();
    const[day6, setDay6] = useState<Summary>();
    const[day7, setDay7] = useState<Summary>();
    const[summedData, setSummedData] = useState<Summary>();
    const dateFormat = 'MM-DD-YYYY';
    const dateDBFormat = 'YYYY-MM-DD';

    const getSummary = async (date: string) => {
      try {
        const response = await SummariesApi.getFoodLogAll(date);
        return response;
      } catch (e) {
        console.log(e)
      }
    }

    function GetAllSummaries(startDate: string) {
      let promise = getSummary(startDate);
      promise.then(val => setDay1(val))

      promise = getSummary(dayjs(startDate).add(1, "days").format(dateDBFormat))
      promise.then(val => setDay2(val))

      promise = getSummary(dayjs(startDate).add(2, "days").format(dateDBFormat))
      promise.then(val => setDay3(val))

      promise = getSummary(dayjs(startDate).add(3, "days").format(dateDBFormat))
      promise.then(val => setDay4(val))

      promise = getSummary(dayjs(startDate).add(4, "days").format(dateDBFormat))
      promise.then(val => setDay5(val))

      promise = getSummary(dayjs(startDate).add(5, "days").format(dateDBFormat))
      promise.then(val => setDay6(val))

      promise = getSummary(dayjs(startDate).add(6, "days").format(dateDBFormat))
      promise.then(val => setDay7(val))
    }

    function SumAll() {
      setSummedData({
        date: "",
        calories: (day1?.calories ?? 0) + (day2?.calories ?? 0) + (day3?.calories ?? 0) + (day4?.calories ?? 0) + (day5?.calories ?? 0) + (day6?.calories ?? 0) + (day7?.calories ?? 0),
        total_fat: (day1?.total_fat ?? 0) + (day2?.total_fat ?? 0) + (day3?.total_fat ?? 0) + (day4?.total_fat ?? 0) + (day5?.total_fat ?? 0) + (day6?.total_fat ?? 0) + (day7?.total_fat ?? 0),
        saturated_fat: (day1?.saturated_fat ?? 0) + (day2?.saturated_fat ?? 0) + (day3?.saturated_fat ?? 0) + (day4?.saturated_fat ?? 0) + (day5?.saturated_fat ?? 0) + (day6?.saturated_fat ?? 0) + (day7?.saturated_fat ?? 0),
        polyunsaturated_fat: (day1?.polyunsaturated_fat ?? 0) + (day2?.polyunsaturated_fat ?? 0) + (day3?.polyunsaturated_fat ?? 0) + (day4?.polyunsaturated_fat ?? 0) + (day5?.polyunsaturated_fat ?? 0) + (day6?.polyunsaturated_fat ?? 0) + (day7?.polyunsaturated_fat ?? 0),
        monounsaturated_fat: (day1?.monounsaturated_fat ?? 0) + (day2?.monounsaturated_fat ?? 0) + (day3?.monounsaturated_fat ?? 0) + (day4?.monounsaturated_fat ?? 0) + (day5?.monounsaturated_fat ?? 0) + (day6?.monounsaturated_fat ?? 0) + (day7?.monounsaturated_fat ?? 0),
        trans_fat: (day1?.trans_fat ?? 0) + (day2?.trans_fat ?? 0) + (day3?.trans_fat ?? 0) + (day4?.trans_fat ?? 0) + (day5?.trans_fat ?? 0) + (day6?.trans_fat ?? 0) + (day7?.trans_fat ?? 0),
        sodium: (day1?.sodium ?? 0) + (day2?.sodium ?? 0) + (day3?.sodium ?? 0) + (day4?.sodium ?? 0) + (day5?.sodium ?? 0) + (day6?.sodium ?? 0) + (day7?.sodium ?? 0),
        potassium: (day1?.potassium ?? 0) + (day2?.potassium ?? 0) + (day3?.potassium ?? 0) + (day4?.potassium ?? 0) + (day5?.potassium ?? 0) + (day6?.potassium ?? 0) + (day7?.potassium ?? 0),
        total_carbs: (day1?.total_carbs ?? 0) + (day2?.total_carbs ?? 0) + (day3?.total_carbs ?? 0) + (day4?.total_carbs ?? 0) + (day5?.total_carbs ?? 0) + (day6?.total_carbs ?? 0) + (day7?.total_carbs ?? 0),
        dietary_fiber: (day1?.dietary_fiber ?? 0) + (day2?.dietary_fiber ?? 0) + (day3?.dietary_fiber ?? 0) + (day4?.dietary_fiber ?? 0) + (day5?.dietary_fiber ?? 0) + (day6?.dietary_fiber ?? 0) + (day7?.dietary_fiber ?? 0),
        sugars: (day1?.sugars ?? 0) + (day2?.sugars ?? 0) + (day3?.sugars ?? 0) + (day4?.sugars ?? 0) + (day5?.sugars ?? 0) + (day6?.sugars ?? 0) + (day7?.sugars ?? 0),
        protein: (day1?.protein ?? 0) + (day2?.protein ?? 0) + (day3?.protein ?? 0) + (day4?.protein ?? 0) + (day5?.protein ?? 0) + (day6?.protein ?? 0) + (day7?.protein ?? 0),
        vitamin_a:(day1?.vitamin_a ?? 0) + (day2?.vitamin_a ?? 0) + (day3?.vitamin_a ?? 0) + (day4?.vitamin_a ?? 0) + (day5?.vitamin_a ?? 0) + (day6?.vitamin_a ?? 0) + (day7?.vitamin_a ?? 0),
        vitamin_c: (day1?.vitamin_c ?? 0) + (day2?.vitamin_c ?? 0) + (day3?.vitamin_c ?? 0) + (day4?.vitamin_c ?? 0) + (day5?.vitamin_c ?? 0) + (day6?.vitamin_c ?? 0) + (day7?.vitamin_c ?? 0),
        calcium: (day1?.calcium ?? 0) + (day2?.calcium ?? 0) + (day3?.calcium ?? 0) + (day4?.calcium ?? 0) + (day5?.calcium ?? 0) + (day6?.calcium ?? 0) + (day7?.calcium ?? 0),
        iron: (day1?.iron ?? 0) + (day2?.iron ?? 0) + (day3?.iron ?? 0) + (day4?.iron ?? 0) + (day5?.iron ?? 0) + (day6?.iron ?? 0) + (day7?.iron ?? 0)
      })
    }

    function SetUpChart(date: dayjs.Dayjs) {
      const selectDate = DayOfTheWeek(dayjs(date))
      console.log(selectDate);
      setChartData([
      { day: DayOfTheWeek(theDate.add(0, "days")), carbs: day1?.total_carbs ?? 0, protein: day1?.protein ?? 0, fat: day1?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(1, "days")), carbs: day2?.total_carbs ?? 0, protein: day2?.protein ?? 0, fat: day2?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(2, "days")), carbs: day3?.total_carbs ?? 0, protein: day3?.protein ?? 0, fat: day3?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(3, "days")), carbs: day4?.total_carbs ?? 0, protein: day4?.protein ?? 0, fat: day4?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(4, "days")), carbs: day5?.total_carbs ?? 0, protein: day5?.protein ?? 0, fat: day5?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(5, "days")), carbs: day6?.total_carbs ?? 0, protein: day6?.protein ?? 0, fat: day6?.total_fat ?? 0},
      { day: DayOfTheWeek(theDate.add(6, "days")), carbs: day7?.total_carbs ?? 0, protein: day7?.protein ?? 0, fat: day7?.total_fat ?? 0},
      ])
    }

    useEffect(() => {
      PlaceHolder();
      GetAllSummaries(theDate.format(dateDBFormat));
    }, [])

    useEffect(() => {
      SetUpChart(theDate);
      SumAll();
    })
  
    function PlaceHolder() {
      setTotalCal(2500);
      setCalGoal(2500);
      setFat(18);
      setProtein(29);
      setCarb(20);
      setSatFat(16);
      setPolFat(2);
      setMonFat(0);
      setTraFat(0);
      setSodium(13);
      setPotassium(19);
      setFiber(12);
      setSugar(12);
      setVitA(13);
      setVitC(15);
      setCalcium(17);
      setIron(16);
    }

            

    function DayOfTheWeek(date: dayjs.Dayjs) {
        switch(date.day()) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wedneday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    } 

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    //Code for the date picker refrenced from https://ant.design/components/date-picker
        if(date != null) {
            setTheDate(date)
            console.log(date.day());
            GetAllSummaries(date.format(dateDBFormat));
            SetUpChart(date);
        }
    }

    const chartConfig = {
      protein: {
        label: "Protein",
        color: "orange",
      },
      carb: {
        label: "Carbs",
        color: "green",
      },
      fat: {
        label: "Fat",
        color: "blue",
      },
    } satisfies ChartConfig
  
    return (
      <>
        {/*
          Navbar not yet updated to include sessions
          Once sessions are implemented, the contents of the navbar will change
        */}
        <div className="w-screen h-screen bg-background">
        <Navbar isAuth={true}/>

          <div className='flex-1 justify-center space-y-4'>
  
          <div className='w-full p-4 bg-secondary space-x-4 space-y-2 text-center'>
            <div className='w-full bg-secondary text-center'>
                <h1 className="text-xl font-bold text-defaultText text-center">Select Start Date:</h1>
                <DatePicker
                format="MM-DD-YYYY"
                minDate={dayjs('02-03-2002', dateFormat)}
                maxDate={dayjs(dayjs().add(-6, "days"), dateFormat)}
                onChange={onChange}
                defaultValue={dayjs(dayjs().add(-6, "days"),dateFormat)}
                />

            </div>

                < h1 className="text-3xl font-bold text-defaultText text-center"> Progress from <br/> {DayOfTheWeek(theDate)} ({theDate.format(dateFormat)}) - {DayOfTheWeek(theDate.add(6, 'days'))} ({theDate.add(6, 'days').format(dateFormat)}) </h1>
          </div>
  
            <div className='flex justify-center space-x-4'>
  
              <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-4xl font-bold text-defaultText text-center">This Week's Calorie History</h1> 
                {/* Make it gray out when the day not passed */}
                {/* The weekly calories */}
                <p className="font-bold ">Daily Average: {Math.round((summedData?.calories ?? 0) / 7)} kcals</p>
                <div className="w-full max-w-md  space-y-6">
                  <HistoryProgress date={DayOfTheWeek(theDate)} calories={day1?.calories ?? 0} totalCalories={2500} dateActual={theDate.format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(1, 'days'))} calories={day2?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(1, 'days').format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(2, 'days'))} calories={day3?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(2, 'days').format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(3, 'days'))} calories={day4?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(3, 'days').format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(4, 'days'))} calories={day5?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(4, 'days').format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(5, 'days'))} calories={day6?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(5, 'days').format(dateFormat)}/>
                  <HistoryProgress date={DayOfTheWeek(theDate.add(6, 'days'))} calories={day7?.calories ?? 0} totalCalories={2500} dateActual={theDate.add(6, 'days').format(dateFormat)}/> 
                </div>
              </div>
  
              <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-4xl font-bold text-defaultText text-center">Daily Average Macronutrients</h2>
                <div className="w-full h-full">
                  <MacronutrientSection fat={fat} carb={carb} protein={protein} satFat={satFat} polFat={polFat} monFat={monFat} traFat={traFat}
                                    sodium={sodium} potassium={potassium} fiber={fiber} sugar={sugar} vitA={vitA} vitC={vitC} calcium={calcium} iron={iron}/>              
                </div>
              </div>

              <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <div className="w-full h-fulls">
                  {/*
                    Code refrenced from shadui
                    https://ui.shadcn.com/charts#line-chart - Line Chart - Multiple
                  */}
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Macronutirent Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                          <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                              left: 12,
                              right: 12,
                            }}
                          >
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="day"
                              tickLine={false}
                              axisLine={false}
                              tickMargin={8}
                              interval="preserveStartEnd"
                              tickFormatter={(value) => (value.slice(0, 3))}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Line
                              dataKey="protein"
                              type="monotone"
                              stroke="var(--color-protein)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Line
                              dataKey="carbs"
                              type="monotone"
                              stroke="var(--color-carb)"
                              strokeWidth={2}
                              dot={false}
                            />
                            <Line
                              dataKey="fat"
                              type="monotone"
                              stroke="var(--color-fat)"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };