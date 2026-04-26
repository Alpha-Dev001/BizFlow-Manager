import { FC, useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageLayout from '../../components/AuthPageLayout'
import toast from 'react-hot-toast'

interface FormData {
    email: string
    password: string
}

const Login: FC = () => {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.email.trim()) {
            toast.error('Email is required')
            return
        }
        if (!formData.password) {
            toast.error('Password is required')
            return
        }

        // Check if user exists in localStorage
        const storedData = localStorage.getItem('hrDashboardUser')
        if (storedData) {
            const data = JSON.parse(storedData)
            if (data.user && data.user.email === formData.email) {
                toast.success('Login successful!')
                console.log('Login attempt:', formData)

                // Redirect to dashboard after successful login
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1500)
            } else {
                toast.error('Invalid email or password')
            }
        } else {
            // For demo purposes, allow any login if no data exists
            toast.success('Login successful! (Demo Mode)')
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500)
        }
    }

    const loginIllustration = (
        <svg viewBox="0 0 400 400" className="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.3 }} />
                </linearGradient>
            </defs>
            <circle cx="200" cy="100" r="60" fill="url(#grad1)" stroke="#000" strokeWidth="2" opacity="0.3" />
            <rect x="80" y="200" width="240" height="150" rx="20" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
            <line x1="100" y1="240" x2="300" y2="240" stroke="#000" strokeWidth="2" opacity="0.2" />
            <line x1="100" y1="280" x2="300" y2="280" stroke="#000" strokeWidth="2" opacity="0.2" />
            <circle cx="120" cy="220" r="8" fill="#000" opacity="0.2" />
            <circle cx="120" cy="260" r="8" fill="#000" opacity="0.2" />
            <circle cx="120" cy="300" r="8" fill="#000" opacity="0.2" />
            <text x="200" y="340" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#000" opacity="0.2">Sign In</text>
        </svg>
    )

    return (
        <AuthPageLayout
            title="Welcome Back"
            description="Sign in to your Brooks Bridge account"
            footerText="Don't have an account?"
            footerLinkText="Sign up"
            footerLinkTo="/signup"
            asideTitle="Continue Your Journey"
            asideText="Access your dashboard and manage your legal services seamlessly."
            illustration={loginIllustration}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
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

                {/* Remember Me & Forgot Password */}
                <div className={`flex items-center justify-between transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 border-gray-300 rounded focus:ring-black/50 accent-black"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-black hover:text-black/80 transition-colors">
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </AuthPageLayout>
    )
}

export default Login
