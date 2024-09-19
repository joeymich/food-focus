import { Navbar } from "./ui/Navbar"
import { Button } from "./ui/button"

/*
    Code refrenced from https://tailwindcss.com/docs
*/

export const Home = () => {
    return (
        <>
        <Navbar/>
        
        <div  className="bg-background h-screen w-screen flex justify-center"> 

             <div className="flex flex-col max-w-4xl items-center space-y-4 mt-24 mb-44">
                <h1 className="text-defaultText font-bold text-8xl mt-16 text-center">Welocome to<br/>Food Focus</h1>
                <Button className="text-defaultText bg-secondary w-1/4 h-16 font-bold text-xl"> Get Started </Button>

                <p className="text-defaultText text-center text-xl">Keep track of diet your with Food Focus. <br/> We provide ways in which you can easily and convientiently keep track of your meals.</p>
            </div>

        </div>
        </>
    )
}