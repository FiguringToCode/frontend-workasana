import { useContext } from "react"
import { Sidebar } from "../components/Sidebar"
import AuthContext from "../../AuthContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";



export const TaskDetails = () => {
    const { taskId } = useParams()
    const { showForm, setShowForm, tasks, sidebarOpen, setSidebarOpen } = useContext(AuthContext)
    const TaskDetails = tasks?.find(task => task._id === taskId)
    
    const handleUpdateStatus = () => {
        setShowForm(true)
    }

    return (
        <div className="flex bg-black h-max relative">

            <div>
                {/*Sidebar*/}
                <Sidebar />
            </div>

            <div className={showForm ? "blurred" : ""}>

                {/* main-content */}
                <main className="flex-1 min-w-screen lg:min-w-[82vw] relative">
                    <header className="bg-black bg-opacity-90 flex justify-stretch lg:justify-center p-4 border-b-2 border-pink-600">
                        <button className="p-2 text-2xl lg:hidden z-50 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <GiHamburgerMenu />
                        </button>
                        <h1 className="text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5">
                            Task Details [ {TaskDetails?.name} ]
                        </h1>
                    </header>

                    <section className="px-10 py-10">
                        {TaskDetails ? (
                            <div>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Project Name: <span className="
                                text-gray-100">{TaskDetails?.project.name}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Team Name: <span className="text-gray-100">{TaskDetails?.team.name}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Owners: <span className="text-gray-100">{TaskDetails?.owners.map(own => own.username).join(', ')}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Tags: <span className="text-gray-100">{TaskDetails?.tags.join(", ")}</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide pb-10">Due Time: <span className="text-gray-100">{TaskDetails?.timeToComplete/24} hrs</span> </h1>
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide">Status: <span className="text-gray-100">{TaskDetails?.status}</span> </h1>
                            </div>
                         ) : (<div className="absolute inset-96">
                                <h1 className="text-3xl font-semibold text-green-400 tracking-wide">This Project is not assigned to any task.</h1>
                            </div> 
                        )}
                    </section>

                    <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-70 text-center rounded-lg shadow-lg mx-10 mt-10 mb-10">
                        <button className="text-xl my-3 px-15 font-semibold text-gray-100 cursor-pointer" onClick={handleUpdateStatus}>Update the Status</button>
                    </div>
                </main>
            </div>

            <TaskForm currentTaskId={taskId} />

        </div>
    )
}