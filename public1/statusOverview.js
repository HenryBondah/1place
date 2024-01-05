document.addEventListener('DOMContentLoaded', function() {
    const applicationList = document.getElementById('applicationList');
    const forms = JSON.parse(localStorage.getItem('submittedForms') || '[]');

    forms.forEach((form, index) => {
        const div = document.createElement('div');
        div.classList.add('application-summary');
        div.innerHTML = `
            <p>Application #${index + 1}: ${form.orgName}</p>
            <p>Status: ${form.status || 'Pending'}</p>
            ${form.reviewTimestamp ? `<p>Reviewed on: ${new Date(form.reviewTimestamp).toLocaleString()}</p>` : ''}
            <button onclick="viewApplicationDetails(${index})">View Details</button>
            <button onclick="deleteApplication(${index})">Delete</button>
        `;
        applicationList.appendChild(div);
    });
});

function deleteApplication(formIndex) {
    const forms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    if (confirm('Are you sure you want to delete this application?')) {
        forms.splice(formIndex, 1);
        localStorage.setItem('submittedForms', JSON.stringify(forms));
        location.reload(); // Reload the page to update the list
    }
}



function viewApplicationDetails(formIndex) {
    const form = JSON.parse(localStorage.getItem('submittedForms'))[formIndex];
    if (form) {
        // Display the form details in a designated area or modal
        // For example, setting innerHTML of a details section:
        const detailsSection = document.getElementById('applicationDetails'); // Ensure this element exists in your HTML
        detailsSection.innerHTML = `
            <h3>Details for Application #${formIndex + 1}</h3>
            <p>Organization Name: ${form.orgName}</p>
            <p>Address: ${form.orgAddress}</p>
            <p>Username: ${form.username}</p>
            <p>Password: ${form.password}</p>  
        `;
        detailsSection.style.display = 'block';
    } else {
        alert('Details not found for this application.');
    }
}
