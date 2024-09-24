import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: '/',
            lazy: async () => {
                const { Home } = await import('@/components/home');
                return { Component: Home };
            },
        },
        {
            path: '/login',
            lazy: async () => {
                const { Login } = await import('@/components/login');
                return { Component: Login };
            },
        },
        {
            path: '/register',
            lazy: async () => {
                const { Register } = await import('@/components/register');
                return { Component: Register };
            },
        },
        {
            path: '/dashboard',
            lazy: async () => {
                const { Dashboard } = await import('@/components/dashboard');
                return { Component: Dashboard };
            },
        },            
        {
            path: '*',
            lazy: async () => {
                const { NotFound } = await import('./not-found');
                return { Component: NotFound };
            },
        },
    ]);
};
