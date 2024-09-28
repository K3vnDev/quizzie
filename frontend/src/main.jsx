import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage } from './components/landingPage/LandingPage/LandingPage.jsx'
import { PlayPage } from './components/playPage/PlayPage/PlayPage.jsx'
import { EditPage } from './components/editPage/EditPage/EditPage.jsx'
import { LoginPage } from './components/loginPage/LoginPage/LoginPage.jsx'
import { DashboardPage } from './components/dashboardPage/DashboardPage/DashboardPage.jsx'
import { BrowsePage } from './components/browsePage/BrowsePage/BrowsePage.jsx'
import './index.css'
import { PageNotFound } from './components/root/NotFound/NotFound.jsx'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/play', element: <PlayPage /> },
  { path: '/edit', element: <EditPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/browse', element: <BrowsePage /> },
  { path: '*', element: <PageNotFound /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
