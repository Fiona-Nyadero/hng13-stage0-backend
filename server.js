require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const USER_INFO = {
    email: 'fionanyadero@gmail.com',
    name: 'Fiona Nyadero',
    stack: 'Node.js/Express/Axios'
};

// API endpoints
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: "Welcome to my dynamic profile API"
    });
});

app.get('/me', async (req, res) => {
    const timestamp = new Date().toISOString();

    try {
        const response = await axios.get('https://catfact.ninja/fact', {
            timeout: 5000
        });

        const catFact = response.data.fact;

        res.status(200).json({
            status: 'success',
            user: USER_INFO,
            timestamp,
            fact: catFact,
        });

    } catch (error) {
        console.error('Error fetching cat fact:', error.message);

        res.status(200).json({
            status: 'success',
            user: USER_INFO,
            timestamp,
            fact: 'Cats are mysterious, even when APIs fail',
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(
    `Server running on port ${PORT}`
));