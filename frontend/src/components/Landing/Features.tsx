import { FC } from 'react'
import {
    Users,
    Wallet,
    MessageSquare,
    Layout,
    Video,
    Bell,
    CheckCircle2,
    LucideIcon
} from 'lucide-react'

interface Feature {
    icon: LucideIcon
    title: string
    desc: string
}

const features: Feature[] = [
    { icon: Users, title: "Employee Management", desc: "Organize teams, roles, and permissions with our intuitive hierarchy builder." },
    { icon: Wallet, title: "Smart Payroll", desc: "Automated salaries, tax withholdings, and expense reimbursements globally." },
    { icon: MessageSquare, title: "Real-Time Chat", desc: "Encrypted internal communication with channels and direct messaging." },
    { icon: Layout, title: "Department Organisation", desc: "Visualize your entire company structure with dynamic organizational charts." },
    { icon: Video, title: "Virtual Meetings", desc: "One-click HD video conferencing with built-in screen sharing and recording." },
    { icon: Bell, title: "Instant Alerts", desc: "Stay updated with intelligent push notifications across all your devices." }
]

const Features: FC = () => {
    return (
        <section id='features' className="py-24 px-6 relative overflow-hidden bg-white/40">
            {/* Container */}
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="relative z-10 text-center mt-12 mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Powerful Features
                    </h2>
                    <p className="mt-4 text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
                        Everything you need to run and scale your company — in one unified platform.
                    </p>
                </div>

                {/* Grid */}
                <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                    {features.map((f, i) => {
                        const Icon = f.icon
                        return (
                            <div
                                key={i}
                                className="group relative p-6 rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:border-black/20 transition-all duration-500 cursor-pointer"
                            >
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-black to-black/80 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <Icon size={24} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-black mb-3 group-hover:text-black/90 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {f.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-black/60 leading-relaxed mb-4 group-hover:text-black/70 transition-colors">
                                        {f.desc}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                        <span>Learn more</span>
                                        <CheckCircle2 size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* BOTTOM FADE GRADIENT */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        </section>
    )
}

export default Features
