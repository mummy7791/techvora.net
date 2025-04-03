document.addEventListener("DOMContentLoaded", function() {
    // Apply button click event
    document.querySelectorAll(".apply-btn").forEach(button => {
        button.addEventListener("click", function() {
            alert("Redirecting to application form...");
        });
    });

    // Form submission handling
    document.getElementById("jobApplicationForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Application submitted successfully!");
        this.reset();
    });

    // Offer letter check functionality
    document.getElementById("checkOffer").addEventListener("click", function() {
        const email = document.getElementById("offerEmail").value.trim();
        const offerMessage = document.getElementById("offerMessage");
        
        if (email === "") {
            offerMessage.innerHTML = "<span style='color:red;'>Please enter a valid email.</span>";
            return;
        }

        // Simulating email verification
        setTimeout(() => {
            if (email === "applicant@techvora.com") {
                offerMessage.innerHTML = "<a href='offer_letter.pdf' download>Download Your Offer Letter</a>";
            } else {
                offerMessage.innerHTML = "<span style='color:red;'>No offer letter found for this email.</span>";
            }
        }, 1000);
    });
});
