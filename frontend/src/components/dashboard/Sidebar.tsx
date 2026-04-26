import { FC } from 'react'
import { Home, Building2, DollarSign, Settings, X, LogOut, Crown, Star } from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    activeSection: 'dashboard' | 'departments' | 'payroll' | 'settings'
    setActiveSection: (section: 'dashboard' | 'departments' | 'payroll' | 'settings') => void
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, activeSection, setActiveSection }) => {
    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('hrDashboardUser')
        localStorage.removeItem('tempUserData')

        // Redirect to login page
        window.location.href = '/login'
    }

    const navItems = [
        { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
        { id: 'departments' as const, label: 'Departments', icon: Building2 },
        { id: 'payroll' as const, label: 'Payroll', icon: DollarSign },
        { id: 'settings' as const, label: 'Settings', icon: Settings },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div className="bg-black/90 backdrop-blur-xl shadow-2xl border border-white/20 p-6 w-64 h-screen">
                    {/* App Logo and Name */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center">
                            <img src="/logo.png" alt="Brooks Bridge Logo" className="h-10 w-10 rounded-sm" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg">Brooks Bridge</h1>
                            <p className="text-white/60 text-xs">HR Management</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden ml-auto text-white/80 hover:text-white transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveSection(item.id)
                                        onClose()
                                    }}
                                    className={`w-full flex items-center px-4 py-3 text-left rounded-sm transition-all ${activeSection === item.id
                                        ? 'bg-white text-black border border-white/30'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>

                    {/* Bottom section */}
                    <div className="mt-8 pt-6 border-t border-gray-600 space-y-4">
                        {/* Upgrade to Pro Card */}
                        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <Crown className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Upgrade to Pro</h3>
                                    <p className="text-white/60 text-xs">Unlock all features</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <Star className="w-3 h-3 text-white/60" />
                                    <span className="text-white/80">Advanced analytics</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <Star className="w-3 h-3 text-white/60" />
                                    <span className="text-white/80">Unlimited employees</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <Star className="w-3 h-3 text-white/60" />
                                    <span className="text-white/80">Priority support</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-black py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all">
                                Upgrade Now
                            </button>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
