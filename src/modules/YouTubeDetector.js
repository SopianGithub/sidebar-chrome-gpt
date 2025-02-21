class YouTubeDetector {
    constructor() {
      this.init();
    }
  
    // Check if the current tab is a YouTube page
    isYouTube() {
      return window.location.href.includes("youtube.com") || window.location.href.includes("youtu.be");
    }
  
    // Add custom HTML to the YouTube video player
    addCustomHtml() {
      const videoPlayer = document.querySelector('.html5-video-player');
      if (videoPlayer) {
        const customDiv = document.createElement('div');
        customDiv.innerHTML = '<div style="position: absolute; top: 10px; left: 10px; background: rgba(0, 0, 0, 0.5); color: white; padding: 5px; z-index: 9999;">Custom HTML Content</div>';
        videoPlayer.appendChild(customDiv);
      }
    }
  
    // Observe changes in the DOM and add custom HTML when the video player is loaded
    observeYouTubePlayer() {
      const observer = new MutationObserver((mutations, obs) => {
        const videoPlayer = document.querySelector('.html5-video-player');
        if (videoPlayer) {
          this.addCustomHtml();
          obs.disconnect();
        }
      });
  
      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
  
    // Handle messages from the background script
    handleMessages() {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "YOUTUBE_CHECK") {
          sendResponse({ isYouTube: true });
        }
      });
    }
  
    // Initialize the script
    init() {
      if (this.isYouTube()) {
        console.log("This tab is a YouTube page!");
        this.handleMessages();
        this.observeYouTubePlayer();
      } else {
        console.log("This tab is not a YouTube page.");
      }
    }
  }
  
  export default YouTubeDetector;