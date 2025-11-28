import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthContext from "../../AuthContext";
import { Sidebar } from "../components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TaskForm } from "../components/TaskForm";

export const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen, setToken, tasks, loading1, projects, loading, showForm, setShowForm, token, fetchTasks } = useContext(AuthContext);

  const [projectStatus, setProjectStatus] = useState('All')
  const filteredProjects = projectStatus === 'All' ? tasks : tasks.filter(task => task.status === projectStatus)   

  const navigate = useNavigate()
  const logout = () => {
          setToken(null)
          localStorage.removeItem('token')
          toast.success('Logged-out successfully')

          setTimeout(() => {
            navigate('/')
          }, 1000)
    }

    const onTaskSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post("https://backend-workasana-livid.vercel.app/tasks", data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 201){
                    reset()
                    toast.success('New Task Added')
                    fetchTasks()
                }

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error Adding Task'
            toast.error(errorMsg)
            console.log(error.message)
        }
    }


  return (
    <div className='flex bg-black h-max relative'>
        <div>
            {/* sidebar */}
            <Sidebar />
        </div>
        
        <div className={showForm ? "blurred" : ""}>

            {/* main-content */}
            <main className="flex-1 min-w-[82vw]">
                <header className="bg-black bg-opacity-90 flex justify-between lg:p-4 p-2 border-b-2 border-pink-600">
                <button
                    className="p-2 text-2xl lg:hidden z-10 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <GiHamburgerMenu />
                </button>
                <h1 className="text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5">
                    Dashboard
                </h1>
                <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-20 py-1 text-center rounded-lg shadow-lg">
                    <button className="font-semibold text-gray-100 cursor-pointer" onClick={logout}>Logout</button>
                </div>
                </header>
                
                <section className="px-10 py-10">
                    <h1 className="text-3xl font-semibold text-green-400 tracking-wide">Quick Filter:</h1>
                    <div className="flex gap-5 my-2">
                        {['All', 'To Do', 'In Progress', 'Completed', 'Blocked'].map(status => (
                            <button key={status} className="border-2 my-3 border-indigo-600 text-indigo-600 hover:text-gray-200 hover:bg-indigo-600 hover:scale-105 transition-transform px-4 py-2 font-semibold rounded-lg " onClick={() => setProjectStatus(status)}>
                                {status}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="pb-10 px-10">
                    <h1 className="text-3xl font-semibold text-green-400 tracking-wide">My Tasks:</h1>
                    <div className="bg-white/10 p-5 shadow-lg shadow-neutral-800 rounded-lg my-8 min-h-min">
                        {filteredProjects && filteredProjects.length > 0 ? filteredProjects?.map((task, index) => (
                            <Link key={index} to={`/tasks/${task._id}`} className="flex py-3">
                                <h2 className="text-pink-400 text-xl font-bold">Task {index + 1}</h2>
                                <p className="text-gray-50 font-bold text-xl mx-3">:-</p>
                                <p className="text-gray-400 font-bold text-xl">{task.timeToComplete == 0 ? "[ Task is Completed ]" : `[ Completes by ${task.timeToComplete/24} hrs ]` } [ {task?.owners?.map(own => own.username)} ]</p>
                            </Link>
                        )) : loading1 ? (
                            <div className="col-span-full flex justify-center items-center">
                                <div className="w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
                                <p className="text-green-400 text-lg mx-2">Loading Tasks...</p>
                            </div>
                        ) : <p className="text-xl font-semibold text-red-400">No Tasks Found</p>}
                    </div>
                </section>
                
                <section className="pb-10 px-10">
                    <h1 className="text-3xl font-semibold text-green-400 tracking-wide">Projects:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-4">
                        {projects && projects.length > 0 ? projects?.map(project => (
                            <div key={project._id} onClick={() => navigate(`/project/${project._id}`)} className="bg-white/10 p-5 shadow-lg shadow-neutral-800 rounded-lg hover:scale-105 transition-transform cursor-pointer ">
                                <h2 className="text-xl text-pink-400 font-bold">{project.name}</h2>
                                <p className="text-md text-gray-300 mt-2">{project.description}</p>
                            </div>
                        )) : loading ? (
                            <div className="col-span-full flex justify-center items-center">
                                <div className="w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
                                <p className="text-green-400 text-lg mx-2">Loading Projects...</p>
                            </div>
                        ) : <p className="text-xl font-semibold text-red-400">No Projects Found</p>}
                    </div>
                </section>

                <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-70 text-center rounded-lg shadow-lg mx-10 mb-10">
                    <button className="text-xl my-3 px-15 font-semibold text-gray-100 cursor-pointer" onClick={() => setShowForm(!showForm)}>Add New Task</button>
                </div>
            </main>

        </div>

        <TaskForm />
    </div>
  );
};
