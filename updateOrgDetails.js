document.addEventListener('DOMContentLoaded', function () {
    var portalId = localStorage.getItem('currentOrgPortalId');
    if (portalId) {
        loadOrgData(portalId);
    } else {
        console.error('Organization portal ID not found. Redirecting to login page.');
        window.location.href = 'nameLogoLogin.html'; // Adjust as necessary
    }

    document.getElementById('create-classrooms').addEventListener('click', function() {
        window.location.href = '/public2/classroom/classroom.html?portalId=' + portalId;
    });
});

function loadOrgData(portalId) {
    var orgData = JSON.parse(localStorage.getItem('orgData') || '{}')[portalId];
    if (orgData) {
        document.getElementById('organization-name').textContent = orgData.orgName || 'Organization Name';
        document.getElementById('footer-info').textContent = '© 2023 ' + (orgData.orgName || 'Organization');
        document.getElementById('header-logo').src = orgData.orgLogo || 'default-logo.png';
        document.getElementById('footer-logo').src = orgData.orgLogo || 'default-logo.png';
        document.getElementById('orgDescriptionDisplay').textContent = orgData.orgDescription || 'No description available.';
    } else {
        console.error('Organization details not found for this portal.');
    }
}


