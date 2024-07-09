import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './routes/LandingPage/LandingPage.jsx'
import PlayPage from './routes/PlayPage/PlayPage.jsx'
import EditPage from './routes/EditPage/EditPage.jsx'
import { LoginPage } from './routes/LoginPage/LoginPage.jsx'
import { DashboardPage } from './routes/DashboardPage/DashboardPage.jsx'
import { BrowsePage } from './routes/BrowsePage/BrowsePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/play',
    element: <PlayPage />
  },
  {
    path: '/edit',
    element: <EditPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/browse',
    element: <BrowsePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
