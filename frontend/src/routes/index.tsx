import { createBrowserRouter } from 'react-router-dom'

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: '/',
            lazy: async () => {
                const { Home } = await import('@/components/home')
                return { Component: Home }
            },
        },
        {
            path: '*',
            lazy: async () => {
                const { NotFound } = await import('./not-found')
                return { Component: NotFound }
            },
        },
    ])
}
