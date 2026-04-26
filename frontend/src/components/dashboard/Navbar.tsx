import React, { FC } from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface DashboardNavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userData?: {
        name?: string;
        [key: string]: any;
    };
    handleLogout?: () => void;
}

const Navbar: FC<DashboardNavbarProps> = ({ sidebarOpen, setSidebarOpen, userData, handleLogout }) => {
    // Get company data from localStorage
    const companyData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}');
    const companyName = companyData.company?.name || companyData.companyName || 'BrooksBridge';

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full flex justify-center  px-4">
            <div className="w-full max-w-10xl bg-white/30 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 px-6 py-3 flex items-center justify-between">
                {/* Logo and Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-black hover:text-black/80 transition"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <div className="text-black font-semibold text-lg tracking-wide flex gap-2 hover:opacity-80 transition-opacity">
                        <div>
                            <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
                        </div>
                        <span style={{ fontFamily: "inter, 'Playfair Display', serif", letterSpacing: "0.05em" }}>BrooksBridge</span>
                    </div>
                </div>

                {/* Company Name - Center */}
                <div className="flex-1 flex justify-center">
                    <h1 className="text-xl font-bold-900  text-black tracking-wide"
                        style={{
                            fontFamily: "inter, 'Playfair Display', serif",
                            letterSpacing: "0.05em",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.2)",
                            fontWeight: "900"
                        }}>
                        {companyName}
                    </h1>
                </div>

                {/* Right side items */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative text-black/80 hover:text-black transition">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User profile button */}
                    <button className="flex items-center gap-2 text-black/80 hover:text-black transition">
                        <div className="w-8 h-8 bg-black/20 border border-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white text-sm font-medium">
                                {userData?.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <span className="hidden lg:block text-sm text-black">
                            {userData?.name?.split(' ')[0] || 'User'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
