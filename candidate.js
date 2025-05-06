function loginAndCapture() {
  const id = document.getElementById("candidateId").value.trim();
  const data = localStorage.getItem(id);

  if (!data) {
    alert("Invalid Candidate ID.");
    return;
  }

  document.getElementById("cameraSection").style.display = "block";

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

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageUrl = canvas.toDataURL("image/png");

  video.srcObject.getTracks().forEach(track => track.stop());

  showCandidateDetails(imageUrl);
}

function showCandidateDetails(imageUrl) {
  const id = document.getElementById("candidateId").value.trim();
  const data = JSON.parse(localStorage.getItem(id));

  if (!data) {
    alert("Candidate not found.");
    return;
  }

  document.getElementById("candidateDetails").style.display = "block";
  document.getElementById("detailsContent").innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>ID:</strong> ${data.candidateId}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    <p><strong>Office Location:</strong> ${data.officeLocation}</p>
    <p><strong>Job Title:</strong> ${data.jobTitle}</p>
    <p><strong>Package:</strong> ${data.salary}</p>
  `;

  document.getElementById("capturedPhoto").src = imageUrl;
}
