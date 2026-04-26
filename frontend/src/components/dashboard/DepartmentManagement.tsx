import { FC, useState, useEffect } from 'react'
import { Building2, Plus, Search, ArrowLeft, Users } from 'lucide-react'

interface Department {
    id: string
    name: string
}

interface Employee {
    id: string
    name: string
    email: string
    password: string
    phone: string
    salary: string
    departmentId: string
    departmentName: string
    createdAt: string
}

interface EmployeeForm {
    name: string
    email: string
    password: string
    phone: string
    salary: string
}

const DepartmentManagement: FC = () => {
    const [departments, setDepartments] = useState<Department[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [departmentName, setDepartmentName] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
    const [employeeForm, setEmployeeForm] = useState<EmployeeForm>({
        name: '',
        email: '',
        password: '',
        phone: '',
        salary: ''
    })

    useEffect(() => {
        // Load departments from localStorage
        const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        if (userData.departments) {
            setDepartments(userData.departments)
        }
    }, [])

    const handleAddDepartment = () => {
        if (!departmentName.trim()) return

        const newDepartment: Department = {
            id: Date.now().toString(),
            name: departmentName
        }

        const updatedDepartments = [...departments, newDepartment]
        setDepartments(updatedDepartments)

        // Update localStorage
        const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        userData.departments = updatedDepartments
        localStorage.setItem('hrDashboardUser', JSON.stringify(userData))

        setDepartmentName('')
        setIsAddModalOpen(false)
    }

    const handleDepartmentClick = (department: Department) => {
        setSelectedDepartment(department)
        // Load employees for this department
        const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        const departmentEmployees = userData.employees?.filter((emp: Employee) => emp.departmentId === department.id) || []
        setEmployees(departmentEmployees)
    }

    const handleBackToDepartments = () => {
        setSelectedDepartment(null)
        setEmployees([])
    }

    const handleAddEmployee = () => {
        if (!employeeForm.name.trim() || !employeeForm.email.trim()) return

        if (!selectedDepartment) return

        const newEmployee: Employee = {
            id: Date.now().toString(),
            ...employeeForm,
            departmentId: selectedDepartment.id,
            departmentName: selectedDepartment.name,
            createdAt: new Date().toISOString()
        }

        const updatedEmployees = [...employees, newEmployee]
        setEmployees(updatedEmployees)

        // Update localStorage
        const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
        if (!userData.employees) userData.employees = []
        userData.employees.push(newEmployee)
        localStorage.setItem('hrDashboardUser', JSON.stringify(userData))

        setEmployeeForm({ name: '', email: '', password: '', phone: '', salary: '' })
        setIsAddEmployeeModalOpen(false)
    }

    // Filter departments based on search query
    const filteredDepartments = departments.filter(department =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // If a department is selected, show department detail view
    if (selectedDepartment) {
        return (
            <div className="h-full flex flex-col">
                {/* Fixed Header */}
                <div className="flex-shrink-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBackToDepartments}
                                className="flex items-center gap-2 text-black/80 hover:text-black transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back
                            </button>
                            <h2 className="text-2xl font-bold text-black">Department Management</h2>
                        </div>
                        <button
                            onClick={() => setIsAddEmployeeModalOpen(true)}
                            className="flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Employee
                        </button>
                    </div>

                    {/* Department Name */}
                    <div className="bg-black/10 border border-black/20 rounded-xl p-6 backdrop-blur-sm mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-xl font-semibold text-black">{selectedDepartment.name}</h3>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent">
                    {/* Employees Table */}
                    {employees.length > 0 ? (
                        <div className="bg-black/10 border border-black/20 rounded-xl p-6 backdrop-blur-sm">
                            <h4 className="text-lg font-semibold text-black mb-4">Employees</h4>
                            <div className="overflow-x-auto overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent rounded-lg border border-black/10">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/20 bg-black/5 sticky top-0 z-10">
                                            <th className="text-left py-3 px-4 text-black/80 font-medium min-w-[120px]">Name</th>
                                            <th className="text-left py-3 px-4 text-black/80 font-medium min-w-[180px]">Email</th>
                                            <th className="text-left py-3 px-4 text-black/80 font-medium min-w-[100px]">Salary</th>
                                            <th className="text-left py-3 px-4 text-black/80 font-medium min-w-[140px]">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.id} className="border-b border-black/10 hover:bg-black/5 transition-colors">
                                                <td className="py-3 px-4 text-black whitespace-nowrap">{employee.name}</td>
                                                <td className="py-3 px-4 text-black whitespace-nowrap">{employee.email}</td>
                                                <td className="py-3 px-4 text-black whitespace-nowrap">${employee.salary}</td>
                                                <td className="py-3 px-4 text-black whitespace-nowrap">{employee.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-black/20 mx-auto mb-4" />
                            <p className="text-black/60">No employees in this department yet</p>
                        </div>
                    )}
                </div>

                {/* Add Employee Modal */}
                {isAddEmployeeModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-bold text-black mb-4">Add Employee</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={employeeForm.name}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={employeeForm.email}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={employeeForm.phone}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    type="number"
                                    placeholder="Salary"
                                    value={employeeForm.salary}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, salary: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddEmployee}
                                        className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-black/90 transition"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setIsAddEmployeeModalOpen(false)}
                                        className="flex-1 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Department Management</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Department
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search departments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDepartments.map((dept) => (
                    <div
                        key={dept.id}
                        onClick={() => handleDepartmentClick(dept)}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Building2 className="w-6 h-6 text-black" />
                            <h3 className="text-lg font-semibold text-black">{dept.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">Click to manage employees</p>
                    </div>
                ))}
            </div>

            {/* Add Department Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-bold text-black mb-4">Add Department</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Department name"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddDepartment}
                                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-black/90 transition"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DepartmentManagement
