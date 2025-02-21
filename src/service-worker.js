let isPanelOpen = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
});

chrome.action.onClicked.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url) {
        chrome.runtime.sendMessage({ url: tab.url });
      }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.togglePanel) {
        toggleSidePanel();      
        sendResponse({ success: true }); // Send a response back
        return true; // Keep the message channel open for asynchronous response
    }

    if (request.checkSession) {
        checkSession((session) => {
            if (session) {
                console.log('Session data:', session);
                sendResponse({ success: true, session: session });
            } else {
                console.log('No active session found.');
                sendResponse({ success: false, session: null });
            }
        });
        return true; // Keep the message channel open for asynchronous response
    }

    return true;
});

function toggleSidePanel() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;
            if (isPanelOpen) {
                // Simulate closing by setting behavior to not open
                chrome.sidePanel.setOptions({ enabled: false, tabId:tabId })
                chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });
            } else {
                // Simulate opening by setting behavior to open
                chrome.sidePanel.setOptions({ enabled: true, tabId:tabId, path: "sidepanel.html" })
                chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
                chrome.sidePanel.open({ tabId: tabId });
            }
            isPanelOpen = !isPanelOpen;
        } else {
            console.error('No active tab found.');
        }
    });
}

function checkSession(onSuccess) {
    fetch("https://localhost:3000/api/auth/session", {
        mode: 'cors',
    })
        .then(response => response.json())
        .then((session) => {
            if (Object.keys(session).length > 0) {
                onSuccess(session);
            } else {
                onSuccess(null);
            }
        })
        .catch(err => {
            console.error(err);
            onSuccess(null);
        });

    return true;  // Will respond asynchronously.
}