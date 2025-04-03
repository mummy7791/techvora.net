const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const verificationTokens = {};

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Handle offer letter request
const requestOfferLetter = (req, res) => {
    const { employeeId, email } = req.body;
    if (!employeeId || !email) {
        return res.status(400).json({ message: 'Employee ID and Email are required.' });
    }

    const verificationToken = uuidv4();
    verificationTokens[verificationToken] = { employeeId, email };

    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Offer Letter Verification',
        html: `<p>Please click the link below to verify your email and download your offer letter:</p>
               <a href="${verificationLink}">Verify Email and Download Offer Letter</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending verification email.' });
        }
        res.status(200).json({ message: 'Verification email sent successfully. Please check your inbox.' });
    });
};

// Handle email verification and offer letter generation
const verifyEmail = (req, res) => {
    const { token } = req.query;
    const requestData = verificationTokens[token];

    if (!requestData) {
        return res.status(400).send('Invalid or expired verification link.');
    }

    const { employeeId, email } = requestData;
    delete verificationTokens[token];

    // Generate the offer letter PDF
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '..', 'public', `${employeeId}_Offer_Letter.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(12).text(`Dear ${employeeId},`, { align: 'left' });
    doc.moveDown();
    doc.text('We are pleased to offer you a position at our company.', { align: 'left' });
    doc.moveDown();
    doc.text('Please find the details of your employment in this document.', { align: 'left' });
    doc.moveDown();
    doc.text('Best regards,', { align: 'left' });
    doc.text('Tech Vora HR Team', { align: 'left' });

    doc.end();

    stream.on('finish', () => {
        // Send the offer letter as an email attachment
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Offer Letter',
            text: 'Please find attached your offer letter.',
            attachments: [{
                filename: `${employeeId}_Offer_Letter.pdf`,
                path: filePath,
                contentType: 'application/pdf',
            }],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            // Delete the file after sending the email
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });

            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending offer letter email.');
            }
            res.send('Offer letter has been sent to your email.');
        });
    });

    stream.on('error', (error) => {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating offer letter.');
    });
};

module.exports = { requestOfferLetter, verifyEmail };
