// File: server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });
const offerLetters = {
    "applicant@example.com": "offer_letter_sample.pdf"
};

app.post("/apply", upload.single("resume"), (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }
    offerLetters[email] = "offer_letter_sample.pdf";
    res.json({ message: "Application submitted successfully! Check back for your offer letter." });
});

app.get("/offer-letter/:email", (req, res) => {
    const email = req.params.email;
    if (offerLetters[email]) {
        const filePath = path.join(__dirname, "documents", offerLetters[email]);
        res.download(filePath, "Offer_Letter.pdf");
    } else {
        res.status(404).json({ message: "Offer letter not found. Please check your email." });
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
