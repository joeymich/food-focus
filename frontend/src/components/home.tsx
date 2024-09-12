import { Navbar } from "./ui/Navbar"
import { Button } from "./ui/button"

export const Home = () => {
    return (
        <>
        <Navbar/>
        <div  className="bg-test4 h-screen w-screen flex justify-center"> 

             <div className="max-w-4xl flex flex-col items-center space-y-4">
                <h1 className="font-bold text-8xl mt-40 text-center">Welocome to<br/>Food Focus</h1>
                <Button className="bg-test2 w-1/4 h-16 font-bold text-xl"> Get Started </Button>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis tellus vel urna accumsan, id rhoncus velit sodales. Nulla dictum vitae lacus ut efficitur. Pellentesque imperdiet a dolor vel iaculis. Aenean non ligula erat. Aenean convallis imperdiet mi, ac molestie libero. Pellentesque turpis sapien, venenatis sit amet lobortis ac, euismod non arcu. Nullam est est, scelerisque nec mauris a, facilisis suscipit urna. Nullam pretium a leo vitae dapibus. Nunc malesuada non lectus ac placerat. Cras convallis urna arcu, nec scelerisque magna egestas cursus. Nam sollicitudin feugiat nibh, ac facilisis mi iaculis sit amet.</p>
            </div>
        

        </div>
        </>
    )
}