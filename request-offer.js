await transporter.sendMail({
    from: 'your-email@gmail.com', // Replace with your email
    to: email,
    subject: 'Tech Vora Offer Letter Request',
    text: `Dear ${employeeName},\n\nYour offer letter is attached.\n\nKind regards,\nTech Vora HR Team`,
    attachments: [
        {
            filename: `${employeeId}.pdf`,
            path: filePath
        }
    ]
}, (error, info) => {
    if (error) {
        console.log("Error sending email:", error);  // Log error if email sending fails
        return res.status(500).send("Error sending email");
    }
    console.log("Email sent successfully:", info);  // Log email sent status
});
