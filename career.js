let capturedImageBase64 = "";

function fetchCandidate() {
  const id = document.getElementById("candidateId").value.trim();
  const data = localStorage.getItem(id);

  if (data) {
    const c = JSON.parse(data);

    // Show camera to take photo
    document.getElementById("cameraSection").style.display = "block";
    startCamera();

    // Temporarily store candidate data
    window.currentCandidateData = c;
  } else {
    alert("Invalid Candidate ID. Please try again.");
  }
}

// Start camera stream
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById("video");
      video.srcObject = stream;
    })
    .catch(err => {
      console.error("Camera access denied:", err);
      alert("Please allow camera access.");
    });
}

// Capture photo from video
function capturePhoto() {
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  capturedImageBase64 = canvas.toDataURL("image/png");

  // Show captured photo
  document.getElementById("capturedPhoto").src = capturedImageBase64;
  document.getElementById("imagePreview").style.display = "block";

  showCandidateDetailsWithPhoto();
}

function showCandidateDetailsWithPhoto() {
  const c = window.currentCandidateData;

  document.getElementById("candidateDetails").style.display = "block";
  document.getElementById("detailsContent").innerHTML = `
    <h2>${c.name}</h2>
    <p><strong>Email:</strong> ${c.email}</p>
    <p><strong>Phone:</strong> ${c.phone}</p>
    <p><strong>Address:</strong> ${c.address}</p>
    <p><strong>Office Location:</strong> ${c.officeLocation}</p>
    <p><strong>Job Title:</strong> ${c.jobTitle}</p>
    <p><strong>Package:</strong> ${c.salary}</p>
    <img src="${capturedImageBase64}" width="150" style="margin-top:10px;" />
  `;
}
