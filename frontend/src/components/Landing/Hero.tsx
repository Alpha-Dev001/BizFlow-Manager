import { FC } from 'react'
import { Building2, Users, MessageSquare, Calculator, Settings, TrendingUp, Shield, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero: FC = () => {
    const navigate = useNavigate()

    const handleStartTrial = () => {
        navigate('/signup')
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">

            {/* SIDE GRADIENTS */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[900px] h-[900px] rounded-full overflow-hidden
                    bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] 
                    bg-[size:50px_50px] 
                    opacity-15"
                />
            </div>

            {/* BOTTOM FADE GRADIENT */}
            <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            {/* CONTENT */}
            <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">

                {/* Headline */}
                <h2 className="text-6xl md:text-9xl font-black text-black mt-30 leading-[1.1] tracking-tight animate-slide-down" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 60px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.6), 0 0 100px rgba(255,255,255,0.4), 6px 6px 12px rgba(0,0,0,0.9), 12px 12px 24px rgba(0,0,0,0.7)' }}>
                    <span className='inline-block text-black' style={{ filter: 'brightness(0.8) contrast(1.5)', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 4px 4px 8px rgba(0,0,0,0.7), 6px 6px 12px rgba(0,0,0,0.5)' }}> Brooks Bridge</span>
                    <br />
                    <span className="text-black/80 font-semibold text-2xl md:text-4xl animate-slide-up inline-block" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 30px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2), 3px 3px 6px rgba(0,0,0,0.9), 6px 6px 12px rgba(0,0,0,0.7)', filter: 'brightness(1.3) contrast(1.1)' }}>Streamline Your Entire  Company</span>
                </h2>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-black/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up">
                    Enhance communication, and automate payroll. All in one unified platform designed to be a backbone for modern businesses.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

                    {/* Primary */}
                    <button
                        onClick={handleStartTrial}
                        className="px-10 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                        style={{
                            textShadow: '0 0 10px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.8)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.3), 0 6px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
                        }}
                        onMouseOver={(e) => {
                            const target = e.target as HTMLButtonElement
                            target.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)'
                            target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4), 0 8px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }}
                        onMouseOut={(e) => {
                            const target = e.target as HTMLButtonElement
                            target.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
                            target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3), 0 6px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}>
                        Start Your 14-day Free Trial
                    </button>

                </div>

            </div>
        </section>
    )
}

export default Hero
