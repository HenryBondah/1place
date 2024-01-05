document.addEventListener('DOMContentLoaded', function() {
    fetchSubmittedForms();

    document.getElementById('formList').addEventListener('click', function(event) {
        const formSummary = event.target.closest('.form-summary');
        if (formSummary) {
            displayFormDetails(formSummary.dataset.formId);
        }
    });
});

function fetchSubmittedForms() {
    const submittedForms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    const formList = document.getElementById('formList');
    formList.innerHTML = '';

    submittedForms.forEach((form, index) => {
        if (form.status === 'pending') {
            const div = document.createElement('div');
            div.classList.add('form-summary');
            div.innerHTML = `
                <span>Application #${index + 1}: ${form.orgName} - Submitted on: ${new Date(form.timestamp).toLocaleString()}</span>
                <button onclick="approveForm(${index})">Approve</button>
                <button onclick="refuseForm(${index})">Refuse</button>
            `;

            div.dataset.formId = index;
            formList.appendChild(div);
        }
    });
}

function deleteForm(formIndex) {
    let submittedForms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    submittedForms.splice(formIndex, 1);
    localStorage.setItem('submittedForms', JSON.stringify(submittedForms));
    fetchSubmittedForms(); // Refresh the list
}

function editForm(formIndex) {
    // Implementing edit functionality would require a more complex setup, possibly a modal or a separate page.
    alert("Edit functionality is not implemented in this example.");
}

function saveFormStatus(formId, status, reason = '') {
    const forms = JSON.parse(localStorage.getItem('submittedForms'));
    if (forms[formId]) {
        forms[formId].status = status;
        forms[formId].statusReason = reason;
        forms[formId].reviewTimestamp = new Date().toISOString(); // Add review timestamp
        localStorage.setItem('submittedForms', JSON.stringify(forms));
        fetchSubmittedForms(); // Refresh the main list
    }
}

function displayUploadedFiles(form) {
    const files = [form.logoUpload1, form.logoUpload2, form.logoUpload3].filter(name => name);
    if (files.length > 0) {
        const fileLinks = files.map((fileName, index) => `<a href="#" onclick="openFile('${fileName}')">File ${index + 1}</a>`).join(', ');
        return `<p>Uploaded Files: ${fileLinks}</p>`;
    }
    return '';
}

function openFile(fileName) {
    alert(`This is a demo. In a real application, this would open the file: ${fileName}`);
}

function displayFormDetails(formId) {
    const submittedForms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    const form = submittedForms[formId];

    const formDetails = document.getElementById('formDetails');
    formDetails.innerHTML = form ? `
        <h3>Form Details for ${form.orgName}</h3>
        <p>Email: ${form.email}</p>
        <p>Address: ${form.orgAddress}</p>
        <p>Username: ${form.username}</p>
        <p>Password: ${form.password}</p>
        <!-- Add more details if needed -->
    ` : '<p>Form details not found.</p>';
    formDetails.style.display = 'block';
}

function approveForm(formId) {
    const forms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    if (forms[formId] && forms[formId].status === 'pending') {
        forms[formId].status = 'approved';
        forms[formId].reviewTimestamp = new Date().toISOString();
        localStorage.setItem('submittedForms', JSON.stringify(forms));
        alert(`Form #${formId + 1} approved for ${forms[formId].orgName}.`);
        fetchSubmittedForms();
    } else {
        alert('This form has already been processed or does not exist.');
    }
}


function refuseForm(formId) {
    const reason = prompt("Please enter the reason for refusal:");
    if (reason) {
        const forms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
        if (forms[formId]) {
            forms[formId].status = 'refused';
            forms[formId].statusReason = reason;
            forms[formId].reviewTimestamp = new Date().toISOString();
            localStorage.setItem('submittedForms', JSON.stringify(forms));
            alert(`Form #${formId + 1} refused.`);
        }
    }
    fetchSubmittedForms();
}

const statusButton = document.getElementById('applicationStatus');
statusButton.addEventListener('click', function() {
    window.location.href = 'statusOverview.html'; // Update this to the correct path of your status overview page
});


