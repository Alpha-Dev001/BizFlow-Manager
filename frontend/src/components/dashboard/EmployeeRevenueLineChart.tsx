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
    Legend,
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
    Legend,
    Filler
)

const EmployeeRevenueLineChart: FC = () => {
    // Get data from localStorage
    const userData = JSON.parse(localStorage.getItem('hrDashboardUser') || '{}')
    const employees = userData.employees || []

    // Generate monthly data based on current employees and revenue
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const currentEmployees = employees.length
    const currentRevenue = employees.reduce((total: number, emp: any) => {
        const salary = parseFloat(emp.salary) || 0
        return total + salary
    }, 0)

    // Generate realistic growth trends
    const employeeTrend = months.map((month: string, index: number) => {
        const growthFactor = 1 - (months.length - index - 1) * 0.15
        const baseValue = Math.max(1, Math.floor(currentEmployees * growthFactor))
        const variation = Math.floor(Math.random() * 3) - 1
        return Math.max(1, baseValue + variation)
    })

    const revenueTrend = months.map((month: string, index: number) => {
        const growthFactor = 1 - (months.length - index - 1) * 0.12
        const baseValue = Math.max(1000, Math.floor(currentRevenue * growthFactor))
        const variation = Math.floor(Math.random() * 2000) - 1000
        return Math.max(1000, baseValue + variation)
    })

    // Chart data
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Employees',
                data: employeeTrend,
                borderColor: '#1F2937',
                backgroundColor: 'rgba(31, 41, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#1F2937',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                yAxisID: 'y'
            },
            {
                label: 'Revenue ($)',
                data: revenueTrend,
                borderColor: '#6B7280',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#6B7280',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                yAxisID: 'y1'
            }
        ]
    }

    // Chart options
    const chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Number of Employees'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Revenue ($)'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Employee & Revenue Trends</h3>
            <div className="h-64">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

export default EmployeeRevenueLineChart
