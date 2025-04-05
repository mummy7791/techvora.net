function loginAndCapture() {
  const id = document.getElementById("candidateId").value.trim();
  const data = localStorage.getItem(id);

  if (!data) {
    alert("Invalid Candidate ID.");
    return;
  }

  // Show camera section
  document.getElementById("cameraSection").style.display = "block";

  // Start webcam
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("video").srcObject = stream;
    })
    .catch(err => {
      console.error("Camera access denied:", err);
      alert("Unable to access camera.");
    });
}

function capturePhoto() {
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  const context = canvas.getContext("2d");

  // Draw current frame to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageUrl = canvas.toDataURL("image/png");

  // Stop webcam
  video.srcObject.getTracks().forEach(track => track.stop());

  // Display candidate details and photo
  showCandidateDetails(imageUrl);
}

function showCandidateDetails(imageUrl) {
  const id = document.getElementById("candidateId").value.trim();
  const data = JSON.parse(localStorage.getItem(id));

  if (!data) return;

  document.getElementById("candidateDetails").style.display = "block";
  document.getElementById("detailsContent").innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Office Location:</strong> ${data.officeLocation}</p>
    <p><strong>Job Title:</strong> ${data.jobTitle}</p>
    <p><strong>Package:</strong> ${data.salary}</p>
  `;

  document.getElementById("capturedPhoto").src = imageUrl;
  document.getElementById("cameraSection").style.display = "none";
}
