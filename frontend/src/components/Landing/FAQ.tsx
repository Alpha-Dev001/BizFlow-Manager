import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FAQItem {
    question: string
    answer: string
}

const faqData: FAQItem[] = [
    {
        question: "What is BrooksBridge?",
        answer: "BrooksBridge is a comprehensive business management platform that streamlines operations, enhances communication, and automates payroll for modern companies. It serves as the operating system for businesses looking to scale efficiently."
    },
    {
        question: "How does the free trial work?",
        answer: "Start your 14-day free trial with full access to all features. No credit card required. After the trial period, you can choose the plan that best fits your business needs."
    },
    {
        question: "What features are included?",
        answer: "BrooksBridge includes employee management, department organization, automated payroll, communication tools, real-time analytics, and comprehensive reporting features."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with international data protection regulations."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time with no cancellation fees. If you're not satisfied, we offer a 30-day money-back guarantee."
    }
]

const FAQ: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const navigate = useNavigate()

    return (
        <section id="faq" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 mt-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about BrooksBridge. Have more questions? We're here to help.
                    </p>
                </div>

                {/* FAQ Content - Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                    {/* Left Column - Questions List */}
                    <div className="space-y-1">
                        {faqData.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${activeIndex === index
                                    ? 'bg-black text-white border-black'
                                    : 'hover:bg-gray-50 text-gray-700 border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-mono ${activeIndex === index ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-medium">{item.question}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Column - Answer Display */}
                    <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
                        <div className="mb-4">
                            <span className="text-sm font-mono text-gray-500">
                                {String(activeIndex + 1).padStart(2, '0')}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {faqData[activeIndex].question}
                        </h3>

                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 leading-relaxed">
                                {faqData[activeIndex].answer}
                            </p>
                        </div>

                        {/* Additional content area for more detailed answers */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Still need help?</span>
                                <a href="#contact" className="text-black font-medium hover:underline">
                                    Contact our support team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
