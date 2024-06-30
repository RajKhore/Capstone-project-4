const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/joke', async (req, res) => {
    const { name } = req.body;
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?name=${name}`);
        const joke = response.data.joke || `${response.data.setup} ... ${response.data.delivery}`;
        res.render('joke', { joke });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Failed to fetch joke. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
