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
                    path: '/dashboard/old',
                    lazy: async () => {
                        const { Dashboard } = await import('@/components/dashboard');
                        return { Component: Dashboard };
                    },
                },
                {
                    path: '/dashboard',
                    lazy: async () => {
                        const { Dashboard2 } = await import('@/components/Dashboard/index');
                        return { Component: Dashboard2 };
                    },
                },
                {
                    path: '/dashboard/search/:date',
                    lazy: async () => {
                        const { Search } = await import('@/components/search');
                        return { Component: Search };
                    }
                }
            ],
        },
        {
            path: '/create-goals',
            lazy: async () => {
                const { CreateGoals } = await import('@/components/create-goals');
                return { Component: CreateGoals };
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
