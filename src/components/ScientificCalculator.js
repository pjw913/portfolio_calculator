import { evaluate, round } from "mathjs";
import React, { useState } from "react";


const ScientificCalculator= () =>{
    const [display, setDisplay] = useState('0');
    const [memory, setMemory] = useState(0);
    const [isRadians, setIsRadians] = useState(true);
    const ClearEntry = ( exp ) => {
        if( !exp ) return '';
        const result = exp.match(/([+\-*/^()]|\d+\.\d+|\d+)/g); // 숫자와 연산자 구분
        if (!result || result.length === 0) return '';
        result.pop();  // 마지막 삭제
        return result.join('');  // 다시 문자 연결
    };

    const buttons = [
        { label : 'MC', type:'function' },
        { label : 'MR', type:'function' },
        { label : 'M+', type:'function' },
        { label : 'M-', type:'function' },
        { label : 'MS', type:'function' },
        { label : 'x²', type:'function' },
        { label : 'x^y', type:'function' },
        { label : 'sin', type:'function' },
        { label : 'cos', type:'function' },
        { label : 'tan', type:'function' },
        { label : '√', type:'function' },
        { label : '10^x', type:'function' },
        { label : 'log', type:'function' },
        { label : 'Exp', type:'function' },
        { label : 'Mod', type:'function' },
        { label : '↑', type:'function' },
        { label : 'CE', type:'function' },
        { label : 'C', type:'function' },
        { label : '⌫', type:'function' },
        { label : '÷', type:'operator' },
        { label : 'π', type:'function' },
        { label : '7', type:'number' },
        { label : '8', type:'number' },
        { label : '9', type:'number' },
        { label : 'x', type:'operator' },
        { label : 'n!', type:'function' },
        { label : '4', type:'number' },
        { label : '5', type:'number' },
        { label : '6', type:'number' },
        { label : '-', type:'operator' },
        { label : '±', type:'function' },
        { label : '1', type:'number' },
        { label : '2', type:'number' },
        { label : '3', type:'number' },
        { label : '+', type:'operator' },
        { label : '(', type:'function' },
        { label : ')', type:'function' },
        { label : '0', type:'number' },
        { label : '.', type:'number' },
        { label : '=', type:'equal' },
    ];

    const handleButtonClick = (value) =>{
        switch (value){
            case '⌫' :
                setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
                break;
            case 'AC' :
                setDisplay('0');
                break;
            case 'C' :
                setDisplay('0');
                break;
                case 'CE':
                    ClearEntry();
                    break;
                break;
            case '=' :
                if( display && display !== 0){
                    try{
                        const cleanedDisplay = display.replace(/\s+/g, '');
                        setDisplay(round(evaluate(cleanedDisplay), 8).toString());
                        console.log(display)
                    }catch (error){
                        setDisplay('Error');
                        console.error(error);
                    }
                }
                break;
            case 'sin':
            case 'cos':
            case 'tan':
                setDisplay(`${value}(${isRadians ? '' : 'deg'}${display})`);
                break;
            case 'log':
                setDisplay(`log10(${display})`);
                break;
            case 'ln':
                setDisplay(`log(${display})`);
                break;
            case '√':
                setDisplay(`sqrt(${display})`);
                break;
            case 'π':
                setDisplay( display === '0' ? 'pi' : display + 'pi');
                break;
            case 'e':
                setDisplay( display === '0' ? 'e' : display + 'e');
                break;
            case 'x^y':
                setDisplay(display + '^');
                break;
            case 'n!':
                setDisplay(`factorial(${display})`);
                break;
            case 'Rad':
                setIsRadians(true);
                break;
            case 'Deg':
                setIsRadians(false);
                break;
            case 'x' : 
                setDisplay(display + '*');
                break;
            case '÷' : 
                setDisplay(display + '/');
                break;
            default:
                setDisplay( display === '0' ? value : display + value );
        }
    }
    return(
        <div className="scientific">
            <div className="display">{display}</div>
            <div className="keypad">
                <div className="top-row">
                    <button className="btn function">DEG</button>
                    <button className="btn function">HYP</button>
                    <button className="btn function">F-E</button>
                </div>
                {
                    buttons.map((btn, index)=>(
                        <button
                        key={index}
                        onClick={()=> handleButtonClick(btn.label)}
                        className={`btn ${btn.type}`}
                        >
                            {btn.label}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};
export default ScientificCalculator;