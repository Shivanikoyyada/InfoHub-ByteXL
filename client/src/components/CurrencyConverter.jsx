import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(100);

  const fetchConversion = async () => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:3001/api/currency?amount=${amount}`);
      setData(response.data);
    } catch (err) {
      setError('Could not convert currency.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversion();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchConversion();
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <p>Convert INR to USD and EUR</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in INR"
        />
        <button type="submit" disabled={isLoading}>
          Convert
        </button>
      </form>

      {isLoading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}

      {data && !isLoading && (
        <div className="conversion-data">
          <p>USD: ${data.usd}</p>
          <p>EUR: €{data.eur}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;