import { Navbar } from "./Navbar"
import { Button } from "./ui/button"
import { useNavigate, useSearchParams } from 'react-router-dom'

/*
    Code refrenced from https://tailwindcss.com/docs
*/

export const Home = () => {
    const [searchParams, _] = useSearchParams()
    const navigate = useNavigate()
    const redirect = searchParams.get('redirect')
    const handlGetStarted = () => {
        navigate(redirect || '/register')
    }

    return (
        <>
            <Navbar isAuth={false} />

            <div className="bg-background h-screen w-screen flex justify-center">

                <div className="flex flex-col max-w-4xl items-center space-y-4 mt-24 mb-44">
                    <h1 className="text-defaultText font-bold text-8xl mt-16 text-center">Welocome to<br />Food Focus</h1>
                    <Button className="bg-primary w-1/4 h-16 font-bold text-xl" onClick={handlGetStarted}> Get Started </Button>

                    <p className="text-defaultText text-center text-xl">Keep track of diet your with Food Focus. <br /> We provide ways in which you can easily and convientiently keep track of your meals.</p>
                </div>

            </div>
        </>
    )
}