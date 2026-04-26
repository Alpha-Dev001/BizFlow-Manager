import { FC } from 'react'
import Navbar from "../components/Landing/Navbar"
import Hero from "../components/Landing/Hero"
import Features from "../components/Landing/Features"
import Pricing from "../components/Landing/Pricing"
import FAQ from "../components/Landing/FAQ"
import Footer from "../components/Landing/Footer"

const Landing: FC = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    )
}

export default Landing
