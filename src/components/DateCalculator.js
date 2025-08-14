import React, {useState} from "react";

export const DateCalculator= () =>{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState('');

    const calculateDifference = () =>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        const difference = Math.abs(end - start);
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setResult(`${days} 일`);
    }

    return(
        <div className="date-calculator">
            <div className="input_container">
                <div className="input-group">
                    <label>시작 날짜</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e)=>{setStartDate(e.target.value)}}
                    />
                </div>
                <div className="input-group">
                    <label>종료 날짜</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e)=>{setEndDate(e.target.value)}} 
                    />
                </div>
                <button onClick={calculateDifference}>차이 계산</button>
                <div className="result">{result}</div>
            </div>
        </div>
    )
}
export default DateCalculator;