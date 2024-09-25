import React , {useState} from 'react'


//Code refrecned from preline: https://preline.co/docs/progress.html
export function CircularProgressBar({calories, totalCalories}) {
    let percentage = (1 - (calories/totalCalories)) * 100;

    return (
        <div className="relative size-80">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset={percentage} stroke-linecap="round"></circle>
        </svg>

        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 flex">
            <span className="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">{calories}/{totalCalories}<br/>Calories</span>
        </div>
        </div>

    )
}