'use client'

interface CurrencyCardProps {
  data: { [key: string]: number }
  currencies: string[]
}

export default function CurrencyCards({ data, currencies }: CurrencyCardProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
      {currencies.map(currency => (
        <div key={currency} className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold mb-4 text-zinc-900'>USD to {currency}</h2>
          <p className='text-2xl font-bold text-zinc-900'>
            {`${data[currency] ? data[currency].toFixed(2) : '-'} ${currency}`}
          </p>
        </div>
      ))}
    </div>
  )
}