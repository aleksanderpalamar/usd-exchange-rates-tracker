/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Currency {
  code: string;
  name: string;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100,00");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BRL");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        if (!response.ok) {
          throw new Error("Failed to fetch currencies");
        }
        const data = await response.json();

        const currencyList: Currency[] = Object.entries(data).map(
          ([code, name]) => ({
            code,
            name: name as string,
          })
        );

        setCurrencies(currencyList);
      } catch (err) {
        setError("Failed to load currencies. Please try again later.");
        console.error(err);
      }
    };

    fetchCurrencies();
  }, []);

  // Convert currency when amount, fromCurrency, or toCurrency changes
  useEffect(() => {
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      convertCurrency();
    } else if (fromCurrency === toCurrency) {
      const numericAmount = Number.parseFloat(amount.replace(",", ".")) || 0;
      setConvertedAmount(numericAmount);
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = async () => {
    // Parse amount, replacing comma with dot for proper number conversion
    const numericAmount = Number.parseFloat(amount.replace(",", "."));

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${numericAmount}&from=${fromCurrency}&to=${toCurrency}`
      );

      if (!response.ok) {
        throw new Error("Failed to convert currency");
      }

      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency]);
    } catch (err) {
      setError("Failed to convert currency. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Card className="w-full max-w-md p-4 mb-4 border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          Currency Converter
        </CardTitle>
        <CardDescription>
          Convert between different currencies using real-time exchange rates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => {
              // Allow only numbers, comma, and period
              const value = e.target.value.replace(/[^0-9,.]/g, "");
              setAmount(value);
            }}
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-2">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 flex-shrink-0 mb-2"
            onClick={handleSwapCurrencies}
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span className="sr-only">Swap currencies</span>
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <div className="bg-emerald-50 p-4 rounded-md">
            <div className="text-sm text-emerald-300 mb-1">
              Converted Amount
            </div>
            {isLoading ? (
              <div className="flex items-center gap-2 text-emerald-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Converting...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-emerald-500">
                {convertedAmount !== null
                  ? `${convertedAmount.toFixed(2)} ${toCurrency}`
                  : "—"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
