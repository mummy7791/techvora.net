// Admin Login Function
function adminLogin() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
  
    if (username === "techvora" && password === "7791") {
      document.getElementById("adminPanel").style.display = "block";
    } else {
      alert("Invalid admin credentials.");
    }
  }
  
  // Generate Candidate ID (e.g., TVjohn9045)
  function generateCandidateId(name) {
    const randomNum = Math.floor(9000 + Math.random() * 1000);
    const firstName = name.split(" ")[0].toLowerCase();
    return "TV" + firstName + randomNum;
  }
  
  // Add Candidate Function
  function addCandidate() {
    const name = document.getElementById("candidateName").value;
    const email = document.getElementById("candidateEmail").value;
    const phone = document.getElementById("candidatePhone").value;
    const address = document.getElementById("candidateAddress").value;
    const officeLocation = document.getElementById("officeLocation").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const salary = document.getElementById("salary").value;
  
    if (!name || !email || !phone || !address || !officeLocation || !jobTitle || !salary) {
      alert("Please fill in all fields.");
      return;
    }
  
    const candidateId = generateCandidateId(name);
  
    const candidate = {
      candidateId,
      name,
      email,
      phone,
      address,
      officeLocation,
      jobTitle,
      salary
    };
  
    localStorage.setItem(candidateId, JSON.stringify(candidate));
  
    document.getElementById("candidateIdDisplay").textContent = `Candidate ID generated: ${candidateId}`;
    alert("Candidate added successfully!");
  }
  
  // Fetch Candidate Function
  function fetchCandidate() {
    const id = document.getElementById("candidateId").value.trim();
    const data = localStorage.getItem(id);
  
    if (data) {
      const c = JSON.parse(data);
      document.getElementById("candidateDetails").style.display = "block";
      document.getElementById("detailsContent").innerHTML = `
        <h2>${c.name}</h2>
        <p><strong>Email:</strong> ${c.email}</p>
        <p><strong>Phone:</strong> ${c.phone}</p>
        <p><strong>Address:</strong> ${c.address}</p>
        <p><strong>Office Location:</strong> ${c.officeLocation}</p>
        <p><strong>Job Title:</strong> ${c.jobTitle}</p>
        <p><strong>Package:</strong> ${c.salary}</p>
      `;
    } else {
      alert("Invalid Candidate ID. Please try again.");
    }
  }
  
