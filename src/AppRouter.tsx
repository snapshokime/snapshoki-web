// src/AppRouter.tsx
import {createBrowserRouter, RouterProvider,} from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import DashboardHome from '@/pages/DashboardHome'
import {requireUser} from "@/loaders/requireUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'about', element: <About/>},
            {path: 'contact', element: <Contact/>},
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        loader: requireUser,
        children: [
            {index: true, element: <DashboardHome/>},
            // later: { path: 'settings', element: <Settings /> },
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router}/>
}
