import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import CompanyInfo from './pages/auth/CompanyInfo'
import OtpVerification from './pages/auth/OtpVerification'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/company-info" element={<CompanyInfo />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#4aed88',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#ff6b6b',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </Router>
    )
}

export default App
