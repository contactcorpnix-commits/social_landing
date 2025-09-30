"use client"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link"
import { useState } from "react"
import Footer from "@/components/layout/foorter";
import Header from "@/components/layout/header";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    })
    const [selectedCountry, setSelectedCountry] = useState("+91")
    const [acceptTerms, setAcceptTerms] = useState(false)

    const countries = [
        { code: "+91", name: "India" },
        { code: "+1", name: "USA" },
        { code: "+44", name: "UK" },
        { code: "+61", name: "Australia" },
        { code: "+81", name: "Japan" },
        { code: "+86", name: "China" },
        { code: "+49", name: "Germany" },
        { code: "+33", name: "France" },
        { code: "+7", name: "Russia" },
        { code: "+82", name: "South Korea" }
    ]

    const validatePhoneNumber = (phone, countryCode) => {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '')
        
        switch (countryCode) {
            case "+91": // India
                return /^[6-9]\d{9}$/.test(cleanPhone)
            case "+1": // USA
                return /^[2-9]\d{9}$/.test(cleanPhone)
            case "+44": // UK
                return /^[1-9]\d{9}$/.test(cleanPhone)
            default:
                return cleanPhone.length >= 8 && cleanPhone.length <= 15
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoneChange = (e) => {
        setFormData({
            ...formData,
            phone: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!acceptTerms) {
            alert("Please accept the Terms and Conditions and Privacy Policy")
            return
        }

        if (!validatePhoneNumber(formData.phone, selectedCountry)) {
            alert("Please enter a valid phone number for the selected country")
            return
        }

        console.log("Signup attempt:", { ...formData, countryCode: selectedCountry })
        // Add your signup logic here
    }

    const handleSocialSignup = (provider) => {
        console.log(`Signup with ${provider}`)
        // Add your social signup logic here
    }

    return (
        <>
        <Header/>
        <div className="bg-white min-h-screen dark:bg-slate-800 flex items-center justify-center p-4 bg-[url('/illustration.svg')] bg-center bg-no-repeat bg-size-50 bg-center">
            <div className="w-full max-w-4xl">
                <div className="dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
                        {/* Left Side - Signup Form */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto w-full">
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl text-gray-900 dark:text-white mb-2">
                                        Create Account
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Join us today and get started
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* First Name and Last Name - Side by side on desktop */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                First Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 placeholder:text-sm dark:placeholder-gray-400"
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                Last Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 placeholder:text-sm dark:placeholder-gray-400"
                                                    placeholder="Enter last name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address <span className="text-red-500">*</span>
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

                                    {/* Phone Number with Country Code */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex">
                                            <select
                                                value={selectedCountry}
                                                onChange={(e) => setSelectedCountry(e.target.value)}
                                                className="w-20 pl-2 pr-1 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                            >
                                                {countries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="relative flex-1">
                                                <Phone className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    className="w-full pl-10 pr-4 py-3 border-l-0 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-customgreen focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 placeholder:text-sm dark:placeholder-gray-400"
                                                    placeholder="Enter phone number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password */}
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
                                                placeholder="Create a password"
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

                                    {/* Terms and Conditions Checkbox */}
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                            className="mt-1 rounded border-gray-300 text-customgreen focus:ring-customgreen"
                                        />
                                        <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-300">
                                            I accept the{" "}
                                            <Link href="/terms" className="text-customgreen hover:text-customgreen/80">
                                                Terms and Conditions
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/privacy" className="text-customgreen hover:text-customgreen/80">
                                                Privacy Policy
                                            </Link>{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    <Button 
                                        type="submit"
                                        className="w-full bg-customgreen hover:bg-customgreen/90 text-white font-medium py-3 rounded-full transition-colors"
                                    >
                                        Create Account
                                    </Button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-customgreen hover:text-customgreen/80 font-medium">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Social Signup */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                            {/* Separator */}
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <div className="relative">
                                    <div className="w-px h-[400] bg-gray-300 dark:bg-gray-600"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-slate-800 px-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-slate-800 p-4">or</span>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-md mx-auto w-full pl-8 lg:pl-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
                                        Quick Signup
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Use your social accounts
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        onClick={() => handleSocialSignup("google")}
                                        variant="outline"
                                        className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <FcGoogle className="h-6 w-6" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Google</span>
                                    </Button>

                                    <Button
                                        onClick={() => handleSocialSignup("facebook")}
                                        variant="outline"
                                        className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full"
                                    >
                                        <FaFacebook className="h-6 w-6 text-blue-600" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Facebook</span>
                                    </Button>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        By signing up, you agree to our{" "}
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