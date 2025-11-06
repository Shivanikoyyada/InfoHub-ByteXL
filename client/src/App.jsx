import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Weather');

  return (
    <div className="app">
      <h1>InfoHub</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'Weather' ? 'active' : ''}
          onClick={() => setActiveTab('Weather')}
        >
          Weather
        </button>
        <button 
          className={activeTab === 'Currency' ? 'active' : ''}
          onClick={() => setActiveTab('Currency')}
        >
          Currency Converter
        </button>
        <button 
          className={activeTab === 'Quote' ? 'active' : ''}
          onClick={() => setActiveTab('Quote')}
        >
          Motivational Quotes
        </button>
      </div>

      <div className="content">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Currency' && <CurrencyConverter />}
        {activeTab === 'Quote' && <QuoteGenerator />}
      </div>
    </div>
  );
}

export default App;
