const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Define Schema and Model
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Serve index.html on root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Adjust the path if needed
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const feedbackData = new Feedback(req.body);
    feedbackData.save()
        .then(() => {
            console.log('Data saved to MongoDB');
            res.status(200).send('Form submitted successfully!');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error saving data');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
