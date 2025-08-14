import React, { useState, useEffect } from "react";

const WeightMessCalculator= () =>{
    const [amount, setAmount] = useState('0');
    const [fromUnit, setFromUnit] = useState('kilograms');
    const [toUnit, setToUnit] = useState('pounds');
    const [result, setResult] = useState('0');

    const conversionRates = {
        kilograms: 1,
        pounds: 2.20462,
        grams: 1000,
        ounces: 35.274,
        tons: 0.001,
    };

    useEffect(() =>{
        const fromRate = conversionRates[fromUnit];
        const toRate = conversionRates[toUnit];
        const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
        setResult(convertedAmount.toFixed(4));
    },[fromUnit, toUnit, amount]);

    const handleNumberClick = (num) => {
        setAmount(prev => prev === '0' ? num : prev + num);
    };

    const handleClear = () => {
        setAmount('0');
        setResult('0');
    };

    const handleBackspace = () => {
        setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    };

    return(
        <div className="weightmess-calculator">
            <div className="calculator-body">
                <div className="input-group">
                    <input type="text" value={amount} readOnly className="calculator-input" />
                    <select value={fromUnit}
                            onChange={(e)=> setFromUnit(e.target.value)}
                            className="calculator-select"
                    >
                        <option value="kilograms">킬로그램</option>
                        <option value="pounds">킬로그램</option>
                        <option value="grams">그램</option>
                        <option value="ounces">온스</option>
                        <option value="tons">톤</option>
                    </select>
                </div>
                <div className="input-group">
                    <input type="text" value={result} readOnly className="calculator-input" />
                    <select value={toUnit}
                            onChange={(e)=> setToUnit(e.target.value)}
                            className="calculator-select"
                    >
                        <option value="kilograms">킬로그램</option>
                        <option value="pounds">킬로그램</option>
                        <option value="grams">그램</option>
                        <option value="ounces">온스</option>
                        <option value="tons">톤</option>
                    </select>
                </div>
                <div className="keypad">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num)=>(
                        <button key={num} onClick={()=> handleNumberClick(num.toString())}>{num}</button>
                    ))}
                    <button onClick={()=> handleNumberClick('.')}>.</button>
                    <button onClick={handleClear}>C</button>
                    <button onClick={handleBackspace}>⌫</button>
                </div>
            </div>
        </div>
    )
}
export default WeightMessCalculator;