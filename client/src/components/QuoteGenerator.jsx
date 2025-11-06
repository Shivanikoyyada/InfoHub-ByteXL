import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get('http://localhost:3001/api/quote');
      setData(response.data);
    } catch (err) {
      setError('Could not fetch quote.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h2>Motivational Quotes</h2>
      
      <button onClick={fetchQuote} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get New Quote'}
      </button>

      {isLoading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}

      {data && !isLoading && (
        <div className="quote-data">
          <p>"{data.quote}"</p>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;