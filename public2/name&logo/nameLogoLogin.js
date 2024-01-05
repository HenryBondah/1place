document.getElementById('nameLogoLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var approvedForms = JSON.parse(localStorage.getItem('submittedForms') || '[]');
    var approvedForm = approvedForms.find(form => form.username === username && form.password === password && form.status === 'approved');

    if (approvedForm) {
        localStorage.setItem('currentOrgPortalId', approvedForm.orgPortalId);
        window.location.href = 'name&logoinfor.html?portalId=' + approvedForm.orgPortalId;
    } else {
        alert('Invalid credentials or your application has not been approved yet.');
    }
});
