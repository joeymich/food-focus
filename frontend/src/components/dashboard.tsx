import {useEffect, useState} from 'react'
import { Navbar } from "./ui/Navbar";
import { CircularProgressBar } from "./ui/circular-pogress-bar";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import { MacronutrientProgressBar } from './ui/macronutirents-progressbar';
// import { AuthApi } from '@/api/AuthApi';
import { Collapse, CollapseProps } from 'antd';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';


const  HistoryProgress = (prop: {date: string, calories: number; totalCalories: number}) => {
  //Code referenced from https://www.youtube.com/watch?v=PraIL031lno&ab_channel=StudytonightwithAbhishek
  return (
    <div className="w-full">
      <div className="flex justify-between"> 
        <h3 className="font-bold" >{prop.date}</h3>
        <span className="font-bold">{prop.calories}/{prop.totalCalories} cals</span>
      </div>
      <ProgressBar numerator={prop.calories} denominator={prop.totalCalories}/>
    </div>
  )
};

const MacronutrientSection = (prop: {fat: number; protein: number; carb: number; calories: number; satFat: number; polFat: number;
                                    monFat: number; traFat: number; sodium: number; potassium: number; fiber:number;
                                    sugar: number; vitA: number; vitC: number; calcium: number; iron: number})=> {
  return (
    <div className='w-full space-y-4'>
      <MacronutrientProgressBar fat={prop.fat} carb={prop.carb} protein={prop.protein}/>  
      <ScrollArea className="h-60 w-full rounded-md border bg-gray-100">
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Saturated Fat</p>
         <p>{prop.satFat}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'> 
         <p>Total Polyunsaturaed Fat</p>
         <p>{prop.polFat}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Monounsaturated Fat</p>
         <p>{prop.monFat}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'>
         <p>Total Trans Fat</p>
         <p>{prop.traFat}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Sodium</p>
         <p>{prop.sodium}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'>
         <p>Total Potassium</p>
         <p>{prop.potassium}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Dietray Fiber</p>
         <p>{prop.fiber}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'>
         <p>Total Sugars</p>
         <p>{prop.sugar}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Vitamin A</p>
         <p>{prop.vitA}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'>
         <p>Total Vitamin C</p>
         <p>{prop.vitC}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between px-4'>
         <p>Total Calcium</p>
         <p>{prop.calcium}g</p>
        </div>
        <Separator orientation="horizontal" />
        <div className='flex justify-between bg-gray-200 px-4'>
         <p>Total Iron</p>
         <p>{prop.iron}g</p>
        </div>
        <Separator orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

const MealsSection = (prop) => {
  return (
    <div></div>
  )
}

const MoreDataSection =  (prop: {fat: number; protein: number; carb: number; calories: number}) => {
  const fat = prop.fat;
  const protein = prop.protein;
  const carb = prop.carb;
  const[fatCal, setFatCal] = useState(0.0);
  const[carbCal, setCarbCal] = useState(0.0);
  const[proteinCal, setProteinCal] = useState(0.0);


  useEffect(() => {
      //Using https://help.practicebetter.io/hc/en-us/articles/4921636414107-Calculating-Macronutrient-Percentages for the calculations

    setFatCal(fat * 9);
    setCarbCal(carb * 4);
    setProteinCal(protein * 4);

  }, [carb, fat, protein])

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Calories from the Macros',
      children: 
        <div className=''>
          <h4 className='text-md'>Out of <span className='font-bold'> {prop.calories} </span> total Calories:</h4>
          <div className='indent-4'>
            <p>Out of <span className='font-bold'>{fatCal} Cals</span> were from Fats</p>
            <p>Out of <span className='font-bold'>{proteinCal} Cals</span> were from Proteins</p>
            <p>Out of <span className='font-bold'>{carbCal} Cals</span> were from Carbs</p>
          </div>
        </div>
      ,
    },
    {
      key: '2',
      label: 'testing',
      children: <p>"testing"</p>,
    }
  ]

  return (
    <div  className='w-full'>
      <Collapse accordion items={items} defaultActiveKey={['1']} className='w-full'/>
    </div>
  )
}

export const Dashboard = () => {
  const[totalCal, setTotalCal] = useState(0.0);
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


  // const getUserData = async() => {
  //   const response = await AuthApi.whoami();
  //   console.log("UserID: " + response?.id)
  // }

  return (
    <>
      {/*
        Navbar not yet updated to include sessions
        Once sessions are implemented, the contents of the navbar will change
      */}
      <Navbar />

      <div  className="bg-background h-full w-screen flex:col justify-center items-start py-8 space-x-4 space-y-16">
        <div className='flex:col justify-center space-y-4'>

          <div className='w-full p-4 bg-secondary'>
            <h1 className="text-4xl font-bold text-defaultText text-center"> Today's Progress </h1>
          </div>

          <div className='flex justify-center space-x-4'>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-3xl font-bold text-defaultText text-center">Today's Total Calories</h2>
              {/*
                Current Numbers are place holders
                If the total calories are passed, then the bar and numbers will turn red
              */}
              <CircularProgressBar numerator={2700} denominator={2500}/>

              <div className="flex gap-x-4">
                <Button className="text-defaultText bg-secondary font-bold text-sm">Adjust Calorie Goal</Button>
              </div>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-3xl font-bold text-defaultText text-center">Today's Nutrients</h2>
              <MacronutrientSection fat={fat} carb={carb} protein={protein} calories={2500} satFat={satFat} polFat={polFat} monFat={monFat} traFat={traFat}
                                    sodium={sodium} potassium={potassium} fiber={fiber} sugar={sugar} vitA={vitA} vitC={vitC} calcium={calcium} iron={iron}/>              
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold text-defaultText text-center">Today's Meals</h2>
      

            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-3xl font-bold text-defaultText text-center">More Data</h2>
              <MoreDataSection fat={12} carb={70.6} protein={24.8} calories={2500}/>
            </div>
          </div>
        </div>

        <div className='flex:col justify-center space-y-4'>

          <div className='w-full p-4 bg-secondary'>
            <h1 className="text-4xl font-bold text-defaultText text-center"> This Week's Progress </h1>
          </div>

          <div className='flex justify-center space-x-4'>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h1 className="text-4xl font-bold text-defaultText text-center">This Week's Calorie History</h1>
              {/*Make it gray out when the day not passed*/}
              <HistoryProgress date="Sunday" calories={2670} totalCalories={2500}/>
              <HistoryProgress date="Monday" calories={1400} totalCalories={2500}/>
              <HistoryProgress date="Tuesday" calories={1250} totalCalories={2500}/>
              <HistoryProgress date="Wednesday" calories={0} totalCalories={2500}/>
              <HistoryProgress date="Thursday" calories={0} totalCalories={2500}/>
              <HistoryProgress date="Friday" calories={0} totalCalories={2500}/>
              <HistoryProgress date="Saturday" calories={0} totalCalories={2500}/>
              {/*Meant to go to a page with the user's full history*/}
              <Button className="text-defaultText bg-secondary font-bold text-sm">See more</Button>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-3xl font-bold text-defaultText text-center">This Week's Macronutrients</h2>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold text-defaultText text-center">This Week's Meals</h2>
            </div>
          </div>
        </div>
      </div>
          
    </>
  );
};
