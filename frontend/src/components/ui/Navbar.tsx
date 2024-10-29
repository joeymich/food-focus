import {useEffect, useState} from 'react'

/*
    Code refrenced from https://www.youtube.com/watch?v=rla9JZBFbqs&ab_channel=PatrickPan
*/

const ListOfLinks = (prop: {isAuth: boolean}) => {
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(prop.isAuth);
     }, [])


    return (
        <>
            {isLoggedIn ? (
                <>
                    <li><a href='/dashboard' className='text-defaultText underline'>Dashboard</a></li>
                    <li><a href='/create-goals' className='text-defaultText underline'>Set Goals</a></li>
                    <li><a href='/weekly-progress' className='text-defaultText underline'>Weekly Progress</a></li>
                    <li><a href='#' className='text-defaultText underline'>Settings</a></li>
                    <li><a href='/#' className='text-defaultText underline'>Logout</a></li>
                </>
            ) : (
                <>
                    <li><a href='/' className='text-defaultText'>Home</a></li>
                    <li><a href='/login' className='text-defaultText'>Login</a></li>
                    <li><a href='/register' className='text-defaultText'>Register</a></li>
                </>
            )}
           
        </>
    )
}

export function Navbar(prop: {isAuth: boolean}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(isMenuOpen)
    }

    return (
        <nav className='bg-background w-screen p-3 border-2 border-gray-24'>
            <div className='flex items-center bg-background justify-between'>
                <div className='text-defaultText text-2xl font-bold px-4'>FOOD FOCUS</div>

                {/*Hamburger symbol - appears when the screen is less than half the size*/}
                <div className='md:hidden'>
                    <button className='text-defaultText' onClick={toggleMenu}>
                        <svg 
                            fill='none'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linjoin='round'
                            stroke-width='2'
                            viewBox='0 0 24 24'
                            className='w-6 h-6'
                        >
                             <path d="M4 6h16M4 12h16M4 18h16"></path>   
                        </svg>
                    </button>
                </div>

                {/*The links to the website - only appears when the screen is bigger than half of its size*/}
                <ul className='hidden md:flex space-x-4 px-4'>
                    <ListOfLinks isAuth={prop.isAuth}/>
                </ul>
            </div>

            {isMenuOpen ?(
                <div className='bg-background border-b-2 border-gray-24 md:hidden flex flex-col items-end px-4 py-1'>
                    <ul>
                        <ListOfLinks isAuth={prop.isAuth}/>
                    </ul>
                </div>
            ) : null}
        </nav>
    )
}

