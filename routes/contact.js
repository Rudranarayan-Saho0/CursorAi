const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Submit contact form
router.post('/', async (req, res) => {
    try {
        // Save to database
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await contact.save();

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Your email where you want to receive messages
            subject: `New Contact Form Submission from ${req.body.name}`,
            text: `
                Name: ${req.body.name}
                Email: ${req.body.email}
                Message: ${req.body.message}
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all messages (protected route)
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 