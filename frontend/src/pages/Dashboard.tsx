import { FC, useState } from 'react'
import { Home, Building2, DollarSign, Settings } from 'lucide-react'
import Sidebar from "../components/dashboard/Sidebar"
import MainContent from "../components/dashboard/MainContent"

interface HRDashboardUser {
    user?: {
        name?: string
    }
    name?: string
}

const Dashboard: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<'dashboard' | 'departments' | 'payroll' | 'settings'>('dashboard')

    // Get real user data from localStorage
    const userData: HRDashboardUser = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
    const userName = userData.user?.name || userData.name || 'User'

    const handleLogout = () => {
        console.log('Logout clicked')
        // We'll implement logout logic later
    }

    const navItems = [
        { id: 'dashboard' as const, icon: Home, label: 'Dashboard' },
        { id: 'departments' as const, icon: Building2, label: 'Departments' },
        { id: 'payroll' as const, icon: DollarSign, label: 'Payroll' },
        { id: 'settings' as const, icon: Settings, label: 'Settings' }
    ]

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-black/4 to-gray-200 overflow-hidden">

            {/* Content */}
            <div className="relative z-10">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                {/* Welcome Bar */}
                <div className="fixed top-0 left-0 right-0 z-40 bg-white backdrop-blur-xl border-b border-black/20">
                    <div className="px-6 lg:pl-80 pr-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-black font-bold text-xl">Welcome back, {userName}!</h2>
                                <p className="text-black/60 text-base hidden lg:block">Your business overview</p>
                            </div>
                            <div className="text-black/60 text-sm hidden lg:block">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="pt-24 pl-4 lg:pl-68 pr-4 pb-28 lg:pb-4">
                    <MainContent activeSection={activeSection} />
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/20">
                    <div className="flex items-center justify-around py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${activeSection === item.id
                                        ? 'text-white bg-white/10'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mb-1" />
                                    <span className="text-xs">{item.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
