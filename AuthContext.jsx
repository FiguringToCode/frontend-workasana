import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const login = (jwt) => {
        setToken(jwt)
        localStorage.setItem('token', jwt)
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showProjectForm, setShowProjectForm] = useState(false)


    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fetchProjects = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get("https://backend-workasana-livid.vercel.app/projects", config)
            setProjects(response.data)
            
        } catch (error) {
            setError(error)
            setProjects([])
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        if(token){
            fetchProjects()
        }
    }, [token])


    const [tasks, setTasks] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [error1, setError1] = useState(null)
    const fetchTasks = async () => {
        setLoading1(true)
        setError1(null)
        try {
            const response = await axios.get("https://backend-workasana-livid.vercel.app/tasks", config)
            setTasks(response.data)

        } catch (error) {
            setError(error)
            setTasks([])
        } finally{
            setLoading1(false)
        }
    }
    useEffect(() => {
        if(token){
            fetchTasks()
        }
    }, [token])


    const [teams, setTeams] = useState([])
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(null)
    const fetchTeams = async () => {
        setLoading2(true)
        setError2(null)
        try {
            const response = await axios.get("https://backend-workasana-livid.vercel.app/teams", config)
            setTeams(response.data)

        } catch (error) {
            setError2(error)
            setTeams([])
        } finally {
            setLoading2(false)
        }
    }
    useEffect(() => {
        if(token){
            fetchTeams()
        }
    }, [token])



    return (
        <AuthContext.Provider value={{token, setToken, login, sidebarOpen, setSidebarOpen, projects, loading, fetchProjects, error, tasks, loading1, error1, fetchTasks, showForm, setShowForm, teams, loading2, error2, fetchTeams, showProjectForm, setShowProjectForm}}>
            {children}
        </AuthContext.Provider>
    )
}