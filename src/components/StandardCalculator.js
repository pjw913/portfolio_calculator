import React, { useState } from "react";
import * as math from 'mathjs';

const StandardCalculator= () =>{
    const [display, setDisplay] = useState('0');
    const [history, setHistory] = useState('');
    const [operation, setOperation] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);
    const [resetDisplay, setResetDisplay] = useState(false);

    const handleClickNumber = (number) =>{
        if( resetDisplay ){
            setDisplay(number);
            setHistory('');
            setResetDisplay(false);
        }else{
            setDisplay( display === '0' ? number : display + number );
        }
    } 

    const handleOperationClick = (op) =>{
        if( previousValue !== null ){
            handleEqualClick();
        }
        setPreviousValue(parseFloat(display));
        setOperation(op);
        setHistory(`${display} ${op}`);
        setResetDisplay(true);
    }

    const handleEqualClick = () =>{
        if( operation === null || previousValue === null) return;

        const current = parseFloat(display);
        let result;
        switch (operation){
            case '+' : result = previousValue + current; break;
            case '-' : result = previousValue - current; break;
            case 'x' : result = previousValue * current; break;
            case '÷' : result = previousValue / current; break;
            case "1/x": result = math.divide(1, current); setHistory(`1/(${current}) =`); break;
            case "√" : result = math.sqrt(current); setHistory(`√(${current}) =`); break;
            default: return;
        }

        setHistory(`${previousValue} ${operation} ${current} =`);
        setDisplay(result.toString());
        setPreviousValue(result);
        setOperation(null);
        setResetDisplay(false);
    }

    const handleClearEntry = () =>{
        setDisplay('0');
    }

    const handleClear = () =>{
        setDisplay('0');
        setHistory('');
        setOperation(null);
        setPreviousValue(null);
    }

    const handleBackspace = () =>{
        setDisplay( display.length > 1 ? display.slice(0, -1) : '0' );
    }

    const handlePercent = () =>{
        const current = parseFloat(display);
        setDisplay((current / 100).toString());
    }

    return(
        <div className="standard">
            <div className="display">
                <div className="history">{history}</div>
                <div className="currentvalue">{display}</div>
            </div>
            <div className="buttons">
                <button onClick={handlePercent}><span>%</span></button>
                <button onClick={handleClearEntry}><span>CE</span></button>
                <button onClick={handleClear}>C</button>
                <button onClick={handleBackspace}>⌫</button>

                <button onClick={()=>{handleOperationClick('1/x')}}>1/x</button>
                <button onClick={()=>{handleOperationClick('x²')}}>x²</button>
                <button onClick={()=>{handleOperationClick('√')}}>√</button>
                <button onClick={()=>{handleOperationClick('÷')}}>÷</button>

                <button onClick={()=>{handleClickNumber('7')}}>7</button>
                <button onClick={()=>{handleClickNumber('8')}}>8</button>
                <button onClick={()=>{handleClickNumber('9')}}>9</button>
                <button onClick={()=>{handleOperationClick('x')}}>x</button>

                <button onClick={()=>{handleClickNumber('4')}}>4</button>
                <button onClick={()=>{handleClickNumber('5')}}>5</button>
                <button onClick={()=>{handleClickNumber('6')}}>6</button>
                <button onClick={()=>{handleOperationClick('-')}}>-</button>

                <button onClick={()=>{handleClickNumber('1')}}>1</button>
                <button onClick={()=>{handleClickNumber('2')}}>2</button>
                <button onClick={()=>{handleClickNumber('3')}}>3</button>
                <button onClick={()=>{handleOperationClick('+')}}>+</button>

                <button onClick={()=>{handleOperationClick('±')}}>±</button>
                <button onClick={()=>{handleClickNumber('0')}}>0</button>
                <button onClick={()=>{handleClickNumber('.')}}>.</button>
                <button onClick={handleEqualClick}>=</button>
            </div>
        </div>
    )
}
export default StandardCalculator;