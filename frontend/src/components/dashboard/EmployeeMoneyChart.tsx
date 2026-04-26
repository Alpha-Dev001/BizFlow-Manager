import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
)

const EmployeeMoneyChart: FC = () => {
    // Get data from localStorage
    const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
    const employees = userData.employees || []

    // Generate monthly data showing relationship between employees and money
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const currentEmployees = employees.length
    const currentRevenue = employees.reduce((total: number, emp: any) => {
        const salary = parseFloat(emp.salary) || 0
        return total + salary
    }, 0)

    // Generate data showing correlation between employee count and revenue, starting from zero
    const relationshipData = months.map((month: string, index: number) => {
        if (index === 0) {
            return 0 // Start from zero
        }
        const growthFactor = (index / (months.length - 1)) // 0 to 1 progression
        const employeeCount = Math.max(1, Math.floor(currentEmployees * growthFactor))
        const revenue = employeeCount * (currentRevenue / Math.max(1, currentEmployees)) // Revenue per employee relationship
        return revenue
    })

    // Chart data
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Revenue per Employee Growth',
                data: relationshipData,
                borderColor: '#1F2937',
                backgroundColor: 'rgba(31, 41, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#1F2937',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2
            }
        ]
    }

    // Chart options
    const chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                borderColor: '#1F2937',
                borderWidth: 0,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    title: function (context: any) {
                        return context[0].label
                    },
                    label: function (context: any) {
                        const value = context.parsed.y || 0
                        const employees = Math.floor(value / (currentRevenue / Math.max(1, currentEmployees)))
                        return [
                            `Revenue: $${value.toLocaleString()}`,
                            `Est. Employees: ${employees}`
                        ]
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return '$' + value.toLocaleString()
                    }
                },
                title: {
                    display: true,
                    text: 'Revenue ($)'
                }
            }
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Employee-Revenue Relationship</h3>
            <div className="h-64">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

export default EmployeeMoneyChart
