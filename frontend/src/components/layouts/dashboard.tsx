import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

// navbar and stuff should go in here
export const DashboardLayout = () => {
    return (
        <>
            <Navbar isAuth={true} />
            <Outlet />
        </>
    )
}