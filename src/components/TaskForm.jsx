import { useContext } from "react"
import AuthContext from "../../AuthContext"
import { IoCloseCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";



export const TaskForm = ({ currentTaskId }) => {
    const {showForm, setShowForm, projects, teams, fetchTasks, token} = useContext(AuthContext)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const isUpdatedMode = !!currentTaskId

    const onTaskSubmit = async (data) => {
        try {
            let response
            if(isUpdatedMode){
                console.log(data.status)
                response = await axios.post(`https://backend-workasana-livid.vercel.app/tasks/status/${currentTaskId}`,
                    { status: data.status },
                    { headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    } }
                )
            } else {
                response = await axios.post("https://backend-workasana-livid.vercel.app/tasks", data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    })
            }
            
                if(response.status === 201 || response.status === 200){
                    reset()
                    if(isUpdatedMode){
                        toast.success('Task Status Updated Successfully')
                        fetchTasks()
                    } else {
                        toast.success('New Task Added')
                        fetchTasks()
                    }
                }

        } catch (error) {
            const errorMsg = error.response?.data?.message || `Error ${isUpdatedMode ? 'updating' : 'adding'} task`
            toast.error(errorMsg)
            console.log(error.message)
        }
    }


    return (
        <>
        
            {showForm && (
                <div className="fixed inset-0 bg-opacity-50 flex flex-col items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full min-h-min">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-4 font-semibold">{isUpdatedMode ? 'Update Task Status' : 'Add New Task'}</h2>
                            <button className="mb-4 px-2 py-1 bg-pink-600 text-white rounded cursor-pointer" onClick={() => setShowForm(false)}><IoCloseCircle size={25} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onTaskSubmit)}>
                            {isUpdatedMode ? (
                                <div className="pb-2">
                                <label htmlFor="status" className="text-lg text-indigo-600 font-semibold">New Status:</label>
                                <select className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" {...register('status', { required: true })} id="status" defaultValue="">
                                    <option value="">Select New Status</option>
                                    {['To Do', 'In Progress', 'Completed', 'Blocked'].map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {errors.status?.type === "required" && <p className="text-red-500">Status is required</p>}
                                </div>
                            ) : (
                                <>
                                    <div className="pb-2">
                                        <label htmlFor="name" className="text-lg text-indigo-600 font-semibold">Name:</label>
                                        <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register('name', {required: true, minLength: 5})} id="name" disabled={isSubmitting} placeholder="Enter Task Name" />
                                        {errors.name?.type === "required" && <p className="text-red-500">Task name is required</p>}
                                        {errors.name?.type === "minLength" && <p className="text-red-500">Task name must be at least 5 characters</p>}
                                    </div>
                                    <div className="pb-2">
                                        <label htmlFor="project" className="text-lg text-indigo-600 font-semibold">Project Name:</label>
                                        <select className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" name="project" {...register('project', {required: true})} id="project" disabled={isSubmitting}>
                                            <option value="">Select Project</option>
                                            {projects?.map(pro => (<option value={pro._id}>{pro.name}</option>))}
                                        </select>
                                        {errors.project?.type === "required" && <p className="text-red-500">Select Project Name</p>}
                                    </div>
                                    <div className="pb-2">
                                        <label htmlFor="team" className="text-lg text-indigo-600 font-semibold">Team:</label>
                                        <select className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" name="team" {...register('team', {required: true})} id="name" disabled={isSubmitting}>
                                            <option value="">Select Team</option>
                                            {teams?.map(tea => (<option value={tea._id}>{tea.name}</option>))}
                                        </select>
                                        {errors.team?.type === "required" && <p className="text-red-500">Select Team Name</p>}
                                    </div>
                                    <div className="pb-2">
                                        <label htmlFor="time" className="text-lg text-indigo-600 font-semibold">Time to Complete:</label>
                                        <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="number" {...register('timeToComplete', {required: true, min: 1})} id="time" disabled={isSubmitting} placeholder="Enter Hours to Complete Task" />
                                        {errors.timeToComplete?.type === "required" && <p className="text-red-500">Time to complete is required</p>}
                                        {errors.timeToComplete?.type === "minLength" && <p className="text-red-500">Time must be above 1</p>}
                                    </div>
                                    <div className="pb-2">
                                        <label htmlFor="tags" className="text-lg text-indigo-600 font-semibold">Tags:</label>
                                        <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register(['tags'], {required: true, minLength: 3})} id="tags" disabled={isSubmitting} placeholder="Enter Tag for Task" />
                                        {errors.tags?.type === "required" && <p className="text-red-500">Tag for task is required</p>}
                                        {errors.tags?.type === "minLength" && <p className="text-red-500">Task name must be at least 3 characters</p>}
                                    </div>
                                    <div className="pb-2">
                                        <label htmlFor="status" className="text-lg text-indigo-600 font-semibold">Status:</label>
                                        <select className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" name="status" {...register('status', {required: true})} id="status" disabled={isSubmitting}>
                                            <option value="">Select Task Status</option>
                                            {['To Do', 'In Progress', 'Completed', 'Blocked']?.map(status => (<option value={status}>{status}</option>))}
                                        </select>
                                        {errors.status?.type === "required" && <p className="text-red-500">Select Task Status</p>}
                                    </div>
                                </>
                            )}
                            <div className="text-center mt-10">
                                <input className="cursor-pointer py-2 px-5 rounded-md border-2 border-indigo-600 text-indigo-600 font-semibold transition-colors hover:text-white hover:bg-indigo-600 disabled-opacity-50" type="submit" disabled={isSubmitting} value={isSubmitting ? (isUpdatedMode ? "Updating..." : "Adding") : (isUpdatedMode ? "Update Status" : "Add Task")} />
                            </div>
                        </form>
                    </div>
    
    
                </div>
            )}

        </>
    )
}