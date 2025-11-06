// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;


// app.use(cors());
// app.use(express.json());


// const quotes = [
//     "The only way to do great work is to love what you do. - Steve Jobs",
//     "Innovation distinguishes between a leader and a follower. - Steve Jobs",
//     "Stay hungry, stay foolish. - Steve Jobs",
//     "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
//     "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
//     "It always seems impossible until it's done. - Nelson Mandela",
//     "Don't count the days, make the days count. - Muhammad Ali"
// ];


// app.get('/api/quote', (req, res) => {
//     try {
//         const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//         res.json({ 
//             quote: randomQuote 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             error: "Could not fetch quote" 
//         });
//     }
// });

// app.get('/api/weather', async (req, res) => {
//     try {
//         const city = req.query.city || 'London';
        
//         const response = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
//         );

       
//         const weatherData = {
//             temperature: response.data.main.temp,
//             description: response.data.weather[0].description,
//             city: response.data.name,
//             country: response.data.sys.country
//         };

//         res.json(weatherData);

//     } catch (error) {
//         res.status(500).json({
//             error: "Could not fetch weather data"
//         });
//     }
// });

// app.get('/api/currency', async (req, res) => {
//     try {
//         const { amount = 100 } = req.query;
//         const amountNum = parseFloat(amount);

    
//         const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        
//         const rates = response.data.rates;
//         const usd = (amountNum * rates.USD).toFixed(2);
//         const eur = (amountNum * rates.EUR).toFixed(2);

       
//         res.json({ 
//             usd: usd,
//             eur: eur
//         });

//     } catch (error) {
//         res.status(500).json({
//             error: "Could not fetch currency data"
//         });
//     }
// });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock quotes data
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It always seems impossible until it's done. - Nelson Mandela",
    "Don't count the days, make the days count. - Muhammad Ali"
];

// Hyderabad weather data
const hyderabadWeather = {
    temperature: 28,
    description: "Partly Cloudy",
    city: "Hyderabad",
    country: "IN"
};

// Other cities data for testing
const cityWeather = {
    'hyderabad': { temperature: 28, description: "Partly Cloudy", city: "Hyderabad", country: "IN" },
    'delhi': { temperature: 25, description: "Sunny", city: "Delhi", country: "IN" },
    'mumbai': { temperature: 30, description: "Humid", city: "Mumbai", country: "IN" },
    'chennai': { temperature: 32, description: "Hot", city: "Chennai", country: "IN" },
    'london': { temperature: 15, description: "Cloudy", city: "London", country: "UK" },
    'new york': { temperature: 20, description: "Clear", city: "New York", country: "US" }
};

// Quote API
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

// Weather API - Hyderabad focused
app.get('/api/weather', (req, res) => {
    try {
        const city = (req.query.city || 'Hyderabad').toLowerCase();
        
        // Return weather for the requested city or Hyderabad as default
        const weatherData = cityWeather[city] || hyderabadWeather;
        
        // Add some random variation to make it feel real
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