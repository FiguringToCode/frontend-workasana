import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { IoCloseCircle } from "react-icons/io5";



export const ProjectDetails = () => {
    const {projectId} = useParams()
    const { tasks, setSidebarOpen, sidebarOpen, token, fetchTasks, showProjectForm, setShowProjectForm } = useContext(AuthContext)
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    
    const onProjectSubmit = async (data) => {
        try {
            const response = await axios.post("https://backend-workasana-livid.vercel.app/project", data, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    reset()
                    toast.success('New Project Added')
                    fetchTasks()
                }

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error Adding Task'
            toast.error(errorMsg)
            console.log(error)
        }
    }
    
    const projectDetails = tasks?.find(pro => pro.project._id === projectId)

    return (
        <div className="flex bg-black h-max relative">
            <div>
                <Sidebar />
            </div>

            <div className={showProjectForm ? 'blurred' : ''}>

                <main className="flex-1 min-w-screen lg:min-w-[82vw] relative">
                    <header className={`bg-black bg-opacity-90 flex justify-stretch lg:justify-center p-4 border-b-2 border-pink-600`}>
                        <button className="p-2 text-2xl lg:hidden z-50 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <GiHamburgerMenu />
                        </button>
                        <h1 className="text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5">
                            Project Details
                        </h1>
                    </header>

                    <section className="px-10 py-10">
                        {projectDetails ? (
                            <div>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Project Name: <span className="
                                text-gray-100">{projectDetails?.project.name}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Project Description: <span className="text-gray-100">{projectDetails?.project.description}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Team Assigned Name: <span className="text-gray-100">{projectDetails?.team.name}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Project Tags: <span className="text-gray-100">{projectDetails?.tags.join(', ')}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Project Assigned Under: <span className="text-gray-100">{projectDetails?.name}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide">Project Completion Time: <span className="text-gray-100">{projectDetails?.timeToComplete/24} hrs</span> </h1>
                            </div>
                        ) : ( <div className="absolute inset-96">
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide">This Project is not assigned to any task.</h1>
                            </div> 
                        )}
                    </section>

                    <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-70 text-center rounded-lg shadow-lg mx-10 mt-5 mb-10">
                        <button className="text-xl my-3 px-15 font-semibold text-gray-100 cursor-pointer" onClick={() => setShowProjectForm(!showProjectForm)}>Add New Project</button>
                    </div>
                </main>
            </div>

            {showProjectForm && (
                <div className="fixed inset-0 bg-opacity-50 flex flex-col items-center justify-center z-50 mx-5">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full min-h-min">
                        <div className="flex justify-between">
                            <h2 className="text-2xl mb-4 font-semibold">Add New Project</h2>
                            <button className="mb-4 px-2 py-1 bg-pink-600 text-white rounded cursor-pointer" onClick={() => setShowProjectForm(false)}><IoCloseCircle size={25} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onProjectSubmit)}>
                            <div className="pb-2">
                                <label htmlFor="name" className="text-lg text-indigo-600 font-semibold">Project Name:</label>
                                <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register('name', {required: true, minLength: 5})} id="name" disabled={isSubmitting} placeholder="Enter Project Name" />
                                {errors.name?.type === "required" && <p className="text-red-500">Project name is required</p>}
                                {errors.name?.type === "minLength" && <p className="text-red-500">Project name must be at least 5 characters</p>}
                            </div>
                            <div className="pb-2">
                                <label htmlFor="description" className="text-lg text-indigo-600 font-semibold">Project Description:</label>
                                <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register('description', {required: true, minLength: 10})} id="description" disabled={isSubmitting} placeholder="Enter Project Description" />
                                {errors.description?.type === "required" && <p className="text-red-500">Project description is required</p>}
                                {errors.description?.type === "minLength" && <p className="text-red-500">Project description must be at least 10 characters</p>}
                            </div>
                            <div className="text-center mt-10">
                                <input className="cursor-pointer py-2 px-5 rounded-md border-2 border-indigo-600 text-indigo-600 font-semibold transition-colors hover:text-white hover:bg-indigo-600 disabled-opacity-50" type="submit" disabled={isSubmitting} value={isSubmitting ? "Adding..." : "Add Project"} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}