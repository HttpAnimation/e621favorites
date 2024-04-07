const express = require('express');
const axios = require('axios');
const fs = require('fs');
const userInfo = JSON.parse(fs.readFileSync('userinfo.json', 'utf8'));

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/favorites', async (req, res) => {
    try {
        const response = await axios.get('https://e621.net/users/favorites.json', {
            params: {
                "login": userInfo.username,
                "api_key": userInfo.apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching favorites');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
