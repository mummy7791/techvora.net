document.getElementById('offerLetterForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const employeeId = document.getElementById('employeeId').value;
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('message');
    const downloadBtn = document.getElementById('downloadBtn');

    try {
        const response = await fetch('/request-offer-letter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId, email })
        });

        const result = await response.json();
        messageEl.innerText = result.message;

        if (result.success) {
            downloadBtn.style.display = 'block';
        } else {
            messageEl.innerText += " You can still download your offer letter below.";
            downloadBtn.style.display = 'block';
        }
    } catch (error) {
        messageEl.innerText = "Error connecting to server. Please try again.";
    }
});

function downloadOfferLetter() {
    const employeeId = document.getElementById('employeeId').value;
    if (!employeeId) {
        alert("Please enter a valid Employee ID.");
        return;
    }
    window.location.href = `/download-offer-letter?employeeId=${employeeId}`;
}
