document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.getElementById('continueButton');
    const backButton = document.getElementById('backButton');
    const form = document.getElementById('createAccountForm');
    const orgDetailsSection = document.getElementById('orgDetailsSection');
    const accountCreationSection = document.getElementById('accountCreationSection');

    continueButton.addEventListener('click', function() {
        if (validateSection(orgDetailsSection)) {
            orgDetailsSection.style.display = 'none';
            accountCreationSection.style.display = 'block';
        } else {
            alert("Please fill in all required fields in the organization details section.");
        }
    });

    backButton.addEventListener('click', function() {
        orgDetailsSection.style.display = 'block';
        accountCreationSection.style.display = 'none';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateSection(accountCreationSection)) {
            const formData = collectFormData();
            saveFormData(formData);
            window.location.href = 'thankyou.html';
        } else {
            alert("Please fill in all required fields in the account creation section.");
        }
    });
});

function validateSection(section) {
    const requiredInputs = section.querySelectorAll('input[required]');
    for (let input of requiredInputs) {
        if (input.value.trim() === '') {
            return false;
        }
    }
    return true;
}

function collectFormData() {
    return {
        orgName: document.getElementById('orgName').value,
        orgAddress: document.getElementById('orgAddress').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        yearEstablished: document.getElementById('yearEstablished').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value, // Be cautious with real passwords
        logoUpload1: document.getElementById('logoUpload1').files[0]?.name || '',
        logoUpload2: document.getElementById('logoUpload2').files[0]?.name || '',
        logoUpload3: document.getElementById('logoUpload3').files[0]?.name || ''
    };
}

function saveFormData(formData) {
    const existingData = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    const uniqueId = 'orgPortal_' + new Date().getTime(); // Using a timestamp to ensure uniqueness
    const newFormData = { ...formData, orgPortalId: uniqueId, timestamp: new Date().toISOString(), status: 'pending' };
    existingData.push(newFormData);
    localStorage.setItem('submittedForms', JSON.stringify(existingData));
}
