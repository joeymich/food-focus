import React , {useState} from 'react'


//Code refrecned from https://github.com/whoisseth/progressbar-compoent/blob/master/src/components/ProgressBar.tsx
export function ProgressBar({calories}) {

    return (
    <div className='flex justify-center item-center'>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 flex-col">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${calories}%` }}></div>
            </div>
       
    </div>
    )
}