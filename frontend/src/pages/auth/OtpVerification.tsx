import { FC, useState, useEffect, useRef } from 'react'
import { ArrowLeft, Mail, Shield } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthPageLayout from '../../components/AuthPageLayout'
import toast from 'react-hot-toast'

const OtpVerification: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

    const [otp, setOtp] = useState(['', '', '', ''])
    const [isLoading, setIsLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(30)
    const [canResend, setCanResend] = useState(false)

    // Get email from location state or localStorage
    const email = (location.state as any)?.email || JSON.parse(localStorage.getItem('tempUserData') || '{}')?.email

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [resendTimer])

    useEffect(() => {
        // Focus first input on mount
        inputRefs[0].current?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Move to next input
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 4)

        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4)
            setOtp(newOtp as string[])

            // Focus the next empty input
            const nextEmptyIndex = newOtp.findIndex(val => val === '')
            if (nextEmptyIndex !== -1 && nextEmptyIndex < 4) {
                inputRefs[nextEmptyIndex].current?.focus()
            } else {
                inputRefs[3].current?.focus()
            }
        }
    }

    const validateOtp = (): boolean => {
        const otpString = otp.join('')

        if (otpString.length !== 4) {
            toast.error('Please enter all 4 digits')
            return false
        }

        if (!/^\d{4}$/.test(otpString)) {
            toast.error('OTP must be 4 digits')
            return false
        }

        return true
    }

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateOtp()) return

        setIsLoading(true)

        try {
            const otpString = otp.join('')

            // Simulate OTP verification (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000))

            toast.success('OTP verified successfully!')

            // Redirect to company info page after successful verification
            setTimeout(() => {
                navigate('/company-info')
            }, 1500)
        } catch (error) {
            toast.error('Failed to verify OTP')
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        if (!canResend) return

        setIsLoading(true)
        try {
            // Simulate resending OTP
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.success('OTP sent successfully!')
            setResendTimer(30)
            setCanResend(false)
            setOtp(['', '', '', ''])
            inputRefs[0].current?.focus()
        } catch (error) {
            toast.error('Failed to resend OTP')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthPageLayout
            title="Verify Your Email"
            description="Enter the 4-digit code we sent to your email"
            footerText=""
            footerLinkText=""
            footerLinkTo=""
            asideTitle="Secure Verification"
            asideText="We've sent a verification code to your email address to keep your account secure."
        >
            <form onSubmit={handleVerifyOtp} className="space-y-6">
                {/* Email Display */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Code sent to</p>
                    <p className="text-lg font-semibold text-black break-all">{email}</p>
                </div>

                {/* OTP Input Fields */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Enter Verification Code
                    </label>
                    <div className="flex gap-3 justify-center">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
                                placeholder="0"
                            />
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </button>

                {/* Resend Code */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={!canResend || isLoading}
                            className={`font-semibold ${canResend ? 'text-black hover:text-black/80' : 'text-gray-400 cursor-not-allowed'} transition-colors`}
                        >
                            {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
                        </button>
                    </p>
                </div>
            </form>
        </AuthPageLayout>
    )
}

export default OtpVerification
