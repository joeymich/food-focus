import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/dashboard';

import { ProtectedRoute } from './protected';

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
            element: (
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '',
                    lazy: async () => {
                        const { Dashboard } = await import('@/components/dashboard');
                        return { Component: Dashboard };
                    },
                },
            ],
        },
        {
            path: '/d',
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
