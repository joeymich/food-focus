import { Navbar } from "./ui/Navbar";
import { ProgressBar } from "./ui/progress-bar";
import { Button } from "./ui/button";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import {SetStateAction, useEffect, useState} from 'react'

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

export const WeeklyProgress = () => {
    const[theDate, setTheDate] = useState<dayjs.Dayjs>(dayjs().add(-6, "days"));
    const dateFormat = 'MM-DD-YYYY';
    const dateDBFormat = 'YYYY-MM-DD';

    useEffect(() => {
        const today = dayjs().add(-7,'day');
        console.log(today.toString())
      }, [theDate])

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
            setTheDate(date);
            console.log(date.day());
        }
    }


  
    return (
      <>
        {/*
          Navbar not yet updated to include sessions
          Once sessions are implemented, the contents of the navbar will change
        */}
        <div className="w-screen h-screen bg-background">
        <Navbar />

          <div className='flex-1 justify-center space-y-4'>
  
          <div className='w-full p-4 bg-secondary space-x-4 space-y-4 text-center'>
            <div className='w-full bg-secondary text-center'>
                <h1 className="text-xl font-bold text-defaultText text-center">Select Start Date: </h1>
                <DatePicker
                format="MM-DD-YYYY"
                minDate={dayjs('02-03-2002', dateFormat)}
                maxDate={dayjs(dayjs().add(-6, "days"), dateFormat)}
                onChange={onChange}
                defaultValue={dayjs(dayjs().add(-6, "days"),dateFormat)}
                />

            </div>

                < h1 className="text-4xl font-bold text-defaultText text-center"> Progress from {DayOfTheWeek(theDate)}: {theDate.format(dateFormat)} to {DayOfTheWeek(theDate.add(6, 'days'))}: {theDate.add(6, 'days').format(dateFormat)} </h1>
          </div>
  
            <div className='flex justify-center space-x-4'>
  
              <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                <h1 className="text-4xl font-bold text-defaultText text-center">This Week's Calorie History</h1> 
                {/* Make it gray out when the day not passed */}
                <HistoryProgress date="Sunday" calories={2670} totalCalories={2500}/>
                <HistoryProgress date="Monday" calories={1400} totalCalories={2500}/>
                <HistoryProgress date="Tuesday" calories={1250} totalCalories={2500}/>
                <HistoryProgress date="Wednesday" calories={0} totalCalories={2500}/>
                <HistoryProgress date="Thursday" calories={0} totalCalories={2500}/>
                <HistoryProgress date="Friday" calories={0} totalCalories={2500}/>
                <HistoryProgress date="Saturday" calories={0} totalCalories={2500}/> 
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