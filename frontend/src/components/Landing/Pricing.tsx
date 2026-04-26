import { FC } from 'react'
import { Check, X } from 'lucide-react'

interface PricingPlan {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    notIncluded: string[]
    highlighted: boolean
}

const plans: PricingPlan[] = [
    {
        name: "Starter",
        price: "$0",
        period: "per month",
        description: "Perfect for small teams and startups just getting started",
        features: [
            "Up to 10 users",
            "Basic employee management",
            "Mobile app access"
        ],
        notIncluded: [
            "Advanced analytics",
            "Payroll processing"
        ],
        highlighted: false
    },
    {
        name: "Professional",
        price: "$29",
        period: "per month",
        description: "Ideal for growing businesses and scaling teams",
        features: [
            "Up to 50 users",
            "Advanced employee management",
            "Automated payroll",
            "Priority support"
        ],
        notIncluded: [],
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "Tailored solutions for large-scale organizations and enterprises",
        features: [
            "Unlimited users",
            "Custom workflows",
            "Dedicated account manager",
            "Advanced security features"
        ],
        notIncluded: [],
        highlighted: false
    }
]

const Pricing: FC = () => {
    return (
        <section id='pricing' className="py-16 px-6 inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12 mt-15">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Simple and transparent pricing
                    </h2>
                    <p className="text-xl text-black max-w-2xl mx-auto">
                        Choose the perfect plan that grows with your business. No hidden fees, upgrade or downgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-6 ${plan.highlighted
                                ? "border-2 border-black bg-black text-white shadow-xl"
                                : "border border-black bg-white"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-black"
                                }`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {plan.name}
                            </h3>

                            {/* Description */}
                            <p className={plan.highlighted ? "text-white mb-4" : "text-black mb-4"}>{plan.description}</p>

                            {/* Price */}
                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-black"
                                    }`}>
                                    {plan.price}
                                </span>
                                <span className={plan.highlighted ? "text-white ml-2" : "text-black ml-2"}>{plan.period}</span>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check className="w-5 h-5" />
                                        <span className={plan.highlighted ? "text-white" : "text-black"}>{feature}</span>
                                    </div>
                                ))}
                                {plan.notIncluded.map((feature, i) => (
                                    <div key={`not-${i}`} className="flex items-center gap-3">
                                        <X className={`w-5 h-5 ${plan.highlighted ? "text-gray-400" : "text-gray-300"}`} />
                                        <span className={plan.highlighted ? "text-gray-400" : "text-gray-400"}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <button className={`w-full py-2 rounded-lg font-semibold transition-all ${plan.highlighted
                                    ? "bg-white text-black hover:bg-gray-100"
                                    : "bg-black text-white hover:bg-black/90"
                                }`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing
