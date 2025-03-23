const express = require('express');
const { simpleLogger } = require('../src');

const app = express();

app.use(simpleLogger({ prefix: '[MyLog]' }));

app.get('/', (req, res) => res.send('Hello from test!'));

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
