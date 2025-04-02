const express = require('express');
const connectDB = require('../database/dbconnection'); // Import the database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const morgan = require('morgan'); // Import morgan for logging
const adminRoutes = require('./admin'); // Import the admin routes
const deliveryRoutes = require('./delivery'); // Import delivery routes
const donationRoutes = require('./donation'); // Import donation routes
const User = require('./models/user')

connectDB(); // Establish the connection

const app = express();

// Use morgan middleware for logging requests
app.use(morgan('combined'));

// Middleware to parse JSON requests
app.use(express.json());

// Use admin routes
app.use('/admin', adminRoutes);

// New route for user registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Extract user data from the request body

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Logic to insert the new user into the database
    const newUser = await User.create({ name, email, password: hashedPassword });
    return res.status(200).json({message : "User succesfully registered", newUser})
    //  res.redirect('/donate'); 
    // Redirect to the donate page after successful registration
});

// New route for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body

    // Logic to validate user credentials against the database
    const user = await User.findOne({ email }); // Check if user exists
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // User found, return success response
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Invalid password
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        // User not found
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// New route for chatbot interactions
app.post('/chatbot', (req, res) => {
    const userMessage = req.body.message;
    // Simulate a response from the chatbot
    const chatbotResponse = `You said: ${userMessage}`;
    res.json({ response: chatbotResponse });
});

app.get('/food', (req, res) => {
    // Logic to retrieve all food items
    res.send('List of food items will be here');
});

app.post('/food', (req, res) => {
    // Logic to add a new food item
    res.send('New food item added');
});

app.put('/food/:id', (req, res) => {
    // Logic to update a specific food item
    res.send(`Food item with ID ${req.params.id} updated`);
});

app.delete('/food/:id', (req, res) => {
    // Logic to delete a specific food item
    res.send(`Food item with ID ${req.params.id} deleted`);
});

app.use('/api', deliveryRoutes); // Use delivery routes
app.post('/api/donations/:id/accept', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        await donation.acceptDonation();
        res.status(200).json({ message: 'Donation accepted', donation });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting donation', error });
    }
});

app.post('/api/donations/:id/reject', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        await donation.rejectDonation();
        res.status(200).json({ message: 'Donation rejected', donation });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting donation', error });
    }
});

app.use('/api', donationRoutes); // Use donation routes

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
});
