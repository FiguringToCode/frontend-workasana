import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../AuthContext.jsx'
import { Signup } from './components/Signup.jsx'
import { Tasks } from './pages/Tasks.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { ProjectDetails } from './pages/ProjectDetails.jsx'
import { Projects } from './pages/Projects.jsx'
import { TaskDetails } from './pages/TaskDetails.jsx'
import { Teams } from './pages/Teams.jsx'
import { Reports } from './pages/Reports.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/tasks/:taskId',
    element: <TaskDetails />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/project/:projectId',
    element: <ProjectDetails />
  },
  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/teams',
    element: <Teams />
  },
  {
    path: '/reports',
    element: <Reports />
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />      
    </AuthProvider>
  </StrictMode>,
)
