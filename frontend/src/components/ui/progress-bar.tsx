import React , {useEffect, useState} from 'react'


//Code refrecned from https://github.com/whoisseth/progressbar-compoent/blob/master/src/components/ProgressBar.tsx
export function ProgressBar(prop) {
    const numerator = prop.numerator;
    const denominator = prop.denominator;
    const[percentage, setPercentage] = useState(0.0);

    useEffect(() => {
        setPercentage((numerator/denominator) * 100)
    }, [numerator, denominator])

    return (
    <div className='flex justify-center item-center'>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-accent-700 flex-col">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
       
    </div>
    )
}