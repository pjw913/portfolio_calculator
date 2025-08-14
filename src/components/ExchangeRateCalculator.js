import React, { useState, useEffect } from "react";

const ExchangeRateCalculator= () =>{
    const [amount, setAmount] = useState('0');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(1.1);
    const [convertedAmount, setConvertedAmount] = useState('0');

    const exchangeRates = {
            USD: { KRW:1359.65, JPY:143.88, EUR:0.85, GBP:0.73 },
            EUR: { USD: 1 / 1.18, JPY: 1 / 169.82, KRW: 1 / 1605.07, GBP: 1 / 0.86 },
            JPY: { USD: 1 / 0.007, EUR:1 / 0.0059, KRW: 1 / 9.45, GBP: 1 / 0.0051 },
            KRW: { USD: 1 / 0.00074, EUR: 1 / 0.00062, JPY: 1 / 0.11, GBP: 1 / 0.00054 },
            GBP: { USD: 1 / 1.37, EUR: 1 / 1.16, JPY: 1 / 196.68, KRW: 1 / 1858.82 },
    };

    useEffect(() =>{
        if(fromCurrency && toCurrency){
            setExchangeRate(exchangeRates[fromCurrency][toCurrency]);
        }
    },[fromCurrency, toCurrency]);

    useEffect(() =>{
        const converted = (parseFloat(amount) * exchangeRate).toFixed(2);
        setConvertedAmount(converted);
    },[amount, exchangeRate]);

    const handleNumberClick = (num) =>{
        setAmount(prev => prev === '0' ? num : prev + num);
    };

    const handleClear = () =>{
        setAmount('0');
        setConvertedAmount('0');
    };

    const handleBackspace = () =>{
        setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    }

    const currencies = ['USD', 'EUR', 'JPY', 'KRW', 'GBP'];

    return(
        <div className="exchange-calculator">
            <div className="exchange-div">
                <div className="input-group">
                    <input type="text" readOnly value={amount} className="exchange-input" />
                    <select
                        value={fromCurrency}
                        onChange={(e)=>{setFromCurrency(e.target.value)}}
                        className="exchange-select"
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                <input type="text" readOnly value={convertedAmount} className="exchange-input" />
                    <select
                        value={toCurrency}
                        onChange={(e)=>{setToCurrency(e.target.value)}}
                        className="exchange-select"
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className="keypad">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                        <button className="numbtn" key={num} onClick={()=> handleNumberClick(num.toString())}>
                            {num}
                        </button>
                    ))}
                    <button onClick={()=> handleNumberClick('.')}>.</button>
                    <button onClick={handleClear}>C</button>
                    <button onClick={handleBackspace}>⌫</button>
                </div>
            </div>
        </div>
    )
}
export default ExchangeRateCalculator;