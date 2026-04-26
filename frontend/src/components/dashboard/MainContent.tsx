import { FC } from 'react'
import DepartmentManagement from './DepartmentManagement'
import EmployeeMoneyChart from './EmployeeMoneyChart'
import PayrollManagement from './PayrollManagement'
import Settings from './Settings'

interface HRDashboardUser {
    departments?: Array<{ id: string; name: string }>
    employees?: Array<{ salary?: string }>
}

interface MainContentProps {
    activeSection: 'dashboard' | 'departments' | 'payroll' | 'settings'
}

const MainContent: FC<MainContentProps> = ({ activeSection }) => {
    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard': {
                // Get data from localStorage
                const userData: HRDashboardUser = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
                const departments = userData.departments || []
                const departmentCount = departments.length

                // Calculate total revenue and average salary from employee salaries
                const employees = userData.employees || []
                const totalRevenue = employees.reduce((total, emp) => {
                    const salary = parseFloat(emp.salary || '0') || 0
                    return total + salary
                }, 0)
                const averageSalary = employees.length > 0 ? totalRevenue / employees.length : 0

                return (
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-6">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-sm">
                                <h3 className="text-white/80 text-sm mb-2 font-bold">Departments</h3>
                                <p className="text-2xl font-bold text-white">{departmentCount}</p>
                                <p className="text-white/60 text-sm">{departmentCount > 0 ? `${departmentCount} total` : 'No departments'}</p>
                            </div>
                            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-sm">
                                <h3 className="text-white/80 text-sm mb-2 font-bold">Total Employees</h3>
                                <p className="text-2xl font-bold text-white">{userData.employees ? userData.employees.length : 0}</p>
                                <p className="text-white/60 text-sm">{userData.employees && userData.employees.length > 0 ? `${userData.employees.length} total` : 'No employees'}</p>
                            </div>
                            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-sm">
                                <h3 className="text-white/80 text-sm mb-2 font-bold">Monthly Revenue</h3>
                                <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
                                <p className="text-white/60 text-sm">{totalRevenue > 0 ? 'From salaries' : 'No revenue'}</p>
                            </div>
                            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-sm">
                                <h3 className="text-white/80 text-sm mb-2 font-bold">Average Salary</h3>
                                <p className="text-2xl font-bold text-white">${averageSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                <p className="text-white/60 text-sm">{averageSalary > 0 ? 'Per employee' : 'No data'}</p>
                            </div>
                        </div>

                        {/* Employee-Money Relationship Chart */}
                        <EmployeeMoneyChart />
                    </div>
                )
            }

            case 'departments':
                return <DepartmentManagement />

            case 'payroll':
                return <PayrollManagement />

            case 'settings':
                return <Settings />

            default:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-6">Dashboard</h2>
                        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-sm p-6 shadow-sm">
                            <p className="text-black/80">Select a section from the sidebar</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="h-[calc(100vh-7rem)] relative overflow-y-auto p-6 custom-scrollbar">
            {renderContent()}
        </div>
    )
}

export default MainContent
