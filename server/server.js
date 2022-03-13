const express = require('express');
const app = express();

const fetch = require('node-fetch');

require('dotenv').config();

app.get('/', (req, res) => res.send('Server Work'));

app.get('/nfts', async (req, res) => {
    const nfts = await fetch(`https://api.covalenthq.com/v1/80001/tokens/${process.env.DESCRATCHOFF_ADDRESS}/nft_token_ids/?quote-currency=USD&format=JSON&key=${process.env.COVALENT_APIKEY}`);
    const { data } = await nfts.json();

    res.status(201).json({ data });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));