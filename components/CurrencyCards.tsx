'use client'

interface CurrencyCardProps {
  data: { [key: string]: number }
  currencies: string[]
}

export default function CurrencyCards({ data, currencies }: CurrencyCardProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
      {currencies.map(currency => (
        <div key={currency} className={`${currency === 'BRL' ? 'bg-emerald-50 text-emerald-500' : 'bg-sky-50 text-sky-500'} p-6 rounded-lg shadow-md`}>
          <h2 className='text-lg font-semibold mb-4'>USD to {currency}</h2>
          <p className='text-2xl font-bold'>
            {`${data[currency] ? data[currency].toFixed(2) : '-'} ${currency}`}
          </p>
        </div>
      ))}
    </div>
  )
}