// This will check if the Admin is logged in or has a session
function checkAdminLoginStatus() {
    // You can use a local storage or cookie to simulate a logged-in admin for the demo
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');

    // If the admin is logged in, show the admin link
    if (isAdminLoggedIn === 'true') {
        document.getElementById('adminLink').style.display = 'block';
    } else {
        document.getElementById('adminLink').style.display = 'none';
    }
}

// Call the checkAdminLoginStatus function on page load
checkAdminLoginStatus();

// Candidate Login Functionality
function candidateLogin() {
    const employeeId = document.getElementById('candidateId').value;

    // For now, we're simulating a simple validation
    if (employeeId === 'B1234') { // example employee ID, replace with actual logic
        // After successful login, display candidate details
        document.getElementById('candidateDetails').style.display = 'block';
        document.getElementById('candName').innerText = 'John Doe'; // Replace with actual data
        document.getElementById('candEmail').innerText = 'john.doe@example.com'; // Replace with actual data
        document.getElementById('candJob').innerText = 'Software Developer'; // Replace with actual data
        document.getElementById('candSalary').innerText = '₹6,00,000'; // Replace with actual data
    } else {
        alert('Invalid Employee ID');
    }
}

// Offer letter download functionality
function downloadOfferLetter() {
    const employeeId = document.getElementById('candidateId').value;

    if (employeeId === 'B1234') { // replace with actual logic
        window.location.href = `http://localhost:5000/download-offer-letter?employeeId=${employeeId}`;
    } else {
        alert('Offer Letter not found.');
    }
}
function downloadOfferLetter() {
    const employeeId = document.getElementById('candidateId').value;
    
    // Request the server to generate the offer letter for the given employeeId
    fetch(`http://localhost:5000/generate-offer-letter?employeeId=${employeeId}`)
        .then(response => {
            if (response.ok) {
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${employeeId}_offer_letter.pdf`;
                    link.click();
                });
            } else {
                alert('Error downloading the offer letter. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error downloading the offer letter.');
        });
}
