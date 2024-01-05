document.addEventListener('DOMContentLoaded', function() {
    var classId = localStorage.getItem('currentClassId');
    if (!classId) {
        alert("No class selected. Redirecting to class list.");
        window.location.href = '/public2/classroom/classroom.html';
        return;
    }
    displayClassDetails(classId);
});

function displayClassDetails(classId) {
    var classes = JSON.parse(localStorage.getItem('classes')) || [];
    var classItem = classes.find(c => c.classId === classId);

    if (!classItem) {
        alert("Class not found. Redirecting to class list.");
        window.location.href = '/public2/classroom/classroom.html';
        return;
    }

    var detailsDiv = document.getElementById('classDetails');
    detailsDiv.innerHTML = `<h2>${classItem.className}</h2>`;

    var studentListBox = document.createElement('div');
    studentListBox.className = 'student-list-box';
    var studentList = classItem.students.sort((a, b) => a.name.localeCompare(b.name));
    
    studentList.forEach((student, index) => {
        studentListBox.innerHTML += `<p>${index + 1}. ${student.name}</p>`;
    });

    detailsDiv.appendChild(studentListBox);
}
