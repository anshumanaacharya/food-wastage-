const express = require('express');
const router = express.Router();

const fs = require('fs'); // Import the file system module for logging
const logStream = fs.createWriteStream('user_actions.log', { flags: 'a' }); // Create a write stream for logging

// Mock database for demonstration purposes
let users = [];

// Function to log user actions
function logAction(action, user) {
    const logEntry = `${new Date().toISOString()} - ${action}: ${JSON.stringify(user)}\n`;
    logStream.write(logEntry);
}

// GET /users - Retrieve a list of all users
router.get('/users', (req, res) => {
    res.json(users);
});

router.post('/users', (req, res) => {
    const newUser = req.body; // Assuming user data is sent in the request body
    users.push(newUser);
    logAction('User Created', newUser); // Log the user creation action
    res.status(201).json(newUser);
});

// PUT /users/:id - Update an existing user by ID
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    users = users.map(user => (user.id === id ? updatedUser : user));
    res.json(updatedUser);
});

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== id);
    logAction('User Deleted', { id }); // Log the user deletion action
    res.status(204).send();
});

// POST /logout - Logout a user
router.post('/logout', (req, res) => {
    const user = req.body; // Assuming user info is sent in the request body
    logAction('User Logged Out', user); // Log the logout action
    res.status(200).send('User logged out successfully');
});

module.exports = router;
