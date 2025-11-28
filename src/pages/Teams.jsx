import { Sidebar } from "../components/Sidebar"
import { useState, useContext } from "react"
import AuthContext from "../../AuthContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";




export const Teams = () => {
    const { sidebarOpen, setSidebarOpen, teams, fetchTeams, loading2, token } = useContext(AuthContext)
    console.log(teams)

    const [showTeamForm, setShowTeamForm] = useState(false)

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

    const onTeamSubmit = async (data) => {
        try {
            let response = await axios.post("https://backend-workasana-livid.vercel.app/teams", data, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200 || response.status === 201){
                    reset()
                    toast.success("New Team Added")
                    fetchTeams()
                }

        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error Adding Team"
            toast.error(errorMsg)
            console.log(error.message)
        }
    }

    return (
        <div className="flex bg-black h-max">

            <div>
                <Sidebar />
            </div>

            <div className={showTeamForm ? "blurred" : ""}>
                <main className="flex-1 min-w-screen lg:min-w-[82vw]">

                    <header className="bg-black bg-opacity-90 flex justify-stretch lg:justify-center p-4 border-b-2 border-pink-600">
                        <button className="p-2 text-2xl lg:hidden z-10 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <GiHamburgerMenu />
                        </button>
                        <h1 className="text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5">
                            Teams Management
                        </h1>
                    </header>

                    <section className="px-10 py-10">
                        <h1 className="text-3xl font-semibold text-green-400 tracking-wide text-center">Teams List</h1>
                        {teams && teams.length > 0 ? (
                            teams.map((team, index) => (
                                <>
                                    <h1 className="text-3xl font-semibold text-green-400 tracking-wide pt-10 pb-3 px-20">Team {index+1} : <span className="text-gray-100">{team.name}</span></h1>
                                    <h1 className="text-2xl font-semibold text-green-400 tracking-wide pb-10 px-20">Description : <span className="text-gray-100 text-2xl">{team.description}</span></h1>
                                </>
                            ))
                        ) : loading2 ? (
                            <div className="flex justify-center items-center my-8">
                                <div className="w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
                                <p className="text-green-400 text-lg mx-2">Loading Projects...</p>
                            </div>
                        ) : (<p className="text-xl font-semibold text-red-400 my-6">No Teams Found</p>)}
                    </section>

                    <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 w-70 text-center rounded-lg shadow-lg mx-30 mb-10">
                        <button className="text-xl my-3 px-15 font-semibold text-gray-100 cursor-pointer" onClick={() => setShowTeamForm(!showTeamForm)}>Add New Team</button>
                    </div>

                </main>
            </div>

            {showTeamForm && (
                <div className="fixed inset-0 bg-opacity-50 flex flex-col items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full min-h-min">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-4 font-semibold">Add New Team</h2>
                            <button className="mb-4 px-2 py-1 bg-pink-600 text-white rounded cursor-pointer" onClick={() => setShowTeamForm(false)}><IoCloseCircle size={25} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onTeamSubmit)}>
                            <div className="pb-2">
                                <label htmlFor="name" className="text-lg text-indigo-600 font-semibold">Team Name:</label>
                                <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register('name', {required: true, minLength: 5})} id="name" disabled={isSubmitting} placeholder="Enter Team Name" />
                                {errors.name?.type === "required" && <p className="text-red-500">Team name is required</p>}
                                {errors.name?.type === "minLength" && <p className="text-red-500">Team name must be at least 5 characters</p>}
                            </div>
                            <div className="pb-2">
                                <label htmlFor="description" className="text-lg text-indigo-600 font-semibold">Team Description:</label>
                                <input className="border-2 border-gray-600 w-full p-2 rounded-lg focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" type="text" {...register('description', {required: true, minLength: 10})} id="description" disabled={isSubmitting} placeholder="Enter Team Description" />
                                {errors.description?.type === "required" && <p className="text-red-500">Team description is required</p>}
                                {errors.description?.type === "minLength" && <p className="text-red-500">Team description must be at least 10 characters</p>}
                            </div>
                            <div className="text-center mt-10">
                                <input className="cursor-pointer py-2 px-5 rounded-md border-2 border-indigo-600 text-indigo-600 font-semibold transition-colors hover:text-white hover:bg-indigo-600 disabled-opacity-50" type="submit" disabled={isSubmitting} value={isSubmitting ? "Adding..." : "Add Team"} />
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}