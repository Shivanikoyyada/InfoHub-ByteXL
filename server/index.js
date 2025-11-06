
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It always seems impossible until it's done. - Nelson Mandela",
    "Don't count the days, make the days count. - Muhammad Ali"
];


const hyderabadWeather = {
    temperature: 28,
    description: "Partly Cloudy",
    city: "Hyderabad",
    country: "IN"
};


const cityWeather = {
    'hyderabad': { temperature: 28, description: "Partly Cloudy", city: "Hyderabad", country: "IN" },
    'delhi': { temperature: 25, description: "Sunny", city: "Delhi", country: "IN" },
    'mumbai': { temperature: 30, description: "Humid", city: "Mumbai", country: "IN" },
    'chennai': { temperature: 32, description: "Hot", city: "Chennai", country: "IN" },
    'london': { temperature: 15, description: "Cloudy", city: "London", country: "UK" },
    'new york': { temperature: 20, description: "Clear", city: "New York", country: "US" }
};


app.get('/api/quote', (req, res) => {
    try {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.json({ 
            quote: randomQuote 
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Could not fetch quote" 
        });
    }
});


app.get('/api/weather', (req, res) => {
    try {
        const city = (req.query.city || 'Hyderabad').toLowerCase();
        
      
        const weatherData = cityWeather[city] || hyderabadWeather;
        
       
        const variedWeather = {
            ...weatherData,
            temperature: weatherData.temperature + Math.floor(Math.random() * 5) - 2 // ±2°C variation
        };
        
        res.json(variedWeather);

    } catch (error) {
        res.status(500).json({
            error: "Could not fetch weather data"
        });
    }
});

// Currency API - Realistic INR conversions
app.get('/api/currency', (req, res) => {
    try {
        const { amount = 100 } = req.query;
        const amountNum = parseFloat(amount);

        if (isNaN(amountNum)) {
            return res.status(400).json({
                error: "Invalid amount provided"
            });
        }

        // Realistic conversion rates (approximate)
        const usd = (amountNum * 0.012).toFixed(2);  // 1 INR ≈ 0.012 USD
        const eur = (amountNum * 0.011).toFixed(2);  // 1 INR ≈ 0.011 EUR

        res.json({ 
            usd: usd,
            eur: eur
        });

    } catch (error) {
        res.status(500).json({
            error: "Could not fetch currency data"
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'InfoHub Server is running!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // console.log(`Weather API ready - Try: http://localhost:${PORT}/api/weather?city=Hyderabad`);
});