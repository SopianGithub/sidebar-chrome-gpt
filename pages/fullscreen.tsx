// pages/fullscreen.js

export default function Fullscreen() {
  return (
    <div id="extension-container">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Fullscreen</h1>
        <p className="mt-4 text-lg">Welcome to your Chrome extension built with Next.js!</p>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">Action Button</button>
      </div>
    </div>
  );

}