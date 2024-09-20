// Function to fetch file contents and display them on the page
async function loadFiles() {
    try {
        // Fetch the list of files
        const response = await fetch('content.json');
        const data = await response.json();

        // Container for the code
        const container = document.getElementById('codeContainer');

        // Iterate over each file and fetch its content
        for (const file of data.files) {
            const fileResponse = await fetch(file);
            const fileContent = await fileResponse.text();

            // Create a new section for each file
            const section = document.createElement('section');
            section.innerHTML = `<h2>${file}</h2><pre><code>${escapeHTML(fileContent)}</code></pre>`;

            // Append the section to the container
            container.appendChild(section);
        }
    } catch (error) {
        console.error('Error fetching file contents:', error);
        const container = document.getElementById('codeContainer');
        container.innerHTML = 'Unable to load content.';
    }
}

// Escape HTML special characters
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Load files on page load
window.onload = loadFiles;
