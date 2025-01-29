'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { format, subDays } from 'date-fns'
import Filters from '@/components/Filters'
import CurrencyCards from '@/components/CurrencyCards'
import HistoricalChart from '@/components/HistoricalChart'
import { BiLoader } from 'react-icons/bi'

type CurrencyData = {
  [key: string]: number
}

type HistoricalRates = {
  [date: string]: CurrencyData
}

export default function Home() {
  const [realTimeData, setRealTimeData] = useState<CurrencyData>({})
  const [historicalData, setHistoricalData] = useState<HistoricalRates>({})
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    'BRL',
    'EUR',
    'GBP',
  ])
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7d')

  const fetchRealTimeData = async () => {
    try {
      const res = await axios.get('https://api.frankfurter.app/latest?from=USD')
      setRealTimeData(res.data.rates)
    } catch (error) {
      console.error('Error fetching real-time data:', error)
    }
  }

  const fetchHistoricalData = useCallback(async () => {
    const endDate = format(new Date(), 'yyyy-MM-dd')
    const startDate = format(subDays(new Date(), parseInt(selectedPeriod)), 'yyyy-MM-dd')
    
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/${startDate}..${endDate}?from=USD&to=${selectedCurrencies.join(',')}`
      )
      setHistoricalData(response.data.rates)
    } catch (error) {
      console.error('Error fetching historical data:', error)
    }
  }, [selectedPeriod, selectedCurrencies])

  useEffect(() => {
    fetchRealTimeData()
    const interval = setInterval(fetchRealTimeData, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchHistoricalData()
  }, [fetchHistoricalData])

  const handleDownloadCSV = () => {
    const sortedDates = Object.keys(historicalData).sort()

    const header = ['Date', ...selectedCurrencies].join(',')

    const rows = sortedDates.map((date) => {
      const rates = historicalData[date]
      const values = selectedCurrencies.map((currency) => rates[currency] ? rates[currency].toFixed(4) : [currency, '-'].join(','))
      return [date, ...values].join(',')
    });

    const csvContent = [header, ...rows].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `exchange_rates_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>
          USD Exchange Rates Tracker 📈
        </h1>
        <Filters
          selectedPeriod={selectedPeriod}
          selectedCurrencies={selectedCurrencies}
          setSelectedPeriod={setSelectedPeriod}
          setSelectedCurrencies={setSelectedCurrencies}
        />
        <CurrencyCards data={realTimeData} currencies={selectedCurrencies} />

        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-800'>Historical Rates</h2>
            <div className='flex gap-2'>
              <button onClick={handleDownloadCSV} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                Download CSV
              </button>
              {/*<ShareButton /> */}
            </div>
          </div>
          {Object.keys(historicalData).length > 0 ? (
            <HistoricalChart data={historicalData} currencies={selectedCurrencies} />
          ) : (
            <div className='text-center py-4 text-zinc-500'>
              <BiLoader className='animate-spin inline-block mr-2 text-zinc-500 w-6 h-6' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
