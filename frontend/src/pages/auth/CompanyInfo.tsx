import { FC, useState, useEffect } from 'react'
import { Building2, Phone, Mail } from 'lucide-react'
import AuthPageLayout from '../../components/AuthPageLayout'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface CompanyData {
    companyName: string
    companyPhone: string
    companyEmail: string
}

const CompanyInfo: FC = () => {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [companyData, setCompanyData] = useState<CompanyData>({
        companyName: '',
        companyPhone: '',
        companyEmail: ''
    })

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100)
    }, [])

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCompanyData({
            ...companyData,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validation
        if (!companyData.companyName.trim()) {
            toast.error('Company name is required')
            return
        }
        if (!companyData.companyPhone.trim()) {
            toast.error('Company phone is required')
            return
        }
        if (!companyData.companyEmail.trim()) {
            toast.error('Company email is required')
            return
        } else if (!/\S+@\S+\.\S+/.test(companyData.companyEmail)) {
            toast.error('Company email is invalid')
            return
        }

        // Get temp user data from signup
        const tempUserData = localStorage.getItem('tempUserData')
        const userData = tempUserData ? JSON.parse(tempUserData) : null

        // Prepare complete data for HR dashboard
        const hrDashboardData = {
            user: userData ? {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password
            } : {
                name: 'Admin User',
                email: 'admin@company.com',
                phone: companyData.companyPhone
            },
            company: {
                name: companyData.companyName,
                email: companyData.companyEmail,
                phone: companyData.companyPhone
            },
            departments: [],
            employees: [],
            calendarEvents: [],
            darkMode: false
        }

        // Save to HR dashboard format
        localStorage.setItem('hrDashboardUser', JSON.stringify(hrDashboardData))

        // Clear temporary data
        localStorage.removeItem('tempUserData')

        toast.success('Company information saved successfully!')

        console.log('HR Dashboard Data:', hrDashboardData)

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            navigate('/dashboard')
        }, 2000)
    }

    return (
        <AuthPageLayout
            title="Complete Company Information"
            description="Tell us about your company to personalize your dashboard experience"
            footerText=""
            footerLinkText=""
            footerLinkTo=""
            asideTitle="Build Your Company Profile"
            asideText="Add your company details to get started with a tailored dashboard experience."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Company Name */}
                <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                    </label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            name="companyName"
                            value={companyData.companyName}
                            onChange={handleCompanyChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                            placeholder="Enter company name"
                            required
                        />
                    </div>
                </div>

                {/* Company Phone */}
                <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Phone
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            name="companyPhone"
                            value={companyData.companyPhone}
                            onChange={handleCompanyChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                            placeholder="Enter company phone"
                            required
                        />
                    </div>
                </div>

                {/* Company Email */}
                <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            name="companyEmail"
                            value={companyData.companyEmail}
                            onChange={handleCompanyChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                            placeholder="Enter company email"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Continue to Dashboard
                    </button>
                </div>
            </form>
        </AuthPageLayout>
    )
}

export default CompanyInfo
