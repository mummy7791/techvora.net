// Admin login functionality
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'tech.vora' && password === '7791') {
        // If login is successful, save the status in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        alert('Admin logged in successfully');
        document.getElementById('adminPanel').style.display = 'block';  // Show the admin panel for adding candidates
    } else {
        alert('Invalid Admin credentials');
    }
}
window.onload = function () {
  // your adminLogin function here
};
