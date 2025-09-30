"use client"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff, Chrome, Facebook } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/layout/foorter";
import Header from "@/components/layout/header";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login attempt:", formData)
        // Add your login logic here
    }

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`)
        // Add your social login logic here
    }

    return (
        <>
        <Header/>
        <div className="bg-white min-h-screen dark:bg-slate-800 flex items-center justify-center p-4 bg-[url('/illustration.svg')] bg-center bg-no-repeat bg-size-50 bg-center">
            <div className=" w-full max-w-4xl">
                <div className="dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Side - Email/Password Login */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl text-gray-900 dark:text-white mb-2">
                                        Login
                                    </h1>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 placeholder:text-sm dark:placeholder-gray-400"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 placeholder:text-sm dark:placeholder-gray-400"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-customgreen focus:ring-customgreen" />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                                        </label>
                                        <Link href="/forgot-password" className="text-sm text-customgreen hover:text-customgreen/80">
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <Button 
                                        type="submit"
                                        className="w-full bg-customgreen hover:bg-customgreen/90 text-white font-medium py-3 rounded-full transition-colors"
                                    >
                                        Sign In
                                    </Button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Don&apos;t have an account?{" "}
                                        <Link href="/signup" className="text-customgreen hover:text-customgreen/80 font-medium">
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Social Login */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                            {/* Separator */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <div className="relative">
                                    <div className="w-px h-[400] bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-slate-800 px-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-slate-800 p-4 ">or</span>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-md mx-auto w-full pl-8 lg:pl-12">
                                <div className="space-y-4">
                                    <Button
                                        onClick={() => handleSocialLogin("google")}
                                        variant="outline"
                                        className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <FcGoogle className="h-6 w-6 text-red-500" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Google</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleSocialLogin("facebook")}
                                        variant="outline"
                                        className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <FaFacebook className="h-6 w-6 text-blue-600" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Facebook</span>
                                    </Button>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        By signing in, you agree to our{" "}
                                        <Link href="/terms" className="text-customgreen hover:text-customgreen/80">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-customgreen hover:text-customgreen/80">
                                            Privacy Policy
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}