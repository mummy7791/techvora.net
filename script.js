const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Example function to generate an offer letter
function generateOfferLetter(employeeId, employeeName, jobTitle, salary, callback) {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'offer_letters', `${employeeId}.pdf`);  // Save file with employeeId as filename

    doc.pipe(fs.createWriteStream(filePath));  // Stream the PDF to the file system

    // Add content to the offer letter PDF
    doc.fontSize(12)
       .text('Tech Vora Pvt. Ltd.')
       .moveDown()
       .text('123 Tech Street, Tech City, India')
       .moveDown()
       .text(`Date: ${new Date().toLocaleDateString()}`)
       .moveDown()
       .text(`Dear ${employeeName},`)
       .moveDown()
       .text(`We are pleased to offer you the position of ${jobTitle} at Tech Vora Pvt. Ltd.`)
       .moveDown()
       .text(`Salary: ${salary}`)
       .moveDown()
       .text('We look forward to having you on our team! Please sign and return this letter to confirm your acceptance.')
       .moveDown()
       .text('Best regards,')
       .moveDown()
       .text('Tech Vora HR Team');

    doc.end();

    // Callback after PDF generation
    doc.on('finish', () => {
        callback(filePath);  // Return the file path after generation
    });
}

// Example route for requesting the offer letter
app.post('/request-offer-letter', async (req, res) => {
    const { employeeId, employeeName, jobTitle, salary, email } = req.body;

    // Generate the offer letter
    generateOfferLetter(employeeId, employeeName, jobTitle, salary, (filePath) => {
        // Send email with the attached offer letter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',  // Replace with your email
                pass: 'your-email-password'    // Use App Password for Gmail
            }
        });

        transporter.sendMail({
            from: 'your-email@gmail.com',  // Replace with your email
            to: email,
            subject: 'Your Tech Vora Offer Letter',
            text: `Dear ${employeeName},\n\nYour offer letter is attached.\n\nBest regards,\nTech Vora HR Team`,
            attachments: [
                {
                    filename: `${employeeId}.pdf`, // Attach the offer letter with Employee ID as filename
                    path: filePath
                }
            ]
        }, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                return res.status(500).send("Error sending email");
            }
            console.log("Email sent successfully:", info);
            res.json({ success: true, message: 'Offer letter sent successfully!' });
        });
    });
});
