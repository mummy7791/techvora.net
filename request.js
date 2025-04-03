document.getElementById("requestBtn").addEventListener("click", async function () {
    const employeeId = document.getElementById("employeeId").value;
    const email = document.getElementById("email").value;
    const loadingDiv = document.getElementById("loading");
    const messageDiv = document.getElementById("message");

    // Check if both fields are filled
    if (!employeeId || !email) {
        alert("Please fill in both the Employee ID and Email.");
        return;
    }

    // Show loading message
    loadingDiv.style.display = "block";
    messageDiv.innerHTML = "";

    try {
        // Send request to the server
        const response = await fetch("http://localhost:5000/request-offer-letter", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId, email })
        });

        const data = await response.json();

        if (data.success) {
            messageDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
        } else {
            messageDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
        }
    } catch (error) {
        messageDiv.innerHTML = `<p style="color: red;">Error connecting to the server. Please try again.</p>`;
    } finally {
        // Hide loading message
        loadingDiv.style.display = "none";
    }
});
