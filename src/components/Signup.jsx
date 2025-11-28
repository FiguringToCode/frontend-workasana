import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://backend-workasana-livid.vercel.app/user/signup', data, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 201){
                    reset()
                    toast.success('Signed-Up Successfully')
                    navigate('/')
                }

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error Signing-Up' 
            toast.error(errorMsg)
            console.log(error.response?.data || error.message)
        }
    }

    return (
        <>
            <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-5">

                <div className="absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl blur-3xl opacity-75 transition-opacity duration-200 hover:opacity-100"></div>

                <section className="relative w-full max-w-md mx-auto my-20 px-5 py-3 flex flex-col border-2 rounded-xl border-gray-700 bg-black bg-opacity-90 text-gray-100 shadow-lg">
                        <img src="/Untitled design.png" alt="app-img" className="w-36 max-w-full self-center mb-4" />
                        <h1 className="text-2xl font-semibold mb-2 text-center">Signup to Workasana</h1>
                        <p className="text-gray-400 text-lg mb-6 text-center">Please enter you details</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="py-2">
                            <div className="text-left px-6 mb-5">
                                <label htmlFor="username">Username</label><br />
                                <input className="border-2 border-gray-600 bg-gray-900 p-2 w-full rounded-md focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" {...register('username', {required: true, minLength: 5})} id="username" type="text" name="username" disabled={isSubmitting} placeholder="Enter your username" />   
                                {errors.username?.type === "required" && <p className="text-red-500">Username is required</p>}
                                {errors.username?.type === "minLength" && <p className="text-red-500">Username must be at least 5 characters.</p>}
                            </div>
                            <div className="text-left px-6 mb-5 relative">
                                <label htmlFor="password">Password</label><br />
                                <input className="border-2 border-gray-600 bg-gray-900 p-2 w-full rounded-md focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" {...register('password', {required: true, minLength: 5})} id="password" type={showPassword ? "text" : "password"} name="password" disabled={isSubmitting} placeholder="Enter Password" />
                                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute top-8 -right-2 text-gray-400 hover:text-pink-600 transition">
                                    {showPassword ? <FaEye className="w-6 h-6" /> : <FaEyeSlash className="w-6 h-6" />}</button>
                                {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                                {errors.password?.type === "minLength" && <p className="text-red-500">Password must be atleast 5 characters</p>}
                            </div>
                            <div className="text-left px-6 mb-5">
                                <label htmlFor="email">Email</label><br />
                                <input className="border-2 border-gray-600 bg-gray-900 p-2 w-full rounded-md focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition" {...register('email', {required: true, pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address."} })} id="email" type="email" name="email" disabled={isSubmitting} placeholder="Enter your Email" />
                                {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}
                                {errors.email?.type === "pattern" && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="text-center mt-10">
                                <input className="cursor-pointer py-2 px-5 rounded-md border-2 border-blue-600 text-blue-600 font-semibold transition-colors hover:text-white hover:bg-blue-600 disabled-opacity-50" type="submit" disabled={isSubmitting} value={isSubmitting ? "Signing-Up" : "Sign-Up"} />
                            </div>
                        </form>
                </section>

            </div>
        </>
    )
}