const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can use any available port

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, phone, service } = req.body;

    // Create a transporter using your email configuration (replace with your own email and SMTP details)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    // Email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Thank you for your enquiry',
        text: `Thanks ${name} for submitting your enquiry for ${service}. Our team will be in touch with you shortly.`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
