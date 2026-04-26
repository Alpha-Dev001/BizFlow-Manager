import { FC } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

interface FooterLink {
    name: string
    href: string
}

interface FooterLinks {
    product: FooterLink[]
    company: FooterLink[]
    resources: FooterLink[]
    legal: FooterLink[]
}

const footerLinks: FooterLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#" },
        { name: "Roadmap", href: "#" }
    ],
    company: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" }
    ],
    resources: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Support", href: "#" },
        { name: "Status", href: "#" }
    ],
    legal: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Licenses", href: "#" }
    ]
}

const Footer: FC = () => {
    return (
        <footer className="bg-black text-white relative">
            {/* Wave Line with Upper Background */}
            <div className="absolute top-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 60"
                    className="w-full h-12 sm:h-14 md:h-16 lg:h-18"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,30 C240,60 360,10 600,30 C840,50 960,5 1200,30 C1320,40 1380,20 1440,30 L1440,0 L0,0 Z"
                        fill="white"
                    />
                    <path
                        d="M0,30 C240,60 360,10 600,30 C840,50 960,5 1200,30 C1320,40 1380,20 1440,30"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.3"
                    />
                </svg>
            </div>
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: "0.05em" }}>BrooksBridge</h3>
                            <p className="text-white/60 leading-relaxed">
                                The operating system for modern companies. Streamline operations, enhance communication, and automate payroll in one unified platform.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-white/60">
                                <Mail size={18} />
                                <span>brooksbridge@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60">
                                <Phone size={18} />
                                <span>+250 788 607 974</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/60">
                                <MapPin size={18} />
                                <span>Kigali, Rwanda</span>
                            </div>
                        </div>

                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-white/60 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-white/60 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-white/60 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-white/60 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-white/60 text-sm">© 2024 BrooksBridge. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">LinkedIn</a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
