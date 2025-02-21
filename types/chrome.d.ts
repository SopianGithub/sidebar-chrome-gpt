// src/types/chrome.d.ts
declare namespace chrome {
    // You can add specific types here if needed
    interface Runtime {
      sendMessage(message: any, callback?: (response: any) => void): void;
      lastError: { message: string } | undefined;
    }
  
    // Add other Chrome APIs as needed
}