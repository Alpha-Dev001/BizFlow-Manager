import { FC, useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full flex justify-center z-50 px-4">
            <div className="w-full max-w-5xl backdrop-blur-xl bg-gradient-to-r from-black via-black/40 to-black border border-gray-800 shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <a href="#home">
                    <div className="text-white font-semibold text-lg tracking-wide flex gap-2 hover:opacity-80 transition-opacity">
                        <div>
                            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: "0.05em" }}>BrooksBridge</span>
                    </div>
                </a>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-white/80">
                    <a href="#home" className="hover:text-white transition">Home</a>
                    <a href="#features" className="hover:text-white transition">Features</a>
                    <a href="#pricing" className="hover:text-white transition">Pricing</a>
                    <a href="#faq" className="hover:text-white transition">FAQ</a>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link to="/signup" className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition inline-block">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-20 w-[90%] max-w-md backdrop-blur-xl bg-black/90 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col gap-4 text-white md:hidden">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <a href="#features" className="hover:text-white transition">Features</a>
                    <a href="#pricing" className="hover:text-white transition">Pricing</a>
                    <a href="#faq" className="hover:text-white transition">FAQ</a>
                    <Link to="/signup" className="mt-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition inline-block">
                        Get Started
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar
