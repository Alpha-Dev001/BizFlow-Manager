import { FC, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Add custom animation styles
const animationStyles = `
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
  }
`

interface AuthPageLayoutProps {
    children: ReactNode
    title: string
    description: string
    footerText: string
    footerLinkText: string
    footerLinkTo: string
    asideTitle: string
    asideText: string
    illustration?: ReactNode
    theme?: 'light' | 'dark'
}

const AuthPageLayout: FC<AuthPageLayoutProps> = ({
    children,
    title,
    description,
    footerText,
    footerLinkText,
    footerLinkTo,
    asideTitle,
    asideText,
    illustration,
    theme = 'light'
}) => {
    return (
        <>
            <style>{animationStyles}</style>
            <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">

                {/* SIDE GRADIENTS */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[900px] h-[900px] rounded-full overflow-hidden
                    bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] 
                    bg-[size:60px_60px] 
                    opacity-15"
                    />
                </div>


                <div className="relative flex items-center justify-center w-full h-full px-4 py-4">
                    {/* Single Card Container */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 lg:p-12 w-full max-w-4xl lg:max-w-5xl relative overflow-hidden">

                        {/* Card Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                        {/* Card Border Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

                            {/* Form Section */}
                            <div className="flex-1 flex flex-col items-center lg:items-start max-w-md w-full">
                                {/* Header */}
                                <div className="text-center lg:text-left mb-8">
                                    <h1 className="text-2xl md:text-3xl font-black text-black mb-4 leading-[1.1] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {title}
                                    </h1>
                                    <p className="text-base text-black/70 max-w-md leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                {/* Form Content */}
                                <div className="w-full">
                                    {children}
                                </div>

                                {/* Footer */}
                                <div className="text-center lg:text-left mt-8">
                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
                                        {footerText && (
                                            <span className="text-base text-black/70">
                                                {footerText}{' '}
                                                <Link to={footerLinkTo} className="text-black font-semibold hover:text-black/80 transition-colors">
                                                    {footerLinkText}
                                                </Link>
                                            </span>
                                        )}

                                        {/* Back to Home Button */}
                                        <Link
                                            to="/"
                                            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            <span className="text-sm font-medium">Back to Home</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Aside Section */}
                            {asideTitle && (
                                <div className="hidden lg:flex flex-1 flex-col items-center justify-center">
                                    {illustration ? (
                                        <>{illustration}</>
                                    ) : (
                                        <div className="text-center">
                                            <h2 className="text-3xl font-bold text-black mb-4">{asideTitle}</h2>
                                            <p className="text-lg text-black/60 leading-relaxed">{asideText}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPageLayout
