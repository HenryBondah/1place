document.getElementById('deleteStudentBtn').addEventListener('click', function() {
    var adminPassword = prompt("Please enter the admin password:");
    if (adminPassword === localStorage.getItem('adminPassword')) {
        // Add logic to delete student
        alert("Student deleted successfully.");
    } else {
        alert("Incorrect password.");
    }
});

// Function to load student info
function loadStudentInfo() {
    // Add logic to load student info
}

// Call loadStudentInfo on page load
loadStudentInfo();
