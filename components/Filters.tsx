interface FilterProps {
  selectedCurrencies: string[]
  selectedPeriod: string
  setSelectedCurrencies: (currencies: string[]) => void
  setSelectedPeriod: (period: string) => void
}

const currencyOptions = ['BRL', 'EUR', 'GBP', 'JPY', 'CNY']

export default function Filters({
  selectedPeriod,
  selectedCurrencies,
  setSelectedPeriod,
  setSelectedCurrencies
}: FilterProps) {
  const handleCurrencyChange = (currency: string) => {
    const newSelection = selectedCurrencies.includes(currency)
      ? selectedCurrencies.filter(c => c !== currency)
      : [...selectedCurrencies, currency]
    setSelectedCurrencies(newSelection)
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
      <div className='flex flex-wrap -mx-2 gap-6'>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 border rounded-md text-zinc-900"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="365">Last 1 Year</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Currencies</label>
          <div className="flex flex-wrap -mx-2 gap-2">
            {currencyOptions.map(currency => (
              <label key={currency} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCurrencies.includes(currency)}
                  onChange={() => handleCurrencyChange(currency)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700">{currency}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}