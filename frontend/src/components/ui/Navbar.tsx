import React , {useState} from 'react'

/*
    Code refrenced from https://www.youtube.com/watch?v=rla9JZBFbqs&ab_channel=PatrickPan
*/
export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(isMenuOpen)
    }

    return (
        <nav>
            <div className='flex items-center justify-between bg-test p-3'>
                <div className='text-black text-2xl font-bold'>FOOD FOCUS</div>

                {/*Hamburger symbol - appears when the screen is less than half the size*/}
                <div className='md:hidden'>
                    <button className='text-black' onClick={toggleMenu}>
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
                <ul className='hidden md:flex space-x-4'>
                    <li><a href='/' className='text-black'>Home</a></li>
                    <li><a href='#' className='text-black'>Login</a></li>
                    <li><a href='#' className='text-black'>Register</a></li>
                </ul>
            </div>

            {isMenuOpen ?(
                <div className='bg-test2 md:hidden flex flex-col items-end px-4 py-1'>
                    <ul>
                        <li><a href='/' className='text-black'>Home</a></li>
                        <li><a href='#' className='text-black'>Login</a></li>
                        <li><a href='#' className='text-black'>Register</a></li>
                    </ul>
                </div>
            ) : null}
        </nav>
    )
}

