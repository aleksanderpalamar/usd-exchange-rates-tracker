'use client'

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
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface HistoricalChartProps {
  data: { [date: string]: { [currency: string]: number } }
  currencies: string[]
}

export default function HistoricalChart({ data, currencies }: HistoricalChartProps) {
  if (!data || Object.keys(data).length === 0 || currencies.length === 0) {
    return <div className="text-zinc-500">Carregando dados históricos...</div>
  }
  
  const chartData = {
    labels: Object.keys(data).sort(),
    datasets: currencies.map(currency => ({
      label: currency,
      data: Object.keys(data)
        .sort()
        .map(date => data[date][currency]),
      borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.1,
    }))
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historical Exchange Rates',
      },
    },
  }

  return (
    <div className='h-96'>
      <Line data={chartData} options={options} />
    </div>
  )
}