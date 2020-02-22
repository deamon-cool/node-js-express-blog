const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.listen(3000, () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});