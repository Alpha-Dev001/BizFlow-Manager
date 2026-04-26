import { FC, useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthPageLayout from '../../components/AuthPageLayout'
import toast from 'react-hot-toast'

interface FormData {
    name: string
    phone: string
    email: string
    password: string
    agreeToTerms: boolean
}

const Signup: FC = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        password: "",
        agreeToTerms: false
    })
    const [errors, setErrors] = useState<Partial<FormData>>({})

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => setIsLoaded(true), 100)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            toast.error('Name is required')
            return false
        }

        if (!formData.email.trim()) {
            toast.error('Email is required')
            return false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid')
            return false
        }

        if (!formData.password) {
            toast.error('Password is required')
            return false
        } else if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return false
        }

        if (!formData.agreeToTerms) {
            toast.error('You must agree to the terms')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateForm()) {
            // Store user data temporarily for company info step
            localStorage.setItem('tempUserData', JSON.stringify(formData))
            toast.success('Account created successfully!')
            console.log('Signup data:', formData)

            // Redirect to OTP verification after successful signup
            setTimeout(() => {
                navigate('/otp-verification', { state: { email: formData.email } })
            }, 1500)
        }
    }

    const passwordRequirements = [
        { regex: /.{8,}/, text: 'At least 8 characters' },
        { regex: /[A-Z]/, text: 'One uppercase letter' },
        { regex: /[a-z]/, text: 'One lowercase letter' },
        { regex: /[0-9]/, text: 'One number' }
    ]

    return (
        <AuthPageLayout
            title="Create Account"
            description="Join Brooks Bridge and streamline your business"
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkTo="/login"
            asideTitle="Transform Your Business Today"
            asideText="Join thousands of businesses that trust Brooks Bridge for their legal and business needs."
        >
            <form onSubmit={handleSubmit} className={`space-y-3 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* Name Field */}
                <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                </div>

                {/* Phone Field */}
                <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-8 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded focus:ring-black/50 accent-black mt-1"
                        required
                    />
                    <label className="text-sm text-gray-600">
                        I agree to the terms and conditions
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
                >
                    Create Account
                </button>
            </form>
        </AuthPageLayout>
    )
}

export default Signup
