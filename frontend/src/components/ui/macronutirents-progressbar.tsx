import {useEffect, useState} from 'react'


//Code refrecned from https://github.com/whoisseth/progressbar-compoent/blob/master/src/components/ProgressBar.tsx
export function MacronutrientProgressBar(prop: {fat:number; protein:number; carb:number}) {
    const fat = prop.fat;
    const protein = prop.protein;
    const carb = prop.carb;
    const[fatPercentage, setFatPercentage] = useState(0.0);
    const[carbPercentage, setCarbPercentage] = useState(0.0);
    const[proteinPercentage, setProteinPercentage] = useState(0.0);

    useEffect(() => {
        //Using the math from https://help.practicebetter.io/hc/en-us/articles/4921636414107-Calculating-Macronutrient-Percentages for the calculations
        const fatCal = fat * 9;
        const proteinCal = protein * 4;
        const carbCal = carb * 4;
        const toatlMacroCal = fatCal + proteinCal + carbCal;

        if(toatlMacroCal == 0) {
            setFatPercentage(0);
            setCarbPercentage(0);
            setProteinPercentage(0);
        } else {
            setFatPercentage(((fatCal/toatlMacroCal) * 100));
            setCarbPercentage(((carbCal/toatlMacroCal) * 100));
            setProteinPercentage(((proteinCal/toatlMacroCal) * 100));
        }

        console.log("fat: " + fatCal + " carb:" + carbCal + " protein: " + proteinCal);
    }, [carb, carbPercentage, fat, fatPercentage, protein, proteinPercentage])


    return (
        <div className='space-y-4'>
            <div className='flex justify-center item-center border-2 border-gray-400'>
                <div className="w-full bg-gray-200 sqaure-full h-24 dark:bg-accent-700 flex">
                    {carb === 0 ? null : (<div className="bg-green-400 h-24 square-full flex justify-center items-center font-bold border-r-2 border-gray-400" style={{ width: `${carbPercentage}%`}}> {Math.round(carbPercentage )}% </div>)}
                    {fat === 0 ? null : (<div className="bg-yellow-400 h-24 square-full flex justify-center items-center font-bold" style={{ width: `${proteinPercentage}%`}}> {Math.round(proteinPercentage)}% </div>)}
                    {protein === 0 ? null : (<div className="bg-blue-400 h-24 sqaure-full flex justify-center items-center font-bold border-l-2 border-gray-400" style={{ width: `${fatPercentage}%`}}> {Math.round(fatPercentage)}% </div>)}
                </div>
            </div>

            <div className='flex justify-between'>
                {/* Code referenced from https://flowbite.com/docs/components/indicators/ */}
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-green-400 rounded-full me-1.5 flex-shrink-0"></span>Carbs: {carb}g</span>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-yellow-400 rounded-full me-1.5 flex-shrink-0"></span>Protein: {protein}g</span>
                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3"><span className="flex w-2.5 h-2.5 bg-blue-400 rounded-full me-1.5 flex-shrink-0"></span>Fat: {fat}g</span> 
            </div>
        </div>

    )
}