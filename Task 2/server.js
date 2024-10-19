const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public')); // Ensure your public directory is correct

// In-memory storage for form data
let formDataStorage = [];  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email, semester, duration } = req.body;

    // Server-side validation
    if (!email.includes('@') || semester < 1 || semester > 6 || duration < 1 || duration > 6) {
        return res.status(400).send('Error: Invalid form input.');
    }

    // Store validated data
    formDataStorage.push({ name, email, semester, duration });
    console.log(formDataStorage); // Log data for verification

    // Render thank you page
    res.render('status', { name });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
