const form = document.getElementById('scanForm');
const scanResultsDiv = document.getElementById('scanResults');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const host = formData.get('host');
    scanResultsDiv.innerHTML = 'Scanning...';

    try {
        const response = await fetch(`/scan?host=${encodeURIComponent(host)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch scan results');
        }
        const scanResults = await response.json();
        displayResults(scanResults);
    } catch (error) {
        console.error('Error during scan:', error);
        scanResultsDiv.innerHTML = 'Error during scan';
    }
});

function displayResults(results) {
    let html = '<h2>Scan Results:</h2>';
    html += '<ul>';
    results.forEach(result => {
        html += `<li>Port ${result.port}: ${result.status}</li>`;
    });
    html += '</ul>';
    scanResultsDiv.innerHTML = html;
}
