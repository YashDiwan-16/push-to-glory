/// <reference types="vite/client" />

declare global {
  interface Window {
    global: Window & typeof globalThis;
  }
}

// Ensure this file is treated as a module
export {};