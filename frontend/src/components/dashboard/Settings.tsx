import { FC, useState, useEffect } from 'react'
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, Building2, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

interface UserData {
    name: string
    email: string
    phone: string
    password: string
    companyName: string
    companyEmail: string
    companyPhone: string
}

const Settings: FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        companyName: '',
        companyEmail: '',
        companyPhone: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [formData, setFormData] = useState<UserData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        companyName: '',
        companyEmail: '',
        companyPhone: ''
    })

    useEffect(() => {
        // Load user data from localStorage
        const storedData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        if (storedData.user && storedData.company) {
            const initialData: UserData = {
                name: storedData.user.name || '',
                email: storedData.user.email || '',
                phone: storedData.user.phone || '',
                password: storedData.user.password || '',
                companyName: storedData.company.name || '',
                companyEmail: storedData.company.email || '',
                companyPhone: storedData.company.phone || ''
            }
            setUserData(initialData)
            setFormData(initialData)
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSaveProfile = () => {
        // Validation
        if (!formData.name.trim()) {
            toast.error('Name is required')
            return
        }
        if (!formData.email.trim()) {
            toast.error('Email is required')
            return
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid')
            return
        }
        if (!formData.phone.trim()) {
            toast.error('Phone number is required')
            return
        }

        // Update localStorage
        const storedData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        storedData.user = {
            ...storedData.user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password || storedData.user.password
        }

        localStorage.setItem('hrDashboardUser', JSON.stringify(storedData))
        setUserData(formData)
        setActiveModal(null)
        toast.success('Profile updated successfully!')
    }

    const handleSaveCompany = () => {
        // Validation
        if (!formData.companyName.trim()) {
            toast.error('Company name is required')
            return
        }
        if (!formData.companyEmail.trim()) {
            toast.error('Company email is required')
            return
        } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
            toast.error('Company email is invalid')
            return
        }

        // Update localStorage
        const storedData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        storedData.company = {
            name: formData.companyName,
            email: formData.companyEmail,
            phone: formData.companyPhone
        }

        localStorage.setItem('hrDashboardUser', JSON.stringify(storedData))
        setUserData(formData)
        setActiveModal(null)
        toast.success('Company information updated successfully!')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-black">Settings</h2>

            {/* User Profile Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">User Profile</h3>
                    <button
                        onClick={() => setActiveModal('profile')}
                        className="flex items-center gap-2 text-black hover:text-black/80 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-black font-medium">{userData.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-black font-medium">{userData.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-black font-medium">{userData.phone}</p>
                    </div>
                </div>
            </div>

            {/* Company Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">Company Information</h3>
                    <button
                        onClick={() => setActiveModal('company')}
                        className="flex items-center gap-2 text-black hover:text-black/80 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p className="text-black font-medium">{userData.companyName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Company Email</p>
                        <p className="text-black font-medium">{userData.companyEmail}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Company Phone</p>
                        <p className="text-black font-medium">{userData.companyPhone}</p>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {activeModal === 'profile' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-black mb-4">Edit Profile</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveProfile}
                                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-black/90 transition"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="flex-1 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Company Modal */}
            {activeModal === 'company' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-black mb-4">Edit Company Information</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Company Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="email"
                                name="companyEmail"
                                value={formData.companyEmail}
                                onChange={handleInputChange}
                                placeholder="Company Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="tel"
                                name="companyPhone"
                                value={formData.companyPhone}
                                onChange={handleInputChange}
                                placeholder="Company Phone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveCompany}
                                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-black/90 transition"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="flex-1 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
