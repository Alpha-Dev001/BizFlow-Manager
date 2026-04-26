import { FC, useState, useEffect } from 'react'
import { DollarSign, Users, Search, X } from 'lucide-react'

interface Employee {
    id: string
    name?: string
    email?: string
    salary?: string
    department?: string
    position?: string
}

const PayrollManagement: FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [showPaymentForm, setShowPaymentForm] = useState(false)

    useEffect(() => {
        // Get employees from localStorage
        const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        const employeeData = userData.employees || []
        setEmployees(employeeData)
    }, [])

    // Filter employees based on search
    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEmployeeSelect = (employee: Employee) => {
        setSelectedEmployee(employee)
        setShowPaymentForm(true)
    }

    const handleClosePaymentForm = () => {
        setShowPaymentForm(false)
        setSelectedEmployee(null)
    }

    const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedEmployee?.salary && selectedEmployee?.name) {
            alert(`Payment of $${selectedEmployee.salary} processed for ${selectedEmployee.name} via Stripe`)
            handleClosePaymentForm()
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-black">Payroll System</h2>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search employees by name or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            {/* Employee List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-black">Available Employees</h3>
                    <p className="text-sm text-gray-500">Click on an employee to process payroll payment</p>
                </div>

                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredEmployees.map((employee, index) => (
                        <div
                            key={index}
                            className="px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                                        <span className="text-black font-semibold">
                                            {employee.name ? employee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'EM'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-black">{employee.name || 'Unknown Employee'}</h4>
                                        {employee.department && <p className="text-sm text-gray-500">{employee.department}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">${(parseFloat(employee.salary || '0') || 0).toLocaleString()}/month</p>
                                    </div>
                                    <button
                                        onClick={() => handleEmployeeSelect(employee)}
                                        className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
                                    >
                                        Proceed with Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredEmployees.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No employees found</p>
                    </div>
                )}
            </div>

            {/* Payment Form Modal */}
            {showPaymentForm && selectedEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleClosePaymentForm}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-black">Process Payroll Payment</h3>
                            <button
                                onClick={handleClosePaymentForm}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Employee Info */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                                    <span className="text-black font-semibold">
                                        {selectedEmployee.name ? selectedEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'EM'}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-black">{selectedEmployee.name || 'Unknown Employee'}</h4>
                                    <p className="text-sm text-gray-500">{selectedEmployee.position || 'No Position'}</p>
                                    <p className="text-sm text-gray-500">{selectedEmployee.department || 'Unassigned'}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Payment Amount</span>
                                    <span className="text-xl font-bold text-black">${selectedEmployee.salary || '0'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                                    <option>Credit Card (Stripe)</option>
                                    <option>Bank Transfer</option>
                                    <option>Direct Deposit</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black/90 transition-all"
                            >
                                Process Payment
                            </button>

                            <button
                                type="button"
                                onClick={handleClosePaymentForm}
                                className="w-full bg-gray-200 text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PayrollManagement
