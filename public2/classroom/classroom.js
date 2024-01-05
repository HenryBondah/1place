document.addEventListener('DOMContentLoaded', function() {
    var portalId = localStorage.getItem('currentOrgPortalId');
    if (!portalId) {
        alert("No organization selected. Redirecting to login.");
        window.location.href = 'login.html';
        return;
    }
    displayClasses(portalId);
    setupCreateClassButton();
});

function displayClasses(portalId) {
    var classes = JSON.parse(localStorage.getItem('classes')) || [];
    var filteredClasses = classes.filter(classItem => classItem.orgPortalId === portalId);

    var classListDiv = document.getElementById('class-list');
    filteredClasses.forEach(classItem => {
        var classDiv = document.createElement('div');
        classDiv.className = 'class-item';
        classDiv.innerHTML = `<span class="class-name" data-class-id="${classItem.classId}">${classItem.className}</span>`;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() { confirmDelete(classItem.classId); };
        classDiv.appendChild(deleteButton);

        classListDiv.appendChild(classDiv);
    });

    classListDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('class-name')) {
            localStorage.setItem('currentClassId', event.target.dataset.classId);
            window.location.href = '/public2/classdetails/classdetails.html?classId=' + event.target.dataset.classId;
        }
    });
}

function setupCreateClassButton() {
    var createClassButton = document.getElementById('create-classroom');
    if (createClassButton) {
        createClassButton.addEventListener('click', function() {
            window.location.href = '/public2/createclass/createClass.html';
        });
    }
}

function confirmDelete(classId) {
    var adminPassword = prompt("Please enter admin password to delete:");
    var storedPassword = localStorage.getItem('adminPassword'); // Retrieve current admin password

    if (adminPassword === storedPassword) {
        deleteClass(classId);
    } else {
        alert("Incorrect password. Class not deleted.");
    }
}

function deleteClass(classId) {
    var classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes = classes.filter(classItem => classItem.classId !== classId);
    localStorage.setItem('classes', JSON.stringify(classes));
    displayClasses(localStorage.getItem('currentOrgPortalId'));
}
