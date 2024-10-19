// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
