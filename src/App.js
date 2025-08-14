import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StandardCalculator from './components/StandardCalculator';
import DateCalculator from './components/DateCalculator';
import ExchangeRateCalculator from './components/ExchangeRateCalculator';
import LengthCalculator from './components/LengthCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import TemperatureCalculator from './components/TemperatureCalculator';
import VolumeCalculator from './components/VolumeCalculator';
import WeightMessCalculator from './components/WeightMessCalculator';


function App() {
  return (
    <nav className="calculator-nav">
      <ul>
        <li><a href="/">표준</a></li>
        <li><a href="/scientific">공학용</a></li>
        <li><a href="/date">날짜 계산</a></li>
        <li><a href="/exchange">통화 환율</a></li>
        <li><a href="/volume">부피</a></li>
        <li><a href="/length">길이</a></li>
        <li><a href="/weightMess">무게 및 질량</a></li>
        <li><a href="/temperature">온도</a></li>
      </ul>
    <Routes>
      <Route path="/" element={<StandardCalculator />}></Route>
      <Route path="/scientific" element={<ScientificCalculator />}></Route>
      <Route path="/date" element={<DateCalculator />}></Route>
      <Route path="/exchange" element={<ExchangeRateCalculator />}></Route>
      <Route path="/volume" element={<VolumeCalculator />}></Route>
      <Route path="/length" element={<LengthCalculator />}></Route>
      <Route path="/weightMess" element={<WeightMessCalculator />}></Route>
      <Route path="/temperature" element={<TemperatureCalculator />}></Route>
    </Routes>
    </nav>
  );
}

export default App;
