document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    // Load jsPDF dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    document.head.appendChild(script);

    // Admin Login
    window.adminLogin = function () {
        let username = document.getElementById("adminUsername").value;
        let password = document.getElementById("adminPassword").value;

        if (username === "tech.vora" && password === "7791") {
            alert("Admin logged in successfully!");
            document.getElementById("adminPanel").style.display = "block";
        } else {
            alert("Invalid Admin credentials.");
        }
    };

    // Add Candidate Function
    window.addCandidate = function () {
        let name = document.getElementById("candidateName").value;
        let email = document.getElementById("candidateEmail").value;
        let jobTitle = document.getElementById("jobTitle").value;
        let salary = document.getElementById("salary").value;

        let candidateId = "TV" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        document.getElementById("candidateIdDisplay").innerText = "Candidate ID: " + candidateId;

        localStorage.setItem(candidateId, JSON.stringify({ name, email, jobTitle, salary }));
    };

    // Candidate Login
    window.candidateLogin = function () {
        let employeeId = document.getElementById("candidateId").value;
        let candidateData = JSON.parse(localStorage.getItem(employeeId));

        if (candidateData) {
            document.getElementById("candId").innerText = employeeId;
            document.getElementById("candName").innerText = candidateData.name;
            document.getElementById("candEmail").innerText = candidateData.email;
            document.getElementById("candJob").innerText = candidateData.jobTitle;
            document.getElementById("candSalary").innerText = candidateData.salary;
            document.getElementById("candidateDetails").style.display = "block";

            downloadOfferLetter(employeeId, candidateData);
        } else {
            alert("Invalid Employee ID.");
        }
    };

    // Offer Letter Download (PDF)
    window.downloadOfferLetter = function (employeeId, candidateData) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title and Company Details (MNC Style)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("TECH VORA", 80, 20); // Company name at the top
        doc.setFontSize(12);
        doc.text("TECH VORA SERVICES LIMITED", 10, 30); // Company name in full
        doc.text("www.techvora.com", 10, 35); // Company Website
        doc.text("Contact: +91-123-4567890", 10, 40); // Company Contact Number
        doc.text("Address: Tech Vora Tower, Bangalore, India", 10, 45); // Address

        // Centered Title
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("APPOINTMENT LETTER", 105, 60, { align: "center" });

        // Date and Candidate Information
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Date: 31 Mar 2025`, 10, 70);
        doc.text(`Mr. ${candidateData.name}`, 10, 80);
        doc.text(`${candidateData.address}`, 10, 90);
        doc.text(`Employee No: ${employeeId}`, 10, 100);

        // Dear Candidate Section
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Dear Mr. ${candidateData.name},`, 10, 110);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("We are pleased to appoint you in our organization as Software Engineer, subject to the following terms and conditions:", 10, 120);

        // Job Description - Full Page Matter
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Job Description", 10, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("As a Software Engineer, your responsibilities will include:", 10, 30);
        doc.text("1. Analyzing and developing software applications as per client requirements.", 10, 40);
        doc.text("2. Conducting code reviews and ensuring the software is bug-free and optimized.", 10, 50);
        doc.text("3. Collaborating with cross-functional teams to ensure high-quality deliverables.", 10, 60);
        doc.text("4. Providing regular updates and reports to management.", 10, 70);
        doc.text("5. Continuously improving your skills by participating in relevant workshops and training.", 10, 80);
        doc.text("6. Ensuring adherence to company standards and industry best practices.", 10, 90);
        doc.text("Your role will be crucial in shaping the future of the company's software solutions, and we look forward to seeing you contribute to our success.", 10, 100);

        // Compensation & Benefits - Full Page Matter
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Compensation & Benefits", 10, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("You will receive the following benefits as part of your compensation package:", 10, 30);
        doc.text("1. Annual salary: INR 8,00,000, payable monthly.", 10, 40);
        doc.text("2. Health and medical insurance coverage for you and your immediate family.", 10, 50);
        doc.text("3. Employee Stock Option Plan (ESOP) to participate in the company’s growth.", 10, 60);
        doc.text("4. Paid Time Off (PTO): 21 days annually, in addition to public holidays.", 10, 70);
        doc.text("5. Performance-based bonuses determined during annual appraisals.", 10, 80);
        doc.text("6. Provident Fund (PF) and Gratuity benefits as per statutory regulations.", 10, 90);
        doc.text("7. Access to employee wellness programs, including gym memberships and counseling services.", 10, 100);

        // Confidentiality & Non-Disclosure Agreement (NDA) - Full Page Matter
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Confidentiality & Non-Disclosure Agreement (NDA)", 10, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("You are required to sign a Non-Disclosure Agreement (NDA) as part of your employment.", 10, 30);
        doc.text("This NDA will ensure that all proprietary, confidential, and sensitive information remains protected. You will not disclose or share any information about TECHVORA, its clients, partners, or any other confidential matter.", 10, 40);
        doc.text("Failure to comply with the NDA may lead to disciplinary actions, including termination of employment and legal consequences.", 10, 50);
        doc.text("Please review the NDA carefully and sign it upon your joining.", 10, 60);
        doc.text("It is essential to respect the confidentiality of our business and maintain high ethical standards.", 10, 70);

        // Terms of Employment - Full Page Matter
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Terms of Employment", 10, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("1. Your employment will be probationary for the first 6 months.", 10, 30);
        doc.text("2. After probation, you will be considered a permanent employee of TECHVORA.", 10, 40);
        doc.text("3. You will receive an annual performance review to evaluate your growth and contribution.", 10, 50);
        doc.text("4. You may be asked to relocate based on business needs.", 10, 60);
        doc.text("5. You will be eligible for additional training programs to improve your skills.", 10, 70);
        doc.text("6. Any violation of company policies, unethical behavior, or non-compliance may result in immediate termination.", 10, 80);
        doc.text("Please read and understand the full Terms of Employment before signing.", 10, 90);

        // Acknowledgement and Signature Section - Full Page Matter
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Acknowledgement & Signature", 10, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("By signing below, you acknowledge your acceptance of the terms and conditions outlined in this offer letter.", 10, 30);
        doc.text("You agree to comply with the company's policies and standards, and understand the expectations outlined in this document.", 10, 40);
        doc.text("Please sign and return a copy of this letter by email or in person to confirm your acceptance.", 10, 50);
        doc.text("For TECHVORA SERVICES LIMITED", 10, 70);
        doc.text("____________________________", 10, 80);
        doc.text("Authorized Signatory", 10, 90);

        doc.text("Accepted and Agreed by:", 10, 120);
        doc.text("____________________________", 10, 130);
        doc.text("Employee Signature", 10, 140);

        // Saving the Offer Letter as PDF
        doc.save(`Offer_Letter_${employeeId}.pdf`);
    };

});
