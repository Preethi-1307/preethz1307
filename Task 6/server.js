const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);

// Handle GET request for index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle GET request for registration
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

// Handle GET request for login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Handle POST request for registration
app.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!email.includes('@') || password.length < 6) {
        return res.send('Invalid email or password.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.send('Username already taken.');
    }

    const newUser = new User({ name, email, username, password });
    await newUser.save();
    res.redirect('/welcome'); // Redirect to welcome page after registration
});

// Handle POST request for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.send('User not found.');
    }

    if (user.password === password) {
        res.redirect('/welcome'); // Redirect to welcome page
    } else {
        res.send('Incorrect password.');
    }
});

// Welcome page
app.get('/welcome', (req, res) => {
    res.send('<h1>Welcome to the Application!</h1><a href="/">Go to Home</a>');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
