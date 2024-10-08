import React , {useEffect, useState} from 'react'
import { Navbar } from "./ui/Navbar";
import { CircularProgressBar } from "./ui/circular-pogress-bar";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import { MacronutrientProgressBar } from './ui/macronutirents-progressbar';


const HistoryProgress = (prop) => {
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

const MacronutrientSection = (prop) => {
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

  return (
    <div className='w-full'>
      <MacronutrientProgressBar fat={prop.fat} carb={prop.carb} protein={prop.protein}/>
      <div className='font-bold py-4'>
        <h4 className='text-md'>Out of {prop.calories} total Calories:</h4>
        <div className='font-bold px-4'>
          <h4>Out of {fatCal}Cals were from fats</h4>
          <h4>Out of {proteinCal}Cals were from proteins</h4>
          <h4>Out of {carbCal}Cals were from carbs</h4>
        </div>
      </div>
    </div>
  )
}

export const Dashboard = () => {

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
              <CircularProgressBar numerator="2700" denominator="2500" protein="208" carbs="208" fat="92"/>

              <div className="flex gap-x-4">
                <Button className="text-defaultText bg-secondary font-bold text-sm">Adjust Calorie Goal</Button>
              </div>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-3xl font-bold text-defaultText text-center">Today's Macronutrients</h2>
              <MacronutrientSection fat="12" carb="70.6" protein="24.8" calories="2500"/>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold text-defaultText text-center">Today's Meals</h2>
            </div>

            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-3xl font-bold text-defaultText text-center">Extra Data</h2>
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
              <HistoryProgress date="Sunday" calories="2670" totalCalories="2500"/>
              <HistoryProgress date="Monday" calories="1400" totalCalories="2500"/>
              <HistoryProgress date="Tuesday" calories="1250" totalCalories="2500"/>
              <HistoryProgress date="Wednesday" calories="0" totalCalories="2500"/>
              <HistoryProgress date="Thursday" calories="0" totalCalories="2500"/>
              <HistoryProgress date="Friday" calories="0" totalCalories="2500"/>
              <HistoryProgress date="Saturday" calories="0" totalCalories="2500"/>
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
