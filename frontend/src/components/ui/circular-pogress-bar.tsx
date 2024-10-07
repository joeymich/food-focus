import React , {useEffect, useState} from 'react'


//Code refrecned from preline: https://preline.co/docs/progress.html
export function CircularProgressBar(prop) {
    const numerator = prop.numerator;
    const denominator = prop.denominator;
    const[percentage, setPercentage] = useState(0.0);
    const[hasPassedMax, setHasPassedMax] = useState(false);
    const[extraPercentage, setExtraPercentage] = useState(0.0);

    useEffect(() => {
        setPercentage((1 - (numerator/denominator)) * 100);
     }, [numerator, denominator])

    useEffect(() => {
        if(percentage < 0) {
            setHasPassedMax(true);
            setPercentage(0);
            calulateExtraPercentage();
        }
    }, [percentage])

    function calulateExtraPercentage() {
        const timesBigger = Math.floor(numerator / denominator);
        const smallerNumerator = numerator/timesBigger;
        setExtraPercentage(((smallerNumerator/denominator)) * 100);
    }

    function changeTextColor() {
        if(hasPassedMax) {
            return "text-center text-2xl font-bold text-red-600 dark:text-blue-500"
        } else {
             return "text-center text-2xl font-bold text-accent dark:text-blue-500"
        }
    }

    return (
        <div className="relative size-80">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-accent dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset={percentage} stroke-linecap="round"></circle>
            {hasPassedMax ?(
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600 dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset={-extraPercentage} stroke-linecap="round"></circle>
            ) : null}
        </svg>
        
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 flex">
            <span className={changeTextColor()}>{numerator}/{denominator}<br/>Calories</span>
        </div>
        </div>

    )
}