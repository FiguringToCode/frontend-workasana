import { Sidebar } from "../components/Sidebar"
import { useState, useContext } from "react"
import AuthContext from "../../AuthContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";


export const Projects = () => {
    const {sidebarOpen, setSidebarOpen, showForm, setShowForm, tasks, loading1} = useContext(AuthContext)
    console.log(tasks)

    const [projectStatus, setProjectStatus] = useState('All')
    const filteredProjects = projectStatus === 'All' ? tasks : tasks.filter(task => task.status === projectStatus)
    const navigate = useNavigate()


    return (
        <div className="flex bg-black h-max">
            <div>
                <Sidebar />
            </div>

            <div className={showForm ? "blurred" : ""}>
                
                <main className="flex-1 min-w-screen lg:min-w-[82vw]">

                    <header className={`bg-black bg-opacity-90 flex justify-stretch lg:justify-center p-4 border-b-2 border-pink-600`}>
                        <button className="p-2 text-2xl lg:hidden z-10 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <GiHamburgerMenu />
                        </button>
                        <h1 className="text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5">
                            Projects
                        </h1>
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
                        <h1 className="text-3xl font-semibold text-green-400 tracking-wide">Task List:</h1>
                    {filteredProjects && filteredProjects.length > 0 ? (
                        <div className="overflow-x-auto my-8">
                            <table className="min-w-full divide-y divide-gray-700 bg-white/10 rounded-md shadow-lg shadow-neutral-800">
                                <thead className="bg-green-400/20 text-green-300">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Task Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Owners</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold">Due</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                {filteredProjects.map((task, index) => (
                                    <tr key={task._id} onClick={() => navigate(`/project/${task.project._id}`)} className="hover:bg-white/20 cursor-pointer transition-colors">
                                        <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                                        <td className="px-6 py-4 text-pink-400 font-semibold">
                                            {task.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">    
                                            {task.owners.map(own => own.username).join(', ')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {task.timeToComplete / 24} hrs
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        ) : loading1 ? (
                            <div className="flex justify-center items-center my-8">
                                <div className="w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
                                <p className="text-green-400 text-lg mx-2">Loading Projects...</p>
                            </div>
                        ) : (<p className="text-xl font-semibold text-red-400 my-6">No Projects Found</p>)
                    }

                    </section>

                    <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-70 text-center rounded-lg shadow-lg mx-10 mt-5 mb-10">
                        <button className="text-xl my-3 px-15 font-semibold text-gray-100 cursor-pointer" onClick={() => setShowForm(!showForm)}>Add New Task</button>
                    </div>

                </main>
            </div>

            <TaskForm />
        </div>
    )
}