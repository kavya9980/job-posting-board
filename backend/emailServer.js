// emailService.js

const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your password from .env
  },
});

// Function to send an email
const sendEmail = (recipientEmail, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipientEmail,            // List of recipients
    subject: subject,              // Subject of the email
    text: text                     // Plain text body
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Email sent: ' + info.response);
    })
    .catch(error => {
      console.error('Error sending email: ' + error);
    });
};

module.exports = { sendEmail };