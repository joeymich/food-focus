import {useEffect, useState} from 'react'


//Code refrecned from https://github.com/whoisseth/progressbar-compoent/blob/master/src/components/ProgressBar.tsx
export function ProgressBar(prop: {numerator: number; denominator:number}) {
    const numerator = prop.numerator;
    const denominator = prop.denominator;
    const[percentage, setPercentage] = useState(0.0);
    const[hasPassedMax, setHasPassedMax] = useState(false);
    const[extraPercentage, setExtraPercentage] = useState(0.0);

    useEffect(() => {
        setPercentage((numerator/denominator) * 100)
    }, [numerator, denominator])

    useEffect(() => {
        if(percentage > 100) {
            setHasPassedMax(true);
            setPercentage(100);
            calulateExtraPercentage();
        }
    }, [percentage])

    function calulateExtraPercentage() {
        const timesBigger = Math.floor(numerator / denominator);
        const smallerNumerator = (numerator/timesBigger) - denominator;
        setExtraPercentage(((smallerNumerator/denominator)) * 100);
        console.log(timesBigger + " " + smallerNumerator + " " + extraPercentage);
    }

    function changeBackgroundColor() {
        if(hasPassedMax) {
            return "w-full bg-accent rounded-full h-2.5 dark:bg-accent-700 flex"
        } else {
            return "w-full bg-gray-300 rounded-full h-2.5 dark:bg-accent-700 flex"
        } 
    }

    return (
    <div className='flex justify-center item-center'>
            
            <div className={changeBackgroundColor()}>
                {hasPassedMax ?(
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${extraPercentage}%` }}></div>
                ) : (
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                )}
            </div>
       
    </div>
    )
}