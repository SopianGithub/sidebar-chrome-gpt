const createSidebar = () => {
    return new Promise((resolve) => {
        const sidebar = document.createElement('my-assistant');
        const theme = localStorage.getItem('theme-assistant') || 'default-theme';
    
        sidebar.id = 'extension-sidebar';
        sidebar.setAttribute('data-theme', theme);
        sidebar.innerHTML = ``;
    
        document.body.parentNode.insertBefore(sidebar, document.body.nextSibling);
    
        const shadowRoot = sidebar.attachShadow({ mode: 'open' });

        fetch(chrome.runtime.getURL('index.html'))
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const styleTags = doc.getElementsByTagName('style');
                const filteredStyles = Array.from(styleTags).map(style => style.outerHTML).join('');
                shadowRoot.innerHTML = filteredStyles + doc.body.innerHTML;

                resolve(sidebar); // Resolve the promise with the sidebar element
            })
            .catch(error => {
                console.error('Error loading index.html:', error);
                resolve(null); // Resolve with null in case of error
            });;
    });
};
  
createSidebar().then(sidebar => {
    if (sidebar) {
        const toggleButton = sidebar.shadowRoot.getElementById('btn-toggle-assistant');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                    chrome.runtime.sendMessage({ togglePanel: true }, (response) => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError.message);
                        }
                    });
                } else {
                    console.error('chrome.runtime.sendMessage is not available');
                }
            });
        } else {
            console.error('Button with id "btn-toggle-assistant" not found in shadow DOM');
        }
    } else {
        console.error('Sidebar creation failed');
    }
});

