import React , {useEffect, useState} from 'react'
import { Navbar } from "./ui/Navbar";
import { CircularProgressBar } from "./ui/circular-pogress-bar";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";


const HistoryProgress = (prop) => {
  //Code referenced from https://www.youtube.com/watch?v=PraIL031lno&ab_channel=StudytonightwithAbhishek
  return (
    <div className="w-full">
              <div className="flex justify-between"> 
                <h3>{prop.date}</h3>
                <span>{prop.calories}/{prop.totalCalories} cals</span>
              </div>
              <ProgressBar numerator={prop.calories} denominator={prop.totalCalories}/>
      </div>
  )
};

export const Dashboard = () => {

  return (
    <>
      <Navbar />

      <div  className="bg-background h-screen w-screen flex justify-center items-start py-8 space-x-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
          <h1 className="text-4xl font-bold text-defaultText text-center">This Week's Calorie History</h1>
          {/*Make it gray out when the day not passed*/}
          <HistoryProgress date="Sunday" calories="2000" totalCalories="2500"/>
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
          <h1 className="text-4xl font-bold text-defaultText text-center">Today's Total Calories</h1>
          {/*Current Numbers are place holders*/}
          <CircularProgressBar numerator="1000" denominator="2500"/>
          <div className="flex gap-x-4">
            <Button className="text-defaultText bg-secondary font-bold text-sm">Add Meal</Button>
            <Button className="text-defaultText bg-secondary font-bold text-sm">Adjust Calorie Goal</Button>
          </div>
        </div>
      </div>
          
    </>
  );
};
