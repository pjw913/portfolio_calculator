import React, { useState, useEffect } from "react";

const TemperatureCalculator= () =>{
    const [inputValue, setInputValue] = useState('0');
    const [fromUnit, setFromUnit] = useState('celsius');
    const [toUnit, setToUnit] = useState('fahrenheit');
    const [result, setResult] = useState('32');

    const convertTemperature = (value, from, to) => {
        if( from === to ) return value;
        if( from === 'celsius' && to === 'fahrenheit') return (value * 9/5) + 32;
        if( from === 'celsius' && to === 'kelvin') return value + 273.15;
        if( from === 'fahrenheit' && to === 'celsius') return (value - 32) * 5/9;
        if( from === 'fahrenheit' && to === 'kelvin') return (value - 32) * 5/9 + 273.15;
        if( from === 'kelvin' && to === 'celsius') return value - 273.15;
        if( from === 'kelvin' && to === 'fahrenheit') return (value - 273.15) * 9/5 + 32;
    };

    useEffect(()=>{
        const convertedAmount = convertTemperature(parseFloat(inputValue), fromUnit, toUnit);
        setResult(convertedAmount.toFixed(2));
    },[inputValue, fromUnit, toUnit]);

    const handleNumberClick = (number) => {
        setInputValue((prev) => (prev === '0' ? number : prev + number));
      };
    
      const handleClear = () => {
        setInputValue('0');
        setResult(convertTemperature(0, fromUnit, toUnit).toFixed(2));
      };
    
      const handleBackspace = () => {
        setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      };
    
      const handleDecimal = () => {
        if (!inputValue.includes('.')) {
          setInputValue((prev) => prev + '.');
        }
      };

    const handleToggleSign = () =>{
        setInputValue((prev) => (parseFloat(prev) * -1).toString());
    };

    return(
        <div className="temperature-calculator">
            <div className="calculator-display">
                <div className="input-display">{inputValue} {fromUnit}</div>
                <div className="result-display">{result} {toUnit}</div>
            </div>
            <div className="unit-selector">
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                    <option value="celsius">섭씨 (°C)</option>
                    <option value="fahrenheit">화씨 (°F)</option>
                    <option value="kelvin">켈빈 (K)</option>
                </select>
                <button onClick={()=> { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp) }}>⇄</button>
                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                    <option value="celsius">섭씨 (°C)</option>
                    <option value="fahrenheit">화씨 (°F)</option>
                    <option value="kelvin">켈빈 (K)</option>
                </select>
            </div>
            <div className="keypad">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())}>{num}</button>
          ))}
          <button onClick={handleDecimal}>.</button>
          <button onClick={handleToggleSign}>+/-</button>
          <button onClick={handleClear}>C</button>
          <button onClick={handleBackspace}>⌫</button>
        </div>
        </div>
    )
}
export default TemperatureCalculator;