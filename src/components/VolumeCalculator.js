import React, { useState, useEffect } from 'react';


const VolumeCalculator= () =>{
    const [inputValue, setInputValue] = useState('0');
    const [fromUnit, setFromUnit] = useState('리터');
    const [toUnit, setToUnit] = useState('갤런');
    const [result, setResult] = useState('0');

    const conversionRates = {
        리터 : 1,
        갤런 : 0.264172,
        '세제곱 미터' : 0.001,
        '세제곱 피트' : 0.0353147,
    };

    const units = Object.keys(conversionRates);

    useEffect(() => {
        const fromRate = conversionRates[fromUnit];
        const toRate = conversionRates[toUnit];
        const convertedAmount = (parseFloat(inputValue) / fromRate) * toRate;
        setResult(convertedAmount.toFixed(6));
    }, [inputValue , fromUnit, toUnit]);

    const handleNumberClick = (number) =>{
        setInputValue((prev) => (prev === 0 ? number : prev + number));
    }

    const handleClear = () =>{
        setInputValue('0');
        setResult('0');
    }

    const handleBackspace = () =>{
        setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    }

    const handleDecimal = () =>{
        if(!inputValue.includes('.')){
            setInputValue((prev) => prev + '.');
        }
    }

    return(
        <div className="volume_calculator">
            <div className="calculator-display">
                <div className="input-display">{inputValue} {fromUnit}</div>
                <div className="result-display">{result} {toUnit}</div>
            </div>
            <div className="unit-selectors">
                <select value={fromUnit} onChange={(e)=> setFromUnit(e.target.value)}>
                    {
                        units.map((unit)=>(
                            <option key={unit} value={unit}>{unit}</option>
                        ))
                    }
                </select>
                <button onClick={()=> {const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp);}}>
                    ⇄
                </button>
                <select value={toUnit} onChange={(e)=> setToUnit(e.target.value)}>
                    {
                        units.map((unit)=>(
                            <option key={unit} value={unit}>{unit}</option>
                        ))
                    }
                </select>
            </div>
            <div className="keypad">
                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num)=>(
                    <button key={num} onClick={()=> handleNumberClick(num.toString())}>{num}</button>
                ))}
                <button onClick={handleDecimal}>.</button>
                <button onClick={handleClear}>C</button>
                <button onClick={handleBackspace}>⌫</button>
            </div>
        </div>
    )
}
export default VolumeCalculator;