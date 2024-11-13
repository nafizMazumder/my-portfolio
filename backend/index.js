const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (for production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));
}

// Contact form route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Correct SMTP host for Outlook
        port: 587, // Use 587 for secure connections
        secure: false, // Use false for port 587
        auth: {
            user: process.env.EMAIL_USER, // Your Outlook email
            pass: process.env.EMAIL_PASS, // Your password or app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use your authenticated email address
        to: process.env.EMAIL_USER, // Send to your authenticated email address
        subject: `Portfolio Contact: ${name}`,
        text: `You have a new message from ${name} (${email}): ${message}`, // Improved message formatting
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        console.log('Email sent:', info.response); // Log the successful response
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
