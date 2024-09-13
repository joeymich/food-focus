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

                <p className="text-defaultText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis tellus vel urna accumsan, id rhoncus velit sodales. Nulla dictum vitae lacus ut efficitur. Pellentesque imperdiet a dolor vel iaculis. Aenean non ligula erat. Aenean convallis imperdiet mi, ac molestie libero. Pellentesque turpis sapien, venenatis sit amet lobortis ac, euismod non arcu. Nullam est est, scelerisque nec mauris a, facilisis suscipit urna. Nullam pretium a leo vitae dapibus. Nunc malesuada non lectus ac placerat. Cras convallis urna arcu, nec scelerisque magna egestas cursus. Nam sollicitudin feugiat nibh, ac facilisis mi iaculis sit amet.</p>
            </div>

        </div>
        </>
    )
}