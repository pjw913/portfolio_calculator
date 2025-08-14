import React, { useState, useEffect } from "react";

const LengthCalculator= () =>{
    const [inputValue, setInputValue] = useState('0');
    const [fromUnit, setFromUnit] = useState('미터');
    const [toUnit, setToUnit] = useState('피트');
    const [result, setResult] = useState('0');

    const conversionRates = {
        미터: 1,
        피트: 3.28084,
        인치: 39.3701,
        킬로미터: 0.001,
        마일: 0.000621371,
    };

    const units = Object.keys(conversionRates);

    useEffect(()=>{
        const fromRate = conversionRates[fromUnit];
        const toRate = conversionRates[toUnit];
        const convertedAmount = (parseFloat(inputValue) / fromRate) * toRate;
        setResult(convertedAmount.toFixed(6));
    },[inputValue, fromUnit, toUnit]);

    const handleNumberClick = (num) => {
        setInputValue(prev => prev === '0' ? num : prev + num);
    };
    
    const handleClear = () => {
        setInputValue('0');
        setResult('0');
    };
    
    const handleBackspace = () => {
        setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    };

    const handleSwapUnits = () =>{
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    }

    return(
        <div className="length-calculator">
            <div className="calculator-body">
                <div className="input-group">
                    <input type="text" value={inputValue} readOnly className="calculator-input" />
                    <select value={fromUnit}
                            onChange={(e)=> setFromUnit(e.target.value)}
                            className="unit-select"
                    >
                        {units.map((unit)=>(
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <input type="text" value={result} readOnly className="calculator-input" />
                    <select value={toUnit}
                            onChange={(e)=> setToUnit(e.target.value)}
                            className="unit-select"
                    >
                        {units.map((unit)=>(
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSwapUnits} className="swap-button">단위 교환</button>
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
export default LengthCalculator;