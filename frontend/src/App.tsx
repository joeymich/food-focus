import { AppProvider } from '@/providers'

import { createRouter } from '@/routes'
import { RouterProvider } from 'react-router-dom'

const AppRouter = () => {
    const router = createRouter()
    return <RouterProvider router={router} />
}

function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App
