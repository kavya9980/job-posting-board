const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

// Register a company
router.post('/register', async (req, res) => {
    const { companyName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO companies (companyName, email, password) VALUES (?, ?, ?)';
        db.query(query, [companyName, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering company', error: err });
            }

            // Send verification email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify your email',
                text: 'Please verify your email by clicking on the link.',
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
            });

            res.status(201).json({ message: 'Company registered successfully. Please verify your email.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering company', error });
    }
});

// Login a company
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM companies WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const company = results[0];
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: company.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;